import { rolesByRecency, rolesWithOutcome, rolesWithoutOutcome } from "@/lib/derive";
import LedgerRow from "@/components/LedgerRow";
import Reconcile from "@/components/Reconcile";

/**
 * The record. Nine roles, newest first.
 *
 * The count line states the split up front, so the pattern of reconciled and struck figures
 * is legible before any of it animates, and stays legible if it never does.
 */
const Ledger = () => {
  const roles = rolesByRecency();

  return (
    <section aria-labelledby="ledger-heading" className="mx-auto max-w-ledger px-r2 pb-r5 md:px-r4">
      <div className="flex flex-wrap items-baseline justify-between gap-r2 border-b border-rule pb-r2">
        <h2 id="ledger-heading" className="font-mono text-micro text-void">
          the record
        </h2>
        <p className="font-mono text-micro text-void">
          <span className="tnum text-ink">{roles.length}</span> entries,{" "}
          <span className="tnum text-ink">{rolesWithOutcome().length}</span> reconciled,{" "}
          <span className="tnum text-ink">{rolesWithoutOutcome().length}</span> not disclosed
        </p>
      </div>

      <Reconcile>
        <ol>
          {roles.map((role, i) => (
            <LedgerRow key={role.slug} role={role} index={i} />
          ))}
        </ol>
      </Reconcile>
    </section>
  );
};

export default Ledger;
