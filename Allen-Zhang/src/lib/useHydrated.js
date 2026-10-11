"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

// Progressive enhancement: the server renders usable links/content first.
export const useHydrated = () => useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
