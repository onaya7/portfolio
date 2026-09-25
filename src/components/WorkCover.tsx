import type { Role, Screenshot, Tone } from "@/content/types";
import { cn } from "@/lib/utils";
import { displayName } from "@/lib/work";
import PhoneShot from "./PhoneShot";

type Props = {
  role: Role;
  className?: string;
  /** Heading level is the caller's; the cover's own wordmark is presentational. */
  size?: "card" | "hero";
  /** When set, the screenshot rises out of the cover's right side. */
  shot?: Screenshot;
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
 * The product's name set large on its tone, with the stack underneath. With a screenshot, the
 * phone sits at the right and the wordmark narrows to make room; without one, the type alone
 * carries the cover.
 */
export default function WorkCover({ role, className, size = "card", shot }: Props) {
  return (
    <div
      className={cn(
        "cover relative flex flex-col justify-between overflow-hidden rounded-card p-6 sm:p-8",
        toneClass[role.tone],
        role.tone === "ink" && "ring-1 ring-inset ring-line",
        className,
      )}
    >
      <div
        aria-hidden
        className="relative z-10 flex items-start justify-between gap-4 font-mono text-label uppercase opacity-80"
      >
        <span>{role.sector ?? role.title}</span>
        {role.end === null && !shot && <span>Current</span>}
      </div>

      {shot && (
        <PhoneShot
          shot={shot}
          sizes={size === "hero" ? "(min-width: 1024px) 18rem, 40vw" : "(min-width: 1024px) 14rem, 36vw"}
          priority={size === "hero"}
          className={cn(
            "absolute transition-transform duration-500 ease-out group-hover:-translate-y-2",
            size === "hero"
              ? "right-5 top-16 w-[40%] max-w-[18rem] sm:right-12 sm:top-20"
              : "right-5 top-14 w-[36%] max-w-[13rem] sm:right-8 sm:top-16",
          )}
        />
      )}

      <div aria-hidden className={cn("relative z-10", shot && "max-w-[58%]")}>
        <p
          className={cn(
            "font-medium transition-transform duration-500 ease-out group-hover:-translate-y-1.5",
            size === "hero"
              ? "text-cover"
              : "text-[clamp(2.75rem,1.8rem+3.6vw,5.5rem)] leading-[0.92] tracking-[-0.05em]",
            shot && size === "card" && "text-[clamp(2.25rem,1.6rem+2.4vw,4rem)]",
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
