"use client";

import { useLayoutEffect, useState } from "react";

// Measures the active item inside a container so a single highlight can slide between items.
// Offsets are relative to the container (which must be positioned), so page scroll never affects
// the motion. Pass the container element (from a callback ref) and a key that changes with the
// active item; resizing the container re-measures.
export function useSlidingIndicator(container, activeSelector, activeKey) {
  const [box, setBox] = useState(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeKey re-measures when the active item changes.
  useLayoutEffect(() => {
    if (!container) return;
    const measure = () => {
      const active = container.querySelector(activeSelector);
      setBox(
        active
          ? { x: active.offsetLeft, y: active.offsetTop, width: active.offsetWidth, height: active.offsetHeight }
          : null,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [container, activeSelector, activeKey]);

  return box;
}
