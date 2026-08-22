interface DisplayTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

export function DisplayText({ children, as: Tag = 'h2', className = '', ...props }: DisplayTextProps) {
  return (
    <Tag
      className={`font-display font-light leading-[0.95] tracking-tight text-grithq-offwhite ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
