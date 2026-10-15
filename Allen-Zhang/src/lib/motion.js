// Shared spring for UI motion: critically damped (no overshoot), so it settles calmly and,
// when interrupted, continues from the element's current position and velocity.
export const SPRING = { type: "spring", bounce: 0, visualDuration: 0.35 };
