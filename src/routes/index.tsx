import { createFileRoute } from "@tanstack/react-router";
import { Notebook } from "../components/notebook/Notebook";
const title = "Muhammad Maaz — Growth, Development & Experimentation";
const description =
  "Inside my notebook: products I’ve built, ideas I’ve pitched, and people I’ve reached. Explore Muhammad Maaz’s work across development, growth, and experimentation.";
export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://muhammadmaaz.live/notebook/studio.webp" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://muhammadmaaz.live/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://muhammadmaaz.live/notebook/studio.webp" },
    ],
    links: [{ rel: "canonical", href: "https://muhammadmaaz.live/" }],
  }),
  component: Notebook,
});
