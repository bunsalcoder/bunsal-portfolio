export type Project = {
  id: string
  name: string
  shortDescription: string
  category: string
  role: string
  technologies: string[]
  accent: string
  featured?: boolean
  links?: {
    live?: string
    github?: string
  }
  details: {
    overview: string
    problem: string
    solution: string
    role: string
    challenges: string
    result: string
    screenshots: { src: string; alt: string }[]
  }
}

export const projects: Project[] = [
  {
    id: 'rean-algorithm',
    name: 'Rean Algorithm',
    shortDescription:
      'Interactive algorithm learning app with sorting, searching, and array/string demos in React.',
    category: 'Learning',
    role: 'Creator · Frontend',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vitest', 'GitHub Pages'],
    accent: '#8B35FF',
    featured: true,
    links: {
      live: 'https://bunsalcoder.github.io/rean-algorithm/',
      github: 'https://github.com/bunsalcoder/rean-algorithm',
    },
    details: {
      overview:
        'A React learning app for algorithms and data structures — roadmap pages, category lessons, and visual demos for sorting, searching, and array/string patterns.',
      problem:
        'Algorithm study is often abstract; learners benefit from step-oriented demos and a clear learning path in the browser.',
      solution:
        'Built a Vite + React + TypeScript app with categorized algorithms, comparison views, visualizer demos, and static deployment to GitHub Pages.',
      role: 'Implemented the learning UI, algorithm modules, routing, and Pages-ready build setup.',
      challenges:
        'Organizing many algorithm modules into a readable roadmap while keeping demos approachable.',
      result:
        'A live algorithm learning experience with interactive demos on GitHub Pages.',
      screenshots: [],
    },
  },
  {
    id: 'rean-linux',
    name: 'Rean Linux',
    shortDescription:
      'Modern Linux learning platform foundation built with Next.js — from beginner topics toward advanced workflows.',
    category: 'Learning',
    role: 'Creator · Full-Stack',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'GitHub Pages'],
    accent: '#6845F5',
    links: {
      live: 'https://bunsalcoder.github.io/rean-linux/',
      github: 'https://github.com/bunsalcoder/rean-linux',
    },
    details: {
      overview:
        'Rean means “Learn” in Khmer. Rean Linux is a practical Linux learning platform intended to cover fundamentals, terminal work, administration, networking, DevOps, and security.',
      problem:
        'Linux education materials are often fragmented; the project needs a clean, scalable app foundation before deep content grows.',
      solution:
        'Shipped a Next.js App Router foundation with TypeScript, Tailwind, accessible UI primitives, static export, and GitHub Actions deploying to GitHub Pages.',
      role: 'Built the application shell, config architecture, tooling, and Pages deploy workflow.',
      challenges:
        'Keeping the platform simple and performant while leaving room for a scalable MDX content tree.',
      result:
        'A live static learning shell ready to grow lesson content on GitHub Pages.',
      screenshots: [],
    },
  },
  {
    id: 'rean-docker',
    name: 'Rean Docker',
    shortDescription:
      'Docker learning path with a full handbook, runnable labs, and a responsive bilingual static site.',
    category: 'Learning',
    role: 'Creator · Full-Stack',
    technologies: ['HTML', 'JavaScript', 'CSS', 'Python', 'Docker', 'Makefile', 'GitHub Pages'],
    accent: '#2878FF',
    links: {
      live: 'https://bunsalcoder.github.io/rean-docker/',
      github: 'https://github.com/bunsalcoder/rean-docker',
    },
    details: {
      overview:
        'Learn Docker from absolute beginner to advanced — guided handbook chapters, labs, Compose workflows, security habits, and a static learning UI.',
      problem:
        'Container tooling is hard to learn without structured lessons and labs that stay aligned with the handbook.',
      solution:
        'Combined Markdown curriculum, lab folders, EN/KM content, sync/check scripts, and CI that publishes to GitHub Pages after checks pass.',
      role: 'Owned curriculum structure, site reader, content sync tooling, and deploy gates.',
      challenges:
        'Preventing English/Khmer content drift and failing deploys when handbook, labs, or site links fall out of sync.',
      result:
        'A live Docker learning site with handbook + labs people can open and follow.',
      screenshots: [],
    },
  },
  {
    id: 'rean-git',
    name: 'Rean Git',
    shortDescription:
      'Hands-on Git learning site — handbook chapters, labs, and bilingual English/Khmer content.',
    category: 'Learning',
    role: 'Creator · Full-Stack',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Python', 'Shell', 'GitHub Pages'],
    accent: '#36DDF5',
    links: {
      live: 'https://bunsalcoder.github.io/rean-git/',
      github: 'https://github.com/bunsalcoder/rean-git',
    },
    details: {
      overview:
        'A guided Git learning platform from beginner through advanced workflows: everyday commands, stash/rebase/bisect, collaboration patterns, and how Git stores history.',
      problem:
        'Git is easy to use poorly and hard to learn deeply without a structured path and practice labs.',
      solution:
        'Built a static learning site with handbook chapters, runnable lab instructions, EN/KM localization, search, and CI content checks deployed on GitHub Pages.',
      role: 'Designed the curriculum structure, site reader, lab catalog, sync scripts, and deployment pipeline.',
      challenges:
        'Keeping handbook sources, generated site Markdown, Khmer structure, and live Pages content in sync without drift.',
      result:
        'A live bilingual Git learning experience people can open immediately and practice against.',
      screenshots: [],
    },
  },
]
