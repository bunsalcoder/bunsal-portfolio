import { animate, motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, .cursor-expand'

function canUseCustomCursor() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(pointer: coarse)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function isDarkTheme() {
  return document.documentElement.classList.contains('dark')
}

export default function CustomCursor() {
  const [active, setActive] = useState(canUseCustomCursor)
  const [dark, setDark] = useState(() =>
    typeof document === 'undefined' ? true : isDarkTheme(),
  )

  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)

  const orbX = useSpring(pointerX, { stiffness: 280, damping: 28, mass: 0.45 })
  const orbY = useSpring(pointerY, { stiffness: 280, damping: 28, mass: 0.45 })

  const cursorOpacity = useMotionValue(0)
  const orbScale = useMotionValue(1)
  const coreScale = useMotionValue(1)

  useEffect(() => {
    const syncTheme = () => setDark(isDarkTheme())
    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const coarse = window.matchMedia('(pointer: coarse)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const refreshSupport = () => {
      const enabled = canUseCustomCursor()
      setActive(enabled)
      if (!enabled) {
        document.documentElement.classList.remove('has-custom-cursor')
        cursorOpacity.set(0)
      }
    }

    if (!canUseCustomCursor()) {
      fine.addEventListener('change', refreshSupport)
      coarse.addEventListener('change', refreshSupport)
      reduced.addEventListener('change', refreshSupport)
      return () => {
        fine.removeEventListener('change', refreshSupport)
        coarse.removeEventListener('change', refreshSupport)
        reduced.removeEventListener('change', refreshSupport)
      }
    }

    document.documentElement.classList.add('has-custom-cursor')

    let hovering = false

    const setHover = (next: boolean) => {
      if (hovering === next) return
      hovering = next

      animate(orbScale, next ? 1.65 : 1, {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      })
      animate(coreScale, next ? 0.35 : 1, {
        duration: 0.16,
        ease: [0.22, 1, 0.36, 1],
      })
    }

    const onMove = (event: MouseEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      if (cursorOpacity.get() === 0) {
        animate(cursorOpacity, 1, { duration: 0.12, ease: 'easeOut' })
      }
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      setHover(Boolean(target.closest(INTERACTIVE)))
    }

    const onLeave = () => {
      animate(cursorOpacity, 0, { duration: 0.1, ease: 'easeOut' })
      setHover(false)
    }

    const onVisibility = () => {
      if (document.hidden) {
        cursorOpacity.set(0)
        setHover(false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    fine.addEventListener('change', refreshSupport)
    coarse.addEventListener('change', refreshSupport)
    reduced.addEventListener('change', refreshSupport)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      fine.removeEventListener('change', refreshSupport)
      coarse.removeEventListener('change', refreshSupport)
      reduced.removeEventListener('change', refreshSupport)
    }
  }, [active, coreScale, cursorOpacity, orbScale, pointerX, pointerY])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
    >
      {/* Soft trailing orb */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 will-change-transform"
        style={{
          x: orbX,
          y: orbY,
          translateX: '-50%',
          translateY: '-50%',
          scale: orbScale,
          opacity: cursorOpacity,
        }}
      >
        <div
          className="h-10 w-10 rounded-full"
          style={
            dark
              ? {
                  background:
                    'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45), transparent 45%), linear-gradient(135deg, #8B35FF 0%, #2878FF 100%)',
                  opacity: 0.55,
                  filter: 'blur(0.2px)',
                  boxShadow: '0 0 24px rgba(139, 53, 255, 0.45)',
                }
              : {
                  background:
                    'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65), transparent 42%), linear-gradient(135deg, #7A2EF0 0%, #2878FF 100%)',
                  opacity: 0.72,
                  boxShadow:
                    '0 4px 16px rgba(13, 18, 48, 0.18), 0 0 20px rgba(122, 46, 240, 0.35)',
                }
          }
        />
      </motion.div>

      {/* Crisp core that tracks the pointer exactly */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 will-change-transform"
        style={{
          x: pointerX,
          y: pointerY,
          translateX: '-50%',
          translateY: '-50%',
          scale: coreScale,
          opacity: cursorOpacity,
        }}
      >
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={
            dark
              ? {
                  backgroundColor: '#F5F6FF',
                  boxShadow: '0 0 10px rgba(245, 246, 255, 0.7)',
                }
              : {
                  backgroundColor: '#FFFFFF',
                  boxShadow:
                    '0 0 0 1.5px #0d1230, 0 2px 8px rgba(13, 18, 48, 0.28)',
                }
          }
        />
      </motion.div>
    </div>
  )
}
