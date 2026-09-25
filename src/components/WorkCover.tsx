import type { Role, Tone } from "@/content/types";
import { cn } from "@/lib/utils";
import { displayName } from "@/lib/work";

type Props = {
  role: Role;
  className?: string;
  /** Heading level is the caller's; the cover's own wordmark is presentational. */
  size?: "card" | "hero";
};

/** Literal class names, so Tailwind's content scan keeps them. */
export const toneClass: Record<Tone, string> = {
  moss: "tone-moss",
  slate: "tone-slate",
  clay: "tone-clay",
  bone: "tone-bone",
  ink: "tone-ink",
};

/**
 * A typographic cover: the product's name set large on its tone, with the stack underneath.
 * It stands in for app screenshots until real, permitted ones exist; it is not a mock-up.
 */
export default function WorkCover({ role, className, size = "card" }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "cover relative flex flex-col justify-between overflow-hidden rounded-card p-6 sm:p-8",
        toneClass[role.tone],
        role.tone === "ink" && "ring-1 ring-inset ring-line",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 font-mono text-label uppercase opacity-80">
        <span>{role.sector ?? role.title}</span>
        {role.end === null && <span>Current</span>}
      </div>

      <div>
        <p
          className={cn(
            "font-medium transition-transform duration-500 ease-out group-hover:-translate-y-1.5",
            size === "hero"
              ? "text-cover"
              : "text-[clamp(2.75rem,1.8rem+3.6vw,5.5rem)] leading-[0.92] tracking-[-0.05em]",
          )}
        >
          {displayName(role)}
        </p>
        <div className="mt-6 border-t border-current pt-3 opacity-40" />
        <p className="font-mono text-label opacity-80">{role.tags.join("  /  ")}</p>
      </div>
    </div>
  );
}
