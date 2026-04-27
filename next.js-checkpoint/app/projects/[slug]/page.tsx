import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/portfolio-data";

type ProjectDetailsProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/projects"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to projects
      </Link>

      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg">
          {project.summary}
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={1200}
          height={720}
          className="h-auto w-full object-cover"
        />
      </div>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Project Impact</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {project.impact}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Tech Stack</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {project.stack.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href={project.links.demo}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Live demo
        </Link>
        <Link
          href={project.links.repo}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground"
        >
          View code
        </Link>
      </div>
    </div>
  );
}
