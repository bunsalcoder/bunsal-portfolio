import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useReducedMotion } from 'motion/react'
import { featuredSkills, skillCategories } from '../data/skills'
import Reveal from './ui/Reveal'
import SectionLabel from './ui/SectionLabel'

export default function Skills() {
  const reduced = useReducedMotion()

  return (
    <section id="skills" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Skills & Technologies</SectionLabel>
              <h2 className="display-lg text-[1.65rem] text-text sm:text-[1.85rem] lg:text-[1.95rem]">
                Tools for{' '}
                <span className="text-gradient">real products</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-text-muted sm:text-right">
              A practical map of interface, services, data, and delivery work —
              not a badge wall.
            </p>
          </div>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSkills.map((skill, index) => (
            <Reveal key={skill.id} delay={0.03 * index} as="li">
              <motion.article
                className="group flex h-full items-center gap-3.5 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all duration-200 hover:border-accent/45 hover:shadow-lift"
                whileHover={reduced ? undefined : { y: -2 }}
                transition={{ duration: 0.25 }}
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-bg-alt transition-colors duration-200 group-hover:border-accent/30"
                  style={{ color: skill.tone }}
                >
                  <FontAwesomeIcon icon={skill.icon} className="text-lg" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold tracking-tight text-text">
                    {skill.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-soft">{skill.detail}</p>
                  <span
                    aria-hidden
                    className="mt-2.5 block h-1 w-10 rounded-full bg-gradient-brand opacity-80 transition-all duration-200 group-hover:w-14"
                  />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={0.04 * index}>
              <article className="rounded-2xl border border-border bg-surface/70 p-5 shadow-soft">
                <h3 className="text-sm font-bold tracking-tight text-text">
                  {category.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-text-soft">
                  {category.lens}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
