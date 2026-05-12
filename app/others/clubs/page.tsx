
// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Facebook, Instagram, Globe, Users } from "lucide-react";
// import { CLUB_DATA } from "../../Data/club";
// import Image from "next/image";

// interface Club {
//   id: string;
//   name: string;
//   desc: string;
//   image?: string;
//   tags?: string[];
//   links: {
//     fb?: string;
//     ig?: string;
//     web?: string;
//   };
// }

// interface ClubCategory {
//   id: string;
//   name: string;
//   clubs: Club[];
// }

// export default function ClubPage() {
//   const [activeTab, setActiveTab] = useState(0);
//   const data = CLUB_DATA as unknown as ClubCategory[];

//   return (
//     <div className="w-full bg-white rounded-3xl p-6 md:p-6 shadow-sm flex flex-col">
//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Student Clubs</h2>
//         <p className="text-gray-500 mt-3 max-w-3xl leading-relaxed">
//           From academic societies to sports teams, music, arts, and service groups,
//           CCU’s student clubs are where friendships begin, ideas spark, and campus life truly comes alive.
//         </p>
//       </div>

//       <div className="flex items-center gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
//         {data.map((category, index) => {
//           const isActive = activeTab === index;
//           return (
//             <button
//               key={category.id}
//               onClick={() => setActiveTab(index)}
//               className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
//                 isActive
//                   ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-100 transform scale-105"
//                   : "bg-white text-gray-500 border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
//               }`}
//             >
//               {category.name}
//             </button>
//           );
//         })}
//       </div>

//       <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
//         <AnimatePresence mode="wait" initial={false}>
//           <motion.div
//             key={activeTab}

//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -15 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {data[activeTab].clubs.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white p-5 rounded-2xl border border-gray-100  flex flex-col h-full group"
//               >
//                 <div className="w-full aspect-[4/3] rounded-xl mb-5 overflow-hidden bg-gray-100  relative">
//                   {item.image ? (
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       fill
//                       className="object-cover "
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold tracking-widest ">
//                       NO IMAGE
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1 px-1">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2 ">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-5">
//                     {item.desc}
//                   </p>

//                   {(item.tags ?? []).length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-5">
//                       {(item.tags ?? []).map((tag) => (
//                         <span
//                           key={tag}
//                           className="text-[11px] bg-emerald-50/50 border border-emerald-100 px-2.5 py-1 rounded-lg text-emerald-600 font-semibold"
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="pt-5 border-t border-gray-50 flex items-center gap-4 mt-auto">
//                   {item.links.fb && (
//                     <a
//                       href={item.links.fb}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-gray-400 hover:text-blue-600 transition-all hover:scale-110"
//                     >
//                       <Facebook size={32} />
//                     </a>
//                   )}
//                   {item.links.ig && (
//                     <a
//                       href={item.links.ig}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-gray-400 hover:text-pink-600 transition-all hover:scale-110"
//                     >
//                       <Instagram size={32} />
//                     </a>
//                   )}
//                   {item.links.web && (
//                     <a
//                       href={item.links.web}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-gray-400 hover:text-emerald-600 transition-all hover:scale-110"
//                     >
//                       <Globe size={20} />
//                     </a>
//                   )}
//                   <div>

//                   </div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
"use client";
import { useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Globe } from "lucide-react";
import Image from "next/image";

// 🔴 重要：把這行本地資料導進來，你的「東西」才不會不見！
import { CLUB_DATA } from "../../Data/club";

// 1. 定義型別
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

// SWR Fetcher
const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch club data");
  return res.json();
});

export default function ClubPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- 【URL 狀態管理】 ---
  const activeCategoryName = searchParams.get("category");

  // --- 【SWR 資料抓取 + 本地資料保險】 ---
  // 我們把 CLUB_DATA 設定為 fallbackData，這樣一進頁面就會有圖有真相！
  const { data: categories, isLoading } = useSWR(
    "https://campus-ai-backend-1.onrender.com/api/campus/clubs", 
    fetcher,
    { 
      fallbackData: CLUB_DATA as unknown as ClubCategory[], // 👈 如果網路沒回應，就用本地這包
      dedupingInterval: 60000 
    }
  );

  // 找出目前應該顯示的分類資料
  const activeCategoryData = useMemo(() => {
    if (!categories || categories.length === 0) return null;
    if (!activeCategoryName) return categories[0];
    const found = categories.find((c: ClubCategory) => c.name === activeCategoryName);
    return found || categories[0];
  }, [categories, activeCategoryName]);

  // --- 【自動捲回頂部】 ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategoryName]);

  // 導航函數
  const switchCategory = (name: string) => {
    router.push(`?category=${encodeURIComponent(name)}`);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-6 shadow-sm flex flex-col">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 標題區 */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Student Clubs</h2>
        <p className="text-gray-500 mt-3 max-w-3xl leading-relaxed">
          From academic societies to sports teams, music, arts, and service groups,
          CCU’s student clubs are where friendships begin, ideas spark, and campus life truly comes alive.
        </p>
      </div>

      {/* 分類標籤切換 - 現在這裡一定會有東西了 */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
        {categories?.map((category: ClubCategory) => {
          const isActive = activeCategoryData?.name === category.name;
          return (
            <button
              key={category.id}
              onClick={() => switchCategory(category.name)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-100 transform scale-105"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* 社團清單區 */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategoryData?.id || "empty"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeCategoryData?.clubs.map((item: Club) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col h-full group hover:shadow-md transition-shadow"
              >
                {/* 圖片區 */}
                <div className="w-full aspect-[4/3] rounded-xl mb-5 overflow-hidden bg-gray-100 relative">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold tracking-widest">
                      NO IMAGE
                    </div>
                  )}
                </div>

                <div className="flex-1 px-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-5">{item.desc}</p>
                  
                  {/* Tag 區 */}
                  {(item.tags ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {(item.tags ?? []).map((tag) => (
                        <span key={tag} className="text-[11px] bg-emerald-50/50 border border-emerald-100 px-2.5 py-1 rounded-lg text-emerald-600 font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 連結區 */}
                <div className="pt-5 border-t border-gray-50 flex items-center gap-4 mt-auto">
                  {item.links.fb && (
                    <a href={item.links.fb} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-all hover:scale-110">
                      <Facebook size={24} />
                    </a>
                  )}
                  {item.links.ig && (
                    <a href={item.links.ig} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-all hover:scale-110">
                      <Instagram size={24} />
                    </a>
                  )}
                  {item.links.web && (
                    <a href={item.links.web} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-600 transition-all hover:scale-110">
                      <Globe size={24} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}