import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { profile, projects, skills } from "@/lib/portfolio-data";

export default function Home() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-20 px-4 py-12 sm:px-6 sm:py-16">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Full-Stack Development · Next.js + Node.js
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {profile.name}
            <span className="mt-2 block text-primary">{profile.role}</span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
          <Image
            src="/profile.svg"
            alt="Developer portrait"
            width={640}
            height={420}
            priority
            className="h-auto w-full rounded-2xl border border-border/70 bg-background"
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-primary hover:underline"
          >
            See all projects
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Front-end Skills</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {skills.frontend.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Backend Skills</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {skills.backend.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Tools</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {skills.tools.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-hero-gradient p-8 text-primary-foreground shadow-lg">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Let&apos;s build something impactful together.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-primary-foreground/90 sm:text-base">
          I am currently available for internship roles and junior full-stack
          opportunities where I can contribute to real products and keep
          growing.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
