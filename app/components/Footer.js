'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e5e5]">
      <div className="w-full max-w-[1200px] mx-auto px-8 md:px-12 flex items-center justify-between py-[18px] text-[13px] text-[#777777]">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#333333]">CCU International Helper</span>
          <span className="text-[#999999]">© 2025</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-[#777777] hover:text-[#111111] transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-[#777777] hover:text-[#111111] transition-colors">
            Terms
          </Link>
          <span className="text-[#777777]">Designed by CCU MIS & FLL</span>
        </div>
      </div>
    </footer>
  );
}