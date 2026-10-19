"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, ViewTransition } from "react";
import { useReveal } from "../lib/useReveal";

// Navbar order, so page changes slide the same way the nav highlight moves.
const PAGE_ORDER = ["/", "/about", "/experiences", "/projects"];
const pageIndex = (path) => PAGE_ORDER.indexOf(path.replace(/\/$/, "") || "/");

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  useReveal(pathname);

  // Tells globals.css which way to slide, before the view transition captures the new page. The flag
  // outlasts the page's entrance, so removing it never restarts it.
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

  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      <div className="page-content">{children}</div>
    </ViewTransition>
  );
};

export default ClientLayout;
