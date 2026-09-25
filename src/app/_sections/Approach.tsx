import Link from "next/link";
import { approachStatement, principles } from "@/content/approach";
import { displayName, roleBySlug } from "@/lib/work";

/** A statement that stays put on large screens while the principles scroll past it. */
export default function Approach() {
  return (
    <section id="approach" className="border-t border-line bg-surface">
      <div className="page grid gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <h2 className="sr-only">Approach</h2>
            <p data-reveal className="text-h3 font-normal leading-[1.25] sm:text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)]">
              {approachStatement}
            </p>
          </div>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line lg:col-span-5 lg:col-start-8">
          {principles.map((principle, i) => (
            <li key={principle.title} data-reveal className="bg-surface p-6 sm:p-7">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-body font-medium">{principle.title}</h3>
              </div>
              <p className="mt-3 text-small text-muted">{principle.body}</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                <span className="label">Seen at</span>
                {principle.evidence.map(slug => {
                  const role = roleBySlug(slug);
                  if (!role) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/work/${slug}`}
                      className="font-mono text-label text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
                    >
                      {displayName(role)}
                    </Link>
                  );
                })}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
