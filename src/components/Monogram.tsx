import { cn } from "@/lib/utils";

/** The mark: initials set in the display face inside a rounded square. Type, not a drawing. */
export default function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 place-items-center rounded-[0.625rem] bg-fg font-mono text-[0.8125rem] font-semibold tracking-tight text-bg transition-transform duration-300 ease-out group-hover:-rotate-6",
        className,
      )}
    >
      SA
    </span>
  );
}
