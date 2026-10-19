import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  as?: 'div' | 'li' | 'article'
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    if (as === 'li') return <li className={className}>{children}</li>
    if (as === 'article')
      return <article className={className}>{children}</article>
    return <div className={className}>{children}</div>
  }

  const motionProps = {
    className,
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, margin: '-10% 0px' as const },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  }

  if (as === 'li') {
    return <motion.li {...motionProps}>{children}</motion.li>
  }

  if (as === 'article') {
    return <motion.article {...motionProps}>{children}</motion.article>
  }

  return <motion.div {...motionProps}>{children}</motion.div>
}
