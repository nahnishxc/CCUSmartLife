"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Globe, Users } from "lucide-react";
import { CLUB_DATA } from "../Data/club";
import Image from "next/image";


interface Club {
  id: string;
  name: string;
  desc: string;
  image?: string;
  tags?: string[];
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

export default function ClubView() {
  const [activeTab, setActiveTab] = useState(0);

  // ✅ 給 TypeScript 一個「我知道 CLUB_DATA 是 ClubCategory[]」的提示（不會改資料本身）
  const data = CLUB_DATA as unknown as ClubCategory[];

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Clubs</h2>
        <p className="text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
          Explore diverse student organizations at CCU. From academic research
          to performance arts, find a community that shares your passion.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
        {data.map((category, index) => {
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
            {data[activeTab].clubs.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all flex flex-col h-full group"
              >
                <div className="w-full aspect-video rounded-xl mb-4 overflow-hidden bg-gray-200 group-hover:bg-emerald-50 transition-colors relative">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold tracking-wider group-hover:text-emerald-300 transition-colors">
                      CLUB IMG
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {item.desc}
                  </p>

                  {/* ✅ tags 不一定有，所以用 fallback */}
                  {(item.tags ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(item.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded text-gray-500 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center gap-3 mt-auto">
                  {item.links.fb && (
                    <a
                      href={item.links.fb}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  {item.links.ig && (
                    <a
                      href={item.links.ig}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-pink-600 transition-colors"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  {item.links.web && (
                    <a
                      href={item.links.web}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-emerald-600 transition-colors"
                    >
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
