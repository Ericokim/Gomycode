import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/portfolio-data";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <h3 className="text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View details
          </Link>
          <Link
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Live demo
          </Link>
        </div>
      </div>
    </article>
  );
}
