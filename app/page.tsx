"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Bus, Utensils, Megaphone, Calendar, ChevronDown, ChevronRight } from "lucide-react";

import Announcement from "./components/Announcement";
import Restaurant from "./components/Restaurant";
import Essentials from "./components/Essentials";
import Campus from "./components/Campus";
import Transportation from "./components/Transportation";
import ChatWidget from "./components/ChatWidget"; // 引入新組件

export default function Home() {
  const [activeTab, setActiveTab] = useState("campus");
  const [essentialsSubTab, setEssentialsSubTab] = useState("Finance");
  const [campusSubTab, setCampusSubTab] = useState("About CCU");

  const navItems = [
    { name: "Campus", icon: MapPin, id: "campus" },
    { name: "Announcement", icon: Megaphone, id: "announcement" },
    { name: "Restaurant", icon: Utensils, id: "restaurant" },
    { name: "Transportation", icon: Bus, id: "transportation" },
    { name: "Daily essentials", icon: MapPin, id: "essentials" },
    { name: "Reservation", icon: Calendar, id: "reservation" },
  ];

  // ... (保留你原本的 subItems 定義與 renderContent 邏輯)
  const essentialSubItems = ["Finance", "Healthcare", "Entertainment", "Admission Instructions"];
  const entertainmentSubItems = ["Club", "Entertainment Facilities"];
  const campusSubItems = ["About CCU", "Campus Map", "Administrative", "Academic", "Facilities"];

  const renderContent = () => {
    switch (activeTab) {
      case "campus": return <Campus subTab={campusSubTab} />;
      case "announcement": return <Announcement />;
      case "restaurant": return <Restaurant />;
      case "transportation": return <Transportation />;
      case "essentials": return <Essentials subTab={essentialsSubTab} />;
      case "reservation":
        return <div className="flex items-center justify-center h-full text-gray-400">Reservation system coming soon...</div>;
      default: return <Campus subTab={campusSubTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <main className="w-full max-w-[1440px] mx-auto px-6 pt-8 pb-20">
        {/* Navigation Bar */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-between gap-y-6">
            {navItems.map((item, idx) => {
              const isActive = activeTab === item.id;
              if (item.id === "essentials") {
                return (
                  <div key={idx} className="relative group z-30">
                    <button onClick={() => setActiveTab(item.id)} className={`relative z-20 flex flex-row items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 ${isActive ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"}`}>
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isActive ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110"}`}>
                        <item.icon size={20} />
                      </div>
                      <span className={`text-sm font-bold tracking-wide transition-colors ${isActive ? "text-black" : "text-gray-500 group-hover:text-gray-800"}`}>{item.name}</span>
                      <ChevronDown size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors"/>
                    </button>
                    {/* Essentials Dropdown Menu (保留原本邏輯) */}
                    <div className="absolute top-[70%] left-1/2 -translate-x-1/2 pt-10 w-64 hidden group-hover:block z-10">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 origin-top animate-in fade-in slide-in-from-top-2 duration-200 overflow-visible py-2 flex flex-col">
                        {essentialSubItems.map((subItem) => (
                          subItem === "Entertainment" ? (
                            <div key={subItem} className="relative group/nested w-full">
                              <button className="w-full px-4 py-3 text-left text-xs font-bold text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600 flex justify-between items-center">
                                {subItem} <ChevronRight size={12} />
                              </button>
                              <div className="absolute left-full top-0 pl-2 w-48 hidden group-hover/nested:block">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 flex flex-col">
                                  {entertainmentSubItems.map((childItem) => (
                                    <button key={childItem} onClick={(e) => { e.stopPropagation(); setActiveTab("essentials"); setEssentialsSubTab(childItem); }} className={`px-4 py-3 text-left text-xs font-bold transition-colors hover:bg-emerald-50 hover:text-emerald-600 ${activeTab === "essentials" && essentialsSubTab === childItem ? "text-emerald-600 bg-emerald-50/50" : "text-gray-500"}`}>{childItem}</button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button key={subItem} onClick={(e) => { e.stopPropagation(); setActiveTab("essentials"); setEssentialsSubTab(subItem); }} className={`px-4 py-3 text-left text-xs font-bold transition-colors hover:bg-emerald-50 hover:text-emerald-600 ${activeTab === "essentials" && essentialsSubTab === subItem ? "text-emerald-600 bg-emerald-50/50" : "text-gray-500"}`}>{subItem}</button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <button key={idx} onClick={() => setActiveTab(item.id)} className={`flex flex-row items-center gap-3 group cursor-pointer p-2 rounded-lg transition-all duration-200 ${isActive ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"}`}>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isActive ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110"}`}>
                    <item.icon size={20} />
                  </div>
                  <span className={`text-sm font-bold tracking-wide transition-colors ${isActive ? "text-black" : "text-gray-500 group-hover:text-gray-800"}`}>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full min-h-[500px] flex flex-col">
          {renderContent()}
        </motion.div>
      </main>

      {/* 獨立出來的 ChatWidget */}
      <ChatWidget />
    </div>
  );
}