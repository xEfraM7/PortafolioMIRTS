import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = { className?: string };

export const AuroraOrb = ({ className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 50, damping: 20, mass: 1.2 });
  const sy = useSpring(y, { stiffness: 50, damping: 20, mass: 1.2 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.3);
      y.set((e.clientY - cy) * 0.3);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, x, y]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 overflow-hidden"}
    >
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
      >
        <div
          className="h-full w-full rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgb(var(--aurora-violet) / 0.7), transparent 55%), radial-gradient(circle at 70% 70%, rgb(var(--aurora-teal) / 0.55), transparent 60%), radial-gradient(circle at 60% 30%, rgb(var(--aurora-pink) / 0.35), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </div>
  );
};
