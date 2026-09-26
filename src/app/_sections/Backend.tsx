import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { backend } from "@/content/backend";
import { cn } from "@/lib/utils";
import { displayName, roleBySlug } from "@/lib/work";

/**
 * Backend range, set as a type specimen: each language's name large, with one line under it.
 * Uneven columns (5/4/3) weight Go, the one in production, over the others.
 */
const spans = ["lg:col-span-5", "lg:col-span-4", "lg:col-span-3"];

export default function Backend() {
  return (
    <section id="backend" className="border-t border-line">
      <div className="page py-20 lg:py-28">
        <h2 data-reveal className="max-w-[20ch] text-h2 font-normal">
          {backend.heading}
        </h2>
        <p data-reveal className="mt-6 max-w-[56ch] text-lead text-muted" style={{ "--i": 1 } as React.CSSProperties}>
          {backend.body}
        </p>

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12">
          {backend.languages.map((language, i) => {
            const role = "evidence" in language && language.evidence ? roleBySlug(language.evidence) : undefined;
            return (
              <li
                key={language.name}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className={cn("border-t border-line pt-6", spans[i] ?? "lg:col-span-4")}
              >
                <p
                  className={cn(
                    "text-[clamp(3.5rem,2.4rem+4.4vw,7rem)] font-normal leading-[0.9] tracking-[-0.05em]",
                    role ? "text-accent" : "text-fg",
                  )}
                >
                  {language.name}
                </p>
                <p className="mt-5 max-w-[34ch] text-small text-muted">{language.detail}</p>
                {role && (
                  <Link
                    href={`/work/${role.slug}`}
                    className="group mt-3 inline-flex items-center gap-1.5 font-mono text-label text-muted transition-colors hover:text-fg"
                  >
                    {role.title}, {displayName(role)}
                    <ArrowRight
                      aria-hidden
                      strokeWidth={1.75}
                      className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <p data-reveal className="mt-12 max-w-[56ch] text-small text-subtle">
          {backend.note}
        </p>
      </div>
    </section>
  );
}
