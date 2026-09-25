import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portrait } from "@/content/portrait";
import { contact } from "@/content/profile";
import { current, displayName, formatMonth, previous } from "@/lib/work";
import Button from "@/components/Button";

/** The four roles before the current one, named as a quiet track record. */
const before = previous.slice(0, 4);

export default function Hero() {
  return (
    <section className="page grid gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
      <div className="lg:col-span-7 lg:self-center xl:col-span-8">
        <h1 className="max-w-[16ch] text-[clamp(2.625rem,1.4rem+3.6vw,4.75rem)] font-normal leading-[0.98] tracking-[-0.045em]">
          <span className="rise block" style={{ "--i": 0 } as React.CSSProperties}>
            Mobile apps for money,
          </span>
          <span className="rise block text-muted" style={{ "--i": 1 } as React.CSSProperties}>
            identity and movement.
          </span>
        </h1>

        <div className="rise mt-10 lg:mt-12" style={{ "--i": 2 } as React.CSSProperties}>
          <p className="max-w-[40ch] text-lead text-muted">
            I&apos;m Samuel Ayano, a senior mobile engineer in Lagos. Over six years in software, five-plus shipping{" "}
            <span className="text-fg">Flutter, Swift and Kotlin</span> to production.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#work">See the work</Button>
            <Button href={`mailto:${contact.email}`} variant="secondary">
              Email me
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
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
      </div>

      {/* The portrait is the page's LCP element, so it paints immediately; only the card rises. */}
      <div className="mx-auto w-full max-w-[22rem] lg:col-span-5 lg:mx-0 lg:ml-auto xl:col-span-4">
        <div className="overflow-hidden rounded-card bg-surface ring-1 ring-line">
          <Image
            src={portrait.image}
            alt={portrait.alt}
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="(min-width: 400px) 22rem, 100vw"
            className="aspect-[480/516] w-full object-cover grayscale"
          />
        </div>

        {current && (
          <Link
            href={`/work/${current.slug}`}
            style={{ "--i": 3 } as React.CSSProperties}
            className="rise group relative mx-3 -mt-14 block rounded-card border border-line bg-surface/95 p-5 backdrop-blur-md transition-colors duration-300 hover:border-line-strong sm:mx-4"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="label">Now, since {formatMonth(current.start)}</p>
              <ArrowRight
                aria-hidden
                strokeWidth={1.75}
                className="size-4 text-subtle transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-fg"
              />
            </div>
            <p className="mt-3 text-body font-medium">
              {current.title}, <span className="text-accent">{displayName(current)}</span>
            </p>
            <p className="mt-1.5 text-small text-muted">{current.summary}</p>
          </Link>
        )}
      </div>
    </section>
  );
}
