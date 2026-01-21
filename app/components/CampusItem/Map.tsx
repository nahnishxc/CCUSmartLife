"use client";
import { Maximize2 } from "lucide-react";

export default function Map() {
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
      
      {/* 標題區 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Campus Map</h2>
          <p className="text-sm text-gray-500">Explore the buildings and roads of CCU.</p>
        </div>
        
        {/* 下載/查看原圖按鈕 (Optional) */}
        <a 
          href="/ccu-map.jpg" // 假設你的圖片路徑
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors"
        >
          <Maximize2 size={16} />
          Full View
        </a>
      </div>

      {/* 地圖容器 */}
      {/* overflow-auto: 如果圖片比框框大，會出現卷軸讓使用者拉動 */}
      <div className="flex-1 w-full bg-gray-100 rounded-2xl border border-gray-200 overflow-auto relative custom-scrollbar flex items-center justify-center">
        
        {/* --- 在這裡放入你的圖片 --- */}
        {/* 1. 請把地圖圖片丟進 public 資料夾 */}
        {/* 2. 修改 src="/你的檔名.jpg" */}
        {/* 3. 如果圖片很大，可以設定 min-w-[150%] 或是讓它自然撐開 */}
        
        <img 
          src="/ccu-map-placeholder.jpg" // <--- 替換這裡
          alt="CCU Campus Map"
          className="max-w-none" // 允許圖片超出容器寬度 (保持原解析度)
          style={{ 
             // 這裡可以微調，例如預設寬度 100% 或是固定寬度
             width: "100%", 
             height: "auto",
             objectFit: "contain"
          }} 
        />

        {/* 暫時的替代文字 (如果你還沒放圖片，會看到這個) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
          <p className="font-bold text-lg mb-2">Map Image Placeholder</p>
          <p className="text-sm opacity-60">Please place your map image in /public folder</p>
        </div>

      </div>
    </div>
  );
}