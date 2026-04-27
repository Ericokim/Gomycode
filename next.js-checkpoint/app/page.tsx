import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { profile, projects, skills } from "@/lib/portfolio-data";

export default function Home() {
  const featured = projects.slice(0, 3);

  const stats = [
    { label: "Projects Built", value: `${projects.length}+` },
    { label: "Technologies", value: "15+" },
    { label: "Availability", value: "Open" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-24 px-4 py-14 sm:px-6">
      {/* ── Hero ── */}
      <section className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="space-y-6">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <span className="h-2 w-2 animate-blink rounded-full bg-amber-500" />
            Available for work
          </span>

          <h1 className="animate-fade-up delay-100 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-primary">{profile.name}</span>
          </h1>

          <p className="animate-fade-up delay-200 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            {profile.tagline}
          </p>

          <div className="animate-fade-up delay-300 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-amber-300 active:scale-[0.98]"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/60"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Right: terminal card */}
        <div className="animate-fade-up delay-200 rounded-2xl bg-slate-900 p-6 font-mono text-sm shadow-2xl ring-1 ring-white/10 sm:p-8">
          {/* macOS traffic lights */}
          <div className="mb-5 flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>

          <div className="space-y-1 text-slate-300">
            <p>
              <span className="text-green-400">$ </span>whoami
            </p>
            <p className="text-amber-300">→ {profile.name}</p>

            <p className="mt-4">
              <span className="text-green-400">$ </span>cat profile.json
            </p>
            <div className="mt-1 rounded-lg bg-white/5 p-4 text-xs leading-6">
              <p className="text-slate-400">{"{"}</p>
              <p className="pl-4">
                <span className="text-blue-300">&quot;role&quot;</span>
                {": "}
                <span className="text-amber-200">&quot;Full-Stack Developer&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-blue-300">&quot;stack&quot;</span>
                {": ["}
                <span className="text-green-300">&quot;Next.js&quot;</span>,{" "}
                <span className="text-green-300">&quot;React&quot;</span>,{" "}
                <span className="text-green-300">&quot;Node.js&quot;</span>
                {"],"}
              </p>
              <p className="pl-4">
                <span className="text-blue-300">&quot;location&quot;</span>
                {": "}
                <span className="text-amber-200">&quot;{profile.location}&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-blue-300">&quot;available&quot;</span>
                {": "}
                <span className="text-emerald-400">true</span>
              </p>
              <p className="text-slate-400">{"}"}</p>
            </div>

            <p className="mt-4 flex items-center gap-1">
              <span className="text-green-400">$ </span>
              <span className="inline-block h-4 w-2 animate-blink bg-amber-300 align-middle" />
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-foreground sm:text-3xl">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </section>

      {/* ── Featured Projects ── */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
              Selected Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            All projects →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="rounded-3xl bg-hero-gradient p-8 sm:p-10">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
          Toolkit
        </p>
        <h2 className="mb-8 text-2xl font-bold text-white sm:text-3xl">
          Tech I Work With
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              { label: "Frontend", items: skills.frontend },
              { label: "Backend", items: skills.backend },
              { label: "Tools", items: skills.tools },
              { label: "Learning", items: skills.learning },
            ] as const
          ).map(({ label, items }) => (
            <div key={label}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 ring-1 ring-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Open to new opportunities
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          I&apos;m looking for my first professional role in web development.
          Open to full-stack, frontend, or freelance work.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition hover:opacity-80"
          >
            Get in touch
          </Link>
          <Link
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/60"
          >
            View GitHub
          </Link>
        </div>
      </section>
    </div>
  );
}
