import type { CSSProperties } from "react";

/** Two full cycles, so every digit rolls through 0-9 once before landing on its value. */
const CYCLE = Array.from({ length: 20 }, (_, i) => i % 10);

/**
 * A measured outcome in the figures column.
 *
 * Each digit sits in its own clipped track. The resting transform is the final value, so with
 * no JavaScript, or with reduced motion, the correct figure is what renders. The signature
 * interaction adds a start state and animates back to this.
 *
 * Tracks are `aria-hidden`; the plain value is exposed once, to be read as a number rather
 * than as twenty loose digits.
 */
const Figure = ({ value, metric }: { value: string; metric: string }) => (
  <div className="text-right">
    <span className="sr-only">
      {value} {metric}
    </span>
    <span
      aria-hidden
      className="tnum inline-flex font-mono text-[1.375rem] font-medium leading-none text-stamp md:text-[1.75rem]"
    >
      {value.split("").map((char, i) =>
        /\d/.test(char) ? (
          <span key={i} className="digit" style={{ "--d": Number(char) } as CSSProperties}>
            <span className="digit-track">
              {CYCLE.map((d, j) => (
                <span key={j}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i}>{char}</span>
        ),
      )}
    </span>
    <span
      aria-hidden
      className="mt-r1 block max-w-[8rem] font-mono text-[0.625rem] leading-snug text-void md:max-w-none md:text-[0.6875rem]"
    >
      {metric}
    </span>
  </div>
);

export default Figure;
