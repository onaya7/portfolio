import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { claims } from "@/content/claims";
import { roles } from "@/content/roles";
import { concurrencyMap } from "@/lib/derive";
import { pageMetadata } from "@/lib/metadata";
import Figure from "@/components/Figure";
import StruckRule from "@/components/StruckRule";

export function generateStaticParams() {
  return roles.map(role => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find(r => r.slug === slug);
  if (!role) return {};
  return pageMetadata({
    title: `${role.company}, ${role.title}`,
    description: role.problem,
    path: `/work/${role.slug}`,
  });
}

/** A single settlement line, opened out. */
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = roles.find(r => r.slug === slug);
  if (!role) notFound();

  const concurrent = (concurrencyMap().get(role.slug) ?? [])
    .map(s => roles.find(r => r.slug === s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <article className="mx-auto max-w-ledger px-r2 py-r5 md:px-r4">
      <p className="tnum font-mono text-micro text-void">
        {role.dateLabel} / {role.sector.toLowerCase()}
      </p>

      <h1 className="mt-r2 max-w-[18ch] text-title font-light">{role.company}</h1>
      <p className="mt-r1 font-mono text-micro text-void">
        {role.title}
        {role.companyNote ? `, ${role.companyNote}` : ""}
      </p>

      <div className="mt-r4 grid gap-r4 border-t border-rule pt-r4 md:grid-cols-[minmax(0,1fr)_11rem] md:gap-r5">
        <div className="max-w-measure">
          <Field label="the problem">{role.problem}</Field>
          <Field label="my role">{role.myRole}</Field>

          {role.constraints.length > 0 ? (
            <section className="mt-r4">
              <h2 className="font-mono text-micro text-void">constraints</h2>
              <ul className="mt-r2 space-y-r1">
                {role.constraints.map(c => (
                  <li key={c} className="border-l border-rule pl-r2 text-body">
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="mt-r4">
              <h2 className="font-mono text-micro text-void">constraints</h2>
              <p className="mt-r2 font-mono text-micro tracking-[0.06em] text-void">not disclosed</p>
            </section>
          )}

          <section className="mt-r4">
            <h2 className="font-mono text-micro text-void">decisions and their cost</h2>
            <ol className="mt-r2">
              {role.decisions.map(d => (
                <li key={d.decision} className="border-b border-rule py-r2 last:border-b-0">
                  <p className="text-body">{d.decision}</p>
                  {d.tradeoff ? (
                    <p className="mt-r1 max-w-measure text-small text-void">{d.tradeoff}</p>
                  ) : (
                    <p className="mt-r1 flex items-center gap-r1 font-mono text-[0.6875rem] tracking-[0.06em] text-void">
                      <span aria-hidden className="inline-block h-px w-8 bg-void" />
                      tradeoff not disclosed
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {role.sourceNote ? (
            <aside className="mt-r4 border-l-2 border-stamp pl-r2">
              <h2 className="font-mono text-micro text-stamp">on the source</h2>
              <p className="mt-r1 text-small text-void">{role.sourceNote}</p>
            </aside>
          ) : null}
        </div>

        <aside className="space-y-r4">
          <div>
            <h2 className="mb-r2 font-mono text-micro text-void">outcome</h2>
            {role.outcome.kind === "measured" ? (
              <Figure value={role.outcome.value} metric={role.outcome.metric} />
            ) : (
              <StruckRule />
            )}
          </div>

          {role.reach ? (
            <div className="text-right">
              <h2 className="mb-r1 font-mono text-micro text-void">reach</h2>
              <p className="tnum text-section">{role.reach.value}</p>
              <p className="mt-r1 font-mono text-[0.6875rem] leading-snug text-void">{role.reach.metric}</p>
            </div>
          ) : null}

          <div className="text-right">
            <h2 className="mb-r2 font-mono text-micro text-void">stack</h2>
            <ul className="space-y-r1 font-mono text-[0.6875rem] text-ink">
              {role.stack.map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {role.claims.length > 0 ? (
            <div className="text-right">
              <h2 className="mb-r2 font-mono text-micro text-void">evidence for</h2>
              <ul className="space-y-r1 text-small">
                {role.claims.map(id => (
                  <li key={id} className="text-void">
                    {claims.find(c => c.id === id)?.statement}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {concurrent.length > 0 ? (
            <div className="text-right">
              <h2 className="mb-r2 font-mono text-micro text-void">ran alongside</h2>
              <ul className="space-y-r1 font-mono text-[0.6875rem]">
                {concurrent.map(r => (
                  <li key={r.slug}>
                    <Link
                      href={`/work/${r.slug}`}
                      className="text-void underline-offset-4 hover:text-ink hover:underline"
                    >
                      {r.company}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      <Link
        href="/"
        className="mt-r5 inline-block border-t border-rule pt-r2 font-mono text-micro text-void underline-offset-4 hover:text-ink hover:underline"
      >
        back to the record
      </Link>
    </article>
  );
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="mt-r4 first:mt-0">
    <h2 className="font-mono text-micro text-void">{label}</h2>
    <p className="mt-r2 text-lead">{children}</p>
  </section>
);
