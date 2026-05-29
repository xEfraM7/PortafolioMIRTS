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
      <SectionHeader index={t("moreWork.index")} label={t("moreWork.label")} />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </motion.section>
  );
};
