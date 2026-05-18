'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    // 【套用】：將背景改為純淨暖白 bg-[#fffefb]，頂部邊框改為米灰虛線 border-dashed border-[#eadfce]
    <footer className="bg-[#fffefb] border-t-2 border-dashed border-[#eadfce]">
      <div className="w-full max-w-[1200px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between py-[18px] text-[13px] text-[#6f7b76]">
        
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          {/* 【微調】：文字顏色加深一點，並套用圓潤字重 */}
          <span className="font-bold text-gray-800 tracking-tight">CCU SmartLife</span>
          <span className="text-[#a8a196] font-medium">© 2026</span>
        </div>

        <div className="flex items-center gap-4 font-medium">
          {/* 【修正】：將 <p href="#"> 改為合法的 <Link href="#">，並加入綠色 hover 效果 */}
          <Link href="#" className="text-[#8c8273] hover:text-emerald-700 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-[#8c8273] hover:text-emerald-700 transition-colors">
            Terms
          </Link>
          {/* 加入一點點點綴的區隔線 */}
          <span className="text-[#eadfce]">|</span>
          <span className="text-[#8c8273]">Designed by CCU MIS & FLLD</span>
        </div>
        
      </div>
    </footer>
  );
}