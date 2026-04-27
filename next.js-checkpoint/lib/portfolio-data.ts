export type Project = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  impact: string;
  stack: string[];
  links: {
    demo: string;
    repo: string;
  };
};

export const profile = {
  name: "Eric Okim",
  role: "Full-Stack Developer (Next.js, React & Node.js)",
  bio: "I build fast, accessible, and scalable web applications across both frontend and backend.",
  email: "ericokim.dev@gmail.com",
  location: "Lagos, Nigeria",
  availability: "Open to internships and junior full-stack opportunities",
  socials: {
    github: "https://github.com/Ericokim",
    linkedin: "https://www.linkedin.com/",
  },
};

export const skills = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
  ],
  tools: ["Git", "GitHub", "Postman", "VS Code", "Vercel"],
  quality: [
    "Responsive design",
    "Accessibility (a11y)",
    "Performance optimization",
    "SEO basics",
  ],
};

export const projects: Project[] = [
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    summary:
      "A modern and responsive portfolio built with Next.js App Router to present my profile, projects, and contact details.",
    image: "/projects/portfolio.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    impact:
      "Improved my personal branding and created a single professional link to share with recruiters.",
    stack: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS"],
    links: {
      demo: "https://vercel.com",
      repo: "https://github.com/Ericokim/Gomycode",
    },
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    summary:
      "A clean productivity application with task creation, filtering, and progress tracking focused on usability.",
    image: "/projects/task-manager.svg",
    tags: ["React", "State Management", "UI/UX"],
    impact:
      "Reduced task follow-up friction with a simple and intuitive workflow.",
    stack: ["React", "TypeScript", "Context API", "CSS Modules"],
    links: {
      demo: "https://vercel.com",
      repo: "https://github.com/Ericokim/Gomycode",
    },
  },
  {
    slug: "ecommerce-landing",
    title: "E-commerce Landing Page",
    summary:
      "A conversion-focused landing page designed for fast loading, mobile responsiveness, and clear product storytelling.",
    image: "/projects/ecommerce.svg",
    tags: ["Next.js", "Performance", "Responsive"],
    impact:
      "Improved Lighthouse metrics and created a polished shopping entry experience.",
    stack: ["Next.js", "Tailwind CSS", "Next/Image"],
    links: {
      demo: "https://vercel.com",
      repo: "https://github.com/Ericokim/Gomycode",
    },
  },
];
