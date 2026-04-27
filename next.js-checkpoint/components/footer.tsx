import Link from "next/link";
import { profile } from "@/lib/portfolio-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-hero-gradient text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                EK
              </span>
              <span className="text-sm font-semibold">Eric Kimathi</span>
            </Link>
            <p className="mt-3 text-xs leading-5 text-white/60">
              Full-stack developer building fast, accessible web applications
              with React, Next.js, and Node.js.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Connect
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${profile.email}`}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {profile.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Eric Kimathi. Built with Next.js &amp;
          Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
