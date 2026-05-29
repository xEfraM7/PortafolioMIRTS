# Portfolio Aurora Rebrand — Design Spec

**Date:** 2026-05-29
**Author:** Efrain Cabrera (collaborative session with Claude)
**Project:** PortafolioMIRTS
**Status:** Design — pending implementation plan

---

## 1. Goal

Refactor the existing React 18 + TypeScript + Vite portfolio to reposition Efrain Cabrera as a **Forward Deployment Engineer (FDE)** — the hybrid engineering/consulting role used by Palantir, Anthropic, OpenAI, Scale, Databricks. The visual language is **Cinematic Premium / Aurora Lab**: deep dark canvas, a mouse-tracked aurora orb, glass surfaces, magnetic CTAs, restrained mono metadata.

The current portfolio sells "Fullstack Developer" with a 5-section structure (NavBar, Banner, Skills carousel, Projects grid, Footer) on Bootstrap. The rebrand replaces both the **message** (FDE-first) and the **medium** (Tailwind + Framer Motion).

## 2. Non-goals

- Per-project case study pages (`/work/:slug`). Out of scope for v1.
- Blog or writing section.
- Analytics integration.
- CMS for content.
- Light theme / theme toggle.
- Dynamic OG images per project (one OG per language is enough).
- Backend / API / server-side anything.

## 3. Confirmed decisions

| # | Decision | Choice |
|---|---|---|
| 1 | Positioning | FDE puro (Palantir/AI-lab style) |
| 2 | Aesthetic | Cinematic Premium → concept Aurora Lab |
| 3 | Information architecture | Hero → About/Story → Selected Work (3 tiers) → Experience → Contact |
| 4 | UI framework | Migrate from Bootstrap → Tailwind CSS + custom components |
| 5 | Motion library | Add Framer Motion (~25KB gz) |
| 6 | i18n | Bilingual EN/ES with react-i18next + browser-language-detector |
| 7 | Selected Work tiers | T1: Supraca, Damasco, HIS · T2: Project R, Madbox, Contractor, Librarian · T3: Bill Generator, Journal |
| 8 | Contact CTA | Email (mailto) + Calendly + LinkedIn/GitHub. No form. |
| 9 | Typography | Geist Variable (display/body) + JetBrains Mono (labels/code). Centra fonts retired. |
| 10 | Custom cursor | Not in v1 |
| 11 | NDA | None — all 9 project screenshots can be shown |

## 4. Information architecture

Single-page, scroll-based:

1. **NavBar** (sticky) — Logo · Work · About · Contact · ES/EN toggle
2. **01 — Hero** — Status pill · main statement · subtitle · Aurora orb (mouse-tracked)
3. **02 — About / Story** — Narrative (3 paragraphs) · stats strip (years · projects · industries · live mobile apps)
4. **03 — Selected Work (Tier 1, 3 projects)** — Full-bleed glass card per project: client · year · role · sector · problem/solution/outcome · stack tags · screenshot · live link · case-study link (future)
5. **04 — More Work (Tier 2, 4 projects)** — 2×2 grid of medium cards: title · year · stack · 1–2 sentences
6. **05 — Archive (Tier 3, 2 projects)** — Inline compact list
7. **06 — Experience** — Vertical timeline: companies, roles, dates, key wins
8. **07 — Contact** — "Let's talk" statement · [Email me] · [Schedule a call] · [LinkedIn]
9. **Footer** — Logo · socials · © 2026

### Hero copy (draft, refined during implementation)

**EN**
> Forward Deployment Engineer.
> I ship production software where it's used — on-site with the teams that run the business.

**ES**
> Forward Deployment Engineer.
> Despliego software de producción donde se usa — junto a los equipos que mueven el negocio.

### About copy (draft)

> 3+ years building production systems for hospitality, real estate, healthcare, and logistics teams. Computer Engineering background. Transitioning into Forward Deployment — embedding directly with client teams to ship the systems they actually need, not the ones a spec assumed.
>
> Stack: React / Next.js / Node / Laravel / React Native. Mobile apps live on Google Play. Lead frontend architecture on multi-tenant SaaS.

### Stats strip (placeholder values, user confirms during Phase 4)

```
3+ years   ·   9 shipped projects   ·   5 industries   ·   2 live mobile apps
```

## 5. Visual system

### 5.1 Palette

**Base**
```
--bg-base        #07080F   deep navy-black
--bg-surface     #0E1019   cards, panels
--bg-elevated    #161927   modals, popovers
--border         #232636   hairlines
--border-strong  #2F3347   interactive borders
```

**Text**
```
--text-primary    #E8E9F1
--text-secondary  #9498A8
--text-tertiary   #5C6075
--text-mono       #B8BCD0
```

**Aurora accents**
```
--aurora-violet  #7C5CFF   primary accent
--aurora-teal    #2DD4BF   secondary accent
--aurora-pink    #F472B6   tertiary / hover glow
```

**Status**
```
--status-live    #34D399   pulsing dot
--status-warn    #FBBF24
--status-error   #F87171
```

### 5.2 Typography

| Use | Font | Notes |
|---|---|---|
| Display (h1, hero) | Geist Variable (700/600) | tracking -0.04em |
| Headings (h2–h4) | Geist Variable (600/500) | tracking -0.02em |
| Body | Geist Variable (400) | line-height 1.55 |
| Mono (labels, code, indices) | JetBrains Mono (400/500) | tracking -0.01em, uppercase for labels |

Self-hosted via `@fontsource-variable/geist` + `@fontsource/jetbrains-mono`. Centra `.ttf` files removed.

### 5.3 Motion principles

1. **Aurora orb** — radial gradient (violet → teal → transparent), `mix-blend-mode: screen`, mouse-tracked via Framer Motion `useSpring` with `stiffness: 50, damping: 20`, parallax on scroll. Hero only.
2. **Magnetic CTAs** — primary buttons attract cursor by ±8px within a 60px radius.
3. **Scroll-linked reveals** — each section animates `opacity 0 → 1` + `y 24px → 0` on `whileInView`, stagger 60ms between children.
4. **Glass surfaces** — Tier 1 cards: `backdrop-blur(20px)` + `bg-white/[0.02]` + `border-white/[0.06]`. Hover: violet border glow + 2px lift.
5. **Page entrance** — on load: nav fade-in (200ms) → hero stagger (text 400ms → orb 800ms).
6. **Reduced motion** — `prefers-reduced-motion: reduce` disables orb mouse-tracking, magnetic, parallax. Keeps opacity fades.

### 5.4 Surfaces — Tier 1 card layout

```
┌───────────────────────────────────────────────────┐
│  01 / FEATURED                          2024 / 25 │   mono label, top corners
│                                                   │
│  Supraca                                          │   Geist 48px
│  Real-time operations dashboard for a concrete    │   Geist 18px secondary
│  logistics company.                               │
│                                                   │
│  Role        Frontend lead                        │   mono label / Geist value rows
│  Stack       Next.js · Node · PostgreSQL          │
│  Outcome     Replaced 3 spreadsheets · 5 ops users│
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │  [ screenshot ]                             │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  [ Visit live ↗ ]   [ Read case study → ]         │
└───────────────────────────────────────────────────┘
  glass blur surface · violet border glow on hover
```

### 5.5 Layout grid

- Container max 1200px on desktop, 1440px in hero
- 12-col grid desktop, 8-col tablet, 4-col mobile
- Vertical rhythm: 8px baseline. Section spacing: 160px desktop / 96px mobile.

## 6. Component architecture

### 6.1 File structure

```
src/
├── main.tsx
├── App.tsx                          composition + providers
├── index.css                        Tailwind directives + base
│
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageToggle.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── SelectedWork.tsx
│   │   ├── MoreWork.tsx
│   │   ├── Archive.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── work/
│   │   ├── FeaturedProjectCard.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ArchiveItem.tsx
│   ├── primitives/
│   │   ├── AuroraOrb.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── StatusPill.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── GlassCard.tsx
│   │   └── RevealOnScroll.tsx
│   └── icons/                       inline SVG components
│
├── i18n/
│   ├── config.ts                    react-i18next init
│   ├── en.json
│   └── es.json
│
├── data/
│   ├── projects.ts                  9 typed projects + tier
│   ├── experience.ts                timeline
│   └── skills.ts                    grouped by category
│
├── lib/
│   ├── cn.ts                        clsx + tailwind-merge
│   ├── motion.ts                    Framer Motion variants
│   └── useMagnetic.ts
│
└── assets/
    ├── img/
    │   ├── projects/                existing screenshots
    │   ├── og/                      OG images
    │   └── portrait.jpg             optional
    └── icons/
```

### 6.2 Key types

```ts
type Tier = 1 | 2 | 3;

type Project = {
  id: string;
  client: string;          // "Supraca"
  year: string;            // "2024–2025"
  role: string;            // i18n key
  sector: string;          // "Logistics"
  problem: string;         // i18n key
  solution: string;        // i18n key
  outcome: string;         // i18n key (with metric if known)
  stack: string[];
  imgUrl: string;
  liveUrl?: string;
  caseStudyUrl?: string;   // reserved for future
  tier: Tier;
};

type ExperienceItem = {
  company: string;
  role: string;             // i18n key
  start: string;            // "2023-06"
  end?: string;             // omit = present
  wins: string[];           // i18n keys
};
```

### 6.3 Data flow

- All long copy (problem/solution/outcome/wins) is i18n keys — data files don't duplicate per language.
- Sections filter by tier: `projects.filter(p => p.tier === 1)`.
- Skills are NOT a section — they appear as inline stack tags inside project cards.
- `react-i18next` `useTranslation()` is the only translation surface.

### 6.4 Removals

- `src/components/Skills.tsx` (section eliminated)
- `src/components/ProjectCards.tsx` (replaced by 3 tier-specific cards)
- `src/helpers/iconsHelper.ts`, `src/helpers/responsiveHelper.ts` (no longer needed)
- `src/App.css` (replaced by `index.css` with `@tailwind` + tokens)
- Centra font files in `src/assets/font/`
- npm deps: `bootstrap`, `react-bootstrap`, `@popperjs/core`, `embla-carousel-react`, `embla-carousel-autoplay`

### 6.5 Retentions

- `lenis` smooth scroll (global, via `ReactLenis root`)
- `@react-spring/web` (compatibility for any animation already wired)
- Vite + TypeScript strict + ESLint flat config
- All project screenshots under `src/assets/img/projects/`

## 7. Tech setup

### 7.1 Final dependencies

**Add**
```
tailwindcss + autoprefixer + postcss
framer-motion
i18next + react-i18next + i18next-browser-languagedetector
@fontsource-variable/geist
@fontsource/jetbrains-mono
clsx + tailwind-merge
```

**Remove**
```
bootstrap, react-bootstrap, @popperjs/core
embla-carousel-react, embla-carousel-autoplay
```

**Keep**
```
react, react-dom, lenis, @react-spring/web
```

### 7.2 Tailwind config

- `tailwind.config.ts` declares design tokens (colors, fonts, spacing baseline 8px, radii)
- `darkMode: "class"` — dark is always on (no light theme)
- No `@tailwindcss/typography` plugin in v1 (no long-form prose yet)

### 7.3 Base CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-base: 7 8 15;
    --aurora-violet: 124 92 255;
    /* ... other tokens as RGB triples to allow Tailwind alpha syntax */
  }
  body {
    @apply bg-[rgb(var(--bg-base))] text-[rgb(var(--text-primary))] antialiased;
    font-family: 'Geist Variable', system-ui, sans-serif;
  }
  ::selection {
    @apply bg-[rgb(var(--aurora-violet))]/30 text-white;
  }
}
```

### 7.4 Framer Motion variants

```ts
// lib/motion.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
export const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};
```

Each section uses `motion.section` with `whileInView` + `viewport={{ once: true, margin: "-15%" }}`.

### 7.5 Performance budget

| Metric | Target |
|---|---|
| FCP (4G) | < 1.2s |
| LCP | < 2.5s |
| CLS | < 0.05 |
| Initial JS (gz) | < 140KB |
| Lighthouse Performance | ≥ 90 |

**Tactics**
- Convert project screenshots to WebP/AVIF, lazy-load (`loading="lazy"`, `decoding="async"`)
- `font-display: swap`, preload Geist Variable only
- Inline SVG icons (no icon-font dep)
- Aurora orb unmounts when out of hero viewport
- Code-split by section only if a section bundle exceeds 50KB (unlikely)

### 7.6 Accessibility (WCAG 2.2 AA)

- Contrast ≥ 4.5:1 (palette validated: `#9498A8` on `#07080F` passes)
- Focus visible: aurora-violet 2px outline on all interactives
- `prefers-reduced-motion: reduce` disables orb, magnetic, parallax
- `<html lang>` attribute updates on i18n change
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>` for case study cards, `<footer>`
- Skip-to-content link

### 7.7 SEO

- Per-language `<title>` and `<meta description>`, with `hreflang`
- Open Graph image 1200×630, one per language
- `<meta name="theme-color" content="#07080F">`
- JSON-LD `Person` schema with `jobTitle`, `sameAs` (LinkedIn, GitHub)
- `robots.txt` + `sitemap.xml`

## 8. Migration strategy

Branch: `refactor/aurora-rebrand` off `main`. Each phase ends with a green commit (`npm run lint` + `npm run build` both exit 0).

| Phase | Scope |
|---|---|
| **0** | Setup: branch, install Tailwind + Framer Motion + i18next stack + fonts. Create empty `lib/`, `i18n/`, `data/` scaffolding. Existing UI still renders. |
| **1** | Remove Bootstrap. Replace `App.css` with `index.css` (Tailwind + tokens). Empty styled shells for all sections. Uninstall Bootstrap/Embla deps. |
| **2** | NavBar + Footer + i18n base (nav + footer keys). LanguageToggle persists in localStorage. |
| **3** | Hero + AuroraOrb + StatusPill + MagneticButton. |
| **4** | About + Stats. |
| **5** | Selected Work (Tier 1, 3 projects). `FeaturedProjectCard`. |
| **6** | More Work (Tier 2, 4 projects) + Archive (Tier 3, 2 projects). |
| **7** | Experience timeline. |
| **8** | Contact section with email + Calendly + socials. |
| **9** | Polish: motion choreography end-to-end. a11y pass (axe DevTools, keyboard nav). Performance pass (Lighthouse on preview, image optimization). SEO metadata + OG + JSON-LD. Cross-browser smoke test. Update `CLAUDE.md`. |

### Rollback

`main` stays intact throughout. Any phase can be the truncation point — the branch is mergeable at any green commit.

## 9. Verification (Definition of Done)

Per `CLAUDE.md`:

1. `npm run lint` exits 0
2. `npm run build` exits 0 (includes `tsc -b`)
3. `npm run dev` validated manually in browser — golden path + edge cases, no regressions
4. No `console.log`, dead code, unresolved `TODO`, unused imports
5. YAGNI / KISS / SOLID / DRY respected
6. `CLAUDE.md` updated to reflect: new file structure under `src/`, new dependencies, new section list, retired components

Additional gates:
- Lighthouse on `npm run preview` hits all targets in §7.5
- Both EN and ES copies render correctly with `<html lang>` updating
- `prefers-reduced-motion: reduce` validated in DevTools

## 10. Risks & mitigations

1. **Motion overload** (aurora + magnetic + reveals can feel busy). *Mitigation:* implement in order orb → reveals → magnetic; in Phase 9 cut anything that feels like noise.
2. **`mix-blend-mode: screen` quirks on older Safari iOS.** *Mitigation:* `@supports` fallback to plain `opacity`.
3. **Font weight.** Geist Variable ~50KB + JetBrains Mono ~30KB. *Mitigation:* `font-display: swap`, preload Geist only.
4. **i18next + detector ~17KB gz.** *Mitigation:* measure final bundle in Phase 9; only revisit if budget overrun.
5. **Empty testimonials weaken Contact.** *Mitigation:* none added in v1; CTA-only section.

## 11. Data still needed from user (collected during implementation)

| Phase | Item |
|---|---|
| 4 | Portrait 800×800 (optional). Confirm stats values: years, project count, sector count, mobile apps live count. |
| 5 | For Supraca, Damasco, HIS — one-line problem + one-line solution + one-line outcome (with metric if available), EN + ES. |
| 6 | For Project R, Madbox, Contractor, Librarian — one-line outcome each, EN + ES. |
| 7 | Experience entries: company, role, year start–end, key wins (EN + ES keys). |
| 8 | Calendly URL. |
| 9 | OG image captured from final hero (1200×630), one per language. |

## 12. Open items deferred to future versions

- Individual case-study pages at `/work/:slug`
- Blog / writing
- Analytics
- Testimonials section (when real testimonials exist)
- CMS (only if copy volume grows past JSON manageability)
