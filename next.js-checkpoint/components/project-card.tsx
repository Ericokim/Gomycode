import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/portfolio-data";

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

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/60">
      {/* Cover image */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
        {/* Category badge over image */}
        <span
          className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${categoryColors[project.category] ?? "bg-slate-100 text-slate-700 border-slate-200"}`}
        >
          {categoryLabel[project.category] ?? project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold text-foreground">{project.title}</h3>

        <p className="flex-1 text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 border-t border-border pt-3">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-semibold text-foreground transition hover:text-primary"
          >
            Details →
          </Link>
          <Link
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            GitHub ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
