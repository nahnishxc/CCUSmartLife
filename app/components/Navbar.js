'use client';

import Link from 'next/link';

export default function Navbar() {


  return (
    <header className="navbar">
      <Link href="/" className="navbar-logo">
        OIA STAMP
      </Link>

      <nav className="navbar-links">
        <a
          href="https://oia.ccu.edu.tw/"
          target="_blank"
          rel="noreferrer"
        >
          OIA
        </a>

        <a
          href="https://www.ccu.edu.tw/"
          target="_blank"
          rel="noreferrer"
        >
          ccu
        </a>

        <a href="/guides">
          guides
        </a>

        <Link href="/login">
          log in
        </Link>

        <Link href="/settings">
          setting
        </Link>
      </nav>
    </header>
  );
}
