import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { displayName, featured, formatYears } from "@/lib/work";
import WorkCover from "@/components/WorkCover";

/**
 * Column spans alternate wide/narrow so the grid reads as a rhythm rather than a table: 7/5 on
 * the first row, 5/7 on the second. Any count works; the pattern repeats.
 */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function Work() {
  return (
    <section id="work" className="page py-20 lg:py-28">
      <h2 data-reveal className="text-h2 font-normal">
        Selected work
      </h2>

      <ul className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:gap-y-20">
        {featured.map((role, i) => (
          <li
            key={role.slug}
            data-reveal
            style={{ "--i": i % 2 } as React.CSSProperties}
            className={cn(spans[i % spans.length])}
          >
            <Link href={`/work/${role.slug}`} className="group block">
              <WorkCover role={role} className="h-[19rem] sm:h-[23rem] lg:h-[27rem]" />
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-h3 font-medium">{displayName(role)}</h3>
                  <p className="label mt-1.5">
                    {role.title}, {formatYears(role)}
                  </p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition duration-300 ease-out group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                  <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4" />
                </span>
              </div>
              <p className="mt-3 max-w-[54ch] text-small text-muted">{role.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
