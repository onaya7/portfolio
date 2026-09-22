"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/contact";

/**
 * Supporting interaction S4, "Copy confirm".
 *
 * The only feedback that a copy happened, so it is required rather than decorative. The
 * confirmation crossfades over 140ms; under reduced motion the global transition reset makes
 * that an instant swap, which still confirms.
 *
 * With no JavaScript this renders as a plain mailto link, which is the useful fallback rather
 * than a dead button.
 */
const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <span className="inline-flex items-baseline gap-r2">
      <a
        href={`mailto:${contact.email}`}
        className="text-lead underline decoration-rule underline-offset-[6px] transition-colors duration-[120ms] ease-mark hover:decoration-stamp"
      >
        {contact.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="border border-void px-r1 py-[2px] font-mono text-[0.6875rem] text-void transition-colors duration-[120ms] ease-mark hover:border-ink hover:text-ink"
      >
        <span className="transition-opacity duration-[140ms]" aria-hidden>
          {copied ? "copied" : "copy"}
        </span>
        <span className="sr-only">{copied ? "Email address copied" : "Copy email address"}</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </span>
  );
};

export default CopyEmail;
