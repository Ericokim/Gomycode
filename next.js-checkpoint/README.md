# Next.js Checkpoint

This project is a personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Project Goal

The goal of this checkpoint is to practice building a small multi page application with the Next.js App Router, reusable components, and clean responsive styling.

## Pages

- `Home` page with hero section, featured projects, stats, tech stack, and call to action
- `About` page with profile summary, journey timeline, skills, education, and work style
- `Projects` page with filter buttons for full-stack, frontend, and backend work
- Dynamic project details page at `projects/[slug]`
- `Contact` page with contact cards and a working client side contact form

## Features

- Built with the Next.js App Router
- Shared header and footer through the root layout
- Page metadata set with the Next.js metadata API
- Reusable components such as `ProjectCard`, `ProjectsGrid`, `SiteHeader`, `SiteFooter`, and `ContactForm`
- Portfolio data stored in one place in `lib/portfolio-data.ts`
- Dynamic project pages generated from project slugs
- Responsive layout for mobile and desktop screens
- Warm neutral theme using the same amber and slate direction used in `react-hooks-checkpoint` and `todo-state-manager-app`

## Main Files

- `app/layout.tsx`
  Root layout with shared header, footer, fonts, and metadata
- `app/page.tsx`
  Home page
- `app/about/page.tsx`
  About page
- `app/projects/page.tsx`
  Projects listing page
- `app/projects/[slug]/page.tsx`
  Dynamic project details page
- `app/contact/page.tsx`
  Contact page
- `components/`
  Shared UI components
- `lib/portfolio-data.ts`
  Profile, skills, and project data
- `app/globals.css`
  Theme variables, animations, and global styles

## Checkpoint Requirements Covered

- Use Next.js for the application structure
- Create multiple pages with routing
- Use reusable components
- Pass and render structured project data
- Add responsive styling with Tailwind CSS
- Keep the UI consistent across the app with a shared layout

From the current implementation, the checkpoint requirements appear to be met.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

4. Run lint checks:

```bash
npm run lint
```

## Notes

- The README now matches the actual project instead of the default `create-next-app` template.
- The current color theme follows the warm off white, amber, and slate look already used in the related checkpoint apps.
