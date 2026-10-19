import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import profileDark from '../assets/profile.jpg'
import profileLight from '../assets/profile-light.jpg'
import { aboutStats, site } from '../data/site'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SectionLabel from './ui/SectionLabel'

export default function About() {
  return (
    <section id="about" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_32%,transparent)_0%,color-mix(in_srgb,var(--accent-2)_14%,transparent)_48%,transparent_72%)] blur-2xl opacity-45 dark:opacity-100"
            />

            <div className="relative mx-auto aspect-square w-[82%] max-w-[280px]">
              <div className="absolute inset-0 rounded-full bg-gradient-brand p-[3px] shadow-lift">
                <div className="profile-frame relative h-full w-full overflow-hidden rounded-full bg-bg">
                  <img
                    src={profileDark}
                    alt={`${site.name} — profile`}
                    className="profile-photo absolute inset-0 hidden h-full w-full object-cover object-[48%_14%] dark:block"
                    width={800}
                    height={533}
                    loading="lazy"
                    draggable={false}
                  />
                  <img
                    src={profileLight}
                    alt=""
                    aria-hidden
                    className="profile-photo absolute inset-0 block h-full w-full object-cover object-[48%_14%] dark:hidden"
                    width={800}
                    height={533}
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Soft edge fade only — keep the face clear */}
                  <div
                    aria-hidden
                    className="profile-edge pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_34%,transparent_42%,color-mix(in_srgb,var(--bg)_45%,transparent)_72%,var(--bg)_92%)]"
                  />
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 rounded-full border border-accent/20"
              />
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <SectionLabel>About Me</SectionLabel>
              <h2 className="display-lg text-[1.65rem] text-text sm:text-[1.85rem] lg:text-[1.95rem]">
                Turning ideas into{' '}
                <span className="text-gradient">digital systems</span>
              </h2>
              <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-text-muted">
                <p>
                  I&apos;m a full-stack developer working across Spring Boot,
                  Laravel, Node.js, React, Next.js, Vue, and Nuxt — shipping
                  interfaces and services as one connected system rather than
                  separate halves.
                </p>
                <p>
                  Day to day that means entertainment mini-apps, multiplayer
                  features over WebSocket, e-commerce flows, and fundraising
                  systems. I collaborate with designers, developers, and product
                  teams to keep solutions efficient and usable.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 grid grid-cols-3 gap-3">
                {aboutStats.map((stat) => (
                  <li
                    key={stat.label}
                    className="rounded-2xl border border-border bg-surface px-3 py-4 text-center shadow-soft transition-colors duration-200 hover:border-accent/40"
                  >
                    <p className="text-xl font-extrabold tracking-tight text-gradient sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-text sm:text-xs">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8">
                <Button
                  href="#contact"
                  icon={faArrowRight}
                  iconPosition="right"
                >
                  Let&apos;s Talk
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
