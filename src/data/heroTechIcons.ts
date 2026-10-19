import {
  faCss3Alt,
  faDocker,
  faGithub,
  faGitAlt,
  faHtml5,
  faJava,
  faJs,
  faLaravel,
  faNodeJs,
  faPython,
  faReact,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type HeroTechIcon = {
  label: string
  glow: string
  /** Tailwind text-* brand color for the FA icon */
  colorClass: string
  icon: IconDefinition
}

/** 12 FA icons — shared by dark orbit and light free-layout */
export const heroTechIcons: HeroTechIcon[] = [
  {
    label: 'Node.js',
    icon: faNodeJs,
    colorClass: 'text-[#5FA04E]',
    glow: 'rgba(95, 160, 78, 0.45)',
  },
  {
    label: 'React',
    icon: faReact,
    colorClass: 'text-[#61DAFB]',
    glow: 'rgba(97, 218, 251, 0.45)',
  },
  {
    label: 'JavaScript',
    icon: faJs,
    colorClass: 'text-[#F7DF1E]',
    glow: 'rgba(247, 223, 30, 0.4)',
  },
  {
    label: 'HTML5',
    icon: faHtml5,
    colorClass: 'text-[#E34F26]',
    glow: 'rgba(227, 79, 38, 0.42)',
  },
  {
    label: 'Laravel',
    icon: faLaravel,
    colorClass: 'text-[#FF2D20]',
    glow: 'rgba(255, 45, 32, 0.4)',
  },
  {
    label: 'Vue',
    icon: faVuejs,
    colorClass: 'text-[#42B883]',
    glow: 'rgba(66, 184, 131, 0.45)',
  },
  {
    label: 'Docker',
    icon: faDocker,
    colorClass: 'text-[#2496ED]',
    glow: 'rgba(36, 150, 237, 0.45)',
  },
  {
    label: 'CSS3',
    icon: faCss3Alt,
    colorClass: 'text-[#1572B6]',
    glow: 'rgba(21, 114, 182, 0.42)',
  },
  {
    label: 'Git',
    icon: faGitAlt,
    colorClass: 'text-[#F05032]',
    glow: 'rgba(240, 80, 50, 0.42)',
  },
  {
    label: 'Java',
    icon: faJava,
    colorClass: 'text-[#EA2D2E]',
    glow: 'rgba(234, 45, 46, 0.4)',
  },
  {
    label: 'Python',
    icon: faPython,
    colorClass: 'text-[#3776AB]',
    glow: 'rgba(55, 118, 171, 0.45)',
  },
  {
    label: 'GitHub',
    icon: faGithub,
    colorClass: 'text-[#24292F] dark:text-[#E6EDF3]',
    glow: 'rgba(36, 41, 47, 0.2)',
  },
]
