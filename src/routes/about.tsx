import { createFileRoute } from "@tanstack/react-router";
import { Experience, Honors, Skills } from "@/components/site/sections";
import { profile } from "@/components/site/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Muhammad Maaz" },
      {
        name: "description",
        content:
          "About Muhammad Maaz — Computer Science student, Full-Stack Developer, founder of Insightify, and UN Millennium Fellow.",
      },
      { property: "og:title", content: "About — Muhammad Maaz" },
      {
        property: "og:description",
        content:
          "Computer Science student, Full-Stack Developer, founder of Insightify, and UN Millennium Fellow.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-12 md:pt-20">
      <div className="container-page">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">About</h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {profile.bio}
        </p>
      </div>
      <Experience />
      <Skills />
      <Honors />
    </div>
  );
}
