import { positioning } from "@/content/claims";
import { site } from "@/content/contact";
import { rolesWithOutcome, rolesWithoutOutcome, yearsActive } from "@/lib/derive";

/**
 * The one deliberate grid break.
 *
 * Every other element on the site aligns to the ledger's left rule. The positioning line
 * hangs past it into the margin, and nothing else does.
 */
const Hero = () => {
  const measured = rolesWithOutcome().length;
  const unstated = rolesWithoutOutcome().length;

  return (
    <section className="mx-auto max-w-ledger px-r2 pb-r5 pt-r5 md:px-r4 md:pt-r6">
      <p className="font-mono text-micro text-void">
        {site.title}, {yearsActive()} years
      </p>

      <h1 className="mt-r3 max-w-[16ch] text-display font-light lg:-ml-[0.55em]">
        Mobile money for networks <span className="italic text-stamp">that cannot be relied on</span>
      </h1>

      <p className="sr-only">{positioning}</p>

      <dl className="mt-r4 flex flex-wrap gap-x-r4 gap-y-r1 border-t border-rule pt-r2 font-mono text-micro text-void">
        <div className="flex gap-r1">
          <dt>reconciled</dt>
          <dd className="tnum text-ink">{measured}</dd>
        </div>
        <div className="flex gap-r1">
          <dt>not disclosed</dt>
          <dd className="tnum text-ink">{unstated}</dd>
        </div>
      </dl>
    </section>
  );
};

export default Hero;
