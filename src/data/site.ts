export const site = {
  name: 'Bunsal',
  fullName: 'Bunsal',
  role: 'Software Engineer · Full-Stack Developer',
  email: 'hul.bunsal@gmail.com',
  location: 'Based in Phnom Penh, Cambodia',
  locationShort: 'Phnom Penh',
  availability: 'Open to interesting opportunities',
  status: 'Open to opportunities',
  resumeUrl: '/docs/Bunsal - FullStack Application.pdf',
  resumeFileName: 'Bunsal - FullStack Application.pdf',
  summary:
    'I build scalable web applications, entertainment mini-apps, real-time multiplayer features, e-commerce flows, and fundraising systems using Spring Boot, Laravel, Node.js, React, Next.js, Vue, and Nuxt.',
  social: {
    github: 'https://github.com/bunsalcoder',
    linkedin: '',
    email: 'mailto:hul.bunsal@gmail.com',
  },
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
} as const

export const aboutStats = [
  { value: '4+', label: 'Years' },
  { value: '4', label: 'Roles' },
  { value: '4', label: 'Public apps' },
] as const

export const focusAreas = [
  {
    id: 'realtime',
    title: 'Real-time systems',
    note: 'WebSocket multiplayer, live state, turn-based sync',
    href: '#projects',
  },
  {
    id: 'platforms',
    title: 'Product platforms',
    note: 'Admin tools, fundraising flows, e-commerce features',
    href: '#projects',
  },
  {
    id: 'interactive',
    title: 'Interactive products',
    note: 'Mini-apps, games, and constrained entertainment UIs',
    href: '#projects',
  },
] as const

export const education = [
  {
    degree: 'B.A. Computer Science',
    school: 'University of Puthisastra',
    period: '2022 — 2024',
  },
  {
    degree: 'A.S. Information Technology',
    school: 'Passerelles Numériques Cambodia',
    period: '2019 — 2021',
  },
] as const

export const processSteps = [
  {
    number: '01',
    title: 'Map the problem',
    description:
      'Clarify constraints, users, and failure modes before choosing a stack.',
  },
  {
    number: '02',
    title: 'Shape the system',
    description:
      'Sketch data flow, interfaces, and ownership so the architecture stays readable.',
  },
  {
    number: '03',
    title: 'Ship in slices',
    description:
      'Deliver maintainable pieces that can be tested, reviewed, and released early.',
  },
  {
    number: '04',
    title: 'Harden what matters',
    description:
      'Tighten edge cases, performance, and clarity where real users feel the difference.',
  },
] as const
