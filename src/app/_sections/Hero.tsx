import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portrait } from "@/content/portrait";
import { contact } from "@/content/profile";
import { alsoNow, current, displayName, formatMonth, previous } from "@/lib/work";
import Button from "@/components/Button";

/** The four roles before the current one, named as a quiet track record. */
const before = previous.slice(0, 4);

/** Every ongoing role, the `hero` one first, each with equal weight in the "Now" card. */
const nowRoles = [current, ...alsoNow].filter((role): role is NonNullable<typeof role> => role !== null);

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
            I&apos;m Samuel Ayano, a software engineer in Lagos with mobile at the core:{" "}
            <span className="text-fg">Flutter, Swift and Kotlin</span> in production for over five years, and backend
            services in <span className="text-fg">Go and Python</span>.
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

        {nowRoles.length > 0 && (
          <div
            style={{ "--i": 3 } as React.CSSProperties}
            className="rise relative mx-3 -mt-14 rounded-card border border-line bg-surface/95 p-2 backdrop-blur-md sm:mx-4"
          >
            <p className="label px-3 pb-1 pt-3">Now</p>
            <ul className="divide-y divide-line">
              {nowRoles.map(role => (
                <li key={role.slug}>
                  <Link
                    href={`/work/${role.slug}`}
                    className="group block rounded-[0.75rem] px-3 py-3.5 transition-colors duration-200 hover:bg-fg/[0.04]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-body font-medium leading-snug">
                        {role.title}, <span className="text-accent">{displayName(role)}</span>
                      </p>
                      <ArrowRight
                        aria-hidden
                        strokeWidth={1.75}
                        className="mt-1 size-4 shrink-0 text-subtle transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-fg"
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-label text-subtle">
                      Since {formatMonth(role.start)}
                      <span aria-hidden>{"  /  "}</span>
                      {role.tags.slice(0, 2).join(", ")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
