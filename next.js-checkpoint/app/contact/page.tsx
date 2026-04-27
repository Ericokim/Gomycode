import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/portfolio-data";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eric Kimathi for full-stack development opportunities and collaboration.",
};

const channels = [
  {
    icon: "✉️",
    label: "Email",
    value: profile.email,
    description: "Best for project discussions and opportunities.",
    href: `mailto:${profile.email}`,
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/Ericokim",
    description: "Browse my repositories and coding activity.",
    href: profile.socials.github,
    external: true,
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/eric-kimathi",
    description: "Connect professionally and follow updates.",
    href: profile.socials.linkedin,
    external: true,
  },
  {
    icon: "📍",
    label: "Location",
    value: profile.location,
    description: profile.availability,
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <div className="mb-12 max-w-xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
          Get In Touch
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Say Hello
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          I&apos;m looking for my first professional role in web development.
          Send me a message and I&apos;ll get back to you as soon as I can.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Left: contact channels */}
        <div className="space-y-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-700">
            Reach me via
          </p>
          {channels.map((c) => (
            <div
              key={c.label}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <span className="mt-0.5 text-2xl">{c.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {c.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {c.description}
                </p>
                {c.href ? (
                  <Link
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noreferrer" : undefined}
                    className="mt-1.5 block truncate text-sm font-medium text-amber-700 transition hover:underline"
                  >
                    {c.value}
                  </Link>
                ) : (
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {c.value}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Availability badge */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-blink rounded-full bg-amber-500" />
              <p className="text-sm font-semibold text-amber-900">
                Currently available
              </p>
            </div>
            <p className="mt-1 text-xs text-amber-800/80">
              Open to full-time, part-time, and freelance work.
            </p>
          </div>
        </div>

        {/* Right: contact form */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-lg font-semibold">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
