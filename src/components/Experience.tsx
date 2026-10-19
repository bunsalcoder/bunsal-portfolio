import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react'
import { useId, useState } from 'react'
import { experience } from '../data/experience'
import { education } from '../data/site'
import Reveal from './ui/Reveal'
import SectionLabel from './ui/SectionLabel'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Experience() {
  const reduced = useReducedMotion()
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null)

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <div className="bg-section-alt">
      {/* Education — no nav target */}
      <section className="scroll-mt-28 py-20 sm:pt-28 sm:pb-4">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-8 max-w-lg">
              <SectionLabel>Education</SectionLabel>
              <h2 className="display-lg text-[1.7rem] text-text sm:text-[1.95rem] lg:text-[2.1rem]">
                Academic{' '}
                <span className="text-gradient">foundation</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                From foundational IT training to a computer science degree.
              </p>
            </div>

            <ul className="divide-y divide-border border-t border-border">
              {education.map((item, index) => (
                <li
                  key={item.degree}
                  className="grid gap-4 py-6 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="font-mono text-xs font-semibold tracking-[0.16em] text-accent-2 uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight text-text sm:text-xl">
                      {item.degree}
                    </h3>
                    <p className="mt-1.5 text-sm text-text-muted">
                      {item.school}
                    </p>
                  </div>

                  <p className="text-sm font-semibold tracking-wide text-text-soft sm:text-right">
                    {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Experience — nav lands here */}
      <section
        id="experience"
        className="scroll-mt-28 border-t border-border py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-8 max-w-xl">
              <SectionLabel>Experience</SectionLabel>
              <h2 className="display-lg text-[1.7rem] text-text sm:text-[1.95rem] lg:text-[2.1rem]">
                Roles &{' '}
                <span className="text-gradient">Milestones</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                From internships to full-stack engineering — APIs, interfaces,
                realtime features, and production support. Expand a role for
                highlights and stack.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="space-y-3">
              {experience.map((item, index) => {
                const isOpen = openId === item.id
                const panelId = `${baseId}-panel-${item.id}`
                const buttonId = `${baseId}-button-${item.id}`

                return (
                  <li key={item.id}>
                    <article
                      className={[
                        'overflow-hidden rounded-2xl border transition-colors duration-200',
                        isOpen
                          ? 'border-accent/40 bg-surface shadow-soft'
                          : 'border-border bg-surface/70 hover:border-border-strong',
                      ].join(' ')}
                    >
                      <h3 className="sr-only">
                        {item.position} at {item.company}
                      </h3>

                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(item.id)}
                        className="flex w-full items-start gap-4 px-4 py-4 text-left sm:items-center sm:gap-5 sm:px-5 sm:py-5"
                      >
                        <span
                          className={[
                            'mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold tabular-nums sm:mt-0',
                            isOpen
                              ? 'bg-gradient-brand text-white'
                              : 'border border-border bg-bg-alt text-text-soft',
                          ].join(' ')}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-base font-bold tracking-tight text-text sm:text-lg">
                              {item.position}
                            </span>
                            {index === 0 ? (
                              <span className="rounded-full border border-accent/30 bg-accent-muted px-2 py-0.5 text-[10px] font-semibold tracking-wide text-accent-soft uppercase">
                                Present
                              </span>
                            ) : null}
                          </span>
                          <span className="mt-1 block text-sm text-text-muted">
                            {item.company}
                          </span>
                        </span>

                        <span className="hidden shrink-0 text-right sm:block">
                          <span
                            className={[
                              'block text-xs font-semibold tracking-wide',
                              isOpen ? 'text-accent' : 'text-text-soft',
                            ].join(' ')}
                          >
                            {item.period}
                          </span>
                        </span>

                        <span
                          className={[
                            'mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-text-soft transition-transform duration-200 sm:mt-0',
                            isOpen ? 'rotate-180 border-accent/40 text-accent' : '',
                          ].join(' ')}
                          aria-hidden
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-[0.7rem]"
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={
                              reduced
                                ? false
                                : { height: 0, opacity: 0 }
                            }
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={
                              reduced
                                ? undefined
                                : { height: 0, opacity: 0 }
                            }
                            transition={{ duration: 0.32, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-border px-4 pt-4 pb-5 sm:px-5 sm:pt-5 sm:pb-6 sm:pl-[4.25rem]">
                              <p className="text-xs font-semibold tracking-wide text-accent sm:hidden">
                                {item.period}
                              </p>

                              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-0">
                                {item.description}
                              </p>

                              <ul className="mt-5 space-y-2.5">
                                {item.highlights.map((highlight) => (
                                  <li
                                    key={highlight}
                                    className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                                  >
                                    <span
                                      aria-hidden
                                      className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent-2"
                                    />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>

                              <p className="mt-5 text-[11px] font-semibold tracking-[0.14em] text-text-soft uppercase">
                                Stack
                              </p>
                              <ul className="mt-2.5 flex flex-wrap gap-2">
                                {item.technologies.map((tech) => (
                                  <li
                                    key={tech}
                                    className="rounded-full border border-border bg-bg-alt px-2.5 py-1 text-[11px] font-medium text-text-muted"
                                  >
                                    {tech}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </article>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
