// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProjectFeature {
  label: string;
}

export interface Project {
  id: string;
  title: string;
  type: string; // e.g. 'Website' | 'App'
  description: string;
  features: ProjectFeature[];
  skills: string[];
  url: string; // live page URL
  codeUrl?: string; // GitHub / code URL
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

// ── Projects ──────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "horizon-sales",
    title: "Horizon Sales",
    type: "Website",
    codeUrl: "https://github.com/Morad17/horizon-ai",
    description:
      "A clean sales and marketing website with an integrated AI chatbot to assist visitors. Built with bespoke client features including an online questionnaire, 5 contact forms, a blog, and secured pages.",
    features: [
      { label: "User Authentication" },
      { label: "AI Chatbot" },
      { label: "Email Integration" },
      { label: "Secured Webpage" },
      { label: "Responsive Design" },
      { label: "Web & Domain Hosting" },
    ],
    skills: ["React", "OpenAI"],
    url: "https://horizon-sales.netlify.app/",
    color: "rgba(0,0,0,0.8)",
  },
  {
    id: "horizon-app",
    title: "Horizon App",
    type: "App",
    codeUrl: "https://github.com/Morad17/",
    description:
      "The app counterpart to Horizon Sales, used for internal business analysis, data collection and goal setting. Managers utilised the app to track sales figures daily and monthly. Also featuring Ai Integration for personal self development.",
    features: [
      { label: "User Authentication" },
      { label: "KPI Figures" },
      { label: "Goals Setting" },
      { label: "Ai Helper" },
      { label: "Day,Week,Month Analysis" },
      { label: "Live notificaitons" },
    ],
    skills: ["React Native", "Firebase", "Node.js"],
    url: "https://github.com/Morad17/horizon-app-frontend/",
    color: "rgba(0,0,0,0.8)",
  },
  {
    id: "morads-journal",
    title: "Morads Journal",
    type: "Website",
    codeUrl: "https://github.com/Morad17/personal-travel-blog-react",
    description:
      "Creating a personal Travel/Blog/Companion website, which give inspiration for new journeys. Featuring an interactive and 3d globe map of places travelled to and timeline of places, and gallery of travel photos. Admin panel allows for seamless crud funtions, and article creators.",
    features: [
      { label: "Admin article creator" },
      { label: "Interactive 3d Map" },
      { label: "Masonry Gallery" },
      { label: "CRUD functions" },
      { label: "Photo uploader, with metadata" },
    ],
    skills: ["Typescript", "Postgress", "Node.js", "Prisma"],
    url: "https://morads-journal.netlify.app",
    color: "rgba(0,0,0,0.8)",
  },
];

// ── Experience ────────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "freelance",
    role: "Freelance Frontend Developer",
    company: "Self-employed",
    period: "2025 – Present",
    description:
      "Designing and building bespoke websites and web apps for clients. Delivering full project lifecycle from concept to deployment.",
    tech: ["React", "Next.js", "TypeScript", "Netlify", "React-Native"],
  },
  {
    id: "rfid",
    role: "Web Developer",
    company: "RFID Solutions",
    period: "2024 – 2025",
    description:
      "Built and maintained internal web tools and customer-facing dashboards for an RFID technology company. Focused on performant UIs and clean REST API integrations.",
    tech: ["React", "TypeScript", "SCSS", "REST APIs", "Git", "Figma"],
  },

  {
    id: "diploma",
    role: "Full Stack Web Development Diploma",
    company: "Code Institute",
    period: "2022 – 2024",
    description:
      "Completed an accredited full stack diploma covering front-end and back-end technologies, agile methodologies, and real-world project delivery.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "SQL",
      "Django",
    ],
  },
];

// ── Skills ────────────────────────────────────────────────────────────────────

export interface ModelSkill {
  label: string;
  model: string; // key into MODEL_MAP in AboutSection
}

export const modelSkills: ModelSkill[] = [
  { label: "React", model: "react" },
  { label: "JavaScript", model: "javascript" },
  { label: "TypeScript", model: "typescript" },
  { label: "Node.js", model: "nodejs" },
  { label: "AWS", model: "aws" },
  { label: "MySQL", model: "mysql" },
  { label: "GitHub", model: "github" },
];

export const otherSkills: string[] = [
  "React Native",
  "Next.js",
  "SCSS",
  "Firestore",
  "Figma",
];

// ── Nav items ─────────────────────────────────────────────────────────────────

export const navItems = [
  { label: "Home", index: 0 },
  { label: "About", index: 1 },
  { label: "Projects", index: 2 },
  { label: "Experience", index: 3 },
  { label: "Contact", index: 4 },
];
