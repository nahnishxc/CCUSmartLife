

// "use client";
// import { useMemo, useEffect, useRef, Suspense } from "react";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import useSWR from "swr";
// import { motion, AnimatePresence } from "framer-motion";
// // 🔴 多引入了 ChevronDown 給手機版的下拉選單使用
// import { Facebook, Instagram, Globe, ChevronDown } from "lucide-react";
// import Image from "next/image";

// import { CLUB_DATA } from "../../Data/club";

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

// const fetcher = async (url: string) => {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Failed to fetch club data");
//   const json = await res.json();
//   return json.data || json;
// };

// function ClubContent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
  
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const activeCategoryName = searchParams.get("category");

//   const { data: categories, isLoading } = useSWR(
//     "https://campus-ai-backend-1.onrender.com/api/campus/clubs", 
//     fetcher,
//     { 
//       fallbackData: CLUB_DATA as unknown as ClubCategory[], 
//       dedupingInterval: 60000 
//     }
//   );

//   const validCategories = Array.isArray(categories) && categories.length > 0 
//     ? categories 
//     : (CLUB_DATA as unknown as ClubCategory[]);

//   const activeCategoryData = useMemo(() => {
//     if (!validCategories || validCategories.length === 0) return null;
//     if (!activeCategoryName) return validCategories[0];
//     const found = validCategories.find((c: ClubCategory) => c.name === activeCategoryName);
//     return found || validCategories[0];
//   }, [validCategories, activeCategoryName]);

//   useEffect(() => {
//     const scrollToTop = () => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollTo({ top: 0, behavior: "instant" });
//       }
//     };

//     scrollToTop();
//     const timer = setTimeout(scrollToTop, 50);

//     return () => clearTimeout(timer);
//   }, [activeCategoryName]);

//   const switchCategory = (name: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("category", name);
//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="w-full bg-white rounded-3xl p-6 md:p-6 shadow-sm flex flex-col h-full">
//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       {/* 標題區 */}
//       <div className="mb-6 md:mb-8 flex-shrink-0">
//         <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Student Clubs</h2>
//         <p className="text-gray-500 mt-3 max-w-3xl leading-relaxed">
//           From academic societies to sports teams, music, arts, and service groups,
//           CCU’s student clubs are where friendships begin, ideas spark, and campus life truly comes alive.
//         </p>
//       </div>

//       {/* 🔴 分類切換區 (響應式) */}
//       <div className="flex-shrink-0 mb-8">
//         {/* 手機版：原生下拉選單 (md:hidden) */}
//         <div className="relative md:hidden">
//           <select
//             value={activeCategoryData?.name || ""}
//             onChange={(e) => switchCategory(e.target.value)}
//             className="w-full appearance-none bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-base py-3 pl-5 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
//           >
//             {validCategories.map((category: ClubCategory) => (
//               <option key={category.id} value={category.name}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-600">
//             <ChevronDown size={20} />
//           </div>
//         </div>

//         {/* 電腦版：水平捲動按鈕 (hidden md:flex) */}
//         <div className="hidden md:flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
//           {validCategories.map((category: ClubCategory) => {
//             const isActive = activeCategoryData?.name === category.name;
//             return (
//               <button
//                 key={category.id}
//                 onClick={() => switchCategory(category.name)}
//                 className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
//                   isActive
//                     ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-100 transform scale-105"
//                     : "bg-white text-gray-500 border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
//                 }`}
//               >
//                 {category.name}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 社團清單區 */}
//       <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10 relative">
//         <AnimatePresence mode="wait" initial={false}>
//           <motion.div
//             key={activeCategoryData?.id || "empty"}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -15 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {activeCategoryData?.clubs.map((item: Club) => (
//               <div
//                 key={item.id}
//                 className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col h-full group hover:shadow-md transition-shadow"
//               >
//                 {/* 圖片區 */}
//                 <div className="w-full aspect-[4/3] rounded-xl mb-5 overflow-hidden bg-gray-100 relative">
//                   {item.image ? (
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold tracking-widest">
//                       NO IMAGE
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1 px-1">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
//                   <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-5">{item.desc}</p>
                  
//                   {/* Tag 區 */}
//                   {(item.tags ?? []).length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-5">
//                       {(item.tags ?? []).map((tag) => (
//                         <span key={tag} className="text-[11px] bg-emerald-50/50 border border-emerald-100 px-2.5 py-1 rounded-lg text-emerald-600 font-semibold">
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* 連結區 */}
//                 <div className="pt-5 border-t border-gray-50 flex items-center gap-4 mt-auto">
//                   {item.links.fb && (
//                     <a href={item.links.fb} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-all hover:scale-110">
//                       <Facebook size={24} />
//                     </a>
//                   )}
//                   {item.links.ig && (
//                     <a href={item.links.ig} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-all hover:scale-110">
//                       <Instagram size={24} />
//                     </a>
//                   )}
//                   {item.links.web && (
//                     <a href={item.links.web} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-600 transition-all hover:scale-110">
//                       <Globe size={24} />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default function ClubPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ClubContent />
//     </Suspense>
//   );
// }

"use client";
import { useMemo, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";

import { CLUB_DATA } from "../../Data/club";

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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch club data");
  const json = await res.json();
  return json.data || json;
};

function ClubContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeCategoryName = searchParams.get("category");

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

  const activeCategoryData = useMemo(() => {
    if (!validCategories || validCategories.length === 0) return null;
    if (!activeCategoryName) return validCategories[0];
    const found = validCategories.find((c: ClubCategory) => c.name === activeCategoryName);
    return found || validCategories[0];
  }, [validCategories, activeCategoryName]);

  useEffect(() => {
    const scrollToTop = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    scrollToTop();
    const timer = setTimeout(scrollToTop, 50);

    return () => clearTimeout(timer);
  }, [activeCategoryName]);

  const switchCategory = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", name);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    // 【背板指定】修改底色為 bg-[#fffdf8]，升級為 rounded-[32px]、米灰邊框與暖調淡陰影
    <div className="w-full bg-[#fffdf8] rounded-[32px] p-6 md:p-6 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col h-full">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 標題區：自由發揮加上手帳虛線分隔條，使結構與其他頁面完全統一 */}
      <div className="mb-6 md:mb-8 flex-shrink-0 border-b-2 border-dashed border-[#eadfce]/60 pb-4">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Student Clubs</h2>
        <p className="text-[#6f7b76] font-medium mt-3 max-w-3xl leading-relaxed">
          From academic societies to sports teams, music, arts, and service groups,
          CCU’s student clubs are where friendships begin, ideas spark, and campus life truly comes alive.
        </p>
      </div>

      {/* 分類切換區 (響應式) */}
      <div className="flex-shrink-0 mb-8">
        {/* 手機版：外觀融入整體風格 */}
        <div className="relative md:hidden">
          <select
            value={activeCategoryData?.name || ""}
            onChange={(e) => switchCategory(e.target.value)}
            className="w-full appearance-none bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-base py-3 pl-5 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          >
            {validCategories.map((category: ClubCategory) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-600">
            <ChevronDown size={20} />
          </div>
        </div>

        {/* 電腦版：未選中按鈕更換為卡片指定的 #fffefb 底色與米灰邊框 */}
        <div className="hidden md:flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {validCategories.map((category: ClubCategory) => {
            const isActive = activeCategoryData?.name === category.name;
            return (
              <button
                key={category.id}
                onClick={() => switchCategory(category.name)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-emerald-500 text-white border-transparent shadow-md transform scale-105"
                    : "bg-[#fffefb] text-gray-500 border-[#eadfce] hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 社團清單區 */}
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
                // 【卡片指定】修改底色為 bg-[#fffefb]，套用米灰邊框、手帳細緻陰影與卡片微幅上提特效
                className="bg-[#fffefb] p-5 rounded-2xl border border-[#eadfce] flex flex-col h-full group hover:shadow-[0_12px_24px_rgba(90,70,40,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* 圖片區：未上傳圖片時改用暖米色底 bg-[#fbf8f1] 與細緻邊框 */}
                <div className="w-full aspect-[4/3] rounded-xl mb-5 overflow-hidden bg-[#fbf8f1] border border-[#eadfce]/30 relative shadow-inner">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#eadfce] font-bold tracking-widest text-sm">
                      NO IMAGE
                    </div>
                  )}
                </div>

                <div className="flex-1 px-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">{item.name}</h3>
                  <p className="text-sm text-[#6f7b76] font-medium leading-relaxed mb-5 line-clamp-5">{item.desc}</p>
                  
                  {/* Tag 區：標籤改用紙白底色 #fffdf8 與米灰框線，文字維持功能綠色，營造手工分類小卡質感 */}
                  {(item.tags ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {(item.tags ?? []).map((tag) => (
                        <span key={tag} className="text-[11px] bg-[#fffdf8] border border-[#eadfce] px-2.5 py-1 rounded-lg text-emerald-700 font-bold shadow-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 連結區：將原本的冷灰分隔線改為 dashed 手帳虛線 */}
                <div className="pt-5 border-t-2 border-dashed border-[#eadfce]/60 flex items-center gap-4 mt-auto">
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
    // 👉 加入 Suspense 邊界，加載狀態也同步維持極淺紙白的視覺感受
    <Suspense fallback={
      <div className="w-full h-full bg-[#fffdf8] rounded-[32px] p-6 shadow-sm border border-[#eadfce] flex items-center justify-center text-[#6f7b76] font-bold tracking-widest">
        Loading clubs...
      </div>
    }>
      <ClubContent />
    </Suspense>
  );
}