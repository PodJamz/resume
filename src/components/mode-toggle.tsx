"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <span role="img" aria-label="light mode" className="text-neutral-800 dark:hidden text-[1.2rem]">
        😃
      </span>
      <span role="img" aria-label="dark mode" className="hidden dark:inline text-neutral-800 dark:text-neutral-200 text-[1.2rem]">
        😎
      </span>
    </Button>
  );
}
