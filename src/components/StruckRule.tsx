/**
 * The ledger convention for a line item with no entry, and the site's answer to the five roles
 * whose outcome the resume never states.
 *
 * Drawn in `void` rather than `rule`, because this one carries meaning and has to clear 3:1.
 */
const StruckRule = ({ label = "not disclosed" }: { label?: string }) => (
  <div className="text-right">
    <span className="sr-only">Outcome {label}</span>
    <span aria-hidden className="flex h-[1.375rem] items-center justify-end md:h-[1.75rem]">
      <span className="strike block h-px w-10 origin-left bg-void md:w-14" />
    </span>
    <span
      aria-hidden
      className="strike-label mt-r1 block font-mono text-[0.625rem] tracking-[0.06em] text-void md:text-[0.6875rem]"
    >
      {label}
    </span>
  </div>
);

export default StruckRule;
