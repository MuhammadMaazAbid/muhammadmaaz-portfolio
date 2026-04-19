import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/components/site/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Muhammad Maaz" },
      {
        name: "description",
        content:
          "Get in touch with Muhammad Maaz — open to internships, collaborations, and product work.",
      },
      { property: "og:title", content: "Contact — Muhammad Maaz" },
      {
        property: "og:description",
        content: "Open to internships, collaborations, and meaningful product work.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Github, label: "GitHub", value: "MuhammadMaazAbid", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", value: "muhammad-maaz-a37690271", href: profile.linkedin },
  ];

  return (
    <div className="container-page pt-12 pb-16 md:pt-20 md:pb-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Get in touch</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Open to internships, collaborations, and meaningful product work. The fastest way to
        reach me is email.
      </p>

      <ul className="mt-10 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
        {items.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-card-elevated"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground group-hover:border-primary/40 group-hover:text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="truncate text-sm text-foreground">{value}</p>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary">
                Open →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
