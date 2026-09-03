"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Teacher Motors' signature piece: the audience.
 *
 * One million points, one per Instagram follower. Not a sample, not a stylised
 * suggestion of a crowd — the buffer really holds 1,000,000 vertices, because
 * the number is the whole reason this dealership is unlike every other one in
 * the series, and a numeral on a page does not carry it.
 *
 * The field is a disc seen at a low angle with a slow radial wave running
 * outward through it, so it reads as a surface of people rather than as noise.
 * At the centre stands one larger mark: the business itself.
 *
 * The second thing it does is the point. Each vertex carries a stable random
 * value, and a `uKeep` uniform culls every point above it — so switching to
 * another account's follower count physically removes the difference. Going
 * from 1,000,000 to 104 leaves a hundred-odd specks on an empty plate, which
 * is what a hundred-odd followers actually looks like next to a million.
 *
 * This is deliberately *not* site 07's point cloud: those points were sampled
 * from a photograph and assembled into a car. These are not sampled from
 * anything, they never form an image, and their only job is to be counted.
 */

const COUNT = 1_000_000;
const RADIUS = 5.2;

const VERT = /* glsl */ `
  attribute float aRand;
  attribute float aPhase;

  uniform float uTime;
  uniform float uKeep;      // fraction of the field to draw
  uniform float uPointer;   // -1..1, steers the wave
  uniform float uDpr;

  varying float vShade;

  void main() {
    // Culling by a stable per-point random keeps the survivors evenly spread
    // instead of shrinking the disc, which is what makes the comparison read.
    if (aRand > uKeep) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      gl_PointSize = 0.0;
      return;
    }

    vec3 p = position;
    float r = length(p.xz);

    // One slow wave running out from the centre, plus a second, longer one
    // that the pointer leans into. A crowd is never still and never uniform.
    float w = sin(r * 1.9 - uTime * 1.15 + aPhase * 0.35);
    float w2 = sin(r * 0.55 - uTime * 0.4 + uPointer * 2.2);
    p.y += w * 0.055 + w2 * 0.10;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Perspective-correct size, floored so distant points never vanish
    // entirely — a follower that renders as nothing is not counted.
    gl_PointSize = max(1.0, (2.15 * uDpr) / -mv.z * 3.0);

    vShade = 0.42 + 0.58 * (w * 0.5 + 0.5) - smoothstep(0.55, 1.0, r / ${RADIUS.toFixed(1)}) * 0.35;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uInk;
  varying float vShade;

  void main() {
    // Round the sprite off, cheaply.
    vec2 d = gl_PointCoord - 0.5;
    if (dot(d, d) > 0.25) discard;
    gl_FragColor = vec4(uInk, clamp(vShade, 0.0, 1.0));
  }
`;

function Field({ keep, ink }: { keep: number; ink: string }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const keepRef = useRef(keep);
  const pointer = useRef(0);

  useEffect(() => {
    keepRef.current = keep;
  }, [keep]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // A million positions is 12 MB of Float32 — built once, never rebuilt, and
  // never inside useMemo: Math.random() is an impure call, and the compiler
  // treats a useMemo factory as still running during render. Building it in
  // an effect keeps the random field out of the render path entirely.
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const pos = new Float32Array(COUNT * 3);
    const rand = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // sqrt on the radius keeps the density even across the disc; a plain
      // uniform radius piles everyone into the middle.
      const r = Math.sqrt(Math.random()) * RADIUS;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = Math.sin(a) * r;
      rand[i] = Math.random();
      phase[i] = Math.random() * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), RADIUS + 1);
    // A one-time handoff of a buffer built outside the render path — the same
    // pattern used for WebGL-capability detection elsewhere in this project.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGeometry(g);
    return () => g.dispose();
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uKeep: { value: keep },
      uPointer: { value: 0 },
      uDpr: { value: 1 },
      uInk: { value: new THREE.Color(ink) },
    }),
    // Held stable on purpose: keep and time are driven from the frame loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ink],
  );

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    const dt = Math.min(delta, 0.05);
    const u = m.uniforms;
    u.uTime.value += dt;
    u.uDpr.value = state.viewport.dpr;
    // Eased, so a change of account reads as the crowd thinning rather than
    // as a cut between two pictures.
    u.uKeep.value += (keepRef.current - u.uKeep.value) * (1 - Math.pow(0.06, dt));
    u.uPointer.value += (pointer.current - u.uPointer.value) * (1 - Math.pow(0.1, dt));
  });

  if (!geometry) return null;

  return (
    <>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={mat}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>

      {/* The one mark in the middle is the business. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.2, 0.235, 48]} />
        <meshBasicMaterial color={ink} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.075, 24]} />
        <meshBasicMaterial color={ink} toneMapped={false} />
      </mesh>
    </>
  );
}

/**
 * A context the browser refuses outright makes r3f throw on mount, which
 * use-webgl-health cannot see — it only reports a context created and then
 * lost. Probe before rendering the Canvas at all.
 */
function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function Audience({
  followers,
  alt,
  className,
  fallback,
  ink = "#15171b",
}: {
  /** How many of the million points to draw. */
  followers: number;
  alt: string;
  className?: string;
  /** Their own photograph, shown wherever the field cannot run. */
  fallback: string;
  ink?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // A browser-only capability answer cannot be known before an effect runs,
    // and a lazy initialiser reading `window` would desync hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
  }, []);

  if (lost || supported !== true) {
    return (
      <div className={className}>
        <img src={fallback} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 2.35, 6.2], fov: 42 }}
        // A million one-pixel sprites do not need a retina buffer, and capping
        // here is what keeps this affordable on a phone.
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl, camera }) => {
          bind(gl.domElement);
          camera.lookAt(0, 0, 0);
        }}
      >
        <Field keep={Math.min(1, followers / 1_000_000)} ink={ink} />
      </Canvas>
    </div>
  );
}
