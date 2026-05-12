
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
import { useMemo, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Globe } from "lucide-react";
import Image from "next/image";

// 🔴 引入本地資料作為保底
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

// 強化版 SWR Fetcher：防呆處理後端包裝的 data
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch club data");
  const json = await res.json();
  return json.data || json; // 自動對應不同 API 結構
};

function ClubContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 👇 建立專屬捲軸追蹤器
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- 【URL 狀態管理】 ---
  const activeCategoryName = searchParams.get("category");

// --- 【SWR 資料抓取 + 本地資料保險】 ---
  const { data: categories, isLoading } = useSWR(
    "https://campus-ai-backend-1.onrender.com/api/campus/clubs", 
    fetcher,
    { 
      fallbackData: CLUB_DATA as unknown as ClubCategory[], 
      dedupingInterval: 60000 
    }
  );

  const validCategories = Array.isArray(categories) && categories.length > 0 
    ? categories 
    : (CLUB_DATA as unknown as ClubCategory[]);

  // 找出目前應該顯示的分類資料
  const activeCategoryData = useMemo(() => {
    if (!validCategories || validCategories.length === 0) return null;
    if (!activeCategoryName) return validCategories[0];
    const found = validCategories.find((c: ClubCategory) => c.name === activeCategoryName);
    return found || validCategories[0];
  }, [validCategories, activeCategoryName]);

  // --- 【切換分類：雙重保險強制置頂】 ---
  useEffect(() => {
    const scrollToTop = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    // 保險 A：切換瞬間執行
    scrollToTop();
    // 保險 B：等 React 渲染與動畫 50ms 後再強制執行一次
    const timer = setTimeout(scrollToTop, 50);

    return () => clearTimeout(timer);
  }, [activeCategoryName]);

  // 導航函數
  const switchCategory = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", name);
    // 加上 scroll: false 避免 Next.js 雞婆干擾我們自己的置頂邏輯
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-6 shadow-sm flex flex-col h-full">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 標題區 */}
      <div className="mb-8 flex-shrink-0">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Student Clubs</h2>
        <p className="text-gray-500 mt-3 max-w-3xl leading-relaxed">
          From academic societies to sports teams, music, arts, and service groups,
          CCU’s student clubs are where friendships begin, ideas spark, and campus life truly comes alive.
        </p>
      </div>

    {/* 分類標籤切換 */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto no-scrollbar pb-2 flex-shrink-0">
        {validCategories.map((category: ClubCategory) => {
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

      {/* 社團清單區 (綁定 scrollRef) */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10 relative">
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
export default function ClubPage() {
  return (
    // 👉 3. 加入 Suspense 邊界，並設定載入中的 fallback 畫面
    <Suspense fallback={<div>Loading...</div>}>
      <ClubContent />
    </Suspense>
  );
}