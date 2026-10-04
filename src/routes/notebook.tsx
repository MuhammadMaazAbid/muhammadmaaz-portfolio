import { createFileRoute } from "@tanstack/react-router";
import { Notebook } from "../components/notebook/Notebook";
export const Route = createFileRoute("/notebook")({
  head: () => ({ meta: [{ title: "Inside my notebook — Muhammad Maaz" }] }),
  component: Notebook,
});
