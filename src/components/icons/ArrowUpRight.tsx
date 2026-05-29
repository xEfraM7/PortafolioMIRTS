type Props = { className?: string };

export const ArrowUpRight = ({ className }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
