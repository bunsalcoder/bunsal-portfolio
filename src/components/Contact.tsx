import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faCopy,
  faEnvelope,
  faLocationDot,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { site } from '../data/site'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SectionLabel from './ui/SectionLabel'

function displayHost(url: string) {
  try {
    return new URL(url).host + new URL(url).pathname.replace(/\/$/, '')
  } catch {
    return url
  }
}

const channels = [
  {
    label: 'Email',
    value: site.email,
    href: site.social.email,
    hint: 'Best for opportunities and project talk',
    icon: faEnvelope,
    external: false,
  },
  {
    label: 'GitHub',
    value: displayHost(site.social.github),
    href: site.social.github,
    hint: 'Code, experiments, and public work',
    icon: faGithub,
    external: true,
  },
  ...(site.social.linkedin
    ? [
        {
          label: 'LinkedIn',
          value: displayHost(site.social.linkedin),
          href: site.social.linkedin,
          hint: 'Professional updates and connections',
          icon: faArrowUpRightFromSquare,
          external: true,
        },
      ]
    : []),
]

export default function Contact() {
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="display-lg text-[1.75rem] text-text sm:text-[2rem] lg:text-[2.25rem]">
              Let&apos;s build something{' '}
              <span className="text-gradient">worth shipping</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted sm:text-[0.95rem]">
              Open to roles and collaborations around full-stack product work —
              realtime systems, admin platforms, and interactive experiences.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface p-6 shadow-lift sm:p-8 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_40%,transparent),transparent_70%)] blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent-2)_28%,transparent),transparent_70%)] blur-2xl"
            />

            <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:gap-10">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-soft uppercase">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-gradient-brand"
                    aria-hidden
                  />
                  {site.status}
                </div>

                <p className="annotation mt-5">Primary contact</p>
                <a
                  href={site.social.email}
                  className="group mt-2 inline-flex max-w-full items-center gap-3 break-all text-2xl font-extrabold tracking-tight text-text transition-colors hover:text-accent sm:text-3xl lg:text-[2.35rem]"
                >
                  {site.email}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="hidden text-sm text-accent transition-transform duration-200 group-hover:translate-x-1 sm:inline"
                  />
                </a>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    href={site.social.email}
                    icon={faEnvelope}
                    iconPosition="left"
                  >
                    Send email
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={copyEmail}
                    icon={copied ? faCircleCheck : faCopy}
                    iconPosition="left"
                    ariaLabel={copied ? 'Email copied' : 'Copy email address'}
                  >
                    {copied ? 'Copied' : 'Copy email'}
                  </Button>
                  <Button
                    href={site.resumeUrl}
                    variant="ghost"
                    icon={faArrowUpRightFromSquare}
                    iconPosition="right"
                    external
                  >
                    View CV
                  </Button>
                </div>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2 lg:w-[22rem] lg:grid-cols-1">
                <div className="rounded-2xl border border-border bg-bg/50 px-4 py-3.5 backdrop-blur-sm">
                  <dt className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-text-soft uppercase">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-accent"
                    />
                    Location
                  </dt>
                  <dd className="mt-2 text-sm text-text-muted">{site.location}</dd>
                </div>
                <div className="rounded-2xl border border-border bg-bg/50 px-4 py-3.5 backdrop-blur-sm">
                  <dt className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-text-soft uppercase">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-accent-2"
                    />
                    Availability
                  </dt>
                  <dd className="mt-2 text-sm text-text-muted">
                    {site.availability}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {channels.map((channel, index) => (
              <motion.li
                key={channel.label}
                whileHover={reduced ? undefined : { y: -3 }}
                transition={{ duration: 0.22 }}
              >
                <a
                  href={channel.href}
                  className="group cursor-expand flex h-full items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-200 hover:border-accent/45 hover:shadow-lift"
                  {...(channel.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-alt text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent-muted">
                    <FontAwesomeIcon icon={channel.icon} className="text-sm" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-bold tracking-tight text-text">
                        {channel.label}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.14em] text-text-soft">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-text-soft">
                      {channel.hint}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-text-muted transition-colors group-hover:text-accent">
                      {channel.value}
                      <FontAwesomeIcon
                        icon={
                          channel.external
                            ? faArrowUpRightFromSquare
                            : faArrowRight
                        }
                        className="text-[0.6rem] transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
