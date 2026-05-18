// "use client";
// import Image from "next/image";
// import { Clock, MapPin } from "lucide-react";
// // 確保路徑指向你存放資料的地方
// import { FACILITIES } from "../../Data/Facilities";

// export default function Facilities() {
//   return (
//     <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      
//       {/* 1. 標題與簡介 */}
//       <div className="mb-8 flex-shrink-0">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Facilities & Resources
//         </h2>
//         <p className="text-sm text-gray-500 mt-1">
//           Explore the sports venues, libraries, and recreational areas available
//           for students.
//         </p>
//       </div>

//       {/* 2. 設施卡片列表 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
//         {FACILITIES.map((item) => (
// <div key={item.id} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-all">
            
//             {/* 圖片區域：改用 Next.js Image */}
//             <div className="w-full aspect-video relative overflow-hidden shrink-0 bg-gray-200">
//               {item.image ? (
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   fill // 填滿父容器
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-sm">NO IMAGE</div>
//               )}
//             </div>

//             {/* 內容區域 */}
//             <div className="p-5 flex-1 flex flex-col">
//               <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
//                 {item.name}
//               </h3>

//               <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 min-h-[4.5rem]">
//                 {item.desc}
//               </p>

//               {/* 底部資訊：時間與地點 */}
//               <div className="space-y-3 pt-4 border-t border-gray-200/60 mt-auto">
//                 {/* 開放時間 */}
//                 <div className="flex items-start gap-2">
//                   <Clock
//                     size={16}
//                     className="text-emerald-500 mt-0.5 shrink-0"
//                   />
//                   <span className="text-xs text-gray-600 font-medium whitespace-pre-line leading-snug">
//                     {item.hours}
//                   </span>
//                 </div>

//                 {/* 地點 */}
//                 <div className="flex items-start gap-2">
//                   <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
//                   <span className="text-xs text-gray-600 font-medium leading-snug">
//                     {item.location}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
// 確保路徑指向你存放資料的地方
import { FACILITIES } from "../../Data/Facilities";
// 引入我們剛剛做的膠帶組件 (請根據你的資料夾結構確認路徑)
import MaskingTape from "../../components/MaskingTape"; 

export default function Facilities() {
  // 利用陣列輪替膠帶的傾斜角度，創造手貼的隨機感
  const tapeRotations = ["rotate-[-2deg]", "rotate-[3deg]", "rotate-[-1deg]", "rotate-[2deg]"];

  return (
    // 外層：換成紙張底色與溫暖邊框，排版與 padding (p-6 md:p-10) 完全不動
    <div className="w-full h-full bg-[#fffdf8] rounded-3xl p-6 md:p-10 border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* 1. 標題與簡介 */}
      {/* 自由發揮點：在標題與內容之間加了一道虛線分隔，更有筆記本的感覺 */}
      <div className="mb-8 flex-shrink-0 border-b-2 border-dashed border-[#eadfce] pb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Facilities & Resources
        </h2>
        <p className="text-sm text-[#6f7b76] mt-1">
          Explore the sports venues, libraries, and recreational areas available
          for students.
        </p>
      </div>

      {/* 2. 設施卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {FACILITIES.map((item, index) => {
          const rotation = tapeRotations[index % tapeRotations.length];

          return (
            <div 
              key={item.id} 
              // 卡片外層：紙材質、暖陰影、hover 時微傾斜，【移除 overflow-hidden 讓膠帶露出來】
              className="group bg-[#fffefb] rounded-2xl border border-[#eadfce] flex flex-col h-full hover:shadow-[0_12px_32px_rgba(90,70,40,0.1)] transition-all duration-300 relative hover:-translate-y-1 hover:-rotate-1"
            >
              {/* 🎨 手作感裝飾：置中膠帶，並根據 index 給予不同的微傾斜 */}
              <MaskingTape className={`-top-3 left-1/2 -translate-x-1/2 w-20 h-6 ${rotation}`} />
              
              {/* 圖片區域：把 overflow-hidden 移到這裡，並加上 rounded-t-2xl 確保圖片有圓角 */}
              <div className="w-full aspect-video relative overflow-hidden shrink-0 bg-[#fbf8f1] rounded-t-2xl">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill // 填滿父容器
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#eadfce] font-bold text-sm">NO IMAGE</div>
                )}
              </div>

              {/* 內容區域：加上 rounded-b-2xl 確保 hover 變色時底部有圓角 */}
              <div className="p-5 flex-1 flex flex-col rounded-b-2xl group-hover:bg-[#fbf8f1]/50 transition-colors">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </h3>

                <p className="text-sm text-[#6f7b76] leading-relaxed mb-4 flex-1 min-h-[4.5rem]">
                  {item.desc}
                </p>

                {/* 底部資訊：時間與地點 (原本的實線改為虛線 border-dashed) */}
                <div className="space-y-3 pt-4 border-t-2 border-dashed border-[#eadfce] mt-auto">
                  {/* 開放時間 */}
                  <div className="flex items-start gap-2">
                    <Clock
                      size={16}
                      className="text-emerald-600 mt-0.5 shrink-0"
                    />
                    <span className="text-xs text-[#6f7b76] font-medium whitespace-pre-line leading-snug">
                      {item.hours}
                    </span>
                  </div>

                  {/* 地點 */}
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#6f7b76] font-medium leading-snug">
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}