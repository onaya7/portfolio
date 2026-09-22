"use client";

import { useEffect, useRef } from "react";

/**
 * The signature interaction, "Reconciliation".
 *
 * On the ledger entering view, the four measured figures roll into place and the five struck
 * rules draw, staggered 70ms per row down the column. It runs once and never replays.
 *
 * This component only decides *when*. The start state itself is applied by CSS gated on the
 * `js-motion` class, which an inline script in the document head sets before first paint and
 * only when motion is both supported and wanted. So:
 *
 *   no JavaScript    -> resting state, the correct figures
 *   reduced motion   -> resting state, the correct figures
 *   observer missing -> resting state, the correct figures
 *
 * There is no path where the reader sees a wrong number, and no flash of the final value
 * before it animates.
 */
const Reconcile = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains("js-motion")) return;

    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        el.classList.add("is-running");
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reconcile">
      {children}
    </div>
  );
};

export default Reconcile;
