"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

// False in the static HTML and during hydration, so components can render a no-JavaScript fallback.
export const useHydrated = () => useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
