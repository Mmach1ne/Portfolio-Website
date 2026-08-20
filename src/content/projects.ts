export type ProjectLinkKind = 'github' | 'demo' | 'pdf' | 'comingSoon';

export type ProjectLink = {
  kind: ProjectLinkKind;
  href: string;
  label: string;
};

export type ProjectVisual =
  | 'stm32'
  | 'clothingMl'
  | 'harmoni'
  | 'thermal'
  | 'raybot'
  | 'transit'
  | 'audiolog';

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  visual: ProjectVisual;
  showProjectsHeading?: boolean;
};

export const projects: Project[] = [
  {
    id: 'stm32',
    slug: 'stm32-comms',
    title: 'STM32 Comms',
    subtitle: 'Dual Channel Communication System',
    description:
      'Advanced embedded system built with STM32F407VGT6 microcontroller, featuring real-time Keystroke Logging, GPIO control, and UART communication.',
    tech: ['C', 'Embedded', 'UART'],
    links: [
      { kind: 'github', href: 'https://github.com/Mmach1ne/ECE-198-RJD', label: 'VIEW CODE' },
      { kind: 'pdf', href: '/STM32Comms.pdf', label: 'LEARN MORE' },
    ],
    visual: 'stm32',
    showProjectsHeading: true,
  },
  {
    id: 'clothing-ml',
    slug: 'clothing-ml',
    title: 'CLOTHING ML',
    subtitle: 'Categorization Neural Network',
    description:
      'Advanced deep learning model built with PyTorch framework and CNN architecture. Featuring real-time image classification, fashion category detection, and 94% accuracy.',
    tech: ['Python', 'PyTorch', 'CNN'],
    links: [
      { kind: 'comingSoon', href: '/coming-soon', label: 'VIEW CODE' },
      { kind: 'comingSoon', href: '/coming-soon', label: 'LEARN MORE' },
    ],
    visual: 'clothingMl',
  },
  {
    id: 'harmoni',
    slug: 'harmoni',
    title: 'HARMONI',
    subtitle: 'Music Social Platform',
    description:
      'Next-generation social media platform integrating real-time communication with intelligent AI integration. Built with Python backend, JavaScript frontend, and OpenAI API for seamless user interactions.',
    tech: ['Python', 'React', 'OpenAI'],
    links: [{ kind: 'github', href: 'https://github.com/yanxue06/HarmoniQ', label: 'View Code' }],
    visual: 'harmoni',
  },
  {
    id: 'thermal',
    slug: 'thermal-dynamics',
    title: 'THERMAL DYNAMICS',
    subtitle: 'Heatsink Dissipation Study',
    description:
      'Comprehensive research paper analyzing heat dissipation mechanisms in modern heatsink designs. Computational fluid dynamics simulations coupled with experimental validation for optimal thermal performance.',
    tech: ['Research', 'CFD', 'SimScale'],
    links: [{ kind: 'pdf', href: '/ThermalDynamic.pdf', label: 'READ PAPER' }],
    visual: 'thermal',
  },
  {
    id: 'raybot',
    slug: 'raybot',
    title: 'RAYBOT',
    subtitle: 'Intelligent Conversational Agent',
    description:
      'Python-based chatbot with modular skills system, persistent memory across conversations, and context-aware response generation.',
    tech: ['Python', 'SQLite', 'AI'],
    links: [
      { kind: 'github', href: 'https://github.com/Mmach1ne/LLM-RAG-Agent', label: 'VIEW CODE' },
      {
        kind: 'demo',
        href: 'https://effervescent-haupia-013614.netlify.app',
        label: 'TRY DEMO',
      },
    ],
    visual: 'raybot',
  },
  {
    id: 'transit',
    slug: 'transit-tracker',
    title: 'TRANSIT TRACKER',
    subtitle: 'Real-Time Bus Monitoring',
    description:
      'IoT system with AWS integration for transit tracking, featuring real-time GPS updates and cloud-backed analytics.',
    tech: ['AWS', 'IoT', 'Next.js'],
    links: [
      {
        kind: 'github',
        href: 'https://github.com/Mmach1ne/UWTransportGPS.git',
        label: 'VIEW ARCHITECTURE',
      },
    ],
    visual: 'transit',
  },
  {
    id: 'audiolog',
    slug: 'audiolog',
    title: 'AUDILOG',
    subtitle: 'Windows Audio Logger',
    description:
      'Advanced audio capture and transcription system leveraging Windows Core Audio API and Google Speech-to-Text. Features real-time transcription, AI-powered analysis, and seamless TTS integration.',
    tech: ['Python', 'Win32', 'Google STT'],
    links: [
      { kind: 'github', href: 'https://github.com/Mmach1ne/AudioLogger.git', label: 'VIEW CODE' },
    ],
    visual: 'audiolog',
  },
];
