import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/portfolio-data";

type ProjectDetailsProps = {
  params: Promise<{ slug: string }>;
};

const categoryColors: Record<string, string> = {
  "full-stack": "bg-violet-50 text-violet-700 border-violet-200",
  frontend: "bg-blue-50 text-blue-700 border-blue-200",
  backend: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const categoryLabel: Record<string, string> = {
  "full-stack": "Full-Stack",
  frontend: "Frontend",
  backend: "Backend",
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project?.title ?? "Project Not Found",
    description: project?.summary,
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Back nav */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        ← All Projects
      </Link>

      <div className="mt-8 space-y-8">
        {/* Hero image */}
        <div className="relative h-56 w-full overflow-hidden rounded-3xl sm:h-80">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>

        {/* Title row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                categoryColors[project.category] ??
                "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {categoryLabel[project.category] ?? project.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {project.title}
            </h1>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <Link
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium transition hover:border-amber-600"
            >
              GitHub ↗
            </Link>
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-amber-300"
            >
              Live Demo ↗
            </Link>
          </div>
        </div>

        {/* About */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-base font-semibold">About this project</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {project.summary}
          </p>
        </div>

        {/* Impact */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-3 text-base font-semibold text-amber-800">
            Impact
          </h2>
          <p className="text-sm leading-7 text-amber-800">{project.impact}</p>
        </div>

        {/* Tech stack */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
