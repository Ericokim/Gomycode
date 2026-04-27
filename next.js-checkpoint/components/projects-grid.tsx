"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/portfolio-data";

type FilterKey = "All" | "Full-Stack" | "Frontend" | "Backend";

const FILTERS: FilterKey[] = ["All", "Full-Stack", "Frontend", "Backend"];

const filterMap: Record<FilterKey, string | null> = {
  All: null,
  "Full-Stack": "full-stack",
  Frontend: "frontend",
  Backend: "backend",
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterKey>("All");

  const visible =
    filterMap[active] === null
      ? projects
      : projects.filter((p) => p.category === filterMap[active]);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              active === f
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
            <span className="ml-1.5 text-xs opacity-60">
              {filterMap[f] === null
                ? projects.length
                : projects.filter((p) => p.category === filterMap[f]).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
