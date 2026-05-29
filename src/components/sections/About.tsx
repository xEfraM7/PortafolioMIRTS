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
