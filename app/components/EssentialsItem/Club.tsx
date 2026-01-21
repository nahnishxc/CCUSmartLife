"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Globe, Users } from "lucide-react";

// --- 資料結構 ---
interface Club {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  links: {
    fb?: string;
    ig?: string;
    web?: string;
  };
}

interface ClubCategory {
  id: string;
  name: string;
  clubs: Club[];
}

// --- 假資料 (模擬中正大學社團分類) ---
const CLUB_DATA: ClubCategory[] = [
  {
    id: "academic",
    name: "Academic & Learned",
    clubs: [
      {
        id: "c1",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        tags: ["Public Speaking", "Logic"],
        links: { fb: "#", ig: "#" }
      },
      {
        id: "c2",
        name: "Investment Club",
        desc: "Learn about stock markets, crypto, and financial planning.",
        tags: ["Finance", "Money"],
        links: { fb: "#" }
      },
      {
        id: "c3",
        name: "Coding Club",
        desc: "Work on software projects and learn new programming languages together.",
        tags: ["Tech", "Programming"],
        links: { ig: "#", web: "#" }
      }
    ]
  },
  {
    id: "music",
    name: "Music & Performance",
    clubs: [
      {
        id: "m1",
        name: "Guitar Club",
        desc: "From acoustic to electric, join us to jam and learn.",
        tags: ["Music", "Instrument"],
        links: { fb: "#", ig: "#" }
      },
      {
        id: "m2",
        name: "Hip-Hop Dance",
        desc: "Express yourself through street dance and choreography.",
        tags: ["Dance", "Performance"],
        links: { ig: "#" }
      },
      {
        id: "m3",
        name: "Rock Music Club",
        desc: "Form a band and perform at campus festivals.",
        tags: ["Band", "Live"],
        links: { fb: "#" }
      }
    ]
  },
  {
    id: "service",
    name: "Service & Social",
    clubs: [
      {
        id: "s1",
        name: "Rural Education Team",
        desc: "Volunteer to teach children in rural elementary schools.",
        tags: ["Volunteer", "Education"],
        links: { fb: "#", web: "#" }
      },
      {
        id: "s2",
        name: "Animal Protection",
        desc: "Caring for stray dogs and cats on campus.",
        tags: ["Animals", "Love"],
        links: { ig: "#" }
      }
    ]
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    clubs: [
      {
        id: "sp1",
        name: "Mountaineering Club",
        desc: "Hiking and camping trips to Taiwan's beautiful mountains.",
        tags: ["Outdoor", "Hiking"],
        links: { fb: "#", ig: "#" }
      },
      {
        id: "sp2",
        name: "Extreme Sports",
        desc: "Skateboarding, parkour, and more.",
        tags: ["Action", "Cool"],
        links: { ig: "#" }
      }
    ]
  }
];

export default function ClubView() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
      {/* 隱藏捲軸樣式 */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 標題與簡介 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Clubs</h2>
        <p className="text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
          Explore diverse student organizations at CCU. From academic research to performance arts, 
          find a community that shares your passion.
        </p>
      </div>

      {/* 分類標籤 (可橫向捲動) */}
      <div className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
        {CLUB_DATA.map((category, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md transform scale-105"
                  : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* 社團卡片列表 (動態切換) */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {CLUB_DATA[activeTab].clubs.map((club) => (
              <div 
                key={club.id}
                className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all flex flex-col h-full group"
              >
                {/* 圖片 Placeholder (16:9) */}
                <div className="w-full aspect-video bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400 font-bold tracking-wider group-hover:bg-emerald-50 group-hover:text-emerald-300 transition-colors">
                  CLUB IMG
                </div>

                {/* 內容區 */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {club.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {club.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {club.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded text-gray-500 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 底部連結 */}
                <div className="pt-4 border-t border-gray-200 flex items-center gap-3 mt-auto">
                  {club.links.fb && (
                    <a href={club.links.fb} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Facebook size={18} />
                    </a>
                  )}
                  {club.links.ig && (
                    <a href={club.links.ig} className="text-gray-400 hover:text-pink-600 transition-colors">
                      <Instagram size={18} />
                    </a>
                  )}
                  {club.links.web && (
                    <a href={club.links.web} className="text-gray-400 hover:text-emerald-600 transition-colors">
                      <Globe size={18} />
                    </a>
                  )}
                  <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                    <Users size={12} /> Join us
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}