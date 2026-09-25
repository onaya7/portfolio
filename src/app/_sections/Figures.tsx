import Link from "next/link";
import { cn } from "@/lib/utils";
import { displayName, measured, timeline } from "@/lib/work";

type Figure = { key: string; term: string; value: string; label: string; source: React.ReactNode };

/**
 * The resume's own numbers, each tied to where it came from. The first is the profile's tenure
 * claim; the rest come from `metric` on the roles, newest first.
 */
export default function Figures() {
  const figures: Figure[] = [
    {
      key: "tenure",
      term: "Experience",
      value: "6+",
      label: "years in software engineering, five-plus of them mobile",
      source: <span className="label">Across {timeline.length} roles</span>,
    },
    ...measured.slice(0, 3).map(role => ({
      key: role.slug,
      term: displayName(role),
      value: role.metric.value,
      label: role.metric.label,
      source: (
        <Link href={`/work/${role.slug}`} className="label transition-colors hover:text-accent">
          {displayName(role)}
        </Link>
      ),
    })),
  ];

  return (
    <section aria-label="Figures from the record" className="border-y border-line">
      <dl className="page grid grid-cols-2 lg:grid-cols-4">
        {figures.map((figure, i) => (
          <div
            key={figure.key}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className={cn(
              "border-line py-8 sm:py-10",
              i % 2 === 1 && "border-l pl-4 sm:pl-6",
              i >= 2 && "border-t lg:border-t-0",
              i > 0 && "lg:border-l lg:pl-8",
              "pr-4 lg:pr-8",
            )}
          >
            <dt className="sr-only">{figure.term}</dt>
            <dd className="text-figure font-normal tabular-nums">{figure.value}</dd>
            <dd className="mt-3 max-w-[24ch] text-small text-muted">{figure.label}</dd>
            <dd className="mt-4">{figure.source}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
