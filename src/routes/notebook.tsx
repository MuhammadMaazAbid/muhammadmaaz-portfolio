import { createFileRoute } from "@tanstack/react-router";
import { Notebook } from "../components/notebook/Notebook";

const title = "Inside my notebook — Muhammad Maaz";
const description =
  "Flip through Muhammad Maaz's notebook: projects, client work, fellowship moments, pitch wins, and ideas behind Insightify.";
const image = "https://muhammadmaaz.live/og-image.png";

export const Route = createFileRoute("/notebook")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://muhammadmaaz.live/notebook" },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: "https://muhammadmaaz.live/notebook" }],
  }),
  component: Notebook,
});
