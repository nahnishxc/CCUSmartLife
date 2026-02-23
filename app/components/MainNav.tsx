"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Bus, Utensils, Megaphone, Calendar, BookOpen } from "lucide-react";

export default function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Campus", icon: MapPin, href: "/" },
    { name: "Announcement", icon: Megaphone, href: "/announcement" },
    { name: "Restaurant", icon: Utensils, href: "/restaurant" },
    { name: "Transportation", icon: Bus, href: "/transportation" },
    { name: "Guide", icon: BookOpen, href: "/guide" },
    { name: "Reservation", icon: Calendar, href: "/reservation" },
  ];

  const activeOf = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="flex flex-wrap items-center justify-between gap-y-6">
        {navItems.map((item) => {
          const active = activeOf(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              scroll={false}
              className={`flex flex-row items-center gap-3 group cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                active ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                  active
                    ? "bg-emerald-100 text-emerald-600 scale-110"
                    : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110"
                }`}
              >
                <item.icon size={20} />
              </div>
              <span
                className={`text-sm font-bold tracking-wide transition-colors ${
                  active ? "text-black" : "text-gray-500 group-hover:text-gray-800"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}