"use client";
import { Clock, MapPin } from "lucide-react";
// 假設你將資料存在 src/data/facilities.ts，請依實際路徑調整
import { FACILITIES } from "../Data/Facilities";

export default function Facilities() {
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* 1. 上方：設施地圖區 (Map Placeholder) */}
      <div className="w-full h-64 bg-gray-100 rounded-2xl mb-10 flex items-center justify-center border border-gray-200 relative overflow-hidden group flex-shrink-0">
        <div className="text-gray-400 font-bold text-lg tracking-widest z-10 uppercase">
          MAP OF CAMPUS FACILITIES
        </div>
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50"></div>
      </div>

      {/* 2. 標題與簡介 */}
      <div className="mb-8 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">
          Facilities & Resources
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Explore the sports venues, libraries, and recreational areas available
          for students.
        </p>
      </div>

      {/* 3. 設施卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {FACILITIES.map((item) => (
          <div
            key={item.id}
            // h-full 確保卡片會填滿 grid cell 的高度，讓同一列的卡片等高
            className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-emerald-200 hover:shadow-md transition-all flex flex-col h-full"
          >
            {/* 圖片區域 (16:9) */}
            <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-sm tracking-wider group-hover:bg-emerald-50 group-hover:text-emerald-300 transition-colors shrink-0">
              IMG
            </div>

            {/* 內容區域 */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>

              {/* flex-1: 佔據剩餘空間，將底部資訊推到最下面。
                  min-h-[4.5rem]: 預留約 3-4 行文字的高度，避免文字太少時卡片看起來空空的。
              */}
              <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 min-h-[4.5rem]">
                {item.desc}
              </p>

              {/* 底部資訊：時間與地點 */}
              <div className="space-y-3 pt-4 border-t border-gray-200/60 mt-auto">
                {/* 開放時間 */}
                <div className="flex items-start gap-2">
                  <Clock
                    size={16}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />
                  {/* whitespace-pre-line 讓資料中的 \n 可以正確換行顯示 */}
                  <span className="text-xs text-gray-600 font-medium whitespace-pre-line leading-snug">
                    {item.hours}
                  </span>
                </div>

                {/* 地點 */}
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 font-medium leading-snug">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}