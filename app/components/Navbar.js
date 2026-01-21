"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Navbar() {
  const linkStyle = "text-sm text-[#333333] hover:underline";

  return (
    <header className="fixed top-0 left-0 right-0 h-20 px-8 flex items-center justify-between bg-white border-b border-[#e5e5e5] z-[100]">
      <Link href="/" className="font-bold text-lg tracking-wider text-black">
        OIA STAMP
      </Link>
      <nav className="flex items-center gap-6">
        <a
          href="https://oia.ccu.edu.tw/"
          target="_blank"
          rel="noreferrer"
          className={linkStyle}
        >
          OIA
        </a>

        <a
          href="https://www.ccu.edu.tw/"
          target="_blank"
          rel="noreferrer"
          className={linkStyle}
        >
          ccu
        </a>
        <Link href="/guides" className={linkStyle}>
          guides
        </Link>

        <button className="flex items-center gap-1 hover:text-black">
          <Globe size={16} /> EN/ZH
        </button>

        <Link
          href="/login"
          className="hover:text-black flex items-center gap-1"
        >
          Log in / Sign up
        </Link>
      </nav>
    </header>
  );
}
