import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faAws,
  faDocker,
  faGithub,
  faJava,
  faJs,
  faLaravel,
  faNodeJs,
  faReact,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons'
import { faDatabase, faLeaf } from '@fortawesome/free-solid-svg-icons'

export type SkillCategory = {
  id: string
  title: string
  lens: string
  skills: string[]
}

export type FeaturedSkill = {
  id: string
  name: string
  detail: string
  icon: IconDefinition
  tone: string
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Interfaces',
    lens: 'Responsive product UI, admin surfaces, and interactive client flows',
    skills: [
      'React',
      'Next.js',
      'Vue',
      'Nuxt',
      'TypeScript',
      'Tailwind CSS',
      'MUI',
      'React Native',
    ],
  },
  {
    id: 'backend',
    title: 'Services',
    lens: 'APIs, business logic, scheduled jobs, and realtime channels',
    skills: [
      'Java',
      'Spring Boot',
      'Node.js',
      'Nest.js',
      'Express',
      'Laravel',
      'PHP',
      'WebSocket',
    ],
  },
  {
    id: 'database',
    title: 'Data',
    lens: 'Modeling, queries, and persistence across relational and document stores',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Knex', 'Sequelize', 'TypeORM'],
  },
  {
    id: 'tools',
    title: 'Delivery',
    lens: 'Versioning, containers, cloud targets, and CI that keep releases moving',
    skills: [
      'Git',
      'Docker',
      'AWS',
      'Azure',
      'GitLab CI',
      'Jenkins',
      'Jira',
      'Postman',
    ],
  },
]

/** Highlighted stack — no invented proficiency percentages */
export const featuredSkills: FeaturedSkill[] = [
  {
    id: 'react',
    name: 'React',
    detail: 'Interfaces · product UI',
    icon: faReact,
    tone: '#61DAFB',
  },
  {
    id: 'next',
    name: 'Next.js',
    detail: 'Interfaces · app platforms',
    icon: faReact,
    tone: '#A78BFF',
  },
  {
    id: 'vue',
    name: 'Vue / Nuxt',
    detail: 'Interfaces · SPA & SSR',
    icon: faVuejs,
    tone: '#42B883',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    detail: 'Interfaces · typed clients',
    icon: faJs,
    tone: '#3178C6',
  },
  {
    id: 'spring',
    name: 'Spring Boot',
    detail: 'Services · Java APIs',
    icon: faLeaf,
    tone: '#6DB33F',
  },
  {
    id: 'node',
    name: 'Node.js',
    detail: 'Services · Nest & Express',
    icon: faNodeJs,
    tone: '#68A063',
  },
  {
    id: 'laravel',
    name: 'Laravel',
    detail: 'Services · PHP platforms',
    icon: faLaravel,
    tone: '#FF2D20',
  },
  {
    id: 'java',
    name: 'Java',
    detail: 'Services · backend logic',
    icon: faJava,
    tone: '#ED8B00',
  },
  {
    id: 'sql',
    name: 'MySQL / Postgres',
    detail: 'Data · relational stores',
    icon: faDatabase,
    tone: '#336791',
  },
  {
    id: 'docker',
    name: 'Docker',
    detail: 'Delivery · containers',
    icon: faDocker,
    tone: '#2496ED',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    detail: 'Delivery · versioning',
    icon: faGithub,
    tone: '#F5F6FF',
  },
  {
    id: 'aws',
    name: 'AWS / Azure',
    detail: 'Delivery · cloud targets',
    icon: faAws,
    tone: '#FF9900',
  },
]
