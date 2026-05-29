import { useTranslation } from "react-i18next";
import { cn } from "../../lib/cn";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === "es" ? "es" : "en";

  const setLang = (l: "en" | "es") => {
    void i18n.changeLanguage(l);
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
