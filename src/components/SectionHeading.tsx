type SectionHeadingProps = {
  align?: 'left' | 'center'
  description: string
  eyebrow?: string
  title: string
}

export function SectionHeading({
  align = 'left',
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className={['section-heading', align === 'center' ? 'is-centered' : ''].join(' ')}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
