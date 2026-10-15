"use client";

import { usePathname } from "next/navigation";
import PageTransition from "../components/PageTransition";
import { useReveal } from "../lib/useReveal";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  useReveal(pathname);

  return <PageTransition key={pathname}>{children}</PageTransition>;
};

export default ClientLayout;
