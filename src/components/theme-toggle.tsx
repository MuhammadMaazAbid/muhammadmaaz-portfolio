import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={
        "rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground " +
        className
      }
    >
      <span className="block h-4 w-4" suppressHydrationWarning>
        {mounted ? (
          isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
        ) : null}
      </span>
    </button>
  );
}
