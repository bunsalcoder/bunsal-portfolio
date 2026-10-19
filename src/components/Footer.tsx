import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { site } from '../data/site'

const social = [
  { label: 'GitHub', href: site.social.github, icon: faGithub },
  { label: 'LinkedIn', href: site.social.linkedin, icon: faLinkedin },
  { label: 'Email', href: site.social.email, icon: faEnvelope },
].filter((item) => Boolean(item.href))

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-sm font-extrabold text-white"
            aria-hidden
          >
            B
          </span>
          <div>
            <p className="text-sm font-bold tracking-tight text-text">
              {site.fullName}
            </p>
            <p className="mt-0.5 text-xs text-text-soft">{site.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-soft"
              {...(item.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <FontAwesomeIcon icon={item.icon} className="text-sm" />
            </a>
          ))}
        </div>

        <p className="text-xs text-text-soft sm:text-right">
          © {YEAR} {site.fullName}
        </p>
      </div>
    </footer>
  )
}
