import { motion, useReducedMotion } from "framer-motion";

type Props = { label: string };

export const StatusPill = ({ label }: Props) => {
  const reduce = useReducedMotion();
  return (
    <div className="inline-flex items-center gap-2 rounded-pill border border-border bg-bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-tight text-text-mono backdrop-blur">
      <span className="relative inline-flex h-2 w-2">
        <motion.span
          className="absolute inset-0 rounded-full bg-status-live"
          animate={reduce ? undefined : { opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-status-live" />
      </span>
      <span>{label}</span>
    </div>
  );
};
