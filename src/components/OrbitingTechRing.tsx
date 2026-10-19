import { motion, useReducedMotion } from 'motion/react'
import type { HeroTechIcon } from '../data/heroTechIcons'
import FloatingTechIcon from './ui/FloatingTechIcon.tsx'

type OrbitingTechRingProps = {
  icons: HeroTechIcon[]
  /** Radius as % of stage from center */
  radius?: number
  /** Full revolution duration in seconds */
  duration?: number
  size?: 'sm' | 'md'
  /** Clockwise when true */
  clockwise?: boolean
}

function orbitSlot(index: number, count: number, radius: number) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`,
  }
}

export default function OrbitingTechRing({
  icons,
  radius = 46,
  duration = 48,
  size = 'md',
  clockwise = true,
}: OrbitingTechRingProps) {
  const reduced = useReducedMotion()
  const spin = clockwise ? 360 : -360

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20"
      aria-hidden
      animate={reduced ? undefined : { rotate: spin }}
      transition={
        reduced
          ? undefined
          : { duration, repeat: Infinity, ease: 'linear' }
      }
    >
      {icons.map((item, index) => {
        const pos = orbitSlot(index, icons.length, radius)
        return (
          <motion.div
            key={item.label}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
            style={pos}
            // Counter-rotate so logos stay upright while the ring orbits
            animate={reduced ? undefined : { rotate: -spin }}
            transition={
              reduced
                ? undefined
                : { duration, repeat: Infinity, ease: 'linear' }
            }
          >
            <FloatingTechIcon
              label={item.label}
              icon={item.icon}
              className={item.colorClass}
              glow={item.glow}
              delay={0.08 * index}
              duration={5.2 + (index % 3) * 0.3}
              amplitude={reduced ? 0 : 3}
              size={size}
              absolute={false}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
