import { projectLogos } from '../assets/projectLogos'

export interface Project {
  id: string
  title: string
  tagline?: string
  description: string
  tags: string[]
  status: 'live' | 'building' | 'archived'
  /** Add PNG to src/assets/ and wire it in projectLogos.ts */
  logo?: string
  links?: {
    demo?: string
    repo?: string
    app?: string
  }
}

export interface PortfolioData {
  name: string
  title: string
  tagline: string
  description: string
  email: string
  github?: string
  linkedin?: string
  skills: string[]
  about: {
    intro: string
    highlights: string[]
    funFacts: string[]
  }
  projects: Project[]
}

export const portfolio: PortfolioData = {
  name: 'kgdev',
  title: 'Software Engineer',
  tagline: 'Building things that compile, scale, and occasionally spark joy.',
  description:
    'I design and ship software with a love for clean architecture, clever algorithms, and interfaces that feel alive. From low-level systems to polished frontends — I like the full stack.',
  email: 'kcgandonou19@gmail.com',
  github: 'https://github.com/kennethoo',
  linkedin: 'https://www.linkedin.com/in/kennethgandonou/',
  skills: [
    'TypeScript',
    'React',
    'HTML',
    'CSS',
    'Node.js',
    'Python',
    'Java',
    'Go',
    'Docker',
    'AWS',
    'MongoDB',
    'WebRTC',
    'System Design',
    'CI/CD',
  ],
  about: {
    intro:
      "I'm an engineer who gets excited about hard problems — whether that's optimizing a hot path, designing a resilient API, or making a UI feel snappy. I believe good code reads like a story and great products feel invisible.",
    highlights: [
      'Passionate about performance & developer experience',
      'Comfortable from database schema to deployment pipeline',
      'Always learning — currently diving deeper into systems & infra',
    ],
    funFacts: [
      '💧 Best code happens after some water and good music',
      '⚡ I measure success in milliseconds saved',
      '🛠 Side projects are my lab bench',
    ],
  },
  projects: [
    {
      id: 'boxyai',
      title: 'BoxyAI',
      tagline: 'Trusted by movers, makers & small teams',
      description:
        "Know exactly what's in every box you own. Write a number on any box, scan it with BoxyAI, and turn messy storage into a live, searchable inventory powered by AI. Web + iOS — same account, scan in two taps, find anything in seconds.",
      tags: ['AI', 'iOS', 'Web', 'Inventory'],
      status: 'live',
      logo: projectLogos.boxyai,
      links: {
        app: 'https://apps.apple.com/us/app/boxyai/id6753580882',
        demo: 'https://boxyai.app',
      },
    },
    {
      id: 'floowguard',
      title: 'Floowguard',
      tagline: 'Control plane for product abuse',
      description:
        'Floowguard is a control plane for product abuse: define policies in the dashboard, enforce them with a tiny SDK in your API, stream structured logs, and watch traffic roll up per workspace—without bolting on five different tools.',
      tags: ['SDK', 'API', 'Security', 'SaaS'],
      status: 'live',
      logo: projectLogos.floowguard,
      links: {
        demo: 'https://floowguard.com/',
      },
    },
    {
      id: 'spendio',
      title: 'Spendio',
      tagline: 'Understand where your money actually goes',
      description:
        'Upload CSV or PDF statements and get instant money-in / money-out, top merchants, and clean reports—without connecting your bank. Clear monthly views, net cash flow at a glance, and insights into where you spent.',
      tags: ['FinTech', 'PDF', 'CSV', 'Analytics'],
      status: 'live',
      logo: projectLogos.spendio,
      links: {
        demo: 'https://spendioapp.com/',
      },
    },
    {
      id: 'meettum',
      title: 'Meettum',
      tagline: 'Meetings and client management, simplified',
      description:
        'Create, schedule, join, and manage meetings from one place. Set availability, share booking links, track daily tasks, and cut no-shows with reminder emails. Calendar view, upcoming meetings, profiles, dark/light mode, and join via web—built for teams that live in their schedule.',
      tags: ['SaaS', 'Scheduling', 'Calendar', 'Web'],
      status: 'live',
      logo: projectLogos.meettum,
      links: {
        repo: 'https://github.com/meettum',
      },
    },
    {
      id: 'morpionai',
      title: 'MorpionAi',
      tagline: 'Tic-Tac-Toe gaming platform',
      description:
        'React + TypeScript frontend for a modern Tic-Tac-Toe experience—real-time multiplayer tournaments with matchmaking, dynamic board sizing (3×3 up to 6×6), local and AI practice with minimax, live leaderboards, WebSocket gameplay, dark/light mode, and a responsive gaming UI.',
      tags: ['React', 'TypeScript', 'Socket.IO', 'Gaming', 'AI'],
      status: 'live',
      logo: projectLogos.morpionai,
      links: {
        repo: 'https://github.com/MorpionAi',
      },
    },
    {
      id: 'meetcode',
      title: 'Meetcode',
      tagline: 'Run code and collaborate in real time',
      description:
        'A real-time collaborative coding environment where people write, run, and share code together. Built-in auth, live multi-user editing, and integrated video for remote technical interviews—pair programming and hiring in one place.',
      tags: ['WebRTC', 'Real-time', 'Collaboration', 'Interviews'],
      status: 'live',
      links: {
        repo: 'https://github.com/meettum/meetcode-web/tree/main',
      },
    },
    {
      id: 'auth-api',
      title: 'Auth API',
      tagline: 'Open-source authentication microservice',
      description:
        'Stateless JWT auth built with Node.js, Express, and MongoDB—register, login, token refresh, and secure logout. Password hashing, short-lived access tokens, refresh tokens in HTTP-only cookies, email verification with OTP, and health checks—ready to plug into any frontend.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Open Source'],
      status: 'live',
      links: {
        repo: 'https://github.com/kennethoo/auth-api',
      },
    },
  ],
}
