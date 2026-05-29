import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AuroraOrb } from "../primitives/AuroraOrb";
import { StatusPill } from "../primitives/StatusPill";
import { MagneticButton } from "../primitives/MagneticButton";
import { fadeUp, stagger } from "../../lib/motion";

const ROTATE_INTERVAL_MS = 3200;

export const Hero = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const titles = t("hero.titles", { returnObjects: true }) as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || titles.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, titles.length]);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden py-8 sm:py-12"
      aria-label="Intro"
    >
      <AuroraOrb />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container-hero relative flex flex-1 flex-col"
      >
        <div className="flex flex-1 flex-col items-start justify-center gap-8">
          <motion.div variants={fadeUp}>
            <StatusPill label={t("hero.status")} />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-[18ch] text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-text-primary sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            <span className="sr-only">{titles.join(" · ")}</span>
            <span className="grid" aria-hidden="true">
              {titles.map((label, i) => (
                <span key={`reserve-${i}`} className="invisible col-start-1 row-start-1">
                  {label}
                </span>
              ))}
              <span className="col-start-1 row-start-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={index}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {titles[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
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
        </div>

        <motion.a
          variants={fadeUp}
          href="#about"
          aria-label={t("hero.scrollCue")}
          className="group mt-8 flex items-center gap-3 self-start font-mono text-[11px] uppercase tracking-tighter text-text-tertiary transition-colors hover:text-text-primary"
        >
          <span>{t("hero.scrollCue")}</span>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
            transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
};
