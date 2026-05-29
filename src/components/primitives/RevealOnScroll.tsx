import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, sectionViewport } from "../../lib/motion";

type Props = {
  children: ReactNode;
  variants?: Variants;
  className?: string;
};

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
