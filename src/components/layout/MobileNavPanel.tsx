import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLenis } from "lenis/react";

type Link = { id: string; labelKey: string; href: string };

type Props = {
  open: boolean;
  onClose: () => void;
  links: Link[];
};

const linkVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut", delay: i * 0.03 },
  }),
};

export const MobileNavPanel = ({ open, onClose, links }: Props) => {
  const { t } = useTranslation();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;

    // Store the button that opened the panel so we can return focus on Escape
    triggerRef.current = document.querySelector<HTMLButtonElement>(
      "[aria-controls='mobile-nav-panel']"
    );

    // Body scroll lock + lenis stop
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();

    // Focus first link
    const frame = requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    // Escape handler
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav-panel"
          aria-label="Primary navigation"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="overflow-hidden border-b border-border/60 bg-bg-base/90 backdrop-blur md:hidden"
        >
          <nav className="container-hero flex flex-col gap-2 py-6" aria-label="Primary">
            {links.map((link, i) => (
              <motion.a
                key={link.id}
                ref={i === 0 ? firstLinkRef : null}
                href={link.href}
                onClick={onClose}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                className="rounded-pill px-4 py-3 font-mono text-sm uppercase tracking-tighter text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
              >
                {t(link.labelKey)}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={onClose}
              custom={links.length}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              className="mt-2 self-start inline-flex items-center justify-center gap-2 rounded-pill bg-text-primary px-5 py-2.5 text-sm font-medium tracking-tight text-bg-base transition-colors hover:bg-white"
            >
              {t("nav.cta")}
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
