type Props = { className?: string };

export const Logo = ({ className }: Props) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M11 10h10M11 16h7M11 22h10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
