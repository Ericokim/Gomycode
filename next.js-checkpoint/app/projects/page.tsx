import type { Metadata } from "next";
import { projects } from "@/lib/portfolio-data";
import { ProjectsGrid } from "@/components/projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack, frontend, and backend projects by Eric Kimathi — built with React, Next.js, Node.js, and TypeScript.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
          My Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          A collection of full-stack apps, frontend UIs, and backend APIs —
          built across Gomycode checkpoints and personal projects.
        </p>
      </div>

      {/* Filterable grid — client component */}
      <ProjectsGrid projects={projects} />
    </div>
  );
}
