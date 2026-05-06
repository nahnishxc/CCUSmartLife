"use client";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
// 確保路徑指向你存放資料的地方
import { FACILITIES } from "../../Data/Facilities";

export default function Facilities() {
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* 1. 標題與簡介 */}
      <div className="mb-8 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">
          Facilities & Resources
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Explore the sports venues, libraries, and recreational areas available
          for students.
        </p>
      </div>

      {/* 2. 設施卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {FACILITIES.map((item) => (
<div key={item.id} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-all">
            
            {/* 圖片區域：改用 Next.js Image */}
            <div className="w-full aspect-video relative overflow-hidden shrink-0 bg-gray-200">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill // 填滿父容器
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-sm">NO IMAGE</div>
              )}
            </div>

            {/* 內容區域 */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>

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