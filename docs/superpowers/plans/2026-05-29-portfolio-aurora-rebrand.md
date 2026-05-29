# Portfolio Aurora Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the React 18 + TypeScript + Vite portfolio into the Aurora Lab cinematic-premium concept that repositions the owner as a Forward Deployment Engineer, on Tailwind + Framer Motion with bilingual EN/ES via react-i18next.

**Architecture:** Single-page scroll-based site composed of typed sections (Hero, About, SelectedWork, MoreWork, Archive, Experience, Contact). All visual primitives live in `components/primitives/`. All copy lives in `i18n/en.json` and `i18n/es.json` and is read via `useTranslation()`. Projects/experience are static typed data in `src/data/`. Motion is centralized in `lib/motion.ts` with `prefers-reduced-motion` honored throughout.

**Tech Stack:** React 18, TypeScript 5.5 (strict), Vite 5, Tailwind CSS 3, Framer Motion, lenis (kept), @react-spring/web (kept), react-i18next + i18next-browser-languagedetector, @fontsource-variable/geist, @fontsource/jetbrains-mono.

**Verification model:** This project has no unit-test framework configured (per `package.json`). The Definition of Done in `CLAUDE.md` is `npm run lint` exit 0 + `npm run build` exit 0 + manual browser verification on `npm run dev`. The plan honors that: every task ends with lint + build + targeted smoke checks. We do not add Vitest/Jest in this refactor (out of scope, would require user approval per CLAUDE.md).

**Source spec:** `docs/superpowers/specs/2026-05-29-portfolio-aurora-rebrand-design.md`

**Branch:** `refactor/aurora-rebrand` off `main`.

---

## Pre-flight: branch + clean state

- [ ] **Step 1: Verify clean working tree**

Run: `git status --short`
Expected: empty output (or only the existing untracked `.playwright-mcp/` deletions noted in CLAUDE.md context — those are not blockers).

- [ ] **Step 2: Create and switch to the rebrand branch**

Run: `git checkout -b refactor/aurora-rebrand`
Expected: `Switched to a new branch 'refactor/aurora-rebrand'`

- [ ] **Step 3: Confirm baseline build passes**

Run: `npm run lint`
Expected: exit 0, no errors.

Run: `npm run build`
Expected: exit 0, `dist/` produced.

If either fails, STOP and fix on `main` first.

---

## Task 0: Install dependencies and scaffold empty support folders

**Files:**
- Modify: `package.json` (deps via npm install)
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/lib/cn.ts`
- Create: `src/lib/motion.ts`
- Create: `src/i18n/config.ts`
- Create: `src/i18n/en.json` (empty `{}`)
- Create: `src/i18n/es.json` (empty `{}`)
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`

This task installs all new dependencies and scaffolds the empty support files. The app continues to render with Bootstrap until Task 1.

- [ ] **Step 1: Add Tailwind + PostCSS**

Run: `npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0`
Expected: dependencies installed, no peer warnings beyond benign ones.

- [ ] **Step 2: Add Framer Motion**

Run: `npm install framer-motion@^11.0.0`
Expected: installed.

- [ ] **Step 3: Add i18next stack**

Run: `npm install i18next@^23.0.0 react-i18next@^14.0.0 i18next-browser-languagedetector@^7.0.0`
Expected: installed.

- [ ] **Step 4: Add font sources**

Run: `npm install @fontsource-variable/geist@^5.0.0 @fontsource/jetbrains-mono@^5.0.0`
Expected: installed.

- [ ] **Step 5: Add class-name helpers**

Run: `npm install clsx@^2.0.0 tailwind-merge@^2.0.0`
Expected: installed.

- [ ] **Step 6: Initialize Tailwind config**

Create file `tailwind.config.ts` with the design tokens from the spec §5.1, §5.2, §5.5:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          base: "rgb(var(--bg-base) / <alpha-value>)",
          surface: "rgb(var(--bg-surface) / <alpha-value>)",
          elevated: "rgb(var(--bg-elevated) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--text-tertiary) / <alpha-value>)",
          mono: "rgb(var(--text-mono) / <alpha-value>)",
        },
        aurora: {
          violet: "rgb(var(--aurora-violet) / <alpha-value>)",
          teal: "rgb(var(--aurora-teal) / <alpha-value>)",
          pink: "rgb(var(--aurora-pink) / <alpha-value>)",
        },
        status: {
          live: "rgb(var(--status-live) / <alpha-value>)",
          warn: "rgb(var(--status-warn) / <alpha-value>)",
          error: "rgb(var(--status-error) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ['"Geist Variable"', "system-ui", "sans-serif"],
        sans: ['"Geist Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      maxWidth: {
        container: "1200px",
        hero: "1440px",
      },
      spacing: {
        "section-y": "10rem",
        "section-y-sm": "6rem",
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Create PostCSS config**

Create file `postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 8: Create `src/lib/cn.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

- [ ] **Step 9: Create `src/lib/motion.ts`**

```ts
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const sectionViewport = { once: true, margin: "-15% 0px -15% 0px" } as const;
```

- [ ] **Step 10: Create `src/i18n/config.ts`**

```ts
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import es from "./es.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;
```

- [ ] **Step 11: Create empty translation files**

Create `src/i18n/en.json`:
```json
{}
```

Create `src/i18n/es.json`:
```json
{}
```

We will fill these in subsequent tasks as sections come online.

- [ ] **Step 12: Create typed project data**

Create `src/data/projects.ts`. This file copies the screenshot imports from the current `helpers/projectsHelper.ts` (Task 1 will retire that helper), reshapes each project into the new `Project` type with a tier, and uses i18n keys for long copy:

```ts
import journalImg from "../assets/img/projects/journal-app.png";
import hisCapture from "../assets/img/projects/hisCapture.jpg";
import damasco from "../assets/img/projects/damasco.jpg";
import librarianCollectorCapture from "../assets/img/projects/librarianCollectorCaptura.jpg";
import projectRCapture from "../assets/img/projects/projectR.jpg";
import billGenerator from "../assets/img/projects/billGenerator.png";
import concrete from "../assets/img/projects/concrete.png";
import madbox from "../assets/img/projects/madbox.png";
import contractor from "../assets/img/projects/contractor.png";

export type Tier = 1 | 2 | 3;

export type Project = {
  id: string;
  client: string;
  year: string;
  sector: string;
  // i18n keys (resolved at render via t())
  roleKey: string;
  problemKey: string;
  solutionKey: string;
  outcomeKey: string;
  stack: string[];
  imgUrl: string;
  liveUrl?: string;
  tier: Tier;
};

export const projects: Project[] = [
  {
    id: "supraca",
    client: "Supraca",
    year: "2024–2025",
    sector: "Logistics",
    roleKey: "projects.supraca.role",
    problemKey: "projects.supraca.problem",
    solutionKey: "projects.supraca.solution",
    outcomeKey: "projects.supraca.outcome",
    stack: ["Next.js", "Node", "PostgreSQL"],
    imgUrl: concrete,
    liveUrl: "https://supraca.vercel.app/dashboard",
    tier: 1,
  },
  {
    id: "damasco",
    client: "Café Damasco",
    year: "2024",
    sector: "Hospitality",
    roleKey: "projects.damasco.role",
    problemKey: "projects.damasco.problem",
    solutionKey: "projects.damasco.solution",
    outcomeKey: "projects.damasco.outcome",
    stack: ["Next.js", "Tailwind"],
    imgUrl: damasco,
    liveUrl: "https://www.damascocafe.com",
    tier: 1,
  },
  {
    id: "his",
    client: "Hospital Information System",
    year: "2023",
    sector: "Healthcare",
    roleKey: "projects.his.role",
    problemKey: "projects.his.problem",
    solutionKey: "projects.his.solution",
    outcomeKey: "projects.his.outcome",
    stack: ["React", "TypeScript", "REST"],
    imgUrl: hisCapture,
    tier: 1,
  },
  {
    id: "project-r",
    client: "Project R (CodeInTheWeb)",
    year: "2024",
    sector: "Restaurant SaaS",
    roleKey: "projects.projectR.role",
    problemKey: "projects.projectR.problem",
    solutionKey: "projects.projectR.solution",
    outcomeKey: "projects.projectR.outcome",
    stack: ["Next.js", "SSR", "Node"],
    imgUrl: projectRCapture,
    liveUrl: "https://ssr-project-r.vercel.app/home",
    tier: 2,
  },
  {
    id: "madbox",
    client: "Madbox",
    year: "2024",
    sector: "Internal tools",
    roleKey: "projects.madbox.role",
    problemKey: "projects.madbox.problem",
    solutionKey: "projects.madbox.solution",
    outcomeKey: "projects.madbox.outcome",
    stack: ["React", "TypeScript"],
    imgUrl: madbox,
    liveUrl: "https://madbox-lac.vercel.app/dashboard",
    tier: 2,
  },
  {
    id: "contractor",
    client: "Contractor Supplai",
    year: "2024",
    sector: "Operations",
    roleKey: "projects.contractor.role",
    problemKey: "projects.contractor.problem",
    solutionKey: "projects.contractor.solution",
    outcomeKey: "projects.contractor.outcome",
    stack: ["React", "TypeScript"],
    imgUrl: contractor,
    liveUrl: "https://contractor-supplai.vercel.app/overview",
    tier: 2,
  },
  {
    id: "librarian",
    client: "Librarian Collector",
    year: "2023",
    sector: "Education",
    roleKey: "projects.librarian.role",
    problemKey: "projects.librarian.problem",
    solutionKey: "projects.librarian.solution",
    outcomeKey: "projects.librarian.outcome",
    stack: ["React", "Auth"],
    imgUrl: librarianCollectorCapture,
    tier: 2,
  },
  {
    id: "bill-generator",
    client: "Bill Generator",
    year: "2023",
    sector: "Personal",
    roleKey: "projects.billGenerator.role",
    problemKey: "projects.billGenerator.problem",
    solutionKey: "projects.billGenerator.solution",
    outcomeKey: "projects.billGenerator.outcome",
    stack: ["React"],
    imgUrl: billGenerator,
    liveUrl: "https://billgenerator-xefram7s-projects.vercel.app/",
    tier: 3,
  },
  {
    id: "journal",
    client: "Journal App",
    year: "2022",
    sector: "Personal",
    roleKey: "projects.journal.role",
    problemKey: "projects.journal.problem",
    solutionKey: "projects.journal.solution",
    outcomeKey: "projects.journal.outcome",
    stack: ["React", "Redux", "Firebase"],
    imgUrl: journalImg,
    liveUrl: "https://journal-k9ogsanjj-xefram7.vercel.app",
    tier: 3,
  },
];

export const projectsByTier = (tier: Tier): Project[] =>
  projects.filter((p) => p.tier === tier);
```

- [ ] **Step 13: Create typed experience data**

Create `src/data/experience.ts` with structure ready for content. We will collect real entries during Task 7.

```ts
export type ExperienceItem = {
  id: string;
  company: string;
  start: string; // "YYYY-MM"
  end?: string;  // omit = present
  roleKey: string;
  winsKeys: string[];
};

export const experience: ExperienceItem[] = [
  // Filled during Task 7 with real entries
];
```

- [ ] **Step 14: Verify lint + build still pass with new scaffolding**

Run: `npm run lint`
Expected: exit 0.

Run: `npm run build`
Expected: exit 0.

If the build complains about the unused `motion.ts` exports or empty `experience.ts`, those exports get consumed in later tasks — TypeScript's `noUnusedLocals` only flags within a file, not exports. If `noUnusedLocals` fires on a file-level unused symbol, add a `// eslint-disable-next-line` comment is **forbidden** by CLAUDE.md — instead, remove the file and re-create it in the task where it gets used.

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json tailwind.config.ts postcss.config.js src/lib/ src/i18n/ src/data/
git commit -m "chore: scaffold Tailwind, Framer Motion, i18next, fonts, data types

Adds Tailwind 3 + PostCSS, Framer Motion, react-i18next stack, Geist + JetBrains Mono
font sources, clsx + tailwind-merge. Adds empty support folders src/lib/, src/i18n/,
src/data/ with typed scaffolding for projects and experience. Existing Bootstrap UI
remains intact and rendering — no behavior change yet."
```

---

## Task 1: Replace Bootstrap with Tailwind base, gut old UI to empty styled shells

**Files:**
- Create: `src/index.css` (replaces `App.css`)
- Delete: `src/App.css`
- Modify: `src/main.tsx` (import `index.css`, import `i18n/config`)
- Modify: `src/App.tsx` (remove Bootstrap import, remove old sections, add empty placeholders)
- Modify: `src/components/NavBar.tsx`, `Banner.tsx`, `Skills.tsx`, `Projects.tsx`, `ProjectCards.tsx`, `Footer.tsx` — these will be deleted in later tasks, but for now we make them stop importing react-bootstrap so the build passes after Bootstrap is removed
- Delete: `src/assets/font/` (Centra files)
- Uninstall deps: `bootstrap`, `react-bootstrap`, `@popperjs/core`, `embla-carousel-react`, `embla-carousel-autoplay`

The end state of this task: app boots on Tailwind, dark canvas visible, every section temporarily shows a placeholder label. No Bootstrap remains.

- [ ] **Step 1: Create new `src/index.css`**

Replace the entire contents (the file currently exists with reset styles — overwrite it):

```css
@import "@fontsource-variable/geist";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-base: 7 8 15;
    --bg-surface: 14 16 25;
    --bg-elevated: 22 25 39;
    --border: 35 38 54;
    --border-strong: 47 51 71;

    --text-primary: 232 233 241;
    --text-secondary: 148 152 168;
    --text-tertiary: 92 96 117;
    --text-mono: 184 188 208;

    --aurora-violet: 124 92 255;
    --aurora-teal: 45 212 191;
    --aurora-pink: 244 114 182;

    --status-live: 52 211 153;
    --status-warn: 251 191 36;
    --status-error: 248 113 113;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
  }

  html,
  body,
  #root {
    background-color: rgb(var(--bg-base));
    color: rgb(var(--text-primary));
  }

  body {
    @apply font-sans antialiased;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: rgb(var(--aurora-violet) / 0.3);
    color: white;
  }

  *:focus-visible {
    outline: 2px solid rgb(var(--aurora-violet));
    outline-offset: 2px;
    border-radius: 4px;
  }
}

@layer utilities {
  .container-page {
    @apply mx-auto w-full max-w-container px-6 sm:px-8 lg:px-12;
  }

  .container-hero {
    @apply mx-auto w-full max-w-hero px-6 sm:px-8 lg:px-12;
  }

  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 2: Delete `src/App.css`**

Run: `rm src/App.css`

- [ ] **Step 3: Update `src/main.tsx`**

Read the current `main.tsx` and replace its imports/body so it loads `index.css` and the i18n config. Replace the entire file:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/config";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

(If the current `main.tsx` differs structurally, preserve any other side-effect imports it has; the above is the target.)

- [ ] **Step 4: Replace `src/App.tsx` with empty shell**

```tsx
import { ReactLenis } from "lenis/react";

export const App = () => {
  return (
    <ReactLenis root options={{ anchors: true }}>
      <div className="min-h-screen bg-bg-base text-text-primary">
        <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur">
          <div className="container-hero flex h-16 items-center justify-between">
            <span className="font-mono text-sm text-text-tertiary">[ navbar placeholder ]</span>
          </div>
        </header>
        <main>
          <section id="hero" className="container-hero py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">01 — hero (placeholder)</p>
          </section>
          <section id="about" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">02 — about (placeholder)</p>
          </section>
          <section id="work" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">03 — selected work (placeholder)</p>
          </section>
          <section id="more-work" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">04 — more work (placeholder)</p>
          </section>
          <section id="archive" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">05 — archive (placeholder)</p>
          </section>
          <section id="experience" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">06 — experience (placeholder)</p>
          </section>
          <section id="contact" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">07 — contact (placeholder)</p>
          </section>
        </main>
        <footer className="border-t border-border/40">
          <div className="container-page py-10">
            <p className="font-mono text-xs text-text-tertiary">[ footer placeholder ]</p>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
};
```

- [ ] **Step 5: Delete the old Bootstrap-dependent components**

Run:
```bash
rm src/components/NavBar.tsx src/components/Banner.tsx src/components/Skills.tsx src/components/Projects.tsx src/components/ProjectCards.tsx src/components/Footer.tsx
rm src/helpers/iconsHelper.ts src/helpers/projectsHelper.ts src/helpers/responsiveHelper.ts
rm -rf src/helpers
rm -rf src/assets/font
```

- [ ] **Step 6: Uninstall retired dependencies**

Run: `npm uninstall bootstrap react-bootstrap @popperjs/core embla-carousel-react embla-carousel-autoplay`
Expected: clean uninstall.

- [ ] **Step 7: Verify lint + build**

Run: `npm run lint`
Expected: exit 0.

Run: `npm run build`
Expected: exit 0, smaller `dist/` than before (Bootstrap CSS is gone).

If TypeScript complains about deleted helpers being imported anywhere, grep and remove the dangling imports:
Run: `npx tsc --noEmit` to confirm.

- [ ] **Step 8: Smoke test in dev**

Run: `npm run dev`
Open the printed URL (e.g. http://localhost:5173).
Expected: deep-navy background, 7 placeholder labels stacked vertically, mono font visible, smooth scroll works.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "refactor: replace Bootstrap with Tailwind base, gut UI to empty shells

Removes bootstrap, react-bootstrap, @popperjs/core, embla-carousel deps.
Removes Centra fonts and all current components/helpers. Adds new index.css
with Tailwind directives, design tokens (aurora palette, deep dark bg, mono),
and base typography. App.tsx now renders empty styled section placeholders.
Lenis smooth scroll preserved."
```

---

## Task 2: NavBar, Footer, LanguageToggle, i18n base copy

**Files:**
- Create: `src/components/layout/NavBar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/LanguageToggle.tsx`
- Create: `src/components/primitives/MagneticButton.tsx`
- Create: `src/components/icons/Logo.tsx`
- Create: `src/components/icons/SocialIcons.tsx`
- Modify: `src/i18n/en.json`, `src/i18n/es.json` (nav + footer keys)
- Modify: `src/App.tsx` (mount NavBar, Footer; update `<html lang>` from i18n)
- Modify: `index.html` (set initial `lang="en"`, add description)

End state: real NavBar appears with brand, links, EN/ES toggle, magnetic CTA. Footer at the bottom shows logo + socials + © year. Switching language updates labels and persists in localStorage.

- [ ] **Step 1: Add base translations**

Replace `src/i18n/en.json`:
```json
{
  "nav": {
    "work": "Work",
    "about": "About",
    "contact": "Contact",
    "cta": "Let's talk"
  },
  "footer": {
    "rights": "All rights reserved.",
    "built": "Designed and built by Efrain Cabrera."
  }
}
```

Replace `src/i18n/es.json`:
```json
{
  "nav": {
    "work": "Proyectos",
    "about": "Sobre mí",
    "contact": "Contacto",
    "cta": "Conversemos"
  },
  "footer": {
    "rights": "Todos los derechos reservados.",
    "built": "Diseñado y desarrollado por Efrain Cabrera."
  }
}
```

- [ ] **Step 2: Create `src/components/icons/Logo.tsx`**

```tsx
type Props = { className?: string };

export const Logo = ({ className }: Props) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M11 10h10M11 16h7M11 22h10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
```

- [ ] **Step 3: Create `src/components/icons/SocialIcons.tsx`**

Inline SVG components for LinkedIn, GitHub, Twitter, Instagram. One file, four exports:

```tsx
type Props = { className?: string };

export const LinkedInIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5ZM8 19H5V8h3v11Zm-1.5-12.3a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM20 19h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.77c1.4-2.59 7-2.78 7 2.48V19Z"/>
  </svg>
);

export const GitHubIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.4 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.8.2 3.1.1 3.4.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0Z"/>
  </svg>
);

export const TwitterIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2H21l-6.51 7.43L22 22h-6.768l-4.733-6.18L4.99 22H2.232l6.97-7.95L2 2h6.91l4.276 5.65L18.244 2Zm-2.37 18h1.876L7.224 4H5.21l10.664 16Z"/>
  </svg>
);

export const InstagramIcon = ({ className }: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41.55.21.95.47 1.36.88.41.41.67.81.88 1.36.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.21.55-.47.95-.88 1.36a3.68 3.68 0 0 1-1.36.88c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.68 3.68 0 0 1-1.36-.88 3.68 3.68 0 0 1-.88-1.36c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.21-.55.47-.95.88-1.36.41-.41.81-.67 1.36-.88.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33 0 7.05.07 5.78.13 4.9.32 4.14.62a5.84 5.84 0 0 0-2.12 1.4A5.84 5.84 0 0 0 .62 4.14C.32 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s0 3.67.07 4.95c.06 1.27.25 2.15.55 2.91.31.79.73 1.46 1.4 2.12.66.67 1.33 1.09 2.12 1.4.76.3 1.64.49 2.91.55C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c1.27-.06 2.15-.25 2.91-.55a5.84 5.84 0 0 0 2.12-1.4 5.84 5.84 0 0 0 1.4-2.12c.3-.76.49-1.64.55-2.91.06-1.28.07-1.69.07-4.95s0-3.67-.07-4.95c-.06-1.27-.25-2.15-.55-2.91a5.84 5.84 0 0 0-1.4-2.12 5.84 5.84 0 0 0-2.12-1.4c-.76-.3-1.64-.49-2.91-.55C15.67 0 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.17 6.17 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z"/>
  </svg>
);
```

- [ ] **Step 4: Create `src/components/primitives/MagneticButton.tsx`**

```tsx
import { useRef, type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: "button";
  };

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: "a";
    href: string;
  };

type Props = ButtonProps | AnchorProps;

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium tracking-tight transition-colors";

const variantClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-text-primary text-bg-base hover:bg-white",
  secondary:
    "border border-border-strong text-text-primary hover:border-aurora-violet hover:text-aurora-violet",
  ghost:
    "text-text-secondary hover:text-text-primary",
};

export const MagneticButton = (props: Props) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    x.set(Math.max(-8, Math.min(8, dx)));
    y.set(Math.max(-8, Math.min(8, dy)));
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { children, className, variant = "primary" } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (props.as === "a") {
    const { as: _a, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={classes}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  const { as: _a, variant: _v, className: _c, children: _ch, ...rest } = props as ButtonProps;
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={classes}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
```

- [ ] **Step 5: Create `src/components/layout/LanguageToggle.tsx`**

```tsx
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/cn";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === "es" ? "es" : "en";

  const setLang = (l: "en" | "es") => {
    void i18n.changeLanguage(l);
    document.documentElement.lang = l;
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-1 rounded-pill border border-border px-1 py-1 font-mono text-xs uppercase"
    >
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-pill px-2 py-0.5 transition-colors",
            lang === l
              ? "bg-text-primary text-bg-base"
              : "text-text-tertiary hover:text-text-primary"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
};
```

- [ ] **Step 6: Create `src/components/layout/NavBar.tsx`**

```tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { Logo } from "../icons/Logo";
import { LanguageToggle } from "./LanguageToggle";
import { MagneticButton } from "../primitives/MagneticButton";

const links = [
  { id: "work", labelKey: "nav.work", href: "#work" },
  { id: "about", labelKey: "nav.about", href: "#about" },
  { id: "contact", labelKey: "nav.contact", href: "#contact" },
];

export const NavBar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled
          ? "border-b border-border/60 bg-bg-base/80 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-hero flex h-16 items-center justify-between">
        <a href="#hero" aria-label="Home" className="flex items-center gap-2 text-text-primary">
          <Logo className="h-7 w-7" />
          <span className="font-mono text-sm tracking-tight">efrain.cabrera</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className="rounded-pill px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {t(l.labelKey)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <MagneticButton as="a" href="#contact" variant="primary" className="hidden md:inline-flex">
            {t("nav.cta")}
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
};
```

- [ ] **Step 7: Create `src/components/layout/Footer.tsx`**

```tsx
import { useTranslation } from "react-i18next";
import { Logo } from "../icons/Logo";
import { LinkedInIcon, GitHubIcon, TwitterIcon, InstagramIcon } from "../icons/SocialIcons";

const socials = [
  { href: "https://www.linkedin.com/in/efrain-cabrera-b25489216/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://github.com/xEfraM7", label: "GitHub", Icon: GitHubIcon },
  { href: "https://twitter.com/xEfraCD", label: "Twitter", Icon: TwitterIcon },
  { href: "https://www.instagram.com/efrain_lol/", label: "Instagram", Icon: InstagramIcon },
];

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-text-secondary">
          <Logo className="h-6 w-6" />
          <span className="font-mono text-xs">© {year} · {t("footer.rights")}</span>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:border-aurora-violet hover:text-aurora-violet"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <p className="container-page pb-8 font-mono text-[11px] text-text-tertiary">{t("footer.built")}</p>
    </footer>
  );
};
```

- [ ] **Step 8: Mount NavBar and Footer in `src/App.tsx`**

Replace `App.tsx` contents:

```tsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ReactLenis } from "lenis/react";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";

export const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? "en";
  }, [i18n.resolvedLanguage]);

  return (
    <ReactLenis root options={{ anchors: true }}>
      <NavBar />
      <main className="pt-16">
        <section id="hero" className="container-hero py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">01 — hero</p>
        </section>
        <section id="about" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">02 — about</p>
        </section>
        <section id="work" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">03 — selected work</p>
        </section>
        <section id="more-work" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">04 — more work</p>
        </section>
        <section id="archive" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">05 — archive</p>
        </section>
        <section id="experience" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">06 — experience</p>
        </section>
        <section id="contact" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">07 — contact</p>
        </section>
      </main>
      <Footer />
    </ReactLenis>
  );
};
```

- [ ] **Step 9: Update `index.html`** — set lang and description.

Open `index.html`. Confirm `<html lang="en">` is set. Update or add `<meta name="description" content="Efrain Cabrera — Forward Deployment Engineer. Production software shipped on-site with the teams that run the business." />` in `<head>`.

- [ ] **Step 10: Verify**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run dev`. In the browser:
- NavBar fixed at top with logo + 3 links + EN/ES toggle + "Let's talk" button on desktop.
- Clicking EN/ES switches the labels and persists across reloads.
- Footer at the bottom with logo, social icons (LinkedIn/GitHub/Twitter/Instagram), year.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: NavBar, Footer, language toggle, magnetic CTA primitive

Adds layout components NavBar (sticky, blur on scroll), Footer (logo, socials,
year), LanguageToggle (EN/ES, localStorage-persisted), and MagneticButton
primitive (Framer Motion spring, prefers-reduced-motion aware). Adds base
nav/footer translations in en.json/es.json. Lang attribute on <html> updates
on toggle."
```

---

## Task 3: Hero section with AuroraOrb, StatusPill, hero copy

**Files:**
- Create: `src/components/primitives/StatusPill.tsx`
- Create: `src/components/primitives/AuroraOrb.tsx`
- Create: `src/components/primitives/SectionHeader.tsx`
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/i18n/en.json`, `src/i18n/es.json` (hero keys)
- Modify: `src/App.tsx` (replace hero placeholder with `<Hero />`)

End state: hero renders the FDE headline, status pill, paragraph, scroll cue, and the aurora orb tracks the cursor smoothly inside the hero viewport. `prefers-reduced-motion` disables tracking but still shows the orb stationary.

- [ ] **Step 1: Add hero translations**

Merge into `src/i18n/en.json` (preserve existing keys):
```json
{
  "nav": { "work": "Work", "about": "About", "contact": "Contact", "cta": "Let's talk" },
  "footer": { "rights": "All rights reserved.", "built": "Designed and built by Efrain Cabrera." },
  "hero": {
    "status": "Available for FDE engagements",
    "title": "Forward Deployment Engineer.",
    "subtitle": "I ship production software where it's used — on-site with the teams that run the business.",
    "primaryCta": "See selected work",
    "secondaryCta": "Read about me",
    "scrollCue": "scroll"
  }
}
```

Merge into `src/i18n/es.json`:
```json
{
  "nav": { "work": "Proyectos", "about": "Sobre mí", "contact": "Contacto", "cta": "Conversemos" },
  "footer": { "rights": "Todos los derechos reservados.", "built": "Diseñado y desarrollado por Efrain Cabrera." },
  "hero": {
    "status": "Disponible para proyectos FDE",
    "title": "Forward Deployment Engineer.",
    "subtitle": "Despliego software de producción donde se usa — junto a los equipos que mueven el negocio.",
    "primaryCta": "Ver proyectos destacados",
    "secondaryCta": "Sobre mí",
    "scrollCue": "scroll"
  }
}
```

- [ ] **Step 2: Create `StatusPill`**

`src/components/primitives/StatusPill.tsx`:
```tsx
import { motion } from "framer-motion";

type Props = { label: string };

export const StatusPill = ({ label }: Props) => (
  <div className="inline-flex items-center gap-2 rounded-pill border border-border bg-bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-tight text-text-mono backdrop-blur">
    <span className="relative inline-flex h-2 w-2">
      <motion.span
        className="absolute inset-0 rounded-full bg-status-live"
        animate={{ opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-status-live" />
    </span>
    <span>{label}</span>
  </div>
);
```

- [ ] **Step 3: Create `SectionHeader`**

`src/components/primitives/SectionHeader.tsx`:
```tsx
type Props = {
  index: string;     // "01"
  label: string;     // "SELECTED WORK"
  meta?: string;     // "2024 / 2025"
};

export const SectionHeader = ({ index, label, meta }: Props) => (
  <div className="flex items-baseline justify-between border-b border-border/60 pb-3 font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
    <span>
      <span className="text-text-secondary">{index}</span>
      <span className="mx-2 text-text-tertiary">/</span>
      <span className="text-text-primary">{label}</span>
    </span>
    {meta ? <span>{meta}</span> : null}
  </div>
);
```

- [ ] **Step 4: Create `AuroraOrb`**

`src/components/primitives/AuroraOrb.tsx`:
```tsx
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = { className?: string };

export const AuroraOrb = ({ className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 50, damping: 20, mass: 1.2 });
  const sy = useSpring(y, { stiffness: 50, damping: 20, mass: 1.2 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.3);
      y.set((e.clientY - cy) * 0.3);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, x, y]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 overflow-hidden"}
    >
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
      >
        <div
          className="h-full w-full rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgb(var(--aurora-violet) / 0.7), transparent 55%), radial-gradient(circle at 70% 70%, rgb(var(--aurora-teal) / 0.55), transparent 60%), radial-gradient(circle at 60% 30%, rgb(var(--aurora-pink) / 0.35), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </div>
  );
};
```

- [ ] **Step 5: Create `Hero` section**

`src/components/sections/Hero.tsx`:
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AuroraOrb } from "../primitives/AuroraOrb";
import { StatusPill } from "../primitives/StatusPill";
import { MagneticButton } from "../primitives/MagneticButton";
import { fadeUp, stagger } from "../../lib/motion";

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-32 pb-section-y-sm sm:pt-40"
      aria-label="Intro"
    >
      <AuroraOrb />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container-hero relative flex flex-col items-start gap-8"
      >
        <motion.div variants={fadeUp}>
          <StatusPill label={t("hero.status")} />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="max-w-[18ch] text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-text-primary sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-[58ch] text-balance text-lg leading-relaxed text-text-secondary sm:text-xl"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
          <MagneticButton as="a" href="#work" variant="primary">
            {t("hero.primaryCta")} <span aria-hidden="true">→</span>
          </MagneticButton>
          <MagneticButton as="a" href="#about" variant="secondary">
            {t("hero.secondaryCta")}
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-tighter text-text-tertiary"
        >
          <span>{t("hero.scrollCue")}</span>
          <span aria-hidden="true">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
```

- [ ] **Step 6: Mount `<Hero />` in `App.tsx`**

Replace the hero `<section>` placeholder block with:
```tsx
<Hero />
```
And add the import at the top:
```tsx
import { Hero } from "./components/sections/Hero";
```

- [ ] **Step 7: Verify**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run dev`. In browser:
- Hero shows status pill with green pulsing dot.
- Headline + paragraph render in Geist.
- Two CTAs visible: primary white-fill, secondary outlined.
- Aurora orb visible behind text; moving the cursor inside hero softly displaces the orb.
- DevTools → Rendering → Emulate prefers-reduced-motion: orb stops tracking, content still readable.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: hero section with aurora orb, status pill, magnetic CTAs

Implements section 01 of the rebrand. Adds primitives AuroraOrb (cursor-tracked
radial gradient, blur+screen blend, reduced-motion aware), StatusPill (pulsing
live dot), SectionHeader (mono index/label/meta). Hero renders headline,
subtitle, two CTAs and a scroll cue with staggered fade-up reveal."
```

---

## Task 4: About section with stats strip

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/i18n/en.json`, `src/i18n/es.json` (about + stats keys)
- Modify: `src/App.tsx` (replace about placeholder with `<About />`)

**Data needed from user when running this task:**
- Confirm stats: years of experience, project count, industry count, mobile apps count
- Optional 800×800 portrait at `src/assets/img/portrait.jpg`

- [ ] **Step 1: Add about translations**

Add keys under `about` in both files. EN:
```json
"about": {
  "index": "02",
  "label": "About",
  "p1": "3+ years building production systems for hospitality, real estate, healthcare, and logistics teams. Computer Engineering background.",
  "p2": "I'm transitioning into Forward Deployment — embedding directly with client teams to ship the systems they actually need, not the ones a spec assumed.",
  "p3": "Stack: React, Next.js, Node, Laravel, React Native. Mobile apps live on Google Play. Lead frontend architecture on multi-tenant SaaS.",
  "stats": {
    "years": "years shipping",
    "projects": "production projects",
    "industries": "industries",
    "mobile": "live mobile apps"
  }
}
```

ES:
```json
"about": {
  "index": "02",
  "label": "Sobre mí",
  "p1": "3+ años construyendo sistemas en producción para equipos de hospitalidad, real estate, healthcare y logística. Ingeniero Informático.",
  "p2": "Estoy transicionando a Forward Deployment — embebido junto al equipo del cliente para entregar los sistemas que realmente necesita, no los que asumió la spec.",
  "p3": "Stack: React, Next.js, Node, Laravel, React Native. Apps móviles activas en Google Play. He liderado arquitectura frontend en SaaS multi-tenant.",
  "stats": {
    "years": "años publicando",
    "projects": "proyectos en producción",
    "industries": "industrias",
    "mobile": "apps móviles activas"
  }
}
```

- [ ] **Step 2: Create `About` section**

`src/components/sections/About.tsx`:
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { fadeUp, stagger, sectionViewport } from "../../lib/motion";

const stats = [
  { value: "3+", key: "about.stats.years" },
  { value: "9", key: "about.stats.projects" },
  { value: "5", key: "about.stats.industries" },
  { value: "2", key: "about.stats.mobile" },
];

export const About = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      id="about"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="container-page py-section-y-sm md:py-section-y"
      aria-label={t("about.label")}
    >
      <SectionHeader index={t("about.index")} label={t("about.label").toUpperCase()} />
      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7 space-y-6 text-pretty text-lg leading-relaxed text-text-secondary">
          <motion.p variants={fadeUp} className="text-text-primary text-xl">
            {t("about.p1")}
          </motion.p>
          <motion.p variants={fadeUp}>{t("about.p2")}</motion.p>
          <motion.p variants={fadeUp}>{t("about.p3")}</motion.p>
        </div>
        <motion.dl
          variants={fadeUp}
          className="md:col-span-5 grid grid-cols-2 gap-y-8 gap-x-6 self-start border-l border-border pl-8"
        >
          {stats.map((s) => (
            <div key={s.key}>
              <dt className="font-display text-4xl font-semibold tracking-tightest text-text-primary">
                {s.value}
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
                {t(s.key)}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </motion.section>
  );
};
```

- [ ] **Step 3: Mount `<About />` in `App.tsx`**

Replace about placeholder section with `<About />` and add `import { About } from "./components/sections/About";`.

- [ ] **Step 4: Verify**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run dev`. Scroll to About:
- Section header `02 / ABOUT` (or "SOBRE MÍ" in ES) with hairline border.
- Three paragraphs, first one in primary white, rest in secondary.
- Stats grid on the right with 4 big numbers + mono labels.
- Reveal-on-scroll plays once when entering viewport.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: about section with narrative + stats strip

Implements section 02. Three-paragraph narrative (i18n EN/ES) plus 4-stat
data definition list (years, projects, industries, mobile apps). Stagger
fade-up reveal on viewport entry. Stat values are placeholders — user
confirms during this task."
```

---

## Task 5: Selected Work (Tier 1) — FeaturedProjectCard

**Files:**
- Create: `src/components/primitives/GlassCard.tsx`
- Create: `src/components/primitives/RevealOnScroll.tsx`
- Create: `src/components/work/FeaturedProjectCard.tsx`
- Create: `src/components/sections/SelectedWork.tsx`
- Create: `src/components/icons/ArrowUpRight.tsx`
- Create: `src/components/icons/ArrowRight.tsx`
- Modify: `src/i18n/en.json`, `src/i18n/es.json` (work header + 3 T1 project keys)
- Modify: `src/App.tsx` (replace work placeholder with `<SelectedWork />`)

**Data needed during this task:** For Supraca, Damasco, HIS — one-line problem + one-line solution + one-line outcome with metric if known, EN + ES.

- [ ] **Step 1: Create arrow icons**

`src/components/icons/ArrowUpRight.tsx`:
```tsx
type Props = { className?: string };

export const ArrowUpRight = ({ className }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
```

`src/components/icons/ArrowRight.tsx`:
```tsx
type Props = { className?: string };

export const ArrowRight = ({ className }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
```

- [ ] **Step 2: Create `GlassCard`**

`src/components/primitives/GlassCard.tsx`:
```tsx
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

export const GlassCard = ({ children, className }: Props) => (
  <div
    className={cn(
      "group relative overflow-hidden rounded-card border border-border bg-white/[0.02] backdrop-blur-xl transition-colors hover:border-aurora-violet/60",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-aurora-violet/[0.04] via-transparent to-aurora-teal/[0.04] opacity-0 transition-opacity group-hover:opacity-100" />
    {children}
  </div>
);
```

- [ ] **Step 3: Create `RevealOnScroll`**

`src/components/primitives/RevealOnScroll.tsx`:
```tsx
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, sectionViewport } from "../../lib/motion";

type Props = {
  children: ReactNode;
  variants?: Variants;
  className?: string;
};

export const RevealOnScroll = ({ children, variants = fadeUp, className }: Props) => (
  <motion.div
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
    className={className}
  >
    {children}
  </motion.div>
);
```

- [ ] **Step 4: Add work section + project translations**

Add into `src/i18n/en.json` (top level):
```json
"work": {
  "index": "03",
  "label": "Selected Work",
  "meta": "Featured",
  "labels": {
    "role": "Role",
    "stack": "Stack",
    "outcome": "Outcome",
    "client": "Client",
    "year": "Year",
    "sector": "Sector"
  },
  "actions": {
    "visit": "Visit live",
    "readCase": "Read case study"
  }
},
"projects": {
  "supraca": {
    "role": "Frontend lead",
    "problem": "[PROBLEM_EN_SUPRACA]",
    "solution": "[SOLUTION_EN_SUPRACA]",
    "outcome": "[OUTCOME_EN_SUPRACA]"
  },
  "damasco": {
    "role": "Full development",
    "problem": "[PROBLEM_EN_DAMASCO]",
    "solution": "[SOLUTION_EN_DAMASCO]",
    "outcome": "[OUTCOME_EN_DAMASCO]"
  },
  "his": {
    "role": "Module developer",
    "problem": "[PROBLEM_EN_HIS]",
    "solution": "[SOLUTION_EN_HIS]",
    "outcome": "[OUTCOME_EN_HIS]"
  }
}
```

Replace the `[PROBLEM_EN_*]` etc. placeholders with the real one-liners collected from the user before commit. Mirror in `src/i18n/es.json` with the same structure under ES keys.

- [ ] **Step 5: Create `FeaturedProjectCard`**

`src/components/work/FeaturedProjectCard.tsx`:
```tsx
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { GlassCard } from "../primitives/GlassCard";
import { ArrowUpRight, ArrowRight } from "../icons/ArrowUpRight";
import { fadeUp } from "../../lib/motion";

type Props = {
  project: Project;
  index: number;
};

export const FeaturedProjectCard = ({ project, index }: Props) => {
  const { t } = useTranslation();
  return (
    <motion.article variants={fadeUp}>
      <GlassCard className="grid gap-10 p-8 md:grid-cols-12 md:p-12">
        <div className="md:col-span-7 space-y-8">
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
            <span>
              {String(index + 1).padStart(2, "0")} <span className="mx-2">/</span>{" "}
              {t("work.meta")}
            </span>
            <span>{project.year}</span>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-4xl font-semibold tracking-tightest text-text-primary sm:text-5xl">
              {project.client}
            </h3>
            <p className="max-w-prose text-lg text-text-secondary">
              {t(project.problemKey)}
            </p>
            <p className="max-w-prose text-base text-text-secondary">
              {t(project.solutionKey)}
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-3 font-mono text-xs uppercase tracking-tighter sm:grid-cols-2">
            <div className="flex gap-3">
              <dt className="text-text-tertiary">{t("work.labels.role")}</dt>
              <dd className="text-text-primary">{t(project.roleKey)}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-text-tertiary">{t("work.labels.sector")}</dt>
              <dd className="text-text-primary">{project.sector}</dd>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <dt className="text-text-tertiary">{t("work.labels.stack")}</dt>
              <dd className="text-text-primary">{project.stack.join(" · ")}</dd>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <dt className="text-text-tertiary">{t("work.labels.outcome")}</dt>
              <dd className="text-text-primary">{t(project.outcomeKey)}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill border border-border-strong px-4 py-2 text-sm text-text-primary transition-colors hover:border-aurora-violet hover:text-aurora-violet"
              >
                {t("work.actions.visit")} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
            {project.caseStudyUrl ? (
              <a
                href={project.caseStudyUrl}
                className="inline-flex items-center gap-2 rounded-pill border border-transparent px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {t("work.actions.readCase")} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <img
              src={project.imgUrl}
              alt={`${project.client} interface`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
};
```

Note: `Project` does not currently declare `caseStudyUrl` — add the optional field to the `Project` type in `src/data/projects.ts`:
```ts
caseStudyUrl?: string;
```

- [ ] **Step 6: Create `SelectedWork` section**

`src/components/sections/SelectedWork.tsx`:
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { FeaturedProjectCard } from "../work/FeaturedProjectCard";
import { projectsByTier } from "../../data/projects";
import { stagger, sectionViewport } from "../../lib/motion";

export const SelectedWork = () => {
  const { t } = useTranslation();
  const featured = projectsByTier(1);
  return (
    <motion.section
      id="work"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="container-page py-section-y-sm md:py-section-y"
      aria-label={t("work.label")}
    >
      <SectionHeader index={t("work.index")} label={t("work.label").toUpperCase()} meta="2023 / 2025" />
      <div className="mt-12 space-y-8">
        {featured.map((p, i) => (
          <FeaturedProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </motion.section>
  );
};
```

- [ ] **Step 7: Mount `<SelectedWork />` in `App.tsx`**

Replace the work placeholder section with `<SelectedWork />` and add the import.

- [ ] **Step 8: Verify**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run dev`. Scroll to Selected Work:
- 3 glass cards stacked, each: index/label top, big client name, problem + solution paragraphs, mono `Role / Sector / Stack / Outcome` rows, screenshot on the right.
- Hover: subtle violet border glow, image scales up slightly.
- Toggle EN/ES: all visible copy switches.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: selected work section with tier-1 featured project cards

Implements section 03. Adds primitives GlassCard (blur + violet hover) and
RevealOnScroll. Adds FeaturedProjectCard rendering big client name, problem,
solution, mono metadata grid, outcome, stack, and Visit-live CTA. Wires 3
tier-1 projects (Supraca, Damasco, HIS) with i18n keys. caseStudyUrl field
added to Project type for future use."
```

---

## Task 6: More Work (Tier 2) and Archive (Tier 3)

**Files:**
- Create: `src/components/work/ProjectCard.tsx` (Tier 2 medium card)
- Create: `src/components/work/ArchiveItem.tsx` (Tier 3 compact row)
- Create: `src/components/sections/MoreWork.tsx`
- Create: `src/components/sections/Archive.tsx`
- Modify: `src/i18n/en.json`, `src/i18n/es.json` (more-work + archive headers + 4 T2 + 2 T3 keys)
- Modify: `src/App.tsx` (mount both sections)

**Data needed:** one-line outcome per project for Project R, Madbox, Contractor, Librarian (T2) and Bill Generator, Journal (T3).

- [ ] **Step 1: Add translations for sections 04 and 05**

EN additions:
```json
"moreWork": { "index": "04", "label": "More Work" },
"archive": { "index": "05", "label": "Archive", "viewLabel": "View" }
```

ES:
```json
"moreWork": { "index": "04", "label": "Más Proyectos" },
"archive": { "index": "05", "label": "Archivo", "viewLabel": "Ver" }
```

And extend `projects` with role/problem/solution/outcome keys for: `projectR`, `madbox`, `contractor`, `librarian`, `billGenerator`, `journal`. For T2 cards we render only `outcome` and `stack`; problem/solution can be one short line each but won't display in v1 (kept for future case studies).

- [ ] **Step 2: Create `ProjectCard` (Tier 2)**

`src/components/work/ProjectCard.tsx`:
```tsx
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { GlassCard } from "../primitives/GlassCard";
import { ArrowUpRight } from "../icons/ArrowUpRight";
import { fadeUp } from "../../lib/motion";

type Props = { project: Project };

export const ProjectCard = ({ project }: Props) => {
  const { t } = useTranslation();
  const inner = (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="aspect-[16/10] overflow-hidden rounded-card border border-border">
        <img
          src={project.imgUrl}
          alt={`${project.client} interface`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-6 flex flex-1 flex-col gap-3">
        <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
          <span>{project.sector}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tighter text-text-primary">
          {project.client}
          {project.liveUrl ? (
            <ArrowUpRight className="ml-2 inline h-4 w-4 text-text-tertiary transition-colors group-hover:text-aurora-violet" />
          ) : null}
        </h3>
        <p className="text-text-secondary">{t(project.outcomeKey)}</p>
        <p className="mt-auto font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
          {project.stack.join(" · ")}
        </p>
      </div>
    </GlassCard>
  );

  return (
    <motion.article variants={fadeUp} className="h-full">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.client} — open live site`}
          className="block h-full"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.article>
  );
};
```

- [ ] **Step 3: Create `ArchiveItem` (Tier 3)**

`src/components/work/ArchiveItem.tsx`:
```tsx
import { useTranslation } from "react-i18next";
import type { Project } from "../../data/projects";
import { ArrowUpRight } from "../icons/ArrowUpRight";

type Props = { project: Project };

export const ArchiveItem = ({ project }: Props) => {
  const { t } = useTranslation();
  const content = (
    <div className="group grid grid-cols-12 items-center gap-4 border-b border-border/60 py-5 font-mono text-sm">
      <span className="col-span-2 text-text-tertiary">{project.year}</span>
      <span className="col-span-4 text-text-primary">{project.client}</span>
      <span className="col-span-4 text-text-secondary truncate">{project.stack.join(" · ")}</span>
      <span className="col-span-2 flex items-center justify-end gap-2 text-text-tertiary group-hover:text-aurora-violet">
        {project.liveUrl ? <>{t("archive.viewLabel")} <ArrowUpRight className="h-3.5 w-3.5" /></> : null}
      </span>
    </div>
  );
  if (project.liveUrl) {
    return (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
};
```

- [ ] **Step 4: Create `MoreWork` section**

`src/components/sections/MoreWork.tsx`:
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { ProjectCard } from "../work/ProjectCard";
import { projectsByTier } from "../../data/projects";
import { stagger, sectionViewport } from "../../lib/motion";

export const MoreWork = () => {
  const { t } = useTranslation();
  const items = projectsByTier(2);
  return (
    <motion.section
      id="more-work"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="container-page py-section-y-sm md:py-section-y"
      aria-label={t("moreWork.label")}
    >
      <SectionHeader index={t("moreWork.index")} label={t("moreWork.label").toUpperCase()} />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </motion.section>
  );
};
```

- [ ] **Step 5: Create `Archive` section**

`src/components/sections/Archive.tsx`:
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { ArchiveItem } from "../work/ArchiveItem";
import { projectsByTier } from "../../data/projects";
import { fadeUp, sectionViewport } from "../../lib/motion";

export const Archive = () => {
  const { t } = useTranslation();
  const items = projectsByTier(3);
  return (
    <motion.section
      id="archive"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="container-page py-section-y-sm md:py-section-y"
      aria-label={t("archive.label")}
    >
      <SectionHeader index={t("archive.index")} label={t("archive.label").toUpperCase()} />
      <div className="mt-8 border-t border-border/60">
        {items.map((p) => (
          <ArchiveItem key={p.id} project={p} />
        ))}
      </div>
    </motion.section>
  );
};
```

- [ ] **Step 6: Mount sections in `App.tsx`**

Replace the more-work and archive placeholder sections with `<MoreWork />` and `<Archive />` and add the imports.

- [ ] **Step 7: Verify**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run dev`. Scroll:
- More Work: 2×2 grid of medium cards. Each shows screenshot, sector/year header, client name with `↗`, outcome line, mono stack tail.
- Archive: compact rows with year, client, stack, optional "View ↗". Hairline dividers.
- EN/ES toggle still works on every card.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: more work (tier 2) and archive (tier 3) sections

Adds ProjectCard medium card (screenshot, sector/year, client+arrow, outcome,
stack) and ArchiveItem compact row (year · client · stack · view). MoreWork
section renders tier-2 projects in 2-col grid, Archive renders tier-3 in
compact table format. Outcome keys placeholders filled with real copy."
```

---

## Task 7: Experience timeline

**Files:**
- Create: `src/components/sections/Experience.tsx`
- Modify: `src/data/experience.ts` (real entries)
- Modify: `src/i18n/en.json`, `src/i18n/es.json` (experience keys per entry)
- Modify: `src/App.tsx` (mount `<Experience />`)

**Data needed:** Real entries: company, role, start (YYYY-MM), optional end, 2-3 wins each.

- [ ] **Step 1: Add experience translations**

EN:
```json
"experience": {
  "index": "06",
  "label": "Experience",
  "present": "Present",
  "entries": {
    "[entry-1-id]": {
      "role": "[ROLE_EN]",
      "wins": ["[WIN1_EN]", "[WIN2_EN]"]
    }
  }
}
```

ES mirrors the structure. Replace bracketed placeholders with real content during execution. The entry IDs match `experience.ts` IDs.

- [ ] **Step 2: Fill `src/data/experience.ts`**

Example structure (collect actual entries from user):
```ts
export type ExperienceItem = {
  id: string;
  company: string;
  start: string;
  end?: string;
  roleKey: string;
  winsKeys: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "entry-1-id",
    company: "[Company]",
    start: "2024-01",
    roleKey: "experience.entries.entry-1-id.role",
    winsKeys: [
      "experience.entries.entry-1-id.wins.0",
      "experience.entries.entry-1-id.wins.1",
    ],
  },
  // ... more entries
];
```

- [ ] **Step 3: Create `Experience` section**

`src/components/sections/Experience.tsx`:
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { experience } from "../../data/experience";
import { fadeUp, stagger, sectionViewport } from "../../lib/motion";

const formatDate = (iso: string, lang: string): string => {
  const [y, m] = iso.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString(lang === "es" ? "es-DO" : "en-US", {
    month: "short",
    year: "numeric",
  });
};

export const Experience = () => {
  const { t, i18n } = useTranslation();
  return (
    <motion.section
      id="experience"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="container-page py-section-y-sm md:py-section-y"
      aria-label={t("experience.label")}
    >
      <SectionHeader index={t("experience.index")} label={t("experience.label").toUpperCase()} />
      <ol className="mt-12 space-y-12 border-l border-border/60 pl-8">
        {experience.map((item) => (
          <motion.li key={item.id} variants={fadeUp} className="relative">
            <span className="absolute -left-[33px] top-2 h-2 w-2 rounded-full bg-aurora-violet" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
              {formatDate(item.start, i18n.resolvedLanguage ?? "en")} —{" "}
              {item.end ? formatDate(item.end, i18n.resolvedLanguage ?? "en") : t("experience.present")}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tighter text-text-primary">
              {t(item.roleKey)}
              <span className="text-text-secondary"> · {item.company}</span>
            </h3>
            <ul className="mt-3 space-y-1 text-text-secondary">
              {item.winsKeys.map((k) => (
                <li key={k} className="leading-relaxed">— {t(k)}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
};
```

- [ ] **Step 4: Mount `<Experience />` in `App.tsx`**

- [ ] **Step 5: Verify**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run dev`. Scroll to Experience:
- Vertical timeline with violet dot per entry.
- Dates in mono format, role + company in display, wins as bullet lines.
- ES toggle updates month names ("ene", "feb", etc.).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: experience timeline with real entries

Adds Experience section with vertical violet-dot timeline. Each entry renders
mono date range (locale-aware), role + company display, and bullet wins.
Real entries filled into data/experience.ts and i18n keys."
```

---

## Task 8: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/i18n/en.json`, `src/i18n/es.json` (contact keys)
- Modify: `src/App.tsx` (mount `<Contact />`)

**Data needed:** Calendly URL. If not yet available, fall back to mailto only.

- [ ] **Step 1: Add contact translations**

EN:
```json
"contact": {
  "index": "07",
  "label": "Contact",
  "kicker": "Let's talk",
  "title": "If your team is shipping something real, I'd like to hear about it.",
  "subtitle": "I respond within a business day.",
  "ctaEmail": "Email me",
  "ctaSchedule": "Schedule a call",
  "ctaLinkedIn": "Message on LinkedIn"
}
```

ES:
```json
"contact": {
  "index": "07",
  "label": "Contacto",
  "kicker": "Conversemos",
  "title": "Si tu equipo está construyendo algo real, me interesa escucharlo.",
  "subtitle": "Respondo en menos de un día hábil.",
  "ctaEmail": "Escríbeme",
  "ctaSchedule": "Agenda una llamada",
  "ctaLinkedIn": "Escríbeme en LinkedIn"
}
```

- [ ] **Step 2: Create `Contact` section**

`src/components/sections/Contact.tsx`:
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { MagneticButton } from "../primitives/MagneticButton";
import { ArrowUpRight } from "../icons/ArrowUpRight";
import { fadeUp, stagger, sectionViewport } from "../../lib/motion";

const EMAIL = "efraincabrera35@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/efrain-cabrera-b25489216/";
const CALENDLY = "[CALENDLY_URL]"; // replace at execution time with real link or remove the secondary CTA

export const Contact = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      id="contact"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="container-page py-section-y-sm md:py-section-y"
      aria-label={t("contact.label")}
    >
      <SectionHeader index={t("contact.index")} label={t("contact.label").toUpperCase()} />
      <div className="mt-16 flex flex-col items-start gap-8">
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-tighter text-text-tertiary"
        >
          {t("contact.kicker")}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="max-w-[24ch] text-balance font-display text-4xl font-semibold leading-tight tracking-tightest text-text-primary sm:text-5xl md:text-6xl"
        >
          {t("contact.title")}
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-text-secondary">
          {t("contact.subtitle")}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-3">
          <MagneticButton as="a" href={`mailto:${EMAIL}`} variant="primary">
            {t("contact.ctaEmail")} <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
          {CALENDLY && CALENDLY !== "[CALENDLY_URL]" ? (
            <MagneticButton
              as="a"
              href={CALENDLY}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact.ctaSchedule")} <ArrowUpRight className="h-3.5 w-3.5" />
            </MagneticButton>
          ) : null}
          <MagneticButton
            as="a"
            href={LINKEDIN}
            variant="ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("contact.ctaLinkedIn")} <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
};
```

- [ ] **Step 3: Mount `<Contact />` in `App.tsx`**

- [ ] **Step 4: Verify**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run dev`. Scroll to Contact:
- Large statement, subtitle, 2-3 CTAs (Email primary, Schedule secondary if Calendly link present, LinkedIn ghost).
- Email link opens mailto. Calendly opens new tab. LinkedIn opens new tab.
- Magnetic effect on hover.
- EN/ES toggle updates all copy.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: contact section with email + calendly + linkedin CTAs

Adds Contact section with FDE-style large statement, subtitle, and three
magnetic CTAs (email mailto, Calendly external, LinkedIn external). Calendly
URL configured; secondary CTA hidden if URL still placeholder."
```

---

## Task 9: Polish, a11y, performance, SEO, CLAUDE.md update

**Files:**
- Modify: `index.html` (title, description, OG, theme-color, JSON-LD, hreflang)
- Modify: `src/App.tsx` (add Skip-to-content link, set page title per language)
- Create: `public/og-en.png`, `public/og-es.png` (1200×630 captures of the hero)
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Modify: `CLAUDE.md` (update Estructura del proyecto, scripts, retired/added deps, sections list)
- Run: image optimization for `src/assets/img/projects/*`

End state: WCAG 2.2 AA passes axe checks. Lighthouse ≥ 90 across categories on `npm run preview`. CLAUDE.md reflects new reality.

- [ ] **Step 1: Update `index.html`** with full SEO metadata.

Replace `<head>` (preserve any existing critical bits) with the following structure. Two `<title>` etc. require dynamic update from JS; we set defaults in EN and let `App.tsx` update on language change.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#07080F" />
    <title>Efrain Cabrera — Forward Deployment Engineer</title>
    <meta name="description" content="Forward Deployment Engineer. Production software shipped on-site with the teams that run the business." />
    <link rel="alternate" hreflang="en" href="https://[YOUR_DOMAIN]/" />
    <link rel="alternate" hreflang="es" href="https://[YOUR_DOMAIN]/?lang=es" />
    <link rel="alternate" hreflang="x-default" href="https://[YOUR_DOMAIN]/" />
    <meta property="og:type" content="profile" />
    <meta property="og:title" content="Efrain Cabrera — Forward Deployment Engineer" />
    <meta property="og:description" content="Production software shipped on-site with the teams that run the business." />
    <meta property="og:image" content="/og-en.png" />
    <meta property="og:url" content="https://[YOUR_DOMAIN]/" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Efrain Cabrera",
        "jobTitle": "Forward Deployment Engineer",
        "url": "https://[YOUR_DOMAIN]/",
        "sameAs": [
          "https://www.linkedin.com/in/efrain-cabrera-b25489216/",
          "https://github.com/xEfraM7",
          "https://twitter.com/xEfraCD"
        ]
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Replace `[YOUR_DOMAIN]` with the deployed URL when known (Vercel project URL). If unknown, leave placeholder and note in commit that SEO URLs need update post-deploy.

- [ ] **Step 2: Add Skip-to-content link and i18n-driven title**

Update `src/App.tsx` — at the top of the returned JSX (above NavBar), add the skip link; in the effect, also update `document.title`:

```tsx
useEffect(() => {
  const lang = i18n.resolvedLanguage ?? "en";
  document.documentElement.lang = lang;
  document.title = lang === "es"
    ? "Efrain Cabrera — Forward Deployment Engineer"
    : "Efrain Cabrera — Forward Deployment Engineer";
}, [i18n.resolvedLanguage]);
```

```tsx
<a
  href="#hero"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-text-primary focus:px-4 focus:py-2 focus:text-bg-base"
>
  Skip to content
</a>
```

- [ ] **Step 3: Optimize project screenshots**

Run a one-off script to convert `src/assets/img/projects/*.{png,jpg}` to WebP (keep originals as fallback only if Vite needs them — it doesn't, since the imports remain string URLs and Vite hashes them):

Run: `npx @squoosh/cli --webp '{"quality":82}' -d src/assets/img/projects src/assets/img/projects/*.{png,jpg}`

(If `@squoosh/cli` isn't desirable, document the manual optimization step and skip. Alternatively, use `sharp` via a tiny script — but that requires a new dep with approval.)

Update each import in `src/data/projects.ts` to point to the `.webp` file. Delete the original `.png/.jpg` only after confirming the webp loads.

- [ ] **Step 4: Create `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://[YOUR_DOMAIN]/sitemap.xml
```

- [ ] **Step 5: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://[YOUR_DOMAIN]/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://[YOUR_DOMAIN]/" />
    <xhtml:link rel="alternate" hreflang="es" href="https://[YOUR_DOMAIN]/?lang=es" />
  </url>
</urlset>
```

- [ ] **Step 6: Capture OG images**

Run `npm run dev`. Open hero in EN, take a 1200×630 screenshot centered on the hero, save as `public/og-en.png`. Toggle ES, repeat → `public/og-es.png`. Use any screenshot tool that supports exact dimensions; if not, capture larger and resize via DevTools device simulation set to 1200×630.

- [ ] **Step 7: Accessibility audit**

Run: `npm run dev`. Install axe DevTools browser extension. Run on the deployed page.
Expected: 0 critical, 0 serious issues. Common fixes if anything fires:
- Missing alt text: ensure all decorative images use `aria-hidden="true"` and content images have descriptive `alt`.
- Contrast: re-check secondary text on darker surfaces.
- Focus visible: confirm violet outline appears on Tab traversal.

Also test keyboard nav: Tab through the entire page; every interactive (nav links, lang toggle buttons, CTAs, project links, social icons) must be reachable and the focus indicator visible.

- [ ] **Step 8: Performance audit**

Run: `npm run build && npm run preview`.
Open the preview URL in a Chrome incognito window. Open DevTools → Lighthouse → Mobile, all categories → Run.
Targets:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

If Performance < 90, common levers:
- Defer Framer Motion bundle: it's already tree-shaken; ensure no `import * as` patterns.
- Lazy-load below-the-fold images by confirming `loading="lazy"` on all project screenshots.
- Reduce font weights: load only Geist Variable 400/500/600/700 (no 100/200/800/900) and JetBrains Mono 400/500 only.

- [ ] **Step 9: Cross-browser smoke**

Open the preview in Chrome, Firefox, Safari (if Mac/iOS available), Edge. Confirm:
- Aurora orb renders correctly (Safari iOS may need the `@supports` fallback if `mix-blend-mode: screen` misbehaves)
- Animations don't jitter
- Lang toggle persists across reloads
- All CTAs work

If Safari blends incorrectly, add a fallback inside `AuroraOrb`:
```css
@supports not (mix-blend-mode: screen) {
  .aurora-fallback { mix-blend-mode: normal; opacity: 0.45; }
}
```
and apply the class conditionally.

- [ ] **Step 10: Update `CLAUDE.md`**

`CLAUDE.md` is part of the Definition of Done. Update sections that drifted:

1. **Estructura del proyecto** → reflect new tree:
   - `src/components/layout/`, `src/components/sections/`, `src/components/work/`, `src/components/primitives/`, `src/components/icons/`
   - `src/i18n/`, `src/data/`, `src/lib/`
   - Removed: `src/helpers/`, Centra font folder
2. **Stack** under ROUTER: replace `Bootstrap 5 · React-Bootstrap 2` with `Tailwind CSS 3 · Framer Motion · react-i18next`
3. **Convenciones** → update Bootstrap reference: "Estilos: Tailwind utilities, design tokens en `index.css`. Componentes propios en `components/`."
4. **Forbidden** → keep the rule against introducing Bootstrap-style frameworks unilaterally, but note Tailwind is now the design system.
5. **Build y ejecución** → still the same scripts.
6. Add `i18n` and `data` mentions to Conventions ("Copy bilingüe vía react-i18next en `src/i18n/{en,es}.json`. Datos estáticos en `src/data/`.").

- [ ] **Step 11: Final verify**

Run: `npm run lint` → exit 0.
Run: `npm run build` → exit 0.
Run: `npm run preview` → open in browser. Final smoke:
- Hero → About → Selected Work → More Work → Archive → Experience → Contact all render and animate correctly.
- EN/ES toggle changes every visible label.
- `prefers-reduced-motion` honored.
- No console errors or warnings.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: a11y, perf, SEO polish + CLAUDE.md update

Adds skip-to-content link, dynamic page title per language, hreflang +
JSON-LD Person schema, OG images (EN/ES), robots.txt and sitemap.xml. Project
screenshots converted to WebP. Lighthouse ≥ 90 across categories on preview.
Updates CLAUDE.md to reflect Tailwind + Framer Motion + i18next stack and new
file structure under src/."
```

---

## Final integration check

- [ ] **Step 1: End-to-end review**

Open the preview build one last time. Confirm:
- Hero copy is final (not draft)
- Stats values are real
- All 3 Tier-1 cards have real problem/solution/outcome (EN + ES)
- All 4 Tier-2 cards have real outcome lines
- Experience timeline has real entries
- Calendly link is real (or section was adjusted to hide schedule CTA)
- No `[BRACKETED_PLACEHOLDER]` strings remain in `en.json`/`es.json`

Run: `grep -r '\[.*_.*\]' src/i18n/`
Expected: no matches.

- [ ] **Step 2: Open PR (do not push without user approval per CLAUDE.md)**

Stop here. Ask the user before pushing or opening a PR. Show:
- Commit count and titles
- A summary of any deferred items

---

## Spec self-review (plan author's checklist)

**Spec coverage:** Walked the spec and mapped:

- §1 Goal → entire plan
- §2 Non-goals → respected; no case study pages, no analytics, no blog
- §3 Decisions table → mapped 1:1 to Task content
- §4 Information architecture → Tasks 2, 3, 4, 5, 6, 7, 8
- §5 Visual system → Task 0 (tokens), Task 1 (base CSS), Task 3 (orb), Task 5 (glass card)
- §6 Component architecture → file paths in every task match §6.1 spec tree
- §7 Tech setup → Task 0 (deps), Task 1 (Tailwind base), Task 9 (a11y/SEO/perf)
- §8 Migration strategy → 10 task structure mirrors phases
- §9 DoD → Task 9 ends with full verification
- §10 Risks → addressed: mix-blend-mode fallback in Task 9 step 9, motion overload mitigation via implementation order
- §11 Data needs → flagged in the affected tasks (4, 5, 6, 7, 8)
- §12 Open items → not implemented (correctly out of scope)

**Placeholder scan:** `[YOUR_DOMAIN]`, `[CALENDLY_URL]`, and `[*_EN_*]`/`[*_ES_*]` markers are intentional execution-time substitutions (user-supplied). Each is paired with a "Data needed" note in the originating task. No silent TBDs.

**Type consistency:** `Project` type declares `caseStudyUrl?: string` (added in Task 5 step 5). `projectsByTier` used consistently across Tasks 5, 6, 7. `ExperienceItem` declared in Task 0 step 13 and reused unchanged in Task 7. `MagneticButton` `as`/`variant` discriminated union created in Task 2 step 4 and reused in Hero (Task 3) and Contact (Task 8).
