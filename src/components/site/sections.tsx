import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { experience, honors, profile, projects, skills } from "./data";
import maazPhoto from "@/assets/maaz.jpg";
import { useReveal } from "@/hooks/use-reveal";
import { MagneticButton } from "./MagneticButton";

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span className="h-px flex-1 bg-border" />
      <h2 className="text-xs font-medium">{label}</h2>
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
    <section className="relative container-page pt-16 pb-20 md:pt-32 md:pb-32 fade-in-up">
      <div aria-hidden className="dot-grid absolute inset-0 -z-10" />
      <div className="grid items-center gap-10 md:grid-cols-[1fr_280px] md:gap-12 lg:grid-cols-[1fr_320px]">
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Available for opportunities
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl">
            {profile.tagline}
          </p>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-card transition-colors hover:bg-primary/90"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
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
        </div>

        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-square w-36 overflow-hidden rounded-2xl border border-border bg-card shadow-card md:w-full">
            <img
              src={maazPhoto}
              alt="Portrait of Muhammad Maaz"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="experience" className="reveal container-page py-10 md:py-14">
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
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="projects" className="reveal container-page py-10 md:py-14">
      <SectionLabel index="02" label="Selected Work" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((p) => (
          <article
            key={p.title}
            className="group rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
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
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="skills" className="reveal container-page py-10 md:py-14">
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
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="honors" className="reveal container-page py-10 md:py-14">
      <SectionLabel index="04" label="Recognition" />

      <ul className="divide-y divide-border border-y border-border">
        {honors.map((h) => (
          <li key={h.title} className="group grid grid-cols-[64px_1fr] gap-6 py-5 transition-colors duration-300 hover:bg-card-elevated/40 md:grid-cols-[100px_1fr] px-2 -mx-2 rounded-md">
            <span className="text-sm text-muted-foreground">{h.year}</span>
            <div>
              <p className="text-base font-medium text-foreground transition-colors group-hover:text-primary">{h.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{h.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="about" className="reveal container-page py-10 md:py-14">
      <SectionLabel index="05" label="About" />
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            About me
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            {profile.title}
          </p>
        </div>
        <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            I am a Computer Science student at Air University, but I refuse to
            stay in a single lane. I believe in the polymath approach: I don't
            just write code; I connect dots across disciplines.
          </p>
          <p>
            My approach to technology is driven by curiosity, intentionality,
            and character. I believe that to build truly great products, you
            need to understand both the deep technical architecture and the
            human reality it serves.
          </p>
          <p>
            <span className="text-foreground">My Philosophy: Build in Public.</span>{" "}
            I share the raw journey of growth — not just the polished wins, but
            the failures, the character development, and the hard-learned
            lessons. I build with purpose, knowing exactly why we do what we do.
          </p>
          <p>
            <span className="text-foreground">Current Focus.</span>{" "}
            Currently, I am the Co-Founder of Insightify, building AI-driven
            security solutions to combat deepfakes and scams, while navigating
            the chaotic, exciting world of tech startups.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ContactTeaser() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="contact" className="reveal container-page py-10 md:py-14">
      <SectionLabel index="06" label="Contact" />
      <div className="rounded-lg border border-border bg-card p-6 shadow-card md:p-10">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Let's build something.
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Open to full-time roles, freelance work, and collaborations on
          impactful products. The fastest way to reach me is the contact form.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <MagneticButton>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-card transition-colors hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              Send a message
            </Link>
          </MagneticButton>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-card-elevated"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
