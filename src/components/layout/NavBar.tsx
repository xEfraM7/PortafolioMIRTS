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
