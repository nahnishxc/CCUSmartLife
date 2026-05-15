
// "use client";
// import { useMemo, useState, useEffect, Suspense } from "react"; // 記得引入 Suspense
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

// // 1. 把原本的 export default Announcement 改名為 AnnouncementContent (不要 export default)
// function AnnouncementContent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams(); // 這裡用到了 useSearchParams

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
//     <div className="w-full min-h-[600px] flex flex-col bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      
//       {/* 標題與返回按鈕 */}
//       <div className="flex items-center gap-4 mb-8">
//         {activeCategory && (
//           <button onClick={() => navigateTo(null)} className="p-2 border rounded-full hover:bg-gray-50">
//             <ChevronLeft size={20} />
//           </button>
//         )}
//         <h2 className="text-3xl font-bold text-gray-900">
//           {activeCategory ? CATEGORY_CONFIG.find(c => c.key === activeCategory)?.title : "Announcements"}
//         </h2>
//       </div>

//       {/* 核心邏輯：五格大卡片 */}
//       {!activeCategory ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex flex-col gap-6">
//             <BigCard item={CATEGORY_CONFIG[0]} h="h-[360px]" onClick={navigateTo} />
//             <BigCard item={CATEGORY_CONFIG[1]} h="h-[240px]" onClick={navigateTo} />
//           </div>
//           <div className="flex flex-col gap-6">
//             <BigCard item={CATEGORY_CONFIG[2]} h="h-[300px]" onClick={navigateTo} />
//             <div className="grid grid-cols-2 gap-6">
//               <BigCard item={CATEGORY_CONFIG[3]} h="h-[300px]" onClick={navigateTo} />
//               <BigCard item={CATEGORY_CONFIG[4]} h="h-[300px]" onClick={navigateTo} />
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* 公告列表區 */
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
//           {isLoading && announcements.length === 0 && (
//             <div className="col-span-2 py-20 text-center text-gray-400">Loading initial data...</div>
//           )}
          
//           {error && <div className="col-span-2 text-center text-red-500">Failed to load content.</div>}

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
//                 className={`group flex flex-col p-6 bg-white rounded-3xl border transition-all duration-300 cursor-pointer ${
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
//                     className={`text-gray-500 leading-relaxed break-all ${
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

// // 2. 建立新的 default export 元件，並用 Suspense 包裝
// export default function Announcement() {
//   return (
//     // 加入 Suspense 邊界，這樣 Next.js build 時才不會報錯
//     <Suspense fallback={
//       <div className="w-full min-h-[600px] flex items-center justify-center bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
//         <span className="text-gray-400">Loading page...</span>
//       </div>
//     }>
//       <AnnouncementContent />
//     </Suspense>
//   );
// }

// // 大卡片元件 (保持不變)
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

// 定義資料型別
interface AnnouncementData {
  id: number;
  category: string;
  title_en: string;
  url_en: string;
  content_en: string;
  publish_date: string;
}

// 五格大卡片的配置
const CATEGORY_CONFIG = [
  { key: "活動訊息", title: "Campus Events", subtitle: "Activities & festivals", img: "/announcement/Campus Event.jpg" },
  { key: "OIA", title: "OIA News", subtitle: "International Office", img: "/announcement/OIA News.jpg" },
  { key: "精選訊息", title: "Highlights", subtitle: "Important notices", img: "/announcement/Highlight.jpg" },
  { key: "學術活動", title: "Academic", subtitle: "Talks & Seminars", img: "/announcement/Announcement Academic.JPG" },
  { key: "行政事務", title: "Administration", subtitle: "Policies & Dorms", img: "/announcement/Announcement Administration.jpg" },
];

// Fetcher：通用的抓取函數
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
});

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
    <div className="w-full min-h-[600px] flex flex-col bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-gray-100">
      
      {/* 標題與返回按鈕 */}
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        {activeCategory && (
          <button onClick={() => navigateTo(null)} className="p-2 border rounded-full hover:bg-gray-50">
            <ChevronLeft size={20} />
          </button>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {activeCategory ? CATEGORY_CONFIG.find(c => c.key === activeCategory)?.title : "Announcements"}
        </h2>
      </div>

      {/* 核心邏輯：五格大卡片排版更新 */}
      {!activeCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            {/* 手機版統一 h-[200px]，電腦版維持原本高度 */}
            <BigCard item={CATEGORY_CONFIG[0]} h="h-[200px] md:h-[360px]" onClick={navigateTo} />
            <BigCard item={CATEGORY_CONFIG[1]} h="h-[200px] md:h-[240px]" onClick={navigateTo} />
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <BigCard item={CATEGORY_CONFIG[2]} h="h-[200px] md:h-[300px]" onClick={navigateTo} />
            {/* 這裡改成 grid-cols-1 md:grid-cols-2，避免手機版最後兩張卡片被硬擠在同一排 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <BigCard item={CATEGORY_CONFIG[3]} h="h-[200px] md:h-[300px]" onClick={navigateTo} />
              <BigCard item={CATEGORY_CONFIG[4]} h="h-[200px] md:h-[300px]" onClick={navigateTo} />
            </div>
          </div>
        </div>
      ) : (
        /* 公告列表區 */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          {isLoading && announcements.length === 0 && (
            <div className="col-span-1 md:col-span-2 py-20 text-center text-gray-400">Loading initial data...</div>
          )}
          
          {error && <div className="col-span-1 md:col-span-2 text-center text-red-500">Failed to load content.</div>}

          {filteredItems.map((item: AnnouncementData) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={!isExpanded ? { y: -4 } : {}}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className={`group flex flex-col p-5 md:p-6 bg-white rounded-3xl border transition-all duration-300 cursor-pointer ${
                  isExpanded ? "md:col-span-2 border-emerald-500 shadow-md" : "border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200"
                }`}
              >
                {/* 頂部：日期 */}
                <motion.div layout className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={13} className="opacity-60" />
                    {item.publish_date}
                  </div>
                  {isExpanded && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase">
                      Full Content
                    </span>
                  )}
                </motion.div>

                {/* 中間：標題與內文 */}
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
                    className={`text-gray-500 leading-relaxed ${
                      isExpanded ? "text-sm mt-4 whitespace-pre-wrap" : "text-sm line-clamp-2"
                    }`}
                  >
                    {item.content_en}
                  </motion.p>
                </div>

                {/* 底部：操作區 */}
                <motion.div 
                  layout 
                  className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-center"
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
                  
                  <span className="text-[11px] text-gray-400">
                    {isExpanded ? "Click to close" : "Click to expand"}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Announcement() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-[600px] flex items-center justify-center bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <span className="text-gray-400">Loading page...</span>
      </div>
    }>
      <AnnouncementContent />
    </Suspense>
  );
}

// 大卡片元件 (不需要更改結構，因為 className 可以直接吃 Tailwind 傳進來的 md:h-[...] )
function BigCard({ item, h, onClick }: { item: any, h: string, onClick: (k: string) => void }) {
  return (
    <motion.button 
      onClick={() => onClick(item.key)}
      whileHover={{ y: -4 }}
      className={`relative w-full ${h} rounded-3xl overflow-hidden group shadow-sm block`}
    >
      <div className="absolute inset-0 bg-gray-200">
        <Image 
          src={item.img} 
          alt={item.title}
          fill
          className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
          priority 
          sizes="(max-width: 768px) 100vw, 50vw" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-6 left-6 text-left">
        <p className="text-white/80 text-xs mb-1">{item.subtitle}</p>
        <h3 className="text-white text-xl font-bold">{item.title}</h3>
      </div>
      <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white group-hover:bg-emerald-500 transition-colors">
        <ArrowRight size={20} />
      </div>
    </motion.button>
  );
}