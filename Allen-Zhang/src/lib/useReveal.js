"use client";

import { useEffect } from "react";

// Reveals elements marked data-reveal as they scroll into view (styles in globals.css); elements
// that arrive together are staggered. Re-scans after each route change, since every page renders
// new elements. Elements in hidden tab panels reveal once their panel is shown.
export function useReveal(routeKey) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: routeKey re-scans the page after navigation.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let index = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 0.08}s`);
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
          index += 1;
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const element of document.querySelectorAll("[data-reveal]:not([data-revealed])")) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, [routeKey]);
}
