import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { processSteps } from '../data/site'
import Reveal from './ui/Reveal'
import SectionLabel from './ui/SectionLabel'

const STEP_HOLD_MS = 5000
const RESUME_AFTER_INTERACT_MS = 6500
const EASE = [0.22, 1, 0.36, 1] as const

export default function Process() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { amount: 0.35 })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [cycleKey, setCycleKey] = useState(0)
  const resumeTimer = useRef<number | null>(null)

  const step = processSteps[active]
  const autoplay = Boolean(inView && !reduced && !paused)

  const goTo = useCallback((index: number, fromUser = false) => {
    setActive(index)
    setCycleKey((key) => key + 1)

    if (!fromUser) return

    setPaused(true)
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false)
      setCycleKey((key) => key + 1)
    }, RESUME_AFTER_INTERACT_MS)
  }, [])

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!autoplay) return

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % processSteps.length)
      setCycleKey((key) => key + 1)
    }, STEP_HOLD_MS)

    return () => window.clearTimeout(timer)
  }, [autoplay, active, cycleKey])

  return (
    <section id="process" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10 max-w-xl">
            <SectionLabel>Approach</SectionLabel>
            <h2 className="display-lg text-[1.7rem] text-text sm:text-[1.95rem] lg:text-[2.1rem]">
              How the work actually{' '}
              <span className="text-gradient">gets done</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              A practical sequence I reuse across platforms, features, and
              system modules — not a ceremony.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={sectionRef}
            className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5"
          >
            {/* Vertical step list */}
            <ol className="flex flex-col gap-2">
              {processSteps.map((item, index) => {
                const isActive = active === index

                return (
                  <li key={item.number}>
                    <button
                      type="button"
                      onClick={() => goTo(index, true)}
                      aria-pressed={isActive}
                      className={[
                        'group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-200 sm:px-5',
                        isActive
                          ? 'border-accent/40 bg-surface shadow-soft'
                          : 'border-border/70 bg-transparent hover:border-border-strong hover:bg-surface/60',
                      ].join(' ')}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="approach-active"
                          className="absolute inset-y-0 left-0 w-1 bg-gradient-brand"
                          transition={{ duration: 0.25, ease: EASE }}
                        />
                      ) : null}

                      <span
                        className={[
                          'mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular-nums transition-colors',
                          isActive
                            ? 'bg-gradient-brand text-white'
                            : 'border border-border bg-bg text-text-soft group-hover:text-text-muted',
                        ].join(' ')}
                      >
                        {item.number}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={[
                            'block text-sm font-bold tracking-tight transition-colors sm:text-[0.95rem]',
                            isActive ? 'text-text' : 'text-text-muted',
                          ].join(' ')}
                        >
                          {item.title}
                        </span>
                        <span
                          className={[
                            'mt-1 block text-xs leading-relaxed transition-opacity',
                            isActive
                              ? 'text-text-soft opacity-100'
                              : 'text-text-soft opacity-70',
                          ].join(' ')}
                        >
                          {item.description}
                        </span>

                        {isActive && autoplay ? (
                          <span className="mt-3 block h-0.5 overflow-hidden rounded-full bg-border">
                            <motion.span
                              key={cycleKey}
                              className="block h-full origin-left rounded-full bg-gradient-brand"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                duration: STEP_HOLD_MS / 1000,
                                ease: 'linear',
                              }}
                            />
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            {/* Featured stage */}
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-lift lg:min-h-full">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_100%_0%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_55%),radial-gradient(ellipse_60%_50%_at_0%_100%,color-mix(in_srgb,var(--accent-2)_18%,transparent),transparent_55%)]"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.number}
                  initial={reduced ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative flex h-full flex-col justify-between p-6 sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="annotation">Step {step.number}</p>
                      <p className="font-mono text-[11px] tracking-wide text-text-soft">
                        {String(active + 1).padStart(2, '0')} /{' '}
                        {String(processSteps.length).padStart(2, '0')}
                      </p>
                    </div>

                    <p
                      aria-hidden
                      className="mt-6 font-mono text-6xl font-extrabold leading-none tracking-tight text-gradient opacity-30 sm:text-7xl"
                    >
                      {step.number}
                    </p>

                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        goTo((active + 1) % processSteps.length, true)
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:brightness-110"
                    >
                      {active === processSteps.length - 1
                        ? 'Back to first step'
                        : 'Next step'}
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-[0.7rem]"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        goTo(
                          (active - 1 + processSteps.length) %
                            processSteps.length,
                          true,
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-text-muted transition-colors hover:border-accent/40 hover:text-text"
                    >
                      Previous
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
