export type Category = "full-stack" | "frontend" | "backend";

export type Project = {
  slug: string;
  title: string;
  category: Category;
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
  name: "Eric Kimathi",
  role: "Full-Stack Developer",
  tagline: "I build web apps with React, Next.js, and Node.js. Clean code, good user experience, and software that actually works.",
  bio: "I'm a full-stack developer based in Nairobi, Kenya. I trained at Gomycode and have been building web apps ever since. I like clean code, working software, and projects that solve real problems.",
  email: "erickims08@gmail.com",
  location: "Nairobi, Kenya",
  availability: "Looking for junior full-stack and frontend roles",
  socials: {
    github: "https://github.com/Ericokim",
    linkedin: "https://www.linkedin.com/in/eric-kimathi",
  },
};

export const skills = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
  backend: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL", "Prisma"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Redux Toolkit"],
  learning: ["React Native", "Docker", "GraphQL"],
};

export const projects: Project[] = [
  {
    slug: "mern-task-manager",
    title: "MERN Task Manager",
    category: "full-stack",
    summary:
      "A team task management app built with the MERN stack. Admins can create and assign tasks, and team members can update their progress.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=900&q=80",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    impact:
      "Makes it easier for small teams to stay on top of their work without relying on spreadsheets or back-and-forth messages.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Tailwind CSS"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
  {
    slug: "devstash",
    title: "DevStash",
    category: "full-stack",
    summary:
      "A personal hub for developers to save and search code snippets, AI prompts, notes, and links. Built with Next.js, Prisma, and a Monaco code editor.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    tags: ["Next.js", "TypeScript", "Prisma", "AI"],
    impact:
      "Keeps all your developer notes in one searchable place instead of spread across browser tabs and random text files.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "Tailwind CSS 4", "Monaco Editor"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
  {
    slug: "farmer-management-platform",
    title: "Farmer Management API",
    category: "backend",
    summary:
      "A REST API for managing farmer profiles and produce records, with JWT authentication and separate admin and farmer roles.",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=900&q=80",
    tags: ["Node.js", "Express.js", "REST API", "JWT"],
    impact:
      "Gives small agri-tech projects a working backend they can build a front end on top of.",
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
  {
    slug: "movie-hub",
    title: "Movie Hub",
    category: "frontend",
    summary:
      "A React app for browsing and adding movies. Filter by title or rating, add new entries with a form, and open a detail page for each film.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    tags: ["React", "React Router", "Hooks"],
    impact:
      "Covers the key React skills: hooks, controlled inputs, client-side routing, and navigating between multiple views.",
    stack: ["React", "React Router v6", "Tailwind CSS", "useState", "useEffect"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
  {
    slug: "task-flow",
    title: "Task Flow",
    category: "frontend",
    summary:
      "A to-do app with add, edit, complete, and delete. Data saves to localStorage so nothing gets lost when you close the tab.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80",
    tags: ["React", "State Management", "localStorage"],
    impact:
      "Data persists across browser sessions with no server at all. Good example of React state and browser storage working together.",
    stack: ["React", "TypeScript", "Tailwind CSS", "localStorage API"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
  {
    slug: "redux-task-app",
    title: "Redux Task App",
    category: "frontend",
    summary:
      "A task list app built to practice Redux Toolkit. Add tasks, filter by status, edit entries, and toggle them complete.",
    image:
      "https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&w=900&q=80",
    tags: ["React", "Redux Toolkit", "State Management"],
    impact:
      "Shows how Redux handles state in a React app and when it makes more sense than passing props between components.",
    stack: ["React", "Redux Toolkit", "Tailwind CSS"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
  {
    slug: "devpulse-blog",
    title: "DevPulse Blog",
    category: "frontend",
    summary:
      "A blog landing page with featured posts, category browsing, and a newsletter form. Fully responsive and built without a JavaScript framework.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
    tags: ["Tailwind CSS", "Responsive Design", "HTML5"],
    impact:
      "Built the whole thing in plain HTML and Tailwind CSS. No framework needed.",
    stack: ["HTML5", "Tailwind CSS", "CSS3"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
  {
    slug: "slack-bot",
    title: "Slack Bot",
    category: "backend",
    summary:
      "A Slack bot written in TypeScript using the Bolt framework. It responds to messages and slash commands via Socket Mode.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=900&q=80",
    tags: ["TypeScript", "Node.js", "Slack Bolt"],
    impact:
      "Good example of event-driven Node.js with TypeScript types applied throughout a real integration.",
    stack: ["TypeScript", "Node.js", "Slack Bolt", "Socket Mode"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
  {
    slug: "travel-agency-landing",
    title: "Travel Agency Landing",
    category: "frontend",
    summary:
      "A landing page for a travel agency with destination cards, tour package listings, and a booking section. Fully responsive.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    tags: ["HTML5", "CSS3", "Tailwind CSS"],
    impact:
      "Shows that you can build a clean, fully responsive page with just HTML and Tailwind, no JavaScript required.",
    stack: ["HTML5", "CSS3", "Tailwind CSS"],
    links: {
      demo: "https://github.com/Ericokim",
      repo: "https://github.com/Ericokim",
    },
  },
];
