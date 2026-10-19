import { motion, useReducedMotion } from 'motion/react'
import { heroTechIcons } from '../data/heroTechIcons'
import { site } from '../data/site'
import OrbitingTechRing from './OrbitingTechRing'

/**
 * Inner square frame + equal-gap icon ring (same 12 icons as dark mode).
 * Ring slowly orbits; icons stay upright.
 */
const FRAME = {
  /** Icon ring radius as % of stage (from center) — match dark orbit */
  iconRadius: 46,
  /** Rounded rect sits inside the icon ring */
  rectInset: 28,
} as const

export default function HeroLightVisual() {
  const reduced = useReducedMotion()
  const r = FRAME.rectInset

  return (
    <div className="hero-light-geometry relative mx-auto aspect-square w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[520px]">
      {/* Soft brand mesh */}
      <motion.div
        aria-hidden
        className="hero-light-blob hero-light-blob--violet pointer-events-none absolute top-[12%] right-[10%] h-[46%] w-[46%] rounded-full"
        animate={
          reduced
            ? undefined
            : { x: [0, 8, 0], y: [0, -6, 0], scale: [1, 1.03, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="hero-light-blob hero-light-blob--blue pointer-events-none absolute bottom-[12%] left-[8%] h-[44%] w-[44%] rounded-full"
        animate={
          reduced
            ? undefined
            : { x: [0, -6, 0], y: [0, 8, 0], scale: [1, 1.04, 1] }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
      <div
        aria-hidden
        className="hero-light-blob hero-light-blob--core pointer-events-none absolute top-1/2 left-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      {/* Inner frame — clear of icon tiles */}
      <motion.svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient
            id="heroLightStroke"
            x1={r}
            y1={r}
            x2={100 - r}
            y2={100 - r}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7A2EF0" />
            <stop offset="1" stopColor="#2878FF" />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r={50 - r - 2}
          stroke="url(#heroLightStroke)"
          strokeWidth="0.4"
          strokeDasharray="1.4 2.6"
          opacity="0.5"
        />

        <rect
          x={r}
          y={r}
          width={100 - r * 2}
          height={100 - r * 2}
          rx="8"
          ry="8"
          stroke="url(#heroLightStroke)"
          strokeWidth="0.65"
          opacity="0.75"
        />

        {/* Short spokes toward mid-edge icons — stop before tiles */}
        <path
          d={`M ${r + 4} 50 H ${50 - 16} M ${50 + 16} 50 H ${100 - r - 4}`}
          stroke="url(#heroLightStroke)"
          strokeWidth="0.35"
          opacity="0.4"
        />
        <path
          d={`M 50 ${r + 4} V ${50 - 12} M 50 ${50 + 12} V ${100 - r - 4}`}
          stroke="url(#heroLightStroke)"
          strokeWidth="0.35"
          opacity="0.4"
        />
      </motion.svg>

      {/* Status pill — true center */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 justify-center"
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-light-status inline-flex max-w-[11.5rem] items-center gap-2 rounded-full border border-border bg-surface/95 px-3.5 py-2 text-center text-[0.78rem] leading-tight font-medium text-text shadow-soft backdrop-blur-sm sm:max-w-none sm:px-4 sm:text-[0.8rem]">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent"
            aria-hidden
          />
          {site.status}
        </p>
      </motion.div>

      <OrbitingTechRing
        icons={heroTechIcons}
        radius={FRAME.iconRadius}
        duration={52}
        size="md"
      />
    </div>
  )
}
