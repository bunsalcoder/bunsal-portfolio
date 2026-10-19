import { faArrowUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import type { Project } from '../data/projects'
import ProjectSchematic from './ProjectSchematic'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

const SECTIONS = [
  ['Overview', 'overview'],
  ['Problem', 'problem'],
  ['Solution', 'solution'],
  ['My role', 'role'],
  ['Challenges', 'challenges'],
  ['Result', 'result'],
] as const

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            aria-label="Close project details"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-border bg-bg-elevated shadow-lift sm:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative border-b border-border">
              <ProjectSchematic project={project} large />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/90 text-text transition-colors hover:border-accent hover:text-accent"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="px-6 pt-6 pb-8 sm:px-8">
              <div className="flex flex-wrap items-center gap-3">
                <p className="annotation">{project.category}</p>
                <span className="text-border-strong" aria-hidden>
                  /
                </span>
                <p className="text-sm text-text-soft">{project.role}</p>
              </div>
              <h3
                id="project-modal-title"
                className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl"
              >
                {project.name}
              </h3>

              <div className="mt-8 space-y-0 border-t border-border">
                {SECTIONS.map(([label, key]) => (
                  <div
                    key={label}
                    className="grid gap-2 border-b border-border py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                  >
                    <h4 className="annotation pt-0.5">{label}</h4>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {project.details[key]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="annotation">Technologies</h4>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-text-muted">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="after:ml-3 after:text-border-strong after:content-['/'] last:after:content-none"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {project.details.screenshots.length > 0 ? (
                <div className="mt-8">
                  <h4 className="annotation">Screenshots</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {project.details.screenshots.map((shot) => (
                      <img
                        key={shot.src}
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        className="border border-border object-cover"
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {(project.links?.live || project.links?.github) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white"
                    >
                      Live demo
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="text-[0.7rem]"
                      />
                    </a>
                  ) : null}
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-text"
                    >
                      GitHub
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="text-[0.7rem]"
                      />
                    </a>
                  ) : null}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
