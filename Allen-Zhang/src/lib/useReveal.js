"use client";

import { useEffect } from "react";

// Reveals elements marked data-reveal as they scroll into view (styles in globals.css); elements
// that arrive together are staggered. Re-scans after each route change, since every page renders
// new elements. Elements in hidden tab panels reveal once their panel is shown.
export function useReveal(routeKey) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: routeKey re-scans the page after navigation.
  useEffect(() => {
    let index = 0;
    const reveal = (element, baseDelay = 0) => {
      // Cards set their own spacing with --reveal-step (globals.css); the order is capped so a long
      // batch never waits too long.
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
      // Reveal what is already on screen right away instead of waiting for the observer's first
      // report, which some engines deliver late; the observer handles everything further down.
      // A short base delay lets the page heading lead and the cards follow.
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.top < window.innerHeight * 0.92 && rect.bottom > 0) reveal(element, 0.15);
      else observer.observe(element);
    }
    return () => observer.disconnect();
  }, [routeKey]);
}
