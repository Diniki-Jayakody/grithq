interface ArchitecturalGridProps {
  visible?: boolean
  columns?: number
  className?: string
  variant?: 'dark' | 'light'
}

export function ArchitecturalGrid({
  visible = true,
  columns = 12,
  className = '',
  variant = 'dark',
}: ArchitecturalGridProps) {
  if (!visible) return null

  const lineColor = variant === 'light' ? 'border-grithq-burgundy/30' : 'border-grithq-cream/40'

  return (
    <div
      className={`pointer-events-none absolute inset-0 section-padding ${className}`}
      aria-hidden="true"
    >
      <div
        className="grid h-full w-full gap-0 opacity-[0.06]"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className={`border-r ${lineColor}`} />
        ))}
      </div>
    </div>
  )
}
