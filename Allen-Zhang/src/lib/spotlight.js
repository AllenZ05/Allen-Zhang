// Tracks the cursor inside a card so CSS can draw a radial "spotlight"
// at var(--mx) / var(--my). Attach as onMouseMove on the card element.
export const handleSpotlightMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};
