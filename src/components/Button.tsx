import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: ReactNode
  className?: string
  external?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: 'sm' | 'md' | 'lg'
  to?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({
  children,
  className,
  external = false,
  href,
  onClick,
  size = 'md',
  to,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const classes = ['button', `button-${variant}`, `button-${size}`, className]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link className={classes} to={to}>
        <span className="button-content">{children}</span>
      </Link>
    )
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
      >
        <span className="button-content">{children}</span>
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      <span className="button-content">{children}</span>
    </button>
  )
}
