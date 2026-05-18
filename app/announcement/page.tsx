
// "use client";
// import { useMemo, useState, useEffect, Suspense } from "react";
// import { useRouter, useSearchParams, usePathname } from "next/navigation"; 
// import useSWR from "swr";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Calendar, ChevronLeft, ExternalLink, ArrowRight } from "lucide-react";

// // 定義資料型別
// interface AnnouncementData {
//   id: number;
//   category: string;
//   title_en: string;
//   url_en: string;
//   content_en: string;
//   publish_date: string;
// }

// // 五格大卡片的配置
// const CATEGORY_CONFIG = [
//   { key: "活動訊息", title: "Campus Events", subtitle: "Activities & festivals", img: "/announcement/Campus Event.jpg" },
//   { key: "OIA", title: "OIA News", subtitle: "International Office", img: "/announcement/OIA News.jpg" },
//   { key: "精選訊息", title: "Highlights", subtitle: "Important notices", img: "/announcement/Highlight.jpg" },
//   { key: "學術活動", title: "Academic", subtitle: "Talks & Seminars", img: "/announcement/Announcement Academic.JPG" },
//   { key: "行政事務", title: "Administration", subtitle: "Policies & Dorms", img: "/announcement/Announcement Administration.jpg" },
// ];

// // Fetcher：通用的抓取函數
// const fetcher = (url: string) => fetch(url).then(res => {
//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// });

// function AnnouncementContent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const activeCategory = searchParams.get("category");
//   const [expandedId, setExpandedId] = useState<number | null>(null);

//   useEffect(() => {
//     const container = document.querySelector(".custom-scrollbar");
//     if (container) {
//       container.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [activeCategory]);

//   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://campus-ai-backend-1.onrender.com'}/api/announcements`;
//   const { data: announcements = [], error, isLoading } = useSWR(apiUrl, fetcher, {
//     revalidateOnFocus: true,
//     dedupingInterval: 5000,
//   });

//   const filteredItems = useMemo(() => {
//     return announcements.filter((item: AnnouncementData) => item.category === activeCategory);
//   }, [announcements, activeCategory]);

//   const navigateTo = (categoryKey: string | null) => {
//     if (categoryKey) {
//       router.push(`?category=${categoryKey}`);
//     } else {
//       router.push(pathname);
//     }
//     setExpandedId(null);
//   };

//   return (
//     <div className="w-full min-h-[600px] flex flex-col bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-gray-100">
      
//       {/* 標題與返回按鈕 */}
//       <div className="flex items-center gap-4 mb-6 md:mb-8">
//         {activeCategory && (
//           <button onClick={() => navigateTo(null)} className="p-2 border rounded-full hover:bg-gray-50">
//             <ChevronLeft size={20} />
//           </button>
//         )}
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//           {activeCategory ? CATEGORY_CONFIG.find(c => c.key === activeCategory)?.title : "Announcements"}
//         </h2>
//       </div>

//       {/* 核心邏輯：五格大卡片排版更新 */}
//       {!activeCategory ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           <div className="flex flex-col gap-4 md:gap-6">
//             {/* 手機版統一 h-[200px]，電腦版維持原本高度 */}
//             <BigCard item={CATEGORY_CONFIG[0]} h="h-[200px] md:h-[360px]" onClick={navigateTo} />
//             <BigCard item={CATEGORY_CONFIG[1]} h="h-[200px] md:h-[240px]" onClick={navigateTo} />
//           </div>
//           <div className="flex flex-col gap-4 md:gap-6">
//             <BigCard item={CATEGORY_CONFIG[2]} h="h-[200px] md:h-[300px]" onClick={navigateTo} />
//             {/* 這裡改成 grid-cols-1 md:grid-cols-2，避免手機版最後兩張卡片被硬擠在同一排 */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//               <BigCard item={CATEGORY_CONFIG[3]} h="h-[200px] md:h-[300px]" onClick={navigateTo} />
//               <BigCard item={CATEGORY_CONFIG[4]} h="h-[200px] md:h-[300px]" onClick={navigateTo} />
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* 公告列表區 */
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
//           {isLoading && announcements.length === 0 && (
//             <div className="col-span-1 md:col-span-2 py-20 text-center text-gray-400">Loading initial data...</div>
//           )}
          
//           {error && <div className="col-span-1 md:col-span-2 text-center text-red-500">Failed to load content.</div>}

//           {filteredItems.map((item: AnnouncementData) => {
//             const isExpanded = expandedId === item.id;
//             return (
//               <motion.div
//                 layout
//                 key={item.id}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={!isExpanded ? { y: -4 } : {}}
//                 onClick={() => setExpandedId(isExpanded ? null : item.id)}
//                 className={`group flex flex-col p-5 md:p-6 bg-white rounded-3xl border transition-all duration-300 cursor-pointer ${
//                   isExpanded ? "md:col-span-2 border-emerald-500 shadow-md" : "border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200"
//                 }`}
//               >
//                 {/* 頂部：日期 */}
//                 <motion.div layout className="flex justify-between items-center mb-4">
//                   <div className="flex items-center gap-1.5 text-xs text-gray-400">
//                     <Calendar size={13} className="opacity-60" />
//                     {item.publish_date}
//                   </div>
//                   {isExpanded && (
//                     <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase">
//                       Full Content
//                     </span>
//                   )}
//                 </motion.div>

//                 {/* 中間：標題與內文 */}
//                 <div className="flex-1 min-w-0 w-full">
//                   <motion.h3 
//                     layout="position"
//                     className={`font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors leading-snug ${
//                       isExpanded ? "text-xl" : "text-base line-clamp-2"
//                     }`}
//                   >
//                     {item.title_en}
//                   </motion.h3>
                  
//                   <motion.p 
//                     layout="position"
//                     className={`text-gray-500 leading-relaxed ${
//                       isExpanded ? "text-sm mt-4 whitespace-pre-wrap" : "text-sm line-clamp-2"
//                     }`}
//                   >
//                     {item.content_en}
//                   </motion.p>
//                 </div>

//                 {/* 底部：操作區 */}
//                 <motion.div 
//                   layout 
//                   className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-center"
//                 >
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation(); 
//                       window.open(item.url_en, "_blank");
//                     }}
//                     className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
//                   >
//                     VIEW ON WEBSITE <ExternalLink size={14} />
//                   </button>
                  
//                   <span className="text-[11px] text-gray-400">
//                     {isExpanded ? "Click to close" : "Click to expand"}
//                   </span>
//                 </motion.div>
//               </motion.div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Announcement() {
//   return (
//     <Suspense fallback={
//       <div className="w-full min-h-[600px] flex items-center justify-center bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
//         <span className="text-gray-400">Loading page...</span>
//       </div>
//     }>
//       <AnnouncementContent />
//     </Suspense>
//   );
// }

// // 大卡片元件 (不需要更改結構，因為 className 可以直接吃 Tailwind 傳進來的 md:h-[...] )
// function BigCard({ item, h, onClick }: { item: any, h: string, onClick: (k: string) => void }) {
//   return (
//     <motion.button 
//       onClick={() => onClick(item.key)}
//       whileHover={{ y: -4 }}
//       className={`relative w-full ${h} rounded-3xl overflow-hidden group shadow-sm block`}
//     >
//       <div className="absolute inset-0 bg-gray-200">
//         <Image 
//           src={item.img} 
//           alt={item.title}
//           fill
//           className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
//           priority 
//           sizes="(max-width: 768px) 100vw, 50vw" 
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//       </div>
//       <div className="absolute bottom-6 left-6 text-left">
//         <p className="text-white/80 text-xs mb-1">{item.subtitle}</p>
//         <h3 className="text-white text-xl font-bold">{item.title}</h3>
//       </div>
//       <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white group-hover:bg-emerald-500 transition-colors">
//         <ArrowRight size={20} />
//       </div>
//     </motion.button>
//   );
// }


"use client";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; 
import useSWR from "swr";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ExternalLink, ArrowRight } from "lucide-react";

import MaskingTape from "../components/MaskingTape"; 

interface AnnouncementData {
  id: number;
  category: string;
  title_en: string;
  url_en: string;
  content_en: string;
  publish_date: string;
}

const CATEGORY_CONFIG = [
  { key: "活動訊息", title: "Campus Events", subtitle: "Activities & festivals", img: "/announcement/Campus Event.jpg" },
  { key: "OIA", title: "OIA News", subtitle: "International Office", img: "/announcement/OIA News.jpg" },
  { key: "精選訊息", title: "Highlights", subtitle: "Important notices", img: "/announcement/Highlight.jpg" },
  { key: "學術活動", title: "Academic", subtitle: "Talks & Seminars", img: "/announcement/Announcement Academic.JPG" },
  { key: "行政事務", title: "Administration", subtitle: "Policies & Dorms", img: "/announcement/Announcement Administration.jpg" },
];

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
});

// 【核心】：專門給「列表清單」用的隨機膠帶引擎
function useRandomTapeConfig(id: string | number, baseWidth: number = 100) {
  return useMemo(() => {
    // 利用 id 產生隨機 seed，確保每次重整同一篇公告的膠帶長一樣，但不同公告長不一樣
    const seed = typeof id === 'number' ? id : id.charCodeAt(0) + id.length;
    
    const rotate = (seed % 13) - 6;          // -6 到 6 度的隨機旋轉
    const width = baseWidth - 15 + (seed % 30); // 寬度隨機增減
    const flipX = seed % 2 === 0;            // 隨機左右翻轉（改變撕裂邊緣）
    const flipY = seed % 3 === 0;            // 隨機上下翻轉
    const offsetY = (seed % 7) - 3;          // Y軸上下微調
    const offsetX = (seed % 21) - 10;        // X軸左右微調，不要全都在正中間

    return { rotate, width, flipX, flipY, offsetY, offsetX };
  }, [id, baseWidth]);
}

// 【新增】：把列表項目獨立成一個 Component，這樣才能獨立套用亂數 Hook
function ListItem({ item, isExpanded, onToggle }: { item: AnnouncementData, isExpanded: boolean, onToggle: () => void }) {
  // 取得這張卡片專屬的隨機膠帶設定
  const tape = useRandomTapeConfig(item.id, 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isExpanded ? { y: -4, rotate: -0.5 } : {}} 
      onClick={onToggle}
      className={`group relative flex flex-col p-5 md:p-6 bg-[#fffefb] rounded-3xl border transition-all duration-300 cursor-pointer ${
        isExpanded 
          ? "md:col-span-2 border-2 border-emerald-400 shadow-md" 
          : "border-[#eadfce] shadow-sm hover:shadow-[0_8px_24px_rgba(90,70,40,0.08)] hover:border-emerald-200"
      }`}
    >
      {/* 隨機亂貼的膠帶！ */}
      <div 
        className="absolute z-20"
        style={{ 
          top: `${-12 + tape.offsetY}px`, 
          left: `calc(50% + ${tape.offsetX}px)`, // 讓膠帶稍微偏左或偏右
          transform: 'translateX(-50%)'
        }}
      >
        <MaskingTape 
          width={`${tape.width}px`} 
          opacity={1} 
          color="bg-[#f0ebe1]/65" // 統一使用你要的顏色
          rotation={tape.rotate} 
          flipX={tape.flipX}
          flipY={tape.flipY}
        />
      </div>

      <motion.div layout className="flex justify-between items-center mb-4 mt-2">
        <div className="flex items-center gap-1.5 text-xs text-[#6f7b76] font-medium">
          <Calendar size={13} className="opacity-70 text-emerald-600" />
          {item.publish_date}
        </div>
        {isExpanded && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md uppercase border border-emerald-100">
            Full Content
          </span>
        )}
      </motion.div>

      <div className="flex-1 min-w-0 w-full">
        <motion.h3 
          layout="position"
          className={`font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors leading-snug ${
            isExpanded ? "text-xl" : "text-base line-clamp-2"
          }`}
        >
          {item.title_en}
        </motion.h3>
        
        <motion.p 
          layout="position"
          className={`text-[#6f7b76] leading-relaxed ${
            isExpanded ? "text-sm mt-4 whitespace-pre-wrap" : "text-sm line-clamp-2"
          }`}
        >
          {item.content_en}
        </motion.p>
      </div>

      <motion.div 
        layout 
        className="mt-5 pt-4 border-t-2 border-dashed border-[#eadfce] flex justify-between items-center"
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            window.open(item.url_en, "_blank");
          }}
          className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          VIEW ON WEBSITE <ExternalLink size={14} />
        </button>
        
        <span className="text-[11px] text-[#6f7b76] font-medium">
          {isExpanded ? "Click to close" : "Click to expand"}
        </span>
      </motion.div>
    </motion.div>
  );
}

function AnnouncementContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const container = document.querySelector(".custom-scrollbar");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeCategory]);

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://campus-ai-backend-1.onrender.com'}/api/announcements`;
  const { data: announcements = [], error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  const filteredItems = useMemo(() => {
    return announcements.filter((item: AnnouncementData) => item.category === activeCategory);
  }, [announcements, activeCategory]);

  const navigateTo = (categoryKey: string | null) => {
    if (categoryKey) {
      router.push(`?category=${categoryKey}`);
    } else {
      router.push(pathname);
    }
    setExpandedId(null);
  };

  return (
    <div className="w-full min-h-[600px] flex flex-col bg-[#fffdf8] rounded-[32px] p-4 md:p-8 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce]">
      
      <div className="flex items-center gap-4 mb-6 md:mb-8 border-b-2 border-dashed border-[#eadfce] pb-4">
        {activeCategory && (
          <button onClick={() => navigateTo(null)} className="p-2 border border-[#eadfce] rounded-full hover:bg-[#fbf8f1] transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {activeCategory ? CATEGORY_CONFIG.find(c => c.key === activeCategory)?.title : "Announcements"}
        </h2>
      </div>

      {!activeCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <BigCard item={CATEGORY_CONFIG[0]} h="h-[200px] md:h-[360px]" onClick={navigateTo} tapeStyle="double" />
            <BigCard item={CATEGORY_CONFIG[1]} h="h-[200px] md:h-[240px]" onClick={navigateTo} tapeStyle="double" />
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <BigCard item={CATEGORY_CONFIG[2]} h="h-[200px] md:h-[300px]" onClick={navigateTo} tapeStyle="double" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <BigCard item={CATEGORY_CONFIG[3]} h="h-[200px] md:h-[300px]" onClick={navigateTo} tapeStyle="single" />
              <BigCard item={CATEGORY_CONFIG[4]} h="h-[200px] md:h-[300px]" onClick={navigateTo} tapeStyle="single" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          {isLoading && announcements.length === 0 && (
            <div className="col-span-1 md:col-span-2 py-20 text-center text-[#6f7b76] font-bold">Loading bulletin board...</div>
          )}
          
          {error && <div className="col-span-1 md:col-span-2 text-center text-red-400 font-bold">Failed to load content.</div>}

          {filteredItems.map((item: AnnouncementData) => (
            // 【修改】：使用獨立的 ListItem，套用隨機膠帶效果
            <ListItem 
              key={item.id} 
              item={item} 
              isExpanded={expandedId === item.id} 
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Announcement() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-[600px] flex items-center justify-center bg-white rounded-[32px] p-6 md:p-8 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce]">
        <span className="text-[#6f7b76] font-bold tracking-widest">Loading page...</span>
      </div>
    }>
      <AnnouncementContent />
    </Suspense>
  );
}

// 【外層圖片卡片】：恢復成整齊固定的貼法，不加亂數，並統一使用你要的顏色 bg-[#f0ebe1]/65
function BigCard({ item, h, onClick, tapeStyle = "single" }: { item: any, h: string, onClick: (k: string) => void, tapeStyle?: "single" | "double" }) {
  return (
    <motion.button 
      onClick={() => onClick(item.key)}
      className={`relative w-full ${h} rounded-[24px] group block bg-white border border-[#eadfce] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(90,70,40,0.1)] hover:-translate-y-1 hover:-rotate-1`}
    >
      {tapeStyle === "double" ? (
        <>
          <div className="absolute -top-3 left-6 z-20">
            <MaskingTape width="50px" opacity={1} color="bg-[#f0ebe1]/65" rotation={-6} />
          </div>
          <div className="absolute -top-3 right-6 z-20">
             <MaskingTape width="45px" opacity={1} color="bg-[#f0ebe1]/65" rotation={8} />
          </div>
        </>
      ) : (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
             <MaskingTape width="80px" opacity={1} color="bg-[#f0ebe1]/65" rotation={-2} />
        </div>
      )}

      <div className="absolute inset-0 rounded-[24px] overflow-hidden bg-[#fbf8f1] z-0">
        <Image 
          src={item.img} 
          alt={item.title}
          fill
          className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" 
          priority 
          sizes="(max-width: 768px) 100vw, 50vw" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-6 left-6 text-left z-10 pointer-events-none">
        <p className="text-white/90 text-xs mb-1 font-medium drop-shadow-sm">{item.subtitle}</p>
        <h3 className="text-white text-xl font-bold tracking-wide drop-shadow-md">{item.title}</h3>
      </div>
      <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-emerald-500 transition-colors z-10">
        <ArrowRight size={20} />
      </div>
    </motion.button>
  );
}