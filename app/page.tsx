"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Bus,
  Utensils,
  Megaphone,
  Calendar,
  X,
  Send,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import SlimeBall from "./components/SlimeBall";
import Announcement from "./components/Announcement";
import Restaurant from "./components/Restaurant";
import Essentials from "./components/Essentials";
import Campus from "./components/Campus";
import Transportation from "./components/Transportation";
// 注意：這裡不需要引入 LoginModal 了，因為它在 Navbar (Layout) 裡

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
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

  const essentialSubItems = [
    "Finance",
    "Healthcare",
    "Entertainment",
    "Admission Instructions",
  ];
  const entertainmentSubItems = ["Club", "Entertainment Facilities"];

  const campusSubItems = [
    "About CCU",
    "Campus Map",
    "Administrative",
    "Academic",
    "Facilities",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "campus": return <Campus subTab={campusSubTab} />;
      case "announcement": return <Announcement />;
      case "restaurant": return <Restaurant />;
      case "transportation": return <Transportation />;
      case "essentials": return <Essentials subTab={essentialsSubTab} />;
      case "reservation":
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            Reservation system coming soon...
          </div>
        );
      default: return <Campus subTab={campusSubTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {/* 這裡不需要 <header>，因為 layout.tsx 已經包含 Navbar 了 */}
      
      <main className="w-full max-w-[1440px] mx-auto px-6 pt-8 pb-20">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-between gap-y-6">
            {navItems.map((item, idx) => {
              const isActive = activeTab === item.id;

              // --- Campus Dropdown ---
              if (item.id === "campus") {
                return (
                  <div key={idx} className="relative group z-30">
                    <button onClick={() => setActiveTab(item.id)} className={`relative z-20 flex flex-row items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 ${isActive ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"}`}>
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isActive ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110"}`}>
                        <item.icon size={20} />
                      </div>
                      <span className={`text-sm font-bold tracking-wide transition-colors ${isActive ? "text-black" : "text-gray-500 group-hover:text-gray-800"}`}>{item.name}</span>
                      <ChevronDown size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors"/>
                    </button>
                    <div className="absolute top-[70%] left-1/2 -translate-x-1/2 pt-10 w-48 hidden group-hover:block z-10">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 origin-top animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                        <div className="py-2 flex flex-col">
                          {campusSubItems.map((subItem) => (
                            <button key={subItem} onClick={(e) => { e.stopPropagation(); setActiveTab("campus"); setCampusSubTab(subItem); }} className={`px-4 py-3 text-left text-xs font-bold transition-colors hover:bg-emerald-50 hover:text-emerald-600 ${activeTab === "campus" && campusSubTab === subItem ? "text-emerald-600 bg-emerald-50/50" : "text-gray-500"}`}>
                              {subItem}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // --- Essentials Dropdown ---
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
                    <div className="absolute top-[70%] left-1/2 -translate-x-1/2 pt-10 w-64 hidden group-hover:block z-10">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 origin-top animate-in fade-in slide-in-from-top-2 duration-200 overflow-visible">
                        <div className="py-2 flex flex-col">
                          {essentialSubItems.map((subItem) => {
                            if (subItem === "Entertainment") {
                              return (
                                <div key={subItem} className="relative group/nested w-full">
                                  <button className="w-full px-4 py-3 text-left text-xs font-bold text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600 flex justify-between items-center">
                                    {subItem} <ChevronRight size={12} />
                                  </button>
                                  <div className="absolute left-full top-0 pl-2 w-48 hidden group-hover/nested:block">
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                                      <div className="py-2 flex flex-col">
                                        {entertainmentSubItems.map((childItem) => (
                                            <button key={childItem} onClick={(e) => { e.stopPropagation(); setActiveTab("essentials"); setEssentialsSubTab(childItem); }} className={`px-4 py-3 text-left text-xs font-bold transition-colors hover:bg-emerald-50 hover:text-emerald-600 ${activeTab === "essentials" && essentialsSubTab === childItem ? "text-emerald-600 bg-emerald-50/50" : "text-gray-500"}`}>
                                              {childItem}
                                            </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <button key={subItem} onClick={(e) => { e.stopPropagation(); setActiveTab("essentials"); setEssentialsSubTab(subItem); }} className={`px-4 py-3 text-left text-xs font-bold transition-colors hover:bg-emerald-50 hover:text-emerald-600 ${activeTab === "essentials" && essentialsSubTab === subItem ? "text-emerald-600 bg-emerald-50/50" : "text-gray-500"}`}>
                                {subItem}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // --- Standard Buttons ---
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

        <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-[500px] flex flex-col"
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Chat Widget (保持不變) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto bg-white w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-gray-100 mb-4 overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">✨</div>
                  <div><h3 className="font-bold text-sm">CCU Assistant</h3><p className="text-[10px] text-emerald-50 opacity-90">Ask me anything</p></div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X size={18} /></button>
              </div>
              <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                <div className="flex flex-col gap-3">
                  <div className="self-start bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-700 max-w-[85%]">Hi! I'm your AI assistant. Look at the bottom right, that's me!</div>
                </div>
              </div>
              <div className="p-3 bg-white border-t border-gray-100">
                <div className="relative">
                  <input type="text" placeholder="Type your question..." className="w-full bg-gray-100 text-sm py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"><Send size={14} /></button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button onClick={() => setIsChatOpen(!isChatOpen)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`pointer-events-auto flex items-center justify-center transition-all duration-300 rounded-full ${isChatOpen ? "w-14 h-14 bg-gray-800 text-white shadow-lg" : "w-36 h-36 md:w-40 md:h-40 bg-transparent"}`}>
          {isChatOpen ? <X size={24} /> : <SlimeBall />}
        </motion.button>
      </div>
    </div>
  );
}