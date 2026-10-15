"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, ViewTransition } from "react";
import PageTransition from "../components/PageTransition";
import { useReveal } from "../lib/useReveal";

// Navbar order, so page changes slide the same way the nav highlight moves.
const PAGE_ORDER = ["/", "/about", "/experiences", "/projects"];
const pageIndex = (path) => PAGE_ORDER.indexOf(path.replace(/\/$/, "") || "/");

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  useReveal(pathname);

  // Runs inside the navigation's view transition, before the new page is captured: tells
  // globals.css which way to slide (the slide replaces the page container's own rise). The flag
  // outlasts that rise, so removing it never restarts it.
  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    const from = pageIndex(previousPath.current);
    const to = pageIndex(pathname);
    previousPath.current = pathname;
    const root = document.documentElement;
    root.setAttribute("data-nav", from === -1 || to === -1 ? "none" : to > from ? "forward" : "back");
    const timer = setTimeout(() => root.removeAttribute("data-nav"), 1500);
    return () => clearTimeout(timer);
  }, [pathname]);

  // The navbar and footer sit outside the transition, so they stay put (animations in globals.css).
  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      <PageTransition>{children}</PageTransition>
    </ViewTransition>
  );
};

export default ClientLayout;
