import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contact } from "@/content/profile";
import { current, displayName, formatMonth, timeline } from "@/lib/work";
import Button from "@/components/Button";

/** The four roles before the current one, named as a quiet track record under it. */
const before = timeline.filter(role => role.end !== null).slice(0, 4);

export default function Hero() {
  return (
    <section className="page pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
      <h1 className="max-w-[16ch] text-display font-normal lg:max-w-[18ch]">
        <span className="rise block" style={{ "--i": 0 } as React.CSSProperties}>
          Mobile apps for money,
        </span>
        <span className="rise block text-muted" style={{ "--i": 1 } as React.CSSProperties}>
          identity and movement.
        </span>
      </h1>

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
        <div className="rise lg:col-span-5" style={{ "--i": 2 } as React.CSSProperties}>
          <p className="max-w-[34ch] text-lead text-muted">
            I&apos;m Samuel Ayano, a senior mobile engineer in Lagos. Over six years in software, five-plus shipping{" "}
            <span className="text-fg">Flutter, Swift and Kotlin</span> to production.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#work">See the work</Button>
            <Button href={`mailto:${contact.email}`} variant="secondary">
              Email me
            </Button>
          </div>
        </div>

        {current && (
          <div className="rise lg:col-span-6 lg:col-start-7" style={{ "--i": 3 } as React.CSSProperties}>
            <Link
              href={`/work/${current.slug}`}
              className="group block rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="label">Now, since {formatMonth(current.start)}</p>
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-4 text-subtle transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-fg"
                />
              </div>
              <p className="mt-5 text-h3 font-medium">
                {current.title}, <span className="text-accent">{displayName(current)}</span>
              </p>
              <p className="mt-2 max-w-[52ch] text-small text-muted">{current.summary}</p>
            </Link>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2 px-1">
              <span className="label">Before that</span>
              {before.map(role => (
                <Link
                  key={role.slug}
                  href={`/work/${role.slug}`}
                  className="text-small text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                >
                  {displayName(role)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
