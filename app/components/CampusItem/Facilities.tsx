"use client";
import { Clock, MapPin } from "lucide-react";

// --- 設施資料 ---
const FACILITIES = [
  {
    id: "lib",
    name: "Main Library",
    desc: "Access to vast collections, quiet study areas, and multimedia rooms.",
    hours: "Mon-Fri: 08:00 - 22:00\nSat-Sun: 09:00 - 17:00",
    location: "Central Campus",
  },
  {
    id: "gym",
    name: "Indoor Gymnasium",
    desc: "Features basketball courts, badminton courts, and a fitness center.",
    hours: "Daily: 08:00 - 22:00",
    location: "North Campus",
  },
  {
    id: "pool",
    name: "Swimming Pool",
    desc: "Standard Olympic-sized outdoor pool and indoor heated pool.",
    hours: "Tue-Sun: 06:00 - 21:00\n(Closed on Mondays)",
    location: "Sports Complex",
  },
  {
    id: "track",
    name: "Athletic Field",
    desc: "400m standard track and soccer field. Open for jogging at night.",
    hours: "Open 24 Hours\n(Lights off at 23:00)",
    location: "East Campus",
  },
  {
    id: "activity",
    name: "Student Activity Center",
    desc: "The hub for student clubs, exhibitions, and convenience stores.",
    hours: "07:00 - 23:00",
    location: "Near Dormitories",
  },
  {
    id: "lake",
    name: "Tranquility Lake",
    desc: "A scenic spot perfect for walking, relaxing, and swan watching.",
    hours: "Open 24 Hours",
    location: "Campus Entrance",
  },
];

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
            className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-emerald-200 hover:shadow-md transition-all flex flex-col"
          >
            {/* 圖片區域 (16:9) */}
            <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-sm tracking-wider group-hover:bg-emerald-50 group-hover:text-emerald-300 transition-colors">
              IMG
            </div>

            {/* 內容區域 */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                {item.desc}
              </p>

              {/* 底部資訊：時間與地點 */}
              <div className="space-y-2 pt-4 border-t border-gray-200/60 mt-auto">
                {/* 開放時間 */}
                <div className="flex items-start gap-2">
                  <Clock
                    size={16}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />
                  <span className="text-xs text-gray-600 font-medium whitespace-pre-line">
                    {item.hours}
                  </span>
                </div>

                {/* 地點 */}
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-xs text-gray-600 font-medium">
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
