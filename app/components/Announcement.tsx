"use client";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, ArrowRight, Bell } from "lucide-react";

// 1. 定義資料結構 (Interface)
// 這就是你之後要跟寫後端/爬蟲的人說：「請給我這種格式的 JSON」
interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  source: "OIA" | "CCU" | "General"; // 來源，用來決定顏色
  link: string;
  isNew?: boolean; // 如果是 3 天內的文章，我們可以標示 NEW
}

// 2. 假資料 (Mock Data) - 模擬爬蟲抓回來的結果
const mockData: AnnouncementItem[] = [
  {
    id: "1",
    title: "2026 Spring Semester International Student Enrollment Guide",
    date: "2026-01-15",
    source: "OIA",
    link: "https://oia.ccu.edu.tw",
    isNew: true,
  },
  {
    id: "2",
    title: "Important: Dormitory Application Deadline Extension",
    date: "2026-01-14",
    source: "CCU",
    link: "https://www.ccu.edu.tw",
    isNew: true,
  },
  {
    id: "3",
    title: "Campus Main Library Opening Hours during Lunar New Year",
    date: "2026-01-10",
    source: "General",
    link: "#",
  },
  {
    id: "4",
    title: "Suspension of water supply in District A on Jan 20",
    date: "2026-01-08",
    source: "CCU",
    link: "#",
  },
  {
    id: "5",
    title: "Scholarship Opportunity: Taiwan Grid Iron Security",
    date: "2026-01-05",
    source: "OIA",
    link: "#",
  },
  {
    id: "6",
    title: "Invitation to the International Cultural Festival",
    date: "2025-12-28",
    source: "OIA",
    link: "#",
  },
];

export default function Announcement() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      {/* 標題區 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Bell className="text-emerald-600" size={20} />
          Latest Announcements
        </h2>
        <span className="text-xs text-gray-400">
          Sources: CCU Official & OIA Website
        </span>
      </div>

      {/* 列表區塊：
         使用 Grid 佈局，在大螢幕顯示兩欄，減少垂直滾動的需求。
         設定 overflow-y-auto 確保如果資料太多，只有這個區塊會滾動，整個網頁不會動。
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-4 custom-scrollbar">
        {/* ... map 迴圈不變 ... */}{" "}
        {mockData.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.link}
            target="_blank" // 點擊後開新視窗
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }} // 階梯式進場動畫
            className="group relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
          >
            {/* 頂部標籤列 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* 來源標籤：根據 source 變色 */}
                <span
                  className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                    item.source === "OIA"
                      ? "bg-orange-50 text-orange-600"
                      : item.source === "CCU"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.source}
                </span>
                {/* 日期 */}
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  {item.date}
                </span>
              </div>

              {/* NEW Badge */}
              {item.isNew && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </div>

            {/* 標題 */}
            <h3 className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-relaxed">
              {item.title}
            </h3>

            {/* 底部動作列 */}
            <div className="mt-4 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <ArrowRight
                  size={16}
                  className="-ml-0.5 group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* 如果你想模仿 AirAsia，可以加一個查看更多的按鈕在最下面，或是保持這樣簡潔 */}
    </div>
  );
}
