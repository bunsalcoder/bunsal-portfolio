import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'

type FloatingTechIconProps = {
  label: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  glow?: string
  delay?: number
  duration?: number
  amplitude?: number
  icon?: IconDefinition
  children?: ReactNode
  absolute?: boolean
  style?: CSSProperties
}

const sizeClasses = {
  sm: 'h-12 w-12 text-[1.15rem] sm:h-[3.25rem] sm:w-[3.25rem] sm:text-[1.25rem]',
  md: 'h-14 w-14 text-[1.4rem] sm:h-16 sm:w-16 sm:text-[1.65rem]',
  lg: 'h-16 w-16 text-[1.55rem] sm:h-[4.5rem] sm:w-[4.5rem] sm:text-[1.85rem]',
}

export default function FloatingTechIcon({
  label,
  className = '',
  size = 'md',
  glow = 'rgba(139, 53, 255, 0.35)',
  delay = 0,
  duration = 4.8,
  amplitude = 7,
  icon,
  children,
  absolute = true,
  style,
}: FloatingTechIconProps) {
  const reduced = useReducedMotion()

  return (
    <motion.span
      aria-hidden
      title={label}
      className={[
        'floating-tech-icon pointer-events-auto z-20 inline-flex items-center justify-center rounded-2xl font-bold backdrop-blur-md',
        absolute ? 'absolute' : 'relative',
        sizeClasses[size],
        className,
      ].join(' ')}
      style={
        {
          '--icon-glow': glow,
          ...style,
        } as CSSProperties
      }
      animate={
        reduced
          ? undefined
          : {
              y: [0, -amplitude, 0],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={
        reduced
          ? undefined
          : {
              scale: 1.08,
              transition: { duration: 0.2 },
            }
      }
    >
      {children ??
        (icon ? <FontAwesomeIcon icon={icon} className="drop-shadow-sm" /> : null)}
    </motion.span>
  )
}
