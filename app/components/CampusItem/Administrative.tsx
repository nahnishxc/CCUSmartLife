"use client";
import { Briefcase } from "lucide-react";

// --- 處室資料 (模擬連結) ---
const OFFICES = [
  { name: "President", url: "#" },
  { name: "Secretariat", url: "#" },
  { name: "Office of Academic Affairs", url: "#" },
  { name: "Office of International Affairs", url: "#" }, // 特別把 OIA 放前面一點
  { name: "Office of Student Affairs", url: "#" },
  { name: "Office of Information Technology", url: "#" },
  { name: "Office of General Affairs", url: "#" },
  { name: "Accounting Office", url: "#" },
  { name: "Office of Research and Development", url: "#" },
  { name: "Personnel Office", url: "#" },
  { name: "Library", url: "#" },
  { name: "Physical Education Center", url: "#" },
  { name: "Counseling Center", url: "#" },
  { name: "Environmental Hygiene & Safety", url: "#" },
  { name: "Ching Jiang Learning Center", url: "#" },
  { name: "Office of Institutional Research", url: "#" },
];

export default function Administrative() {
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row">
      
      {/* 1. 左側：圖示與標題區 */}
      <div className="w-full md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
        {/* 仿照圖片的藍色公事包圖示 */}
        <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mb-6 shadow-sm">
          <Briefcase size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-gray-700">Administration</h2>
        <div className="w-8 h-1 bg-blue-200 rounded-full mt-3"></div>
      </div>

      {/* 2. 右側：連結列表區 */}
      {/* 使用 overflow-y-auto 確保如果連結太多可以滾動 */}
      <div className="flex-1 pt-6 md:pt-0 md:pl-10 overflow-y-auto custom-scrollbar flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-full">
          {OFFICES.map((office, index) => (
            <a 
              key={index} 
              href={office.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
            >
              {/* 小圓點裝飾：hover 時變色 */}
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-emerald-500 transition-colors shrink-0"></div>
              
              {/* 文字連結 */}
              <span className="text-gray-600 text-sm font-medium group-hover:text-emerald-700 group-hover:translate-x-1 transition-all">
                {office.name}
              </span>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}