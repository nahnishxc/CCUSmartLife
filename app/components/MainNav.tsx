"use client";
import { useState, useEffect } from "react";
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
    { name: "Guide", icon: BookOpen, href: "/guide" },
  ];

  const isOthersActive = pathname.startsWith("/others");

  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="flex flex-wrap items-center justify-between gap-y-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            className={`flex flex-row items-center gap-3 group cursor-pointer p-2 rounded-lg transition-all duration-200 ${
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) 
              ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"
            }`}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
              ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
            }`}>
              <item.icon size={20} />
            </div>
            <span className={`text-base font-bold tracking-wide transition-colors ${
              (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) ? "text-black" : "text-gray-500 group-hover:text-gray-800"
            }`}>
              {item.name}
            </span>
          </Link>
        ))}

        {/* Others Dropdown - 修正感應區域 */}
        <div 
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link
            href="/others"
            className={`flex flex-row items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 ${
              isOthersActive ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"
            }`}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isOthersActive ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
            }`}>
              <Calendar size={20} />
            </div>
            <span className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${
              isOthersActive ? "text-black" : "text-gray-500 group-hover:text-gray-800"
            }`}>
              Others
              <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </span>
          </Link>

          {/* 下拉容器：增加 mt-0 確保與上方按鈕無縫接軌 */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 pt-1 w-44 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-xl py-2">
                <Link href="/others" scroll={false}>
                  <div className="px-4 py-3 hover:bg-emerald-50 transition-colors cursor-pointer group/item">
                    <p className="text-sm font-bold text-gray-700 group-hover/item:text-emerald-600">Clubs</p>
                  </div>
                </Link>
                <div className="h-[1px] bg-gray-50 mx-2" />
                <Link href="/others/healthcare" scroll={false}>
                  <div className="px-4 py-3 hover:bg-emerald-50 transition-colors cursor-pointer group/item">
                    <p className="text-sm font-bold text-gray-700 group-hover/item:text-emerald-600">Healthcare</p>
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