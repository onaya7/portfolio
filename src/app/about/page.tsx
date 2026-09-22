import type { Metadata } from "next";
import { claims, positioning } from "@/content/claims";
import { contact, profileSummary } from "@/content/contact";
import { certifications, education, languages } from "@/content/credentials";
import { skillGroups } from "@/content/skills";
import { writing } from "@/content/writing";
import { decisionsMissingTradeoff, employmentGaps, rolesWithoutOutcome, yearsActive } from "@/lib/derive";
import { pageMetadata } from "@/lib/metadata";
import CopyEmail from "@/components/CopyEmail";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: positioning,
  path: "/about",
});

export default function AboutPage() {
  const gaps = employmentGaps();
  const untraded = decisionsMissingTradeoff().length;

  return (
    <div className="mx-auto max-w-ledger px-r2 py-r5 md:px-r4">
      <h1 className="max-w-[20ch] text-title font-light">{positioning}</h1>
      <p className="mt-r4 max-w-measure text-lead text-void">{profileSummary}</p>

      <Block label="the argument">
        <ol className="space-y-r2">
          {claims.map((claim, i) => (
            <li key={claim.id} className="flex gap-r2">
              <span aria-hidden className="tnum font-mono text-micro text-void">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body">{claim.statement}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block label="skills">
        <dl className="grid gap-x-r4 gap-y-r3 sm:grid-cols-2">
          {skillGroups.map(group => (
            <div key={group.id}>
              <dt className="font-mono text-micro text-void">{group.label}</dt>
              <dd className="mt-r1 text-body">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block label="education and certifications">
        <p className="text-body">
          {education.degree} {education.field}, {education.institution}, {education.location}
        </p>
        <ul className="mt-r2 space-y-r1">
          {certifications.map(cert => (
            <li key={cert.name} className="text-body">
              {cert.name}, {cert.issuer} <span className="tnum font-mono text-micro text-void">{cert.year}</span>
            </li>
          ))}
        </ul>
        <p className="mt-r2 font-mono text-micro text-void">languages: {languages.join(", ")}</p>
      </Block>

      {writing.length > 0 ? (
        <Block label="writing">
          <ul>
            {writing.map(article => (
              <li key={article.slug}>{article.title}</li>
            ))}
          </ul>
        </Block>
      ) : null}

      <Block label="what this record does not contain">
        <ul className="max-w-measure space-y-r2 text-body text-void">
          <li>
            <span className="tnum text-ink">{rolesWithoutOutcome().length}</span> of nine roles state no measurable
            outcome. They are shown struck rather than padded.
          </li>
          <li>
            <span className="tnum text-ink">{untraded}</span> decisions are recorded without their cost, because the
            source states what was decided and not what it traded away.
          </li>
          {gaps.map(gap => (
            <li key={gap.from}>
              A gap of <span className="tnum text-ink">{gap.months}</span> months between {gap.from} and {gap.to}.
            </li>
          ))}
          <li>
            Several roles ran concurrently. Each entry lists what it ran alongside rather than flattening the{" "}
            {yearsActive()} years into a straight line.
          </li>
        </ul>
      </Block>

      <Block label="contact">
        <CopyEmail />
        <p className="mt-r2 font-mono text-micro text-void">
          <a href={`tel:${contact.phoneHref}`} className="underline-offset-4 hover:text-ink hover:underline">
            {contact.phone}
          </a>
          {" / "}
          {contact.location}
        </p>
      </Block>
    </div>
  );
}

const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="mt-r5 border-t border-rule pt-r3">
    <h2 className="mb-r3 font-mono text-micro text-void">{label}</h2>
    {children}
  </section>
);
