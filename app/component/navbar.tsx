"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import aprendece from "../../app/img/log.png";
import Image from "next/image";
import Style from "../login/login.module.css";
// import Style from "./login.module.css";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/Personas", label: "Personas" },
  { href: "/System", label: "System" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
<nav className="h-screen w-60 bg-white border-r-2 border-[#ffffff] flex flex-col p-5 shadow-lg">

  <Image
            src={aprendece}
            alt="Logo"
            className={Style.logo}
          />
    {/* <h2 className="text-2xl font-bold mb-8 text-black">
        Aprendéce
      </h2> */}

      <div className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-black hover:text-blue-900 hover:bg-blue-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}