import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { ArchiveItem } from "../work/ArchiveItem";
import { projectsByTier } from "../../data/projects";
import { fadeUp, sectionViewport } from "../../lib/motion";

export const Archive = () => {
  const { t } = useTranslation();
  const items = projectsByTier(3);
  return (
    <motion.section
      id="archive"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="container-page py-section-y-sm md:py-section-y"
      aria-label={t("archive.label")}
    >
      <SectionHeader index={t("archive.index")} label={t("archive.label")} />
      <div className="mt-8 border-t border-border/60">
        {items.map((p) => (
          <ArchiveItem key={p.id} project={p} />
        ))}
      </div>
    </motion.section>
  );
};
