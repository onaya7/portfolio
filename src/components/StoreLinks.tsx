import { ArrowUpRight } from "lucide-react";
import type { StoreGroup } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Download buttons, grouped by app when a role has more than one. The first button on the page
 * is the accent one. Renders nothing when there are no links.
 */
export default function StoreLinks({ groups, className }: { groups: StoreGroup[]; className?: string }) {
  if (groups.length === 0) return null;
  let index = 0;

  return (
    <div className={cn("grid gap-5", className)}>
      {groups.map((group, g) => (
        <div key={group.name ?? `group-${g}`}>
          {group.name && <p className="label mb-2.5">{group.name}</p>}
          <ul className="flex flex-wrap gap-3" aria-label={group.name ? `Download ${group.name}` : "Download"}>
            {group.links.map(link => {
              const primary = index++ === 0;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-5 text-small font-medium transition duration-200 ease-out active:scale-[0.98]",
                      primary
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
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
