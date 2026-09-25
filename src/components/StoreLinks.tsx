import { ArrowUpRight } from "lucide-react";
import type { StoreLink } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Download buttons for the stores a role is listed on. Renders nothing when there are none. */
export default function StoreLinks({ links, className }: { links: StoreLink[]; className?: string }) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-3", className)} aria-label="Download">
      {links.map((link, i) => (
        <li key={link.key}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-5 text-small font-medium transition duration-200 ease-out active:scale-[0.98]",
              i === 0
                ? "bg-accent text-accent-ink hover:brightness-110"
                : "border border-line-strong text-fg hover:border-fg/60 hover:bg-fg/[0.04]",
            )}
          >
            {link.label}
            <ArrowUpRight
              aria-hidden
              strokeWidth={2}
              className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
