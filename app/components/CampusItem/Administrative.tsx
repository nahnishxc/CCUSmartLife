"use client";
import { Briefcase } from "lucide-react";

// --- 處室資料 (模擬連結) ---
const OFFICES = [
  { name: "President", url: "https://president.ccu.edu.tw/p/426-1001-3.php?Lang=zh-tw" },
  { name: "Secretariat", url: "https://www.ccu.edu.tw/p/404-1000-25913.php?Lang=en" },
  { name: "Office of Academic Affairs", url: "https://www.ccu.edu.tw/p/404-1000-25914.php?Lang=en" },
  { name: "Office of International Affairs", url: "https://oia.ccu.edu.tw/?Lang=en" }, // 特別把 OIA 放前面一點
  { name: "Office of Student Affairs", url: "https://studaffairs.ccu.edu.tw/?Lang=en" },
  { name: "Office of Information Technology", url: "https://www.ccu.edu.tw/p/404-1000-25917.php?Lang=en" },
  { name: "Office of General Affairs", url: "https://www.ccu.edu.tw/p/404-1000-25915.php?Lang=en" },
  { name: "Accounting Office", url: "https://www.ccu.edu.tw/p/404-1000-25918.php?Lang=en" },
  { name: "Office of Research and Development", url: "https://www.ccu.edu.tw/p/404-1000-25916.php?Lang=en" },
  { name: "Personnel Office", url: "https://www.ccu.edu.tw/p/404-1000-25919.php?Lang=en" },
  { name: "Library", url: "https://lib.ccu.edu.tw/?Lang=zh-tw" },
  { name: "Physical Education Center", url: "https://www.ccu.edu.tw/p/404-1000-25920.php?Lang=en" },
  { name: "Counseling Center", url: "https://advising.ccu.edu.tw/p/404-1013-699.php?Lang=en" },
  { name: "Environmental Hygiene & Safety", url: "https://environ.ccu.edu.tw/?Lang=en" },
  { name: "Ching Jiang Learning Center", url: "https://cjlc.ccu.edu.tw/en/" },
  { name: "Office of Institutional Research", url: "https://oir.ccu.edu.tw/index.php" },
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