import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/site/sections";

export const Route = createFileRoute("/projects")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Selected Work — Muhammad Maaz" },
      {
        name: "description",
        content:
          "A selection of full-stack, mobile, and embedded projects by Muhammad Maaz, including Insightify, Divi, and a hospital ER management system.",
      },
      { property: "og:title", content: "Selected Work — Muhammad Maaz" },
      {
        property: "og:description",
        content:
          "Full-stack, mobile, and embedded projects spanning Flutter, Node.js, Java/C++, and hardware integration.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="pt-12 md:pt-20">
      <div className="container-page">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Selected Work</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Cross-platform applications, backend systems, and embedded experiments.
        </p>
      </div>
      <Projects />
    </div>
  );
}
