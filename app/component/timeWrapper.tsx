// app/component/timeWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Time from "../component/time";

export default function TimeWrapper() {
  const pathname = usePathname();

  const hideTime = pathname === "/";

  if (hideTime) return null;

  return <Time />;
}