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
      <SectionHeader index={t("work.index")} label={t("work.label")} meta="2023 / 2025" />
      <div className="mt-12 space-y-8">
        {featured.map((p, i) => (
          <FeaturedProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </motion.section>
  );
};
