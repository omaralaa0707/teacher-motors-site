# Teacher Motors — site 21 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Teacher Motors, and not an official site.**

- **Live:** https://teacher-motors-site.vercel.app
- **Repo:** [teacher-motors-site](https://github.com/omaralaa0707/teacher-motors-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: A ledger, not a showroom: paper #F2EFE8, ink #17171A, and one brass-gold rule (#75581A for text, #C79A3E for fills) reserved strictly for financial terms — never a car, a badge or a mood, because they publish no consistent brand colour of their own

**Type pairing**
: Fraunces + IBM Plex Sans / Aref Ruqaa + IBM Plex Sans Arabic (AR)

**3D / signature technique**
: **The audience**: one million real GPU points, one per Instagram follower — not a sample or a stylised crowd, a buffer that genuinely holds 1,000,000 vertices. A `uKeep` uniform culls by a stable per-point random, so a toggle switching to K.auto's 22K or Auto Hub's 104 physically thins the field rather than relabelling it: 104 followers renders as a hundred-odd specks on an empty plate next to the million

**Motion language**
: The post — a ledger entry lands low and dim, then snaps to full value in one short step; nothing fades, nothing overshoots

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/teachermotorss/
- Facebook: https://www.facebook.com/TeacherMotors/
- Google Maps: https://www.google.com/maps/place/Teacher+Motors/data=!4m2!3m1!1s0x0:0x4a3e6c5ecffec70e

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
