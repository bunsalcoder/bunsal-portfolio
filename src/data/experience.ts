export type ExperienceItem = {
  id: string
  company: string
  position: string
  period: string
  description: string
  highlights: string[]
  technologies: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'metathought',
    company: 'Metathought Technology',
    position: 'Full-Stack Engineer',
    period: 'Jul 2025 — Present',
    description:
      'Building scalable full-stack applications across Spring Boot, React, and Vue — including entertainment mini-apps, real-time multiplayer features, fundraising systems, and e-commerce flows.',
    highlights: [
      'Develop scalable applications with Java Spring Boot, React.js, and Vue.js',
      'Create and maintain backend APIs, business logic, and scheduled jobs with XXL-Job',
      'Build responsive interfaces for mobile, tablet, and desktop',
      'Ship interactive mini-games and multiplayer gameplay with WebSocket',
      'Develop charity/fundraising systems and entertainment prediction apps',
      'Maintain e-commerce features, integrate third-party APIs, and support production',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'React',
      'Vue',
      'WebSocket',
      'XXL-Job',
      'REST API',
      'MySQL',
    ],
  },
  {
    id: 'infinity',
    company: 'Infinity Information & App Dev',
    position: 'Full-Stack Developer',
    period: 'Dec 2023 — Jun 2025',
    description:
      'Developed modern full-stack products with Laravel, Node.js, React, Next.js, Vue, and Nuxt — from APIs and payments to reusable UI modules and production releases.',
    highlights: [
      'Built full-stack applications with Laravel, Node.js, React, Next.js, Vue, and Nuxt',
      'Designed and maintained scalable backend APIs and services',
      'Integrated external APIs, payment systems, and third-party platforms',
      'Worked with UI/UX teams on responsive, user-friendly interfaces',
      'Wrote unit tests with Jest and TypeScript, and supported deployments',
    ],
    technologies: [
      'Laravel',
      'Node.js',
      'React',
      'Next.js',
      'Vue',
      'Nuxt',
      'TypeScript',
      'Jest',
    ],
  },
  {
    id: 'ltlabs',
    company: 'LTlabs',
    position: 'Junior Software Engineer',
    period: 'May 2022 — Dec 2023',
    description:
      'Built and maintained Node.js/Express services and React interfaces, with a focus on clean APIs, MySQL data modeling, and collaborative Agile delivery.',
    highlights: [
      'Developed server-side applications with Node.js and Express',
      'Built responsive UIs with React and integrated frontend with backend APIs',
      'Worked with MySQL and ORM tooling such as Knex.js',
      'Designed documented REST APIs with authentication and authorization',
      'Managed tasks in Jira and tested APIs with Postman and Insomnia',
    ],
    technologies: [
      'Node.js',
      'Express',
      'React',
      'MySQL',
      'Knex.js',
      'REST API',
      'Git',
      'Jira',
    ],
  },
  {
    id: 'mango-byte',
    company: 'Mango Byte',
    position: 'Full Stack Web Development Intern',
    period: 'Jan 2022 — May 2022',
    description:
      'Contributed to web applications using Laravel, Nest.js, and Nuxt.js, collaborating with designers and product teams on responsive, cross-browser experiences.',
    highlights: [
      'Developed features with Laravel, Nest.js, Nuxt.js, Vuex, Vuetify, and Tailwind CSS',
      'Collaborated with designers, product managers, and developers',
      'Implemented responsive design and cross-browser compatibility',
      'Participated in code reviews and team feedback loops',
    ],
    technologies: [
      'Laravel',
      'Nest.js',
      'Nuxt.js',
      'Vuex',
      'Vuetify',
      'Tailwind CSS',
    ],
  },
]
