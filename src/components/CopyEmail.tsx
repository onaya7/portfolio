"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Copies the address and confirms in place. Announced to screen readers through a live region. */
export default function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked. The address is visible and selectable beside the button.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-mono text-label text-muted transition-colors duration-200 hover:border-line-strong hover:text-fg active:scale-[0.98]",
        className,
      )}
    >
      <span className="relative size-4" aria-hidden>
        <Copy
          strokeWidth={1.75}
          className={cn("absolute inset-0 size-4 transition duration-150", copied && "scale-50 opacity-0")}
        />
        <Check
          strokeWidth={2}
          className={cn("absolute inset-0 size-4 text-accent transition duration-150", !copied && "scale-50 opacity-0")}
        />
      </span>
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
