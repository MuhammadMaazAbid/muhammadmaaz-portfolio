import { Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "./data";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/60 mt-24">
      <div className="container-page py-20 md:py-28">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Let's build something.
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Open to internships, collaborations, and meaningful product work.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-base text-primary hover:underline underline-offset-4"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
          <a
            href="/Muhammad_Maaz_Resume.pdf"
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-card-elevated"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Muhammad Maaz. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-md p-2 hover:bg-card hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-md p-2 hover:bg-card hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
