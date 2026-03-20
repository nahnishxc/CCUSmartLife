// "use client";
// import { useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, ArrowRight, Bell, ChevronLeft } from "lucide-react";

// /** 1) 來源：維持你原本寫法 */
// interface AnnouncementSourceType {
//   // 只是為了給 TS 用，不影響 runtime
// }
// type AnnouncementSource = "OIA" | "CCU" | "General";

// /** 2) 分類 key */
// type AnnouncementCategory =
//   | "campus_event"
//   | "oia_announcement"
//   | "highlights"
//   | "academic_events"
//   | "administration_notice";

// /** 3) 你的資料結構（我只新增 category，可選） */
// interface AnnouncementItem {
//   id: string;
//   title: string;
//   date: string;
//   source: AnnouncementSource;
//   link: string;
//   isNew?: boolean;
//   category?: AnnouncementCategory;
// }

// /** 假資料 */
// const mockData: AnnouncementItem[] = [
//   {
//     id: "1",
//     title: "2026 Spring Semester International Student Enrollment Guide",
//     date: "2026-01-15",
//     source: "OIA",
//     link: "https://oia.ccu.edu.tw",
//     isNew: true,
//     category: "oia_announcement",
//   },
//   {
//     id: "2",
//     title: "Important: Dormitory Application Deadline Extension",
//     date: "2026-01-14",
//     source: "CCU",
//     link: "https://www.ccu.edu.tw",
//     isNew: true,
//     category: "administration_notice",
//   },
//   {
//     id: "3",
//     title: "Campus Main Library Opening Hours during Lunar New Year",
//     date: "2026-01-10",
//     source: "General",
//     link: "#",
//     category: "highlights",
//   },
//   {
//     id: "4",
//     title: "Suspension of water supply in District A on Jan 20",
//     date: "2026-01-08",
//     source: "CCU",
//     link: "#",
//     category: "administration_notice",
//   },
//   {
//     id: "5",
//     title: "Scholarship Opportunity: Taiwan Grid Iron Security",
//     date: "2026-01-05",
//     source: "OIA",
//     link: "#",
//     category: "oia_announcement",
//   },
//   {
//     id: "6",
//     title: "Invitation to the International Cultural Festival",
//     date: "2025-12-28",
//     source: "OIA",
//     link: "#",
//     category: "campus_event",
//   },
// ];

// /** 5 張入口卡（你只要換 imageSrc） */
// const CATEGORY_CARDS: Array<{
//   key: AnnouncementCategory;
//   title: string;
//   subtitle: string;
//   imageSrc?: string;
// }> = [
//   {
//     key: "campus_event",
//     title: "Campus Events",
//     subtitle: "Activities, festivals, and student events",
//     imageSrc: "",
//   },
//   {
//     key: "oia_announcement",
//     title: "OIA Announcements",
//     subtitle: "International Office updates & guides",
//     imageSrc: "",
//   },
//   {
//     key: "highlights",
//     title: "Highlights",
//     subtitle: "Featured & important notices",
//     imageSrc: "",
//   },
//   {
//     key: "academic_events",
//     title: "Academic Events",
//     subtitle: "Talks, seminars, and academic activities",
//     imageSrc: "",
//   },
//   {
//     key: "administration_notice",
//     title: "Administration Notice",
//     subtitle: "Dorm, utilities, policies, deadlines",
//     imageSrc: "",
//   },
// ];

// function fallbackCategory(item: AnnouncementItem): AnnouncementCategory {
//   if (item.category) return item.category;
//   if (item.source === "OIA") return "oia_announcement";
//   if (item.source === "CCU") return "administration_notice";
//   return "highlights";
// }

// function SourceBadge({ source }: { source: AnnouncementSource }) {
//   return (
//     <span
//       className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${
//         source === "OIA"
//           ? "bg-orange-50 text-orange-600"
//           : source === "CCU"
//           ? "bg-blue-50 text-blue-600"
//           : "bg-gray-100 text-gray-500"
//       }`}
//     >
//       {source}
//     </span>
//   );
// }

// /** ✅ 入口版型：左右同寬，但「長/高」不對稱（貼近你 Figma） */
// function CategoryLanding({
//   onPick,
// }: {
//   onPick: (c: AnnouncementCategory) => void;
// }) {
//   const campus = CATEGORY_CARDS[0];
//   const oia = CATEGORY_CARDS[1];
//   const highlights = CATEGORY_CARDS[2];
//   const academic = CATEGORY_CARDS[3];
//   const admin = CATEGORY_CARDS[4];

//   return (
//     <div className="w-full">
//       {/* 外層固定 grid：左右兩欄等寬 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* 左欄：上大（campus），下橫條（oia） */}
//         <div className="flex flex-col gap-6">
//           <CategoryCard
//             card={campus}
//             className="h-[240px] md:h-[360px]"
//             onClick={() => onPick(campus.key)}
//           />
//           <CategoryCard
//             card={oia}
//             className="h-[160px] md:h-[240px]"
//             onClick={() => onPick(oia.key)}
//           />
//         </div>

//         {/* 右欄：上橫條（highlights），下兩張小卡（academic/admin） */}
//         <div className="flex flex-col gap-6">
//           <CategoryCard
//             card={highlights}
//             className="h-[180px] md:h-[300px]"
//             onClick={() => onPick(highlights.key)}
//           />

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <CategoryCard
//               card={academic}
//               className="h-[200px] md:h-[300px]"
//               onClick={() => onPick(academic.key)}
//             />
//             <CategoryCard
//               card={admin}
//               className="h-[200px] md:h-[300px]"
//               onClick={() => onPick(admin.key)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CategoryCard({
//   card,
//   className,
//   onClick,
// }: {
//   card: (typeof CATEGORY_CARDS)[number];
//   className?: string;
//   onClick: () => void;
// }) {
//   const hasImage = Boolean(card.imageSrc);

//   return (
//     <motion.button
//       type="button"
//       onClick={onClick}
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35 }}
//       className={[
//         "group relative w-full rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 text-left",
//         className ?? "",
//       ].join(" ")}
//     >
//       {/* 圖片區（cover -> 自動裁切，不會灰邊） */}
//       <div className="absolute inset-0">
//         {hasImage ? (
//           <div
//             className="w-full h-full bg-center bg-cover"
//             style={{ backgroundImage: `url(${card.imageSrc})` }}
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-300" />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
//       </div>

//       {/* 文字 */}
//       <div className="relative h-full p-5 md:p-6 flex flex-col justify-end">
//         <p className="text-white/90 text-[11px] md:text-xs tracking-wide">
//           {card.subtitle}
//         </p>
//         <div className="mt-1 flex items-end justify-between gap-4">
//           <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
//             {card.title}
//           </h3>

//           <div className="shrink-0 w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white group-hover:bg-emerald-500 transition-all duration-300">
//             <ArrowRight
//               size={18}
//               className="group-hover:translate-x-0.5 transition-transform"
//             />
//           </div>
//         </div>
//       </div>
//     </motion.button>
//   );
// }

// function AnnouncementList({ items }: { items: AnnouncementItem[] }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-4 custom-scrollbar">
//       {items.map((item, index) => (
//         <motion.a
//           key={item.id}
//           href={item.link}
//           target="_blank"
//           rel="noopener noreferrer"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.05 }}
//           className="group relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
//         >
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center gap-2">
//               <SourceBadge source={item.source} />
//               <span className="flex items-center gap-1 text-xs text-gray-400">
//                 <Calendar size={12} />
//                 {item.date}
//               </span>
//             </div>

//             {item.isNew && (
//               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
//             )}
//           </div>

//           <h3 className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-relaxed">
//             {item.title}
//           </h3>

//           <div className="mt-4 flex justify-end">
//             <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
//               <ArrowRight
//                 size={16}
//                 className="-ml-0.5 group-hover:translate-x-0.5 transition-transform"
//               />
//             </div>
//           </div>
//         </motion.a>
//       ))}
//     </div>
//   );
// }

// export default function Announcement() {
//   const [activeCategory, setActiveCategory] =
//     useState<AnnouncementCategory | null>(null);

//   const filtered = useMemo(() => {
//     if (!activeCategory) return [];
//     return mockData.filter((x) => fallbackCategory(x) === activeCategory);
//   }, [activeCategory]);

//   const activeTitle = useMemo(() => {
//     if (!activeCategory) return "Announcements";
//     return CATEGORY_CARDS.find((c) => c.key === activeCategory)?.title ?? "Announcements";
//   }, [activeCategory]);

//   return (
//     <div className="w-full h-full flex flex-col bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           {activeCategory ? (
//             <button
//               type="button"
//               onClick={() => setActiveCategory(null)}
//               className="w-9 h-9 rounded-full border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition flex items-center justify-center text-gray-500"
//               aria-label="Back"
//               title="Back"
//             >
//               <ChevronLeft size={18} />
//             </button>
//           ) : null}

//           <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <Bell className="text-emerald-600" size={20} />
//             {activeTitle}
//           </h2>
//         </div>

//         <span className="text-xs text-gray-400">
//           Sources: CCU Official & OIA Website
//         </span>
//       </div>

//       {!activeCategory ? (
//         <CategoryLanding onPick={setActiveCategory} />
//       ) : (
//         <AnnouncementList items={filtered} />
//       )}
//     </div>
//   );
// }

// @/app/announcement/Announcement.tsx


"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Bell, ChevronLeft, ExternalLink } from "lucide-react";




const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    category: "OIA",
    title_en: "2026 Spring Semester International Student Enrollment Guide for Newcomers",
    content_en: "This guide provides comprehensive information regarding the upcoming spring semester enrollment process, including visa requirements, course registration, and orientation schedules for all international students.",
    url_en: "https://oia.ccu.edu.tw",
    publish_date: "2026-03-20"
  },
  {
    id: 2,
    category: "活動訊息",
    title_en: "Campus Cultural Festival: Food, Music, and Art from Around the Globe",
    content_en: "Join us this Friday for a celebration of diversity! There will be over 30 stalls featuring traditional cuisine, live performances by international student groups, and interactive art workshops.",
    url_en: "#",
    publish_date: "2026-03-18"
  },
  {
    id: 3,
    category: "行政事務",
    title_en: "Notice: Annual Power Maintenance in Dormitory Area District B",
    content_en: "Please be advised that there will be a scheduled power outage in Dormitory District B on March 25th from 9:00 AM to 5:00 PM for essential grid maintenance and safety inspections.",
    url_en: "#",
    publish_date: "2026-03-15"
  }
];




// 1. 定義你「真的要用」的英文型別 (防止紅字)
interface Announcement {
  id: number;
  category: string;
  title_en: string; 
  url_en: string;  
  content_en: string; 
  publish_date: string;
}

// 2. 五格大卡片的配置 (直接寫在這邊，不用開新檔)
const CATEGORY_CONFIG = [
  { key: "活動訊息", title: "Campus Events", subtitle: "Activities & festivals", img: "" },
  { key: "OIA", title: "OIA News", subtitle: "International Office", img: "" },
  { key: "精選訊息", title: "Highlights", subtitle: "Important notices", img: "" },
  { key: "學術活動", title: "Academic", subtitle: "Talks & Seminars", img: "" },
  { key: "行政事務", title: "Administration", subtitle: "Policies & Dorms", img: "" },
];

export default function Announcement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // --- 抓取 API ---
  useEffect(() => {
    setAnnouncements(MOCK_ANNOUNCEMENTS);
  setIsLoading(false);
    // fetch("https://campus-ai-backend-1.onrender.com/api/announcements")
    //   .then(res => res.json())
    //   .then(data => {
    //     setAnnouncements(data);
    //     setIsLoading(false);
    //   })
    //   .catch(() => setIsLoading(false));
  }, []);

  // --- 過濾英文資料 ---
  const filteredItems = useMemo(() => {
    return announcements.filter(item => item.category === activeCategory);
  }, [announcements, activeCategory]);

  return (
    <div className="w-full min-h-[600px] flex flex-col bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      
      {/* 標題與返回按鈕 */}
      <div className="flex items-center gap-4 mb-8">
        {activeCategory && (
          <button onClick={() => setActiveCategory(null)} className="p-2 border rounded-full hover:bg-gray-50">
            <ChevronLeft size={20} />
          </button>
        )}
        <h2 className="text-3xl font-bold text-gray-900">
          {activeCategory ? CATEGORY_CONFIG.find(c => c.key === activeCategory)?.title : "Announcements"}
        </h2>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">Updating...</div>
      ) : !activeCategory ? (
        
        /* --- CategoryLanding (五格大卡片入口) 直接寫在下面 --- */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左欄 */}
          <div className="flex flex-col gap-6">
            <BigCard item={CATEGORY_CONFIG[0]} h="h-[360px]" onClick={setActiveCategory} />
            <BigCard item={CATEGORY_CONFIG[1]} h="h-[240px]" onClick={setActiveCategory} />
          </div>
          {/* 右欄 */}
          <div className="flex flex-col gap-6">
            <BigCard item={CATEGORY_CONFIG[2]} h="h-[300px]" onClick={setActiveCategory} />
            <div className="grid grid-cols-2 gap-6">
              <BigCard item={CATEGORY_CONFIG[3]} h="h-[300px]" onClick={setActiveCategory} />
              <BigCard item={CATEGORY_CONFIG[4]} h="h-[300px]" onClick={setActiveCategory} />
            </div>
          </div>
        </div>

      ) : (
        /* --- 列表小卡 (只顯示英文) --- */
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //   {filteredItems.map((item) => (
        //     <a key={item.id} href={item.url_en} target="_blank" className="group p-5 bg-gray-50 rounded-2xl border hover:border-emerald-200 hover:bg-white transition-all shadow-sm">
        //       <div className="flex justify-between mb-2">
        //         <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{item.category}</span>
        //         <span className="text-[10px] text-gray-400">{item.publish_date}</span>
        //       </div>
        //       <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">{item.title_en}</h3>
        //       <div className="flex justify-end"><ExternalLink size={14} className="text-gray-300 group-hover:text-emerald-500" /></div>
        //     </a>
        //   ))}
        // </div>
        /* --- 列表小卡 (更新後的樣式 B) --- */
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"> 
  {filteredItems.map((item) => {
    const isExpanded = expandedId === item.id;

    return (
      <motion.div
        layout // 關鍵：讓容器展開時自動推擠鄰近元素
        key={item.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={!isExpanded ? { y: -4 } : {}}
        onClick={() => setExpandedId(isExpanded ? null : item.id)}
        className={`group flex flex-col p-6 bg-white rounded-3xl border transition-all duration-300 cursor-pointer ${
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
        <div className="flex-1">
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
              e.stopPropagation(); // 阻止觸發卡片的展開狀態
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

// 抽取出來的小組件：大卡片
function BigCard({ item, h, onClick }: { item: any, h: string, onClick: (k: string) => void }) {
  return (
    <motion.button 
      onClick={() => onClick(item.key)}
      whileHover={{ y: -4 }}
      className={`relative w-full ${h} rounded-3xl overflow-hidden group shadow-sm`}
    >
      <div className="absolute inset-0 bg-gray-200">
        <img src={item.img} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="" />
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