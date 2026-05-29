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
