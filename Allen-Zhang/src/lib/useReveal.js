"use client";

import { useEffect } from "react";

// Reveals [data-reveal] elements as they scroll into view, staggering ones that arrive together.
// routeKey re-scans after each navigation.
export function useReveal(routeKey) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: routeKey re-scans the page after navigation.
  useEffect(() => {
    let index = 0;
    const reveal = (element, baseDelay = 0) => {
      // Capped so a long batch never waits too long.
      element.style.setProperty("--reveal-base", `${baseDelay}s`);
      element.style.setProperty("--reveal-order", String(Math.min(index, 5)));
      element.setAttribute("data-revealed", "");
      index += 1;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        index = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const element of document.querySelectorAll("[data-reveal]:not([data-revealed])")) {
      // What's on screen reveals now (some engines report late), just after the page heading.
      // Elements in hidden tab panels have no size yet, so they wait for the observer.
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.top < window.innerHeight * 0.92 && rect.bottom > 0) reveal(element, 0.15);
      else observer.observe(element);
    }
    return () => observer.disconnect();
  }, [routeKey]);
}
