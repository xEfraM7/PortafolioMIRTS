import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
};

export const MobileNavToggle = ({ open, onToggle, openLabel, closeLabel }: Props) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={open ? closeLabel : openLabel}
    aria-expanded={open}
    aria-controls="mobile-nav-panel"
    className="grid h-9 w-9 place-items-center rounded-pill border border-border text-text-primary md:hidden"
  >
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <motion.line
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      <motion.line
        x1="4"
        y1="17"
        x2="20"
        y2="17"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </svg>
  </button>
);
