"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useTeacher } from "@/content/schema-ext";
import { CARS, HERO_FRAME, PHONES, PROFILE, SCALE, WITH_FIGURES, type Car } from "@/content/media";
import { Audience } from "@/components/webgl/audience";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-6% 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--post-delay": `${d}ms` }) as CSSProperties;

/** This site's arrival: the post. A line sits low and dim, then snaps to
 * full value in one short step — a ledger entry updating, not a fade. */
function Post({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  // A polymorphic tag's prop union is too wide for TS to resolve on its own.
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-post="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-post-rule=""
      className={`h-px w-full origin-[left_center] bg-ink/20 rtl:origin-[right_center] ${className ?? ""}`}
      style={delayVar(delay)}
    />
  );
}

function SectionHead({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div>
      <Post className="label text-gold">{eyebrow}</Post>
      <Post as="h2" className="text-display font-display mt-3 max-w-[24ch] text-ink" delay={70}>
        {heading}
      </Post>
      <Rule className="mt-6" delay={130} />
      {intro ? (
        <Post className="text-lead mt-6 max-w-[68ch] leading-[1.8] text-ink-2" delay={180}>
          {intro}
        </Post>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useTeacher();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/12 bg-paper/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[86rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[1rem] font-semibold text-ink">{c.brand.name}</span>
        </a>

        <nav className="ms-auto hidden items-center gap-7 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-[0.86rem] text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="latin tnum ms-auto shrink-0 text-[0.86rem] font-semibold text-gold transition-opacity hover:opacity-75 md:ms-0"
        >
          {PROFILE.phone}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-ink/25 px-3 py-1.5 text-[0.7rem] text-ink-2 transition-colors hover:border-gold hover:text-ink"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- hero -- */

function Hero() {
  const c = useTeacher();
  const [scaleIdx, setScaleIdx] = useState(0);
  const scale = SCALE[scaleIdx];

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="mx-auto max-w-[86rem] px-5 pt-10 sm:px-8 lg:pt-14">
        <Post className="label text-gold">{c.hero.eyebrow}</Post>
        <Post as="h1" className="text-hero font-display mt-4 max-w-[22ch] text-ink" delay={90}>
          {c.hero.headline}
        </Post>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <Post delay={40}>
            <Audience
              followers={scale.followers}
              fallback={HERO_FRAME}
              alt={c.hero.audienceAlt}
              className="aspect-[4/3] w-full border border-ink/15 bg-paper-2"
            />
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
              <span className="ledger tnum text-[1.4rem] font-medium text-ink">
                <span className="latin">{scale.figure}</span>
              </span>
              <span className="label text-ink-2">
                {scale.label} · {c.hero.followersOf}
              </span>
            </div>

            {/* Choosing an account physically thins the field — the point of
                building it from a million real vertices rather than a graphic. */}
            <div className="mt-4 flex flex-wrap gap-2">
              {SCALE.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setScaleIdx(i)}
                  aria-pressed={i === scaleIdx}
                  className={`latin border px-3 py-1.5 text-[0.78rem] transition-colors ${
                    i === scaleIdx
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/25 text-ink-2 hover:border-ink/60 hover:text-ink"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="fine mt-3 text-ink-2">{c.hero.scaleHint}</p>
            <p className="fine mt-1 text-ink-2">{c.hero.scaleLine}</p>
          </Post>

          <div>
            <Post className="text-lead max-w-[50ch] leading-[1.85] text-ink-2" delay={160}>
              {c.hero.sub}
            </Post>

            <Post className="mt-9 flex flex-wrap items-center gap-3" delay={240}>
              <a
                href={PROFILE.phoneHref}
                className="bg-ink px-6 py-3 text-[0.9rem] font-medium text-paper transition-opacity hover:opacity-85"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href="#offers"
                className="border border-ink/30 px-6 py-3 text-[0.9rem] text-ink transition-colors hover:border-gold hover:text-gold"
              >
                {c.hero.secondaryCta}
              </a>
            </Post>

            <Post className="mt-12 grid grid-cols-3 gap-px border-t border-ink/20" delay={320}>
              {[
                { k: c.hero.followersLabel, v: PROFILE.igFollowersLabel },
                { k: c.hero.postsLabel, v: PROFILE.igPosts },
                { k: c.hero.followingLabel, v: PROFILE.igFollowing },
              ].map((s) => (
                <div key={s.k} className="pt-6">
                  <div className="ledger tnum text-[1.7rem] leading-none text-ink">{s.v}</div>
                  <div className="label mt-2 text-ink-2">{s.k}</div>
                </div>
              ))}
            </Post>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- offers -- */

function offerTag(c: ReturnType<typeof useTeacher>, car: Car) {
  if (!car.offer) return c.offers.noneTag;
  if (car.offer.deposit === "0%") return c.offers.zeroTag;
  return c.offers.otherTag;
}

function OfferCard({ car, index }: { car: Car; index: number }) {
  const c = useTeacher();
  const tag = offerTag(c, car);

  return (
    <Post
      as="article"
      className="border-t border-ink/15 pt-6"
      delay={Math.min(index, 8) * 40}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="ledger tnum text-[0.78rem] text-ink-2">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`label whitespace-nowrap ${
            car.offer?.deposit === "0%" ? "text-gold" : car.offer ? "text-ink" : "text-ink-2"
          }`}
        >
          {tag}
        </span>
      </div>

      <h3 className="latin font-display mt-3 text-[1.2rem] leading-tight text-ink">
        {car.marque} {car.model}
      </h3>
      {car.billing ? <p className="fine mt-1 text-ink-2">{car.billing}</p> : null}

      {car.offer ? (
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-ink/10 pt-4">
          <div>
            <dt className="label text-ink-2">{c.offers.depositLabel}</dt>
            <dd className="ledger tnum mt-1 text-[1.1rem] text-ink">{car.offer.deposit}</dd>
          </div>
          <div>
            <dt className="label text-ink-2">{c.offers.termLabel}</dt>
            <dd className="ledger tnum mt-1 text-[1.1rem] text-ink">{car.offer.term}</dd>
          </div>
        </dl>
      ) : (
        <p className="fine mt-4 border-t border-ink/10 pt-4 text-ink-2">{c.offers.noneTag}</p>
      )}

      <a
        href={car.postUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="fine mt-4 inline-block text-gold underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ink"
      >
        {c.offers.viewPost}
      </a>
    </Post>
  );
}

function Offers() {
  const c = useTeacher();

  return (
    <section id="offers" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <SectionHead eyebrow={c.offers.eyebrow} heading={c.offers.heading} intro={c.offers.intro} />

      <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {CARS.map((car, i) => (
          <OfferCard key={car.id} car={car} index={i} />
        ))}
      </div>

      <Post
        className="fine mt-14 max-w-[62ch] border-s-2 border-gold ps-4 text-ink-2"
        delay={260}
      >
        {c.offers.exception}
      </Post>
    </section>
  );
}

/* -------------------------------------------------------------- figures -- */

function Figures() {
  const c = useTeacher();

  return (
    <section id="figures" className="border-y border-ink/12 bg-paper-2 py-24 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHead
          eyebrow={c.figures.eyebrow}
          heading={c.figures.heading}
          intro={c.figures.intro}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {WITH_FIGURES.map((car, i) => (
            <Post key={car.id} className="bg-paper p-6" delay={i * 90}>
              <div className="aspect-[4/3] w-full overflow-hidden bg-paper-2">
                <img
                  src={car.frames[0]}
                  alt={`${car.marque} ${car.model}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="latin font-display mt-4 text-[1.15rem] text-ink">
                {car.marque} {car.model}
              </h3>
              <dl className="mt-4 space-y-2.5 border-t border-ink/10 pt-4">
                {car.figures?.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4">
                    <dt className="fine text-ink-2">
                      {c.figures.specLabels[f.label as keyof typeof c.figures.specLabels] ?? f.label}
                    </dt>
                    <dd className="ledger tnum text-[0.92rem] text-ink">
                      <span className="latin">{f.value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Post>
          ))}
        </div>

        <Post className="fine mt-10 max-w-[62ch] text-ink-2" delay={280}>
          {c.figures.note}
        </Post>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- numbers -- */

function Numbers() {
  const c = useTeacher();
  const max = PHONES[0]?.posts ?? 1;

  return (
    <section id="numbers" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <SectionHead
        eyebrow={c.numbers.eyebrow}
        heading={c.numbers.heading}
        intro={c.numbers.intro}
      />

      <div className="mt-14 space-y-5">
        {PHONES.map((p, i) => (
          <Post key={p.number} delay={i * 70}>
            <div className="flex items-center justify-between gap-4">
              <span className="latin tnum font-display text-[1.1rem] text-ink">{p.number}</span>
              <span className="fine text-ink-2">
                <span className="latin tnum">{p.posts}</span> {c.numbers.postsSuffix}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-paper-2">
              <div
                className="h-full bg-gold-bright"
                style={{ width: `${(p.posts / max) * 100}%` }}
              />
            </div>
          </Post>
        ))}
      </div>

      <Post className="fine mt-10 max-w-[60ch] text-ink-2" delay={PHONES.length * 70 + 60}>
        {c.numbers.note}
      </Post>
    </section>
  );
}

/* --------------------------------------------------------------- contact -- */

function Contact() {
  const c = useTeacher();

  return (
    <section id="contact" className="border-t border-ink/12 bg-ink py-24 text-paper sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Post as="h2" className="text-display font-display max-w-[18ch]">
          {c.contact.heading}
        </Post>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Post delay={60}>
            <div className="label text-gold-bright">{c.contact.addressLabel}</div>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-paper/85">
              {c.contact.address}
            </p>
            <a
              href={c.contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-3 inline-block text-paper underline decoration-paper/40 underline-offset-4"
            >
              Google Maps
            </a>
          </Post>

          <Post delay={130}>
            <div className="label text-gold-bright">{c.contact.phoneLabel}</div>
            <a
              href={PROFILE.phoneHref}
              className="latin tnum mt-3 block text-[1.05rem] text-paper transition-opacity hover:opacity-75"
            >
              {c.contact.phones[0]}
            </a>
            <div className="label mt-5 text-gold-bright">{c.contact.landlineLabel}</div>
            <span className="latin tnum mt-2 block text-[0.94rem] text-paper/85">
              {c.contact.landline}
            </span>
          </Post>

          <Post delay={200}>
            <div className="label text-gold-bright">{c.contact.emailLabel}</div>
            <a
              href={`mailto:${c.contact.email}`}
              className="latin mt-3 block text-[0.9rem] text-paper/85 transition-colors hover:text-paper"
            >
              {c.contact.email}
            </a>
            <div className="label mt-5 text-gold-bright">{c.contact.siteLabel}</div>
            <a
              href={PROFILE.site}
              target="_blank"
              rel="noreferrer noopener"
              className="latin mt-2 block text-[0.9rem] text-paper/85 transition-colors hover:text-paper"
            >
              teachermotor.com
            </a>
          </Post>

          <Post delay={270}>
            <a
              href={PROFILE.phoneHref}
              className="inline-block bg-gold-bright px-6 py-3 text-[0.9rem] font-medium text-ink transition-opacity hover:opacity-85"
            >
              {c.contact.cta}
            </a>
            <div className="mt-6 flex flex-col gap-2 text-[0.88rem]">
              <a
                href={c.contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-paper/85 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
              >
                Instagram
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-paper/85 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
              >
                Facebook
              </a>
            </div>
          </Post>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- export -- */

export function Sections() {
  return (
    <main>
      <Hero />
      <Offers />
      <Figures />
      <Numbers />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useTeacher();

  return (
    <footer className="border-t border-ink/12 bg-paper py-10">
      <div className="mx-auto flex max-w-[86rem] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/mark.svg" alt="" className="h-6 w-6" />
          <span className="font-display text-[0.94rem] font-semibold text-ink">{c.brand.name}</span>
          <span className="fine text-ink-2">{c.brand.tagline}</span>
        </div>
        <p className="fine max-w-[64ch] text-ink-2">{c.footer.disclaimer}</p>
        <p className="fine text-ink-2">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
