import { stack } from "@/content/stack";
import { cn } from "@/lib/utils";

/**
 * Eight groups in an uneven grid. Spans are keyed by group name so reordering the content
 * does not scramble the layout; an unknown group falls back to a third of the row.
 */
const layout: Record<string, string> = {
  Mobile: "lg:col-span-5 bg-accent text-accent-ink",
  "Payments & security": "lg:col-span-7 cover tone-moss",
  Architecture: "lg:col-span-4",
  "Data & backend": "lg:col-span-4",
  Delivery: "lg:col-span-4",
  "Testing & monitoring": "lg:col-span-6",
  Maps: "lg:col-span-3",
  "AI-assisted": "lg:col-span-3",
};

export default function Stack() {
  return (
    <section id="stack" className="border-t border-line">
      <div className="page py-20 lg:py-28">
        <h2 data-reveal className="text-h2 font-normal">
          Stack
        </h2>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12">
          {stack.map((group, i) => {
            const tinted = group.name === "Mobile" || group.name === "Payments & security";
            return (
              <li
                key={group.name}
                data-reveal
                style={{ "--i": i % 3 } as React.CSSProperties}
                className={cn(
                  "flex flex-col justify-between gap-8 rounded-card p-6 sm:p-7",
                  layout[group.name] ?? "lg:col-span-4",
                  !tinted && "border border-line bg-surface",
                )}
              >
                <h3 className={cn("font-mono text-label", tinted ? "opacity-80" : "text-subtle")}>{group.name}</h3>
                {group.name === "Mobile" ? (
                  <p className="text-h2 font-normal">
                    {group.items
                      .filter(item => item.primary)
                      .map(item => item.label)
                      .join(", ")}
                    <span className="opacity-60">
                      ,{" "}
                      {group.items
                        .filter(item => !item.primary)
                        .map(item => item.label)
                        .join(", ")}
                    </span>
                  </p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <li
                        key={item.label}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-small",
                          tinted
                            ? "[border-color:rgb(var(--tone-fg)/0.3)]"
                            : item.primary
                              ? "border-line-strong text-fg"
                              : "border-line text-muted",
                        )}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
