interface MonogramProps {
  className?: string;
  size?: number;
}

export const Monogram = ({ className = "", size = 40 }: MonogramProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="NoteX Monogram"
    >
      <rect width="40" height="40" rx="8" fill="currentColor" fillOpacity="0.1"/>
      <path
        d="M12 28V12H16L22 22V12H26V28H22L16 18V28H12Z"
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 18L22 12M28 12L22 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
