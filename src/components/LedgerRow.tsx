import Link from "next/link";
import type { Role } from "@/content/types";
import Figure from "./Figure";
import StruckRule from "./StruckRule";

/**
 * One settlement line.
 *
 * Three columns: the date rail, the entry, and the figures column. Whether the figure
 * reconciles or is struck is decided by the `Outcome` variant, so a role cannot be rendered
 * without saying which it is.
 */
const LedgerRow = ({ role, index }: { role: Role; index: number }) => (
  <li className="group relative border-b border-rule" style={{ "--row": index } as React.CSSProperties}>
    <Link
      href={`/work/${role.slug}`}
      className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-r2 gap-y-r2 py-r3 outline-offset-4 md:grid-cols-[7rem_minmax(0,1fr)_11rem] md:gap-x-r3 md:gap-y-0"
    >
      <span
        aria-hidden
        className="mark absolute left-0 top-r3 hidden h-[1.125rem] w-[3px] origin-left scale-x-0 bg-stamp transition-transform duration-[120ms] ease-mark group-hover:scale-x-100 group-focus-within:scale-x-100 md:-ml-r3 md:block"
      />

      <span className="tnum col-start-1 row-start-1 font-mono text-micro leading-relaxed text-void">
        {role.start.replace("-", ".")}
        <br />
        {role.end ? role.end.replace("-", ".") : "present"}
      </span>

      <span className="col-span-2 row-start-2 min-w-0 md:col-span-1 md:col-start-2 md:row-start-1">
        <span className="block text-section">{role.company}</span>
        <span className="mt-r1 block font-mono text-micro text-void transition-colors duration-[120ms] ease-mark group-hover:text-ink">
          {role.title}
          {role.companyNote ? `, ${role.companyNote}` : ""}
        </span>
      </span>

      <span className="col-start-2 row-start-1 md:col-start-3">
        {role.outcome.kind === "measured" ? (
          <Figure value={role.outcome.value} metric={role.outcome.metric} />
        ) : (
          <StruckRule />
        )}
      </span>
    </Link>
  </li>
);

export default LedgerRow;
