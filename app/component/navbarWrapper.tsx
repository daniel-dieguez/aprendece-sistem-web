// app/components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "../component/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Oculta el navbar solo en la página de login (page.tsx = "/")
  const hideNavbar = pathname === "/";

  if (hideNavbar) return null;

  return <Navbar />;
}