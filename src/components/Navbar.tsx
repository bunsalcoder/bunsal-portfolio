import { faBars, faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type MouseEvent } from 'react'
import { site } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'
import type { Theme } from '../hooks/useTheme'

type NavbarProps = {
  theme: Theme
  onToggleTheme: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const scrolled = useScrolled(16)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#top')
  const reduced = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const sectionIds = site.nav
      .map((item) => item.href.replace('#', ''))
      .filter(Boolean)

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActive(`#${visible[0].target.id}`)
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
        initial={reduced ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={[
            'mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border px-3 py-2 transition-all duration-300 sm:px-4',
            scrolled
              ? 'border-border bg-[var(--nav-bg)] shadow-soft backdrop-blur-xl'
              : 'border-border/70 bg-[var(--nav-bg)]/80 shadow-soft backdrop-blur-xl',
          ].join(' ')}
          aria-label="Primary"
        >
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 rounded-full py-0.5 pr-1 transition-opacity hover:opacity-80"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-brand text-[0.8rem] font-extrabold text-white shadow-soft"
              aria-hidden
            >
              B
            </span>
            <span className="text-[0.95rem] font-bold tracking-tight text-text">
              {site.name}
            </span>
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
            {site.nav.map((item) => {
              const isActive = active === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setActive(item.href)}
                    className={[
                      'relative rounded-full px-2.5 py-1.5 text-[12px] font-semibold transition-colors duration-200 lg:px-3',
                      isActive
                        ? 'text-text'
                        : 'text-text-muted hover:text-text',
                    ].join(' ')}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand"
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-border px-3 py-1.5 text-[12px] font-semibold text-text-muted transition-colors hover:border-accent/45 hover:text-text md:inline-flex"
            >
              View CV
            </a>

            <div className="flex items-center gap-1 rounded-full border border-border/80 bg-bg/40 p-1">
              <button
                type="button"
                onClick={(event) => {
                  if (theme !== 'dark') onToggleTheme(event)
                }}
                className={[
                  'inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
                  theme === 'dark'
                    ? 'bg-gradient-brand text-white shadow-soft'
                    : 'text-text-muted hover:text-text',
                ].join(' ')}
                aria-label="Switch to dark mode"
                aria-pressed={theme === 'dark'}
              >
                <FontAwesomeIcon icon={faMoon} className="text-[0.7rem]" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  if (theme !== 'light') onToggleTheme(event)
                }}
                className={[
                  'inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
                  theme === 'light'
                    ? 'bg-gradient-brand text-white shadow-soft'
                    : 'text-text-muted hover:text-text',
                ].join(' ')}
                aria-label="Switch to light mode"
                aria-pressed={theme === 'light'}
              >
                <FontAwesomeIcon icon={faSun} className="text-[0.7rem]" />
              </button>
            </div>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-sm" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg/96 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-full flex-col px-6 pt-24 pb-10">
              <ul className="flex flex-col gap-1">
                {site.nav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.35 }}
                  >
                    <a
                      href={item.href}
                      className={[
                        'block rounded-xl px-2 py-3 text-2xl font-bold tracking-tight',
                        active === item.href ? 'text-gradient' : 'text-text',
                      ].join(' ')}
                      onClick={() => {
                        setActive(item.href)
                        setOpen(false)
                      }}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                View CV
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
