type SectionLabelProps = {
  number?: string
  children: string
  className?: string
}

export default function SectionLabel({
  number,
  children,
  className = '',
}: SectionLabelProps) {
  return (
    <div className={`mb-4 flex items-center gap-3 ${className}`}>
      {number ? (
        <span className="annotation shrink-0">{number}</span>
      ) : null}
      <span className="label-caps text-accent-soft/90">{children}</span>
    </div>
  )
}
