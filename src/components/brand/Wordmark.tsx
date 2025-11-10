interface WordmarkProps {
  className?: string;
}

export const Wordmark = ({ className = "" }: WordmarkProps) => {
  return (
    <div 
      className={`font-black text-2xl tracking-tighter ${className}`}
      style={{ letterSpacing: '-0.01em' }}
      role="img"
      aria-label="NoteX"
    >
      NoteX
    </div>
  );
};
