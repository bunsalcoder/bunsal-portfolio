import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import { projects, type Project } from '../data/projects'
import ProjectModal from './ProjectModal'
import ProjectSchematic from './ProjectSchematic'
import Reveal from './ui/Reveal'
import SectionLabel from './ui/SectionLabel'

function ProjectLinks({ project }: { project: Project }) {
  if (!project.links?.live && !project.links?.github) return null

  return (
    <div className="flex flex-wrap gap-2">
      {project.links.live ? (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
          onClick={(event) => event.stopPropagation()}
        >
          Live
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-[0.6rem]"
          />
        </a>
      ) : null}
      {project.links.github ? (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:border-accent hover:text-accent"
          onClick={(event) => event.stopPropagation()}
        >
          GitHub
        </a>
      ) : null}
    </div>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      className="group flex h-full min-w-[260px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-colors duration-200 hover:border-accent/45 hover:shadow-lift sm:min-w-[280px] lg:min-w-0"
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="cursor-expand text-left"
        aria-label={`Open details for ${project.name}`}
      >
        <ProjectSchematic project={project} compact />
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-bold tracking-tight text-text sm:text-[0.95rem]">
              {project.name}
            </h3>
            <p className="mt-1 text-[11px] text-text-soft sm:text-xs">
              {project.category} · {project.role}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg-alt text-text-muted transition-all duration-200 hover:border-accent hover:bg-gradient-brand hover:text-white"
            aria-label={`View ${project.name} details`}
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-[0.7rem]" />
          </button>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-text-muted sm:text-sm">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)

  const scrollByCard = (direction: -1 | 1) => {
    const node = scrollerRef.current
    if (!node) return
    const amount = Math.min(320, node.clientWidth * 0.8)
    node.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
            <div>
              <SectionLabel>Selected work</SectionLabel>
              <h2 className="display-lg text-[1.65rem] text-text sm:text-[1.85rem] lg:text-[1.95rem]">
                My creative{' '}
                <span className="text-gradient">projects</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
                Algorithms, Linux, Docker, and Git — each with a live GitHub
                Pages demo and public source.
              </p>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="Previous projects"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="Next projects"
              >
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <ul
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project) => (
              <li
                key={project.id}
                className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto lg:shrink"
              >
                <ProjectCard project={project} onOpen={setActive} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
