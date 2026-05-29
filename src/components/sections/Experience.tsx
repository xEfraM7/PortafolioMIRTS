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
  const lang = i18n.resolvedLanguage ?? "en";
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
      <SectionHeader index={t("experience.index")} label={t("experience.label")} />
      <ol className="mt-12 space-y-12 border-l border-border/60 pl-8">
        {experience.map((item) => (
          <motion.li key={item.id} variants={fadeUp} className="relative">
            <span
              className="absolute -left-[33px] top-2 h-2 w-2 rounded-full bg-aurora-violet"
              aria-hidden="true"
            />
            <p className="font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
              {formatDate(item.start, lang)} —{" "}
              {item.end ? formatDate(item.end, lang) : t("experience.present")}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tighter text-text-primary">
              {t(item.roleKey)}
              <span className="text-text-secondary"> · {item.company}</span>
            </h3>
            <ul className="mt-3 space-y-1 text-text-secondary">
              {item.winsKeys.map((k) => (
                <li key={k} className="leading-relaxed">
                  — {t(k)}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
};
