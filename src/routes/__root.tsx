import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(m?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-semibold tracking-tight text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Muhammad Maaz — Full-Stack Developer & UN Millennium Fellow" },
      {
        name: "description",
        content:
          "Portfolio of Muhammad Maaz — Full-Stack Developer building cross-platform apps with Flutter, Node.js, and React. UN Millennium Fellow, Class of 2025.",
      },
      { name: "author", content: "Muhammad Maaz" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Muhammad Maaz — Full-Stack Developer & UN Millennium Fellow" },
      { name: "twitter:title", content: "Muhammad Maaz — Full-Stack Developer & UN Millennium Fellow" },
      { name: "description", content: "Portfolio of Muhammad Maaz, Full-Stack Software Developer, UN Millennium Fellow, and Co-Founder of Insightify. Specialized in Flutter, React, and Node.js." },
      { property: "og:description", content: "Portfolio of Muhammad Maaz, Full-Stack Software Developer, UN Millennium Fellow, and Co-Founder of Insightify. Specialized in Flutter, React, and Node.js." },
      { name: "twitter:description", content: "Portfolio of Muhammad Maaz, Full-Stack Software Developer, UN Millennium Fellow, and Co-Founder of Insightify. Specialized in Flutter, React, and Node.js." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/lHVh6ANPlRYGpGaBbEPqVltPpKj1/social-images/social-1776651827772-ClearPicture.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/lHVh6ANPlRYGpGaBbEPqVltPpKj1/social-images/social-1776651827772-ClearPicture.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [{ children: themeInitScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
