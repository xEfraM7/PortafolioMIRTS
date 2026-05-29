import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonProps = BaseProps & {
  as?: "button";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type AnchorProps = BaseProps & {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
};

type Props = ButtonProps | AnchorProps;

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium tracking-tight transition-colors";

const variantClasses: Record<Variant, string> = {
  primary: "bg-text-primary text-bg-base hover:bg-white",
  secondary:
    "border border-border-strong text-text-primary hover:border-aurora-violet hover:text-aurora-violet",
  ghost: "text-text-secondary hover:text-text-primary",
};

const MAGNETIC_CLAMP = 8;
const MAGNETIC_STRENGTH = 0.25;
const SPRING_CONFIG = { stiffness: 200, damping: 18 } as const;

const clamp = (v: number) => Math.max(-MAGNETIC_CLAMP, Math.min(MAGNETIC_CLAMP, v));

export const MagneticButton = (props: Props) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_CONFIG);
  const sy = useSpring(y, SPRING_CONFIG);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(clamp((e.clientX - cx) * MAGNETIC_STRENGTH));
    y.set(clamp((e.clientY - cy) * MAGNETIC_STRENGTH));
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { children, className, variant = "primary" } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (props.as === "a") {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={props.href}
        target={props.target}
        rel={props.rel}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  const { type, disabled, onClick } = props as ButtonProps;
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={classes}
    >
      {children}
    </motion.button>
  );
};
