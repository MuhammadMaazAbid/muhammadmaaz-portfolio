import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { experience, honors, profile, projects, skills } from "./data";
import maazPhoto from "@/assets/maaz.jpg";

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span className="h-px flex-1 bg-border" />
      <span>{label}</span>
    </div>
  );
}

function Tag({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "lavender" }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs " +
        (variant === "lavender"
          ? "border-secondary/30 bg-secondary/10 text-secondary"
          : "border-border bg-card text-muted-foreground")
      }
    >
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section className="container-page pt-20 pb-24 md:pt-32 md:pb-32 fade-in-up">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        Available for opportunities
      </div>

      <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
        {profile.name}
      </h1>
      <p className="mt-5 text-lg text-muted-foreground md:text-xl">
        {profile.tagline}
      </p>
      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        {profile.bio}
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Projects
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-card"
        >
          Contact Me
        </Link>
        <a
          href="/Muhammad_Maaz_Resume.pdf"
          download
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-card"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>

        <div className="ml-1 flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="container-page py-16 md:py-24">
      <SectionLabel index="01" label="Experience" />

      <article className="rounded-lg border border-border bg-card p-6 shadow-card md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
              {experience.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{experience.subtitle}</p>
          </div>
          <span className="rounded-md border border-secondary/30 bg-secondary/10 px-2.5 py-1 text-xs text-secondary">
            {experience.badge}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {experience.tech.map((t) => (
            <Tag key={t} variant="lavender">{t}</Tag>
          ))}
        </div>

        <ul className="mt-6 space-y-3">
          {experience.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="container-page py-16 md:py-24">
      <SectionLabel index="02" label="Selected Work" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((p) => (
          <article
            key={p.title}
            className="group rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
          >
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {p.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="container-page py-16 md:py-24">
      <SectionLabel index="03" label="Stack" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {skills.map((g) => (
          <div key={g.heading}>
            <h3 className="text-sm font-semibold text-foreground">{g.heading}</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Honors() {
  return (
    <section id="honors" className="container-page py-16 md:py-24">
      <SectionLabel index="04" label="Recognition" />

      <ul className="divide-y divide-border border-y border-border">
        {honors.map((h) => (
          <li key={h.title} className="grid grid-cols-[64px_1fr] gap-6 py-5 md:grid-cols-[100px_1fr]">
            <span className="text-sm text-muted-foreground">{h.year}</span>
            <div>
              <p className="text-base font-medium text-foreground">{h.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{h.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
