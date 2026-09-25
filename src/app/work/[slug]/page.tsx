import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { roles } from "@/content/roles";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { displayName, formatDuration, formatPeriod, nextRole, roleBySlug } from "@/lib/work";
import Contact from "@/components/Contact";
import WorkCover, { toneClass } from "@/components/WorkCover";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return roles.map(role => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: Props) {
  const role = roleBySlug((await params).slug);
  if (!role) return {};
  return pageMetadata({
    title: `${displayName(role)}, ${role.title}`,
    description: role.summary,
    path: `/work/${role.slug}`,
  });
}

export default async function WorkPage({ params }: Props) {
  const role = roleBySlug((await params).slug);
  if (!role) notFound();
  const next = nextRole(role);

  const facts = [
    { term: "Role", value: role.title },
    { term: "Company", value: role.context ? `${role.company}, ${role.context}` : role.company },
    { term: "Period", value: formatPeriod(role) },
    { term: "Duration", value: formatDuration(role) },
    ...(role.sector ? [{ term: "Sector", value: role.sector }] : []),
    ...(role.terms ? [{ term: "Terms", value: role.terms }] : []),
  ];

  return (
    <>
      <article className="page pb-20 pt-10 lg:pb-28 lg:pt-14">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-label text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft
            aria-hidden
            strokeWidth={1.75}
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
          />
          All work
        </Link>

        <header className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="rise text-display font-normal">{displayName(role)}</h1>
            <p className="rise mt-6 max-w-[46ch] text-lead text-muted" style={{ "--i": 1 } as React.CSSProperties}>
              {role.summary}
            </p>
          </div>
          <dl
            className="rise grid grid-cols-2 gap-x-6 gap-y-5 self-end lg:col-span-4 lg:col-start-9"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {facts.map(fact => (
              <div key={fact.term}>
                <dt className="label">{fact.term}</dt>
                <dd className="mt-1 text-small">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <WorkCover role={role} size="hero" className="rise mt-12 h-[22rem] sm:h-[28rem] lg:mt-16 lg:h-[34rem]" />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4">
            <div className="grid gap-10 lg:sticky lg:top-28">
              {role.metric ? (
                <div data-reveal>
                  <p className="text-figure font-normal text-accent">{role.metric.value}</p>
                  <p className="mt-3 max-w-[26ch] text-small text-muted">{role.metric.label}</p>
                </div>
              ) : null}
              <div data-reveal>
                <h2 className="label">Stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {role.stack.map(item => (
                    <li key={item} className="rounded-full border border-line px-3 py-1.5 text-small text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {role.links?.length ? (
                <div data-reveal>
                  <h2 className="label">Links</h2>
                  <ul className="mt-3 grid gap-2">
                    {role.links.map(link => (
                      <li key={link.href}>
                        <a href={link.href} className="inline-flex items-center gap-1.5 text-small hover:text-accent">
                          {link.label}
                          <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </aside>

          <section className="lg:col-span-7 lg:col-start-6">
            <h2 data-reveal className="text-h3 font-normal">
              What I did
            </h2>
            <ol className="mt-8 border-b border-line">
              {role.highlights.map((highlight, i) => (
                <li key={highlight} data-reveal className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5">
                  <span className="pt-1 font-mono text-label text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-body">{highlight}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <Link
          href={`/work/${next.slug}`}
          data-reveal
          className={cn(
            "cover group mt-20 flex items-end justify-between gap-6 rounded-card p-6 sm:p-8 lg:mt-28",
            toneClass[next.tone],
            next.tone === "ink" && "ring-1 ring-inset ring-line",
          )}
        >
          <div>
            <p className="font-mono text-label opacity-80">Next</p>
            <p className="mt-2 text-h2 font-normal">{displayName(next)}</p>
            <p className="mt-1 text-small opacity-80">{next.title}</p>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full [border:1px_solid_rgb(var(--tone-fg)/0.35)] transition-transform duration-300 ease-out group-hover:translate-x-1">
            <ArrowRight aria-hidden strokeWidth={1.75} className="size-5" />
          </span>
        </Link>
      </article>
      <Contact />
    </>
  );
}
