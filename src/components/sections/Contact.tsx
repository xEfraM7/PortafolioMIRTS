import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "../primitives/SectionHeader";
import { MagneticButton } from "../primitives/MagneticButton";
import { ArrowUpRight } from "../icons/ArrowUpRight";
import { fadeUp, stagger, sectionViewport } from "../../lib/motion";

const EMAIL = "efraincabrera35@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/efrain-cabrera-b25489216/";
const CALENDLY = "https://calendly.com/efraincabrera35/30min";

export const Contact = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      id="contact"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="container-page py-section-y-sm md:py-section-y"
      aria-label={t("contact.label")}
    >
      <SectionHeader index={t("contact.index")} label={t("contact.label")} />
      <div className="mt-16 flex flex-col items-start gap-8">
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-tighter text-text-tertiary"
        >
          {t("contact.kicker")}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="max-w-[24ch] text-balance font-display text-4xl font-semibold leading-tight tracking-tightest text-text-primary sm:text-5xl md:text-6xl"
        >
          {t("contact.title")}
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-text-secondary">
          {t("contact.subtitle")}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-3">
          <MagneticButton as="a" href={`mailto:${EMAIL}`} variant="primary">
            {t("contact.ctaEmail")} <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href={CALENDLY}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("contact.ctaSchedule")} <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href={LINKEDIN}
            variant="ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("contact.ctaLinkedIn")} <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
};
