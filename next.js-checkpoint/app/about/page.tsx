import type { Metadata } from "next";
import { profile, skills } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Eric Okim, full-stack skills, tools, and development focus.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          About Me
        </h1>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg">
          I am {profile.name}, a {profile.role}. I enjoy transforming ideas into
          clean, modern, and accessible user interfaces. My approach combines
          practical engineering with strong attention to user experience.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Core Front-end</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {skills.frontend.map((skill) => (
              <li key={skill}>• {skill}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Core Back-end</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {skills.backend.map((skill) => (
              <li key={skill}>• {skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">What I Prioritize</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {skills.quality.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
