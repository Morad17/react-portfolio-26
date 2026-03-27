// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProjectFeature {
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  features: ProjectFeature[];
  url: string;
  color: string; // accent colour for card hover
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
    url: "https://horizon-sales.co.uk/",
    color: "rgba(0,0,0,0.8)",
  },
  {
    id: "movie-binge",
    title: "Movie Binge",
    description:
      "A movie rating platform powered by the TMDB database. Lists latest, trending, and popular films. Users can sign up, rate and review movies, search by genre, and get full movie information.",
    features: [
      { label: "User Authentication" },
      { label: "Rate & Review System" },
      { label: "Like & Bookmark" },
      { label: "Account Privacy" },
      { label: "TMDB Integration" },
      { label: "Responsive Design" },
    ],
    url: "https://movie-binge-app.netlify.app/",
    color: "rgba(136,0,21,0.8)",
  },
];

// ── Experience ────────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "diploma",
    role: "Full Stack Web Development Diploma",
    company: "Code Institute",
    period: "2022 – 2023",
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
  {
    id: "rfid",
    role: "Web Developer",
    company: "RFID Solutions",
    period: "2023 – 2024",
    description:
      "Built and maintained internal web tools and customer-facing dashboards for an RFID technology company. Focused on performant UIs and clean REST API integrations.",
    tech: ["React", "TypeScript", "SCSS", "REST APIs", "Git", "Figma"],
  },
  {
    id: "freelance",
    role: "Freelance Frontend Developer",
    company: "Self-employed",
    period: "2024 – Present",
    description:
      "Designing and building bespoke websites and web apps for clients across the UK. Delivering full project lifecycle from concept to deployment.",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "SCSS",
      "Vercel",
      "Netlify",
      "EmailJS",
      "Framer Motion",
    ],
  },
];

// ── Skills ────────────────────────────────────────────────────────────────────

export interface ModelSkill {
  label: string;
  model: string; // key into MODEL_MAP in AboutSection
}

export const modelSkills: ModelSkill[] = [
  { label: 'React',      model: 'react'      },
  { label: 'JavaScript', model: 'javascript' },
  { label: 'TypeScript', model: 'typescript' },
  { label: 'Node.js',    model: 'nodejs'     },
  { label: 'AWS',        model: 'aws'        },
  { label: 'MySQL',      model: 'mysql'      },
  { label: 'GitHub',     model: 'github'     },
];

export const otherSkills: string[] = [
  'React Native', 'Next.js', 'SCSS', 'Firestore', 'Figma',
];

// ── Nav items ─────────────────────────────────────────────────────────────────

export const navItems = [
  { label: "Home", index: 0 },
  { label: "About", index: 1 },
  { label: "Projects", index: 2 },
  { label: "Experience", index: 3 },
  { label: "Contact", index: 4 },
];
