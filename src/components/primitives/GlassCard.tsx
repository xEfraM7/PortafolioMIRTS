import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

export const GlassCard = ({ children, className }: Props) => (
  <div
    className={cn(
      "group relative overflow-hidden rounded-card border border-border bg-white/[0.02] backdrop-blur-xl transition-colors hover:border-aurora-violet/60",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-aurora-violet/[0.04] via-transparent to-aurora-teal/[0.04] opacity-0 transition-opacity group-hover:opacity-100" />
    {children}
  </div>
);
