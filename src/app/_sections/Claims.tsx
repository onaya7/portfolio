import Link from "next/link";
import { claimEvidence } from "@/lib/derive";

/** The three claims, each followed by the roles that evidence it. */
const Claims = () => (
  <section aria-labelledby="claims-heading" className="mx-auto max-w-ledger px-r2 py-r5 md:px-r4">
    <h2 id="claims-heading" className="font-mono text-micro text-void">
      what this record argues
    </h2>

    <ol className="mt-r3 border-t border-rule">
      {claimEvidence().map(({ claim, evidence }, i) => (
        <li
          key={claim.id}
          className="grid gap-r2 border-b border-rule py-r4 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-r3"
        >
          <span aria-hidden className="tnum font-mono text-micro text-void">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="max-w-[46rem]">
            <h3 className="text-title font-light">{claim.statement}</h3>
            <p className="mt-r2 max-w-measure text-body text-void">{claim.support}</p>
            <ul className="mt-r2 flex flex-wrap gap-x-r2 gap-y-r1 font-mono text-micro">
              {evidence.map(role => (
                <li key={role.slug}>
                  <Link
                    href={`/work/${role.slug}`}
                    className="text-stamp underline decoration-stamp/30 underline-offset-4 transition-colors duration-[120ms] ease-mark hover:decoration-stamp"
                  >
                    {role.company}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default Claims;
