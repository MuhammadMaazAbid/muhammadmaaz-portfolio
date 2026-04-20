import { createFileRoute } from "@tanstack/react-router";
import { Hero, Experience, Projects, Skills, Honors } from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Maaz — Full-Stack Developer & UN Millennium Fellow" },
      {
        name: "description",
        content:
          "Full-Stack Developer specializing in Flutter, Node.js, and React. Founder of Insightify and UN Millennium Fellow, Class of 2025.",
      },
      { property: "og:title", content: "Muhammad Maaz — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Full-Stack Developer specializing in Flutter, Node.js, and React. Founder of Insightify and UN Millennium Fellow, Class of 2025.",
      },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Muhammad Maaz — Full-Stack Developer" },
      {
        name: "twitter:description",
        content:
          "Full-Stack Developer specializing in Flutter, Node.js, and React. Founder of Insightify and UN Millennium Fellow.",
      },
      { name: "twitter:image", content: "/og-image.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Honors />
    </>
  );
}
