"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Reveals every `[data-reveal]` element once, as it enters the viewport.
 *
 * The hidden start state only applies under `html.js-reveal`, which the layout's inline script
 * sets when IntersectionObserver exists and reduced motion is off. That script also removes the
 * class after three seconds unless this component has marked itself ready, so a failed
 * hydration can never leave content hidden.
 */
export default function Reveal() {
  useEffect(() => {
    window.__revealReady = true;
    if (!document.documentElement.classList.contains("js-reveal")) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observe = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach(element => observer.observe(element));
    observe();

    // Client-side navigation swaps the page body without remounting the layout.
    const mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
