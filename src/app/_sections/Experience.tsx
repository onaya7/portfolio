import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPeriod, timeline } from "@/lib/work";

/**
 * Every role, newest first. Rows are links; the whole row is the target. Overlapping dates are
 * printed as the resume gives them.
 */
export default function Experience() {
  return (
    <section id="experience" className="page py-20 lg:py-28">
      <h2 data-reveal className="text-h2 font-normal">
        Experience
      </h2>

      <ol className="mt-10 border-b border-line lg:mt-14">
        {timeline.map(role => (
          <li key={role.slug} data-reveal className="border-t border-line">
            <Link
              href={`/work/${role.slug}`}
              className="group -mx-3 grid gap-x-8 gap-y-2 rounded-card px-3 py-6 transition-colors duration-200 hover:bg-surface sm:grid-cols-12 sm:py-7"
            >
              <p className="font-mono text-label text-subtle sm:col-span-3 sm:pt-1.5">
                {formatPeriod(role)}
                {role.terms && <span className="block">{role.terms}</span>}
              </p>
              <div className="sm:col-span-4">
                <h3 className="text-body font-medium">
                  {role.company}
                  {role.end === null && <span className="ml-2 align-middle font-mono text-label text-accent">Now</span>}
                </h3>
                <p className="text-small text-muted">{role.title}</p>
              </div>
              <p className="max-w-[56ch] text-small text-muted sm:col-span-4">{role.summary}</p>
              <span className="hidden justify-end pt-1 sm:col-span-1 sm:flex">
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-4 text-subtle transition duration-200 ease-out group-hover:translate-x-1 group-hover:text-fg"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
