import { Link, useLocation } from "@tanstack/react-router";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "./data";
import { ThemeToggle } from "@/components/theme-toggle";

type NavLink = {
  label: string;
  /** route path (used when off-home) */
  to: string;
  /** section id on the homepage (used when on-home for smooth scroll) */
  hash?: string;
};

const links: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/projects", hash: "projects" },
  { label: "About", to: "/about", hash: "about" },
  { label: "Contact", to: "/contact", hash: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";
  const [activeId, setActiveId] = useState<string>("");

  // Track which homepage section is in view
  useEffect(() => {
    if (!onHome) {
      setActiveId("");
      return;
    }
    const ids = ["projects", "about", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  const handleHashClick = (hash: string) => (e: React.MouseEvent) => {
    if (!onHome) return; // let normal route navigation happen
    e.preventDefault();
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${hash}`);
    }
    setOpen(false);
  };

  const isActive = (l: NavLink) => {
    if (l.to === "/") return onHome && !activeId;
    if (onHome && l.hash) return activeId === l.hash;
    return location.pathname.startsWith(l.to);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-tight text-foreground">
          Maaz<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = isActive(l);
            const className =
              "text-sm transition-colors " +
              (active ? "text-foreground" : "text-muted-foreground hover:text-foreground");
            if (onHome && l.hash) {
              return (
                <a
                  key={l.label}
                  href={`/#${l.hash}`}
                  onClick={handleHashClick(l.hash)}
                  className={className}
                >
                  {l.label}
                </a>
              );
            }
            return (
              <Link
                key={l.label}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={className}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
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

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-muted-foreground hover:bg-card hover:text-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="container-page flex flex-col py-3">
            {links.map((l) => {
              const active = isActive(l);
              const className =
                "py-2 text-sm transition-colors " +
                (active ? "text-foreground" : "text-muted-foreground");
              if (onHome && l.hash) {
                return (
                  <a
                    key={l.label}
                    href={`/#${l.hash}`}
                    onClick={handleHashClick(l.hash)}
                    className={className}
                  >
                    {l.label}
                  </a>
                );
              }
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  className={className}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center gap-2 border-t border-border/60 pt-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-md p-2 text-muted-foreground hover:bg-card hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-md p-2 text-muted-foreground hover:bg-card hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
