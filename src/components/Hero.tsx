import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import heroVisualDark from '../assets/hero-placeholder.png'
import { heroTechIcons } from '../data/heroTechIcons'
import { site } from '../data/site'
import HeroLightVisual from './HeroLightVisual'
import OrbitingTechRing from './OrbitingTechRing'
import Button from './ui/Button'

function decodeImage(src: string) {
  const img = new Image()
  img.decoding = 'async'
  img.src = src

  const waitForLoad = img.complete
    ? Promise.resolve()
    : new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`Failed to load ${src}`))
      })

  return waitForLoad.then(() =>
    typeof img.decode === 'function'
      ? img.decode().catch(() => undefined)
      : undefined,
  )
}

const socialLinks = [
  site.social.linkedin
    ? { label: 'LinkedIn', href: site.social.linkedin, icon: faLinkedin }
    : null,
  { label: 'GitHub', href: site.social.github, icon: faGithub },
  { label: 'Email', href: site.social.email, icon: faEnvelope },
].filter((item): item is NonNullable<typeof item> => Boolean(item))

export default function Hero() {
  const reduced = useReducedMotion()
  const [visualReady, setVisualReady] = useState(false)

  // Pre-decode dark crystal so theme toggles stay instant during View Transitions.
  useEffect(() => {
    let cancelled = false
    decodeImage(heroVisualDark)
      .then(() => {
        if (!cancelled) setVisualReady(true)
      })
      .catch(() => {
        if (!cancelled) setVisualReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.65,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div
        aria-hidden
        className="glow-orb glow-orb-violet absolute top-16 right-[6%] h-72 w-72 opacity-35 sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="glow-orb glow-orb-blue absolute bottom-8 left-[4%] h-56 w-56 opacity-25"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 xl:gap-10">
          <div className="min-w-0">
            <motion.ul
              className="mb-7 flex flex-wrap items-center gap-2.5"
              {...fadeUp(0.04)}
              aria-label="Social links"
            >
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent hover:shadow-soft"
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-sm" />
                  </a>
                </li>
              ))}
            </motion.ul>

            <motion.h1
              className="display-xl text-[2.5rem] text-text sm:text-[2.75rem] md:text-[3rem] lg:text-[3.15rem]"
              {...fadeUp(0.12)}
            >
              Hi, I&apos;m{' '}
              <span className="text-gradient">{site.name}</span>
            </motion.h1>

            <motion.p
              className="mt-3 text-lg font-semibold text-accent-2 sm:text-xl"
              {...fadeUp(0.18)}
            >
              {site.role}
            </motion.p>

            <motion.p
              className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-text-muted sm:text-[1rem]"
              {...fadeUp(0.24)}
            >
              {site.summary}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              {...fadeUp(0.32)}
            >
              <Button
                href={site.resumeUrl}
                icon={faDownload}
                iconPosition="left"
                download={site.resumeFileName}
              >
                Download CV
              </Button>
              <Button
                href="#contact"
                variant="secondary"
                icon={faEnvelope}
                iconPosition="left"
              >
                Hire Me
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[38rem] lg:max-w-none"
            {...fadeUp(0.28)}
          >
            {/* Light: abstract geometry + free-layout icons */}
            <div className="block dark:hidden">
              <HeroLightVisual />
            </div>

            {/* Dark: crystal + circular orbit */}
            <div className="hero-visual-stage relative mx-auto hidden aspect-square w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[520px] dark:block">
              <div
                aria-hidden
                className="hero-crystal-glow pointer-events-none absolute top-1/2 left-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              />

              <OrbitingTechRing
                icons={heroTechIcons}
                radius={46}
                duration={52}
                size="md"
              />

              <div className="relative z-10 h-full w-full">
                <img
                  src={heroVisualDark}
                  alt="Abstract technology illustration for portfolio hero"
                  className={[
                    'hero-visual hero-visual--dark absolute inset-0 h-full w-full object-contain object-center select-none',
                    visualReady ? 'is-ready' : '',
                  ].join(' ')}
                  width={768}
                  height={768}
                  draggable={false}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
