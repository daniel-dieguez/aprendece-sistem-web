"use client";

import { ReactNode } from "react";

export const Row = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col md:flex-row gap-4 ${className}`}>{children}</div>
);

export const Col = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col gap-1 flex-1 min-w-0 ${className}`}>{children}</div>
);