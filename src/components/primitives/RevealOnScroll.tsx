import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, sectionViewport } from "../../lib/motion";

type Props = {
  children: ReactNode;
  variants?: Variants;
  className?: string;
};

// Shared section-reveal wrapper used wherever a non-section element needs
// the same fade-up-on-scroll behavior as the section primitives.
export const RevealOnScroll = ({ children, variants = fadeUp, className }: Props) => (
  <motion.div
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
    className={className}
  >
    {children}
  </motion.div>
);
