import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { fadeUp, stagger, sectionViewport } from "../../lib/motion";

const STAT_KEYS = ["years", "madbox", "mediclarity"] as const;

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
      <SectionHeader index={t("about.index")} label={t("about.label")} />
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
          className="md:col-span-5 grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:grid-cols-1 self-start border-l border-border pl-8"
        >
          {STAT_KEYS.map((key) => (
            <div key={key}>
              <dt className="font-display text-4xl font-semibold tracking-tightest text-text-primary">
                {t(`about.stats.${key}.value`)}
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
                {t(`about.stats.${key}.label`)}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </motion.section>
  );
};
