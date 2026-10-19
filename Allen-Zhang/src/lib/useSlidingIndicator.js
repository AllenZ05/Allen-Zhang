"use client";

import { useLayoutEffect, useState } from "react";

// Measures the active item so one highlight can slide between items. The container must be
// positioned; activeKey changes with the active item.
export function useSlidingIndicator(container, activeSelector, activeKey) {
  const [box, setBox] = useState(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeKey re-measures when the active item changes.
  useLayoutEffect(() => {
    if (!container) return;
    const measure = () => {
      const active = container.querySelector(activeSelector);
      if (!active) {
        setBox(null);
        return;
      }
      // Layout offsets ignore transforms (entrances, press scaling). An animating ancestor can become
      // the offsetParent, so sum them up to the container.
      let x = 0;
      let y = 0;
      for (let node = active; node && node !== container; node = node.offsetParent) {
        x += node.offsetLeft;
        y += node.offsetTop;
      }
      setBox({ x, y, width: active.offsetWidth, height: active.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [container, activeSelector, activeKey]);

  return box;
}
