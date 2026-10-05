import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Download, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { profile } from "@/components/site/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { contactSchema, submitContactMessage, type ContactInput } from "@/utils/contact.functions";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
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

  const submit = useServerFn(submitContactMessage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      const res = await submit({ data: values });
      if (res.success) {
        toast.success("Message sent", {
          description: "Thanks — I'll get back to you soon.",
        });
        reset();
      } else {
        toast.error(res.error ?? "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not send message. Please try again.");
    }
  };

  return (
    <div className="container-page pt-12 pb-16 md:pt-20 md:pb-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Get in touch</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Open to internships, collaborations, and meaningful product work. Send a message
        below or reach me directly.
      </p>

      <div className="mt-8">
        <a
          href="/Muhammad_Maaz_Resume.pdf"
          download
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-card-elevated"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>
      </div>

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 rounded-lg border border-border bg-card p-6 md:p-8"
        noValidate
      >
        <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Goes straight to my inbox queue.
        </p>

        <div className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Your name"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={6}
              placeholder="Tell me a bit about your project, role, or idea…"
              {...register("message")}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
