import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore selected full-stack and front-end projects built with modern web technologies.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          A selection of projects that highlight responsive UI development,
          performance-conscious implementation, and polished design.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
