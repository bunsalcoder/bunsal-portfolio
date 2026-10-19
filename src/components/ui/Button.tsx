import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: IconDefinition
  iconPosition?: 'left' | 'right'
  className?: string
  external?: boolean
  type?: 'button' | 'submit'
  ariaLabel?: string
  download?: boolean | string
}

const variants = {
  primary:
    'bg-gradient-brand text-accent-fg border border-transparent shadow-soft hover:brightness-110 hover:shadow-lift',
  secondary:
    'bg-transparent text-text border border-accent/50 hover:border-accent hover:bg-accent-muted',
  ghost:
    'bg-transparent text-text-muted hover:text-text border border-transparent hover:bg-accent-muted',
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  className = '',
  external = false,
  type = 'button',
  ariaLabel,
  download,
}: ButtonProps) {
  const classes = [
    'group/btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300',
    variants[variant],
    className,
  ].join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' ? (
        <FontAwesomeIcon icon={icon} className="text-[0.75rem]" aria-hidden />
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? (
        <FontAwesomeIcon
          icon={icon}
          className="text-[0.75rem] transition-transform duration-300 group-hover/btn:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        aria-label={ariaLabel}
        download={download}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  )
}
