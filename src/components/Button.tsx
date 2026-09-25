import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  /** Show the diagonal arrow. On by default for primary. */
  arrow?: boolean;
};

/**
 * The page's two button styles. Every interactive control is a full pill; every surface is the
 * 1.25rem card radius. Nothing else gets a radius.
 */
export default function Button({ href, children, variant = "primary", className, arrow }: Props) {
  const external = /^(mailto:|tel:|https?:)/.test(href);
  const showArrow = arrow ?? variant === "primary";
  const classes = cn(
    "group inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-5 text-small font-medium transition duration-200 ease-out active:scale-[0.98]",
    variant === "primary"
      ? "bg-accent text-accent-ink hover:brightness-110"
      : "border border-line-strong text-fg hover:border-fg/60 hover:bg-fg/[0.04]",
    className,
  );
  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowUpRight
          aria-hidden
          strokeWidth={2}
          className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  return external ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
