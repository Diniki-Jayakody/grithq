interface SectionLabelProps {
  number?: string
  children: React.ReactNode
  className?: string
  variant?: 'dark' | 'light'
}

export function SectionLabel({
  number,
  children,
  className = '',
  variant = 'dark',
}: SectionLabelProps) {
  const isLight = variant === 'light'

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {number && (
        <span
          className={`font-display text-xs tracking-[0.3em] ${isLight ? 'text-grithq-deepAccent' : 'text-grithq-mauve'}`}
        >
          {number}
        </span>
      )}
      <span
        className={`font-display text-xs font-medium tracking-[0.4em] uppercase ${isLight ? 'text-grithq-burgundy/60' : 'text-grithq-cream/60'}`}
      >
        {children}
      </span>
      <span
        className={`hidden h-px flex-1 md:block ${isLight ? 'bg-grithq-burgundy/10' : 'bg-grithq-cream/10'}`}
        aria-hidden="true"
      />
    </div>
  )
}
