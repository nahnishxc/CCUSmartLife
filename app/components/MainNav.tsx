// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { MapPin, Bus, Utensils, Megaphone, Calendar, BookOpen, ChevronDown } from "lucide-react";

// export default function MainNav() {
//   const pathname = usePathname();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const navItems = [
//     { name: "Campus", icon: MapPin, href: "/" },
//     { name: "Announcement", icon: Megaphone, href: "/announcement" },
//     { name: "Restaurant", icon: Utensils, href: "/restaurant" },
//     { name: "Transportation", icon: Bus, href: "/transportation" },
//     { name: "FAQ", icon: BookOpen, href: "/FAQ" },
//   ];

//   const isOthersActive = pathname.startsWith("/others");

//  return (
   
//     <div className="hidden md:block max-w-6xl mx-auto mb-12 px-4 relative z-[90]"> 
//       <div 
//         className="flex flex-nowrap items-center justify-between gap-4 overflow-visible pb-4 mb-0"
//       >
//         {/* 隱藏 Chrome/Safari 捲軸的 inline style */}
//         <style jsx>{`
//           div::-webkit-scrollbar { display: none; }
//         `}</style>

//         {navItems.map((item) => {
//           const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               scroll={false}
//               // flex-shrink-0 是關鍵，防止文字被擠壓
//               className={`flex flex-row items-center gap-3 flex-shrink-0 group cursor-pointer p-2 rounded-xl transition-all duration-200 ${
//                 isActive ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"
//               }`}
//             >
//               <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//                 isActive ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
//               }`}>
//                 <item.icon size={20} />
//               </div>
//               <span className={`text-base font-bold tracking-wide transition-colors ${
//                 isActive ? "text-black" : "text-gray-500 group-hover:text-gray-800"
//               }`}>
//                 {item.name}
//               </span>
//             </Link>
//           );
//         })}

//         {/* Others Dropdown */}
//         <div 
//           className="relative flex-shrink-0"
//           onMouseEnter={() => setIsDropdownOpen(true)}
//           onMouseLeave={() => setIsDropdownOpen(false)}
//         >
//           <Link
//             href="/others"
//             className={`flex flex-row items-center gap-3 cursor-pointer p-2 rounded-xl transition-all duration-200 ${
//               isOthersActive ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"
//             }`}
//           >
//             <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//               isOthersActive ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
//             }`}>
//               <Calendar size={20} />
//             </div>
//             <span className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${
//               isOthersActive ? "text-black" : "text-gray-500 group-hover:text-gray-800"
//             }`}>
//               Others
//               <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
//             </span>
//           </Link>

//           {isDropdownOpen && (
//             <div className="absolute top-full right-0 pt-1 w-44 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
//               <div className="bg-white border border-gray-100 rounded-2xl shadow-xl py-2">
//                 <Link href="/others" scroll={false}>
//                   <div className="px-4 py-3 hover:bg-emerald-50 transition-colors cursor-pointer group/item">
//                     <p className="text-sm font-bold text-gray-700 group-hover/item:text-emerald-600">Clubs</p>
//                   </div>
//                 </Link>
//                 <div className="h-[1px] bg-gray-50 mx-2" />
//                 <Link href="/others/healthcare" scroll={false}>
//                   <div className="px-4 py-3 hover:bg-emerald-50 transition-colors cursor-pointer group/item">
//                     <p className="text-sm font-bold text-gray-700 group-hover/item:text-emerald-600">Healthcare</p>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Bus, Utensils, Megaphone, Calendar, BookOpen, ChevronDown } from "lucide-react";

export default function MainNav() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: "Campus", icon: MapPin, href: "/" },
    { name: "Announcement", icon: Megaphone, href: "/announcement" },
    { name: "Restaurant", icon: Utensils, href: "/restaurant" },
    { name: "Transportation", icon: Bus, href: "/transportation" },
    { name: "FAQ", icon: BookOpen, href: "/FAQ" },
  ];

  const isOthersActive = pathname.startsWith("/others");

  return (
    // 【修改點】px-4 改為 px-6 lg:px-10，讓整排比下方的卡片稍微往內縮
    <div className="hidden md:block max-w-6xl mx-auto mb-10 px-6 lg:px-10 relative z-[90]"> 

<div className="flex flex-nowrap items-center justify-center gap-4 overflow-visible pb-4 mb-0">
        {/* 隱藏 Chrome/Safari 捲軸的 inline style */}
        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              scroll={false}
              // 【修改點】改為 px-4 py-2.5 配合變大的字體，並套用紙張材質
              className={`flex flex-row items-center gap-3 flex-shrink-0 group cursor-pointer px-4 py-2.5 rounded-xl transition-all duration-200 border border-transparent ${
                isActive ? "bg-[#fffdf8] shadow-[0_4px_12px_rgba(90,70,40,0.06)] !border-[#eadfce]" : "hover:bg-[#fffdf8]/60"
              }`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                isActive ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
              }`}>
                <item.icon size={20} />
              </div>
              {/* 【修改點】字體從 text-base 放大到 text-lg */}
              <span className={`text-lg font-bold tracking-wide transition-colors ${
                isActive ? "text-gray-800" : "text-gray-500 group-hover:text-gray-700"
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Others Dropdown */}
        <div 
          className="relative flex-shrink-0"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link
            href="/others"
            // 【修改點】改為 px-4 py-2.5，並套用紙張材質
            className={`flex flex-row items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl transition-all duration-200 border border-transparent ${
              isOthersActive ? "bg-[#fffdf8] shadow-[0_4px_12px_rgba(90,70,40,0.06)] !border-[#eadfce]" : "hover:bg-[#fffdf8]/60"
            }`}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isOthersActive ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
            }`}>
              <Calendar size={20} />
            </div>
            {/* 【修改點】字體從 text-sm 放大到 text-base */}
            <span className={`text-lg font-bold tracking-wide transition-colors flex items-center gap-1 ${
              isOthersActive ? "text-gray-800" : "text-gray-500 group-hover:text-gray-700"
            }`}>
              Others
              <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </span>
          </Link>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 pt-2 w-48 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
              {/* 【修改點】下拉選單背景改為紙張材質 */}
              <div className="bg-[#fffdf8] border border-[#eadfce] rounded-2xl shadow-[0_10px_30px_rgba(90,70,40,0.06)] py-2">
                <Link href="/others" scroll={false}>
                  <div className="px-5 py-3 hover:bg-emerald-50 transition-colors cursor-pointer group/item">
                    {/* 【修改點】字體從 text-sm 放大到 text-base */}
                    <p className="text-base font-bold text-gray-700 group-hover/item:text-emerald-600">Clubs</p>
                  </div>
                </Link>
                <div className="h-[1px] bg-[#eadfce]/50 mx-3 my-1" />
                <Link href="/others/healthcare" scroll={false}>
                  <div className="px-5 py-3 hover:bg-emerald-50 transition-colors cursor-pointer group/item">
                    {/* 【修改點】字體從 text-sm 放大到 text-base */}
                    <p className="text-base font-bold text-gray-700 group-hover/item:text-emerald-600">Healthcare</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}