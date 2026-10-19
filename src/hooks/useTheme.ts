import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'

const THEME_COLORS: Record<Theme, string> = {
  light: '#F4F6FB',
  dark: '#070A27',
}

const THEME_MS = 480

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function applyThemeToDom(next: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', next === 'dark')
  localStorage.setItem('theme', next)

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', THEME_COLORS[next])
  }
}

function supportsViewTransitions() {
  return typeof document.startViewTransition === 'function'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const locked = useRef(false)
  const unlockTimer = useRef<number | null>(null)

  const unlock = useCallback(() => {
    locked.current = false
    document.documentElement.classList.remove('theme-transition')
    if (unlockTimer.current !== null) {
      window.clearTimeout(unlockTimer.current)
      unlockTimer.current = null
    }
  }, [])

  const lockFor = useCallback(
    (ms: number) => {
      locked.current = true
      if (unlockTimer.current !== null) {
        window.clearTimeout(unlockTimer.current)
      }
      unlockTimer.current = window.setTimeout(unlock, ms)
    },
    [unlock],
  )

  const applyTheme = useCallback((next: Theme) => {
    applyThemeToDom(next)
    setThemeState(next)
  }, [])

  // Keep DOM + storage aligned with React state (incl. initial system preference).
  useEffect(() => {
    applyThemeToDom(theme)
  }, [theme])

  const toggleTheme = useCallback(
    (event?: MouseEvent<HTMLButtonElement>) => {
      if (locked.current) return

      const next: Theme = theme === 'light' ? 'dark' : 'light'
      const root = document.documentElement
      const reduced = prefersReducedMotion()
      const canReveal =
        Boolean(event) && supportsViewTransitions() && !reduced

      if (!canReveal) {
        root.classList.add('theme-transition')
        lockFor(THEME_MS + 40)
        applyTheme(next)
        return
      }

      const x = event!.clientX
      const y = event!.clientY
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      lockFor(THEME_MS + 80)

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          applyTheme(next)
        })
      })

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: THEME_MS,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          )
        })
        .catch(() => {
          /* Fallback already applied via flushSync theme change */
        })

      transition.finished.finally(unlock).catch(() => {
        unlock()
      })
    },
    [applyTheme, lockFor, theme, unlock],
  )

  return { theme, setTheme: applyTheme, toggleTheme }
}
