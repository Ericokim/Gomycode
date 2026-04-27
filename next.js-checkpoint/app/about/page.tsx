import type { Metadata } from "next";
import { profile, skills } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Eric Kimathi, full-stack developer and Gomycode graduate based in Nairobi, Kenya.",
};

const milestones = [
  {
    period: "2024",
    title: "Started Learning to Code",
    description:
      "Started with HTML, CSS, and JavaScript. Took a while for things to click but once they did, I was hooked.",
  },
  {
    period: "2024",
    title: "Gomycode Bootcamp",
    description:
      "Joined Gomycode's full-stack programme. Learned React, Node.js, Express, and MongoDB through hands-on projects.",
  },
  {
    period: "2024 to 2025",
    title: "First Full-Stack Projects",
    description:
      "Built the MERN Task Manager and the Farmer Management API, both with authentication, role-based access, and real data.",
  },
  {
    period: "2025",
    title: "TypeScript and Next.js",
    description:
      "Started using TypeScript seriously, learned the Next.js App Router, and built DevStash as a real full-stack project.",
  },
  {
    period: "Now",
    title: "Building and Looking for Work",
    description:
      "Building more projects, picking up React Native, and looking for my first professional role.",
  },
];

const values = [
  {
    icon: "⚡",
    title: "Performance first",
    desc: "Fast apps are not optional. I keep an eye on bundle size and make sure things load quickly on every device.",
  },
  {
    icon: "♿",
    title: "Accessible by default",
    desc: "Good UX means everyone can use what I build. I write semantic HTML and think about accessibility from the start.",
  },
  {
    icon: "🧹",
    title: "Clean, readable code",
    desc: "I prefer readable over clever. Future me and any teammates should understand it without needing a walkthrough.",
  },
  {
    icon: "🚀",
    title: "Ship and improve",
    desc: "A working version one beats a perfect plan. I ship, get feedback, and improve. Then do it again.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
      {/* Intro */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
          About Me
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hey, I&apos;m Eric Kimathi
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {profile.bio}
        </p>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          I trained at Gomycode and have built everything from REST APIs to
          multi-page Next.js apps since then. When I&apos;m not coding I&apos;m
          reading about how things are built or trying out something new in the
          React world.
        </p>
      </section>

      {/* Journey Timeline */}
      <section>
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-amber-700">
          My Journey
        </p>
        <div className="relative space-y-0 pl-6">
          <div className="absolute left-0 top-2 h-full w-px bg-border" />

          {milestones.map((m, i) => (
            <div key={i} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[1.375rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-amber-600 bg-card">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              </span>

              <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
                {m.period}
              </p>
              <h3 className="text-base font-semibold text-foreground">
                {m.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-amber-700">
          Skills and Tools
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {(
            [
              { label: "Frontend", items: skills.frontend, color: "bg-blue-50 text-blue-800 border-blue-200" },
              { label: "Backend", items: skills.backend, color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
              { label: "Tools and Platforms", items: skills.tools, color: "bg-violet-50 text-violet-800 border-violet-200" },
              { label: "Currently Learning", items: skills.learning, color: "bg-amber-50 text-amber-800 border-amber-200" },
            ] as const
          ).map(({ label, items, color }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${color}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-amber-700">
          Education
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">
              🎓
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Full-Stack Web Development
              </h3>
              <p className="text-sm font-medium text-amber-700">
                Gomycode · 2024
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Covered HTML, CSS, JavaScript, React, Node.js, Express,
                MongoDB, and deployment. Built several real projects during
                the programme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section>
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-amber-700">
          How I Work
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <p className="mb-2 text-2xl">{v.icon}</p>
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                {v.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
