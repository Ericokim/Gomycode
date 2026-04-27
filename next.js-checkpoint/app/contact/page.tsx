import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eric Okim for opportunities and collaboration.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          I am available for full-stack opportunities and collaboration. Feel
          free to reach out through any of the channels below.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Email</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Best for project discussions and opportunities.
          </p>
          <Link
            href={`mailto:${profile.email}`}
            className="text-primary hover:underline"
          >
            {profile.email}
          </Link>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Location</h2>
          <p className="text-sm text-muted-foreground">{profile.location}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {profile.availability}
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">GitHub</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Explore repositories and coding activity.
          </p>
          <Link
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            {profile.socials.github}
          </Link>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">LinkedIn</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Connect professionally and follow updates.
          </p>
          <Link
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            View profile
          </Link>
        </article>
      </section>
    </div>
  );
}
