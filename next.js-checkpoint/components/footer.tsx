import Link from "next/link";
import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
