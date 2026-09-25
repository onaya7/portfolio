"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Flips data-theme on <html> and remembers the choice. The inline script in the layout applies
 * the stored value before first paint, so there is no flash and no hydration state to sync:
 * both icons render and CSS shows the one that matches the current theme.
 */
export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode). The toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-fg active:scale-95"
    >
      <Sun aria-hidden className="size-4 [[data-theme=light]_&]:hidden" strokeWidth={1.75} />
      <Moon aria-hidden className="hidden size-4 [[data-theme=light]_&]:block" strokeWidth={1.75} />
    </button>
  );
}
