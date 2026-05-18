
// "use client";
// import { useState } from "react";
// import { ArrowLeft, ArrowRightLeft, MapPin, ExternalLink, Link as LinkIcon, Banknote, ChevronLeft, ChevronRight } from "lucide-react";
// import { ROUTE_DATA } from "../data/routes";

// interface RouteImage {
//   url: string;
//   source: string;
// }
// interface RouteDetailProps {
//   routeData: {
//     id: string;
//     name: string;
//     images: RouteImage[]; 
//     url: string;
//     directions: Array<{
//       label: string;
//       fare: string;
//       steps: Array<{ icon: any; title: string; desc: string }>;
//     }>;
//   };
//   onBack: () => void;
//   onSelectRoute: (id: string) => void;
// }

// export default function RouteDetail({ routeData, onBack, onSelectRoute }: RouteDetailProps) {
//   const [dirIndex, setDirIndex] = useState<0 | 1>(0);
//   const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
//   // 取得當前圖片物件
//   const currentImageData = routeData.images[currentImgIndex];
  
//   const currentPath = routeData.directions[dirIndex];
//   const relatedRoutes = Object.values(ROUTE_DATA).filter(r => r.id !== routeData.id);

//   const nextImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImgIndex((prev) => (prev + 1) % routeData.images.length);
//   };

//   const prevImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImgIndex((prev) => (prev - 1 + routeData.images.length) % routeData.images.length);
//   };
// return (
//     <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 flex-shrink-0">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>
//         <div>
//           <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Route Guide</div>
//           <div className="text-2xl font-bold text-gray-800">{routeData.name}</div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8 mb-12">
//         {/* 左側：圖片區塊 */}
//         <div className="w-full lg:w-5/12 aspect-square relative rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-black flex-shrink-0 group">
//           {routeData.images && routeData.images.length > 0 ? (
//             <img 
//               src={currentImageData?.url}
//               alt={routeData.name}
//               className="w-full h-full object-contain transition-transform duration-500"
//               style={{ imageRendering: '-webkit-optimize-contrast' as any }}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gray-50">
//               <span className="text-gray-400/50 font-bold text-xl px-6 text-center">{routeData.name} VISUAL</span>
//             </div>
//           )}

//           {routeData.images && routeData.images.length > 1 && (
//             <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
//               <button 
//                 onClick={prevImage}
//                 className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg pointer-events-auto hover:bg-white active:scale-90 transition-all"
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <button 
//                 onClick={nextImage}
//                 className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg pointer-events-auto hover:bg-white active:scale-90 transition-all"
//               >
//                 <ChevronRight size={24} />
//               </button>
//             </div>
//           )}

//           {routeData.images && routeData.images.length > 1 && (
//             <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-bold z-10">
//               {currentImgIndex + 1} / {routeData.images.length}
//             </div>
//           )}

//           <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
//             <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 border border-white/10">
//               <LinkIcon size={12} className="text-white/70 flex-shrink-0" />
//               <span className="text-[10px] text-white/90 truncate font-medium">
//                 Source: {currentImageData?.source || "Unknown"} 
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* 右側：路徑與資訊區塊 */}
//         <div className="flex-1 flex flex-col">
          
//           {/* ✅ 這裡換成了全新的 Tab 文字點擊切換設計 */}
//           <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
//             <button 
//               onClick={() => setDirIndex(0)}
//               className="flex justify-center items-center py-2 w-full h-full rounded-xl hover:bg-white hover:shadow-sm transition-all group"
//             >
//               <span className={`text-sm font-bold transition-all ${dirIndex === 0 ? "text-emerald-600 scale-105" : "text-gray-400 group-hover:text-gray-600"}`}>
//                 {routeData.directions[0]?.label}
//               </span>
//             </button>
            
//             <div className="p-3 rounded-full bg-white text-gray-300 shadow-sm border border-gray-100 mx-4 flex items-center justify-center pointer-events-none select-none">
//               <ArrowRightLeft size={20} />
//             </div>
            
//             <button
//               onClick={() => routeData.directions[1] && setDirIndex(1)}
//               disabled={!routeData.directions[1]}
//               className={`flex justify-center items-center py-2 w-full h-full rounded-xl transition-all group ${
//                 routeData.directions[1] ? "hover:bg-white hover:shadow-sm cursor-pointer" : "opacity-50 cursor-not-allowed"
//               }`}
//             >
//               <span className={`text-sm font-bold transition-all ${dirIndex === 1 ? "text-emerald-600 scale-105" : "text-gray-400 group-hover:text-gray-600"}`}>
//                 {routeData.directions[1]?.label || "N/A"}
//               </span>
//             </button>
//           </div>

//           <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 mb-4">
//             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Recommended Path</h3>
//             <div className="relative pl-2 space-y-8">
//               <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200"></div>
//               {/* ✅ 加上安全保護，確保單向路線切換時不會壞掉 */}
//               {(routeData.directions[dirIndex] || routeData.directions[0])?.steps.map((step, idx) => (
//                 <div key={idx} className="relative flex gap-4 items-start group">
//                   <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-emerald-600 shadow-sm z-10">
//                     <step.icon size={18} />
//                   </div>
//                   <div className="flex-1 pt-1">
//                     <h4 className="font-bold text-gray-800 text-base">{step.title}</h4>
//                     <p className="text-sm text-gray-500 leading-relaxed mt-1">{step.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
//                 <Banknote size={20} />
//               </div>
//               <div>
//                 <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-tight">Estimated Cost</p>
//                 <p className="text-base font-bold text-emerald-700">{(routeData.directions[dirIndex] || routeData.directions[0])?.fare}</p>
//               </div>
//             </div>
//             <div className="text-[10px] font-bold text-emerald-600/50 px-2 py-1 bg-white rounded-md border border-emerald-100">
//               Cash / Card
//             </div>
//           </div>

//           <div className="flex gap-3 mt-auto">
//             <a 
//               href={routeData.url} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="flex-1 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:border-emerald-400 hover:text-emerald-600 shadow-sm transition-colors"
//             >
//               <MapPin size={16} /> Open On Google Maps
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="pt-8 border-t border-gray-100">
//         <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 px-1">
//           Explore More Routes <span className="text-gray-300 text-sm font-normal">→</span>
//         </h3>
//         <div className="flex gap-6 overflow-x-auto pb-6 px-1 custom-scrollbar">
//           {relatedRoutes.map((route) => (
//             <div 
//               key={route.id} 
//               onClick={() => {
//                 onSelectRoute(route.id);
//                 setCurrentImgIndex(0);
//                 setDirIndex(0); // ✅ 切換新路線時，把方向切換重置回 0
//               }} 
//               className="min-w-[26%] md:min-w-[28%] group cursor-pointer"
//             >
//               <div className={`w-full aspect-video rounded-2xl mb-3 flex items-center justify-center overflow-hidden transition-all group-hover:scale-[1.02] shadow-sm`}>
//                 {route.images && route.images.length > 0 ? (
//                   <img src={route.images[0].url} alt={route.name} className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-gray-400/50 text-sm font-bold">IMG</span>
//                 )}
//               </div>
//               <p className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors text-center truncate px-2">
//                 {route.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRightLeft, MapPin, ExternalLink, Link as LinkIcon, Banknote, ChevronLeft, ChevronRight } from "lucide-react";
import { ROUTE_DATA } from "../data/routes";

// 🎨 引入我們之前的紙膠帶組件 (請根據你的專案結構確認路徑)
import MaskingTape from "../../components/MaskingTape";

interface RouteImage {
  url: string;
  source: string;
}
interface RouteDetailProps {
  routeData: {
    id: string;
    name: string;
    images: RouteImage[]; 
    url: string;
    directions: Array<{
      label: string;
      fare: string;
      steps: Array<{ icon: any; title: string; desc: string }>;
    }>;
  };
  onBack: () => void;
  onSelectRoute: (id: string) => void;
}

export default function RouteDetail({ routeData, onBack, onSelectRoute }: RouteDetailProps) {
  const [dirIndex, setDirIndex] = useState<0 | 1>(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
  const currentImageData = routeData.images[currentImgIndex];
  
  const currentPath = routeData.directions[dirIndex];
  const relatedRoutes = Object.values(ROUTE_DATA).filter(r => r.id !== routeData.id);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % routeData.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + routeData.images.length) % routeData.images.length);
  };

  // 膠帶隨機角度輪替
  const tapeRotations = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[4deg]"];

  return (
    // 【背板指定】大面板底色改為 bg-[#fffdf8]，搭配米灰邊框與手帳暖陰影
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] p-6 md:p-8 pt-16 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* Header - 換成手帳虛線條 */}
      <div className="flex items-center gap-2 mb-6 border-b-2 border-dashed border-[#eadfce]/60 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          // 返回按鈕同步換成精跡紙質標籤外觀
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fffefb] border border-[#eadfce] text-gray-600 font-bold text-sm shadow-sm hover:shadow-md hover:text-emerald-700 hover:bg-[#fbf8f1] transition-all"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div>
          <div className="text-xs text-[#6f7b76] font-bold uppercase tracking-wider">Route Guide</div>
          <div className="text-2xl font-bold text-gray-800">{routeData.name}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* 左側：圖片區塊 - 換成米灰框線與溫潤內底色 */}
        <div className="w-full lg:w-5/12 aspect-square relative rounded-3xl overflow-hidden shadow-sm border border-[#eadfce] bg-[#fbf8f1] flex-shrink-0 group">
          {routeData.images && routeData.images.length > 0 ? (
            <img 
              src={currentImageData?.url}
              alt={routeData.name}
              className="w-full h-full object-contain transition-transform duration-500"
              style={{ imageRendering: '-webkit-optimize-contrast' as any }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#fffefb]">
              <span className="text-[#eadfce] font-bold text-xl px-6 text-center">{routeData.name} VISUAL</span>
            </div>
          )}

          {routeData.images && routeData.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              <button 
                onClick={prevImage}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg pointer-events-auto hover:bg-white active:scale-90 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg pointer-events-auto hover:bg-white active:scale-90 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          {routeData.images && routeData.images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-bold z-10">
              {currentImgIndex + 1} / {routeData.images.length}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
            <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 border border-white/10">
              <LinkIcon size={12} className="text-white/70 flex-shrink-0" />
              <span className="text-[10px] text-white/90 truncate font-medium">
                Source: {currentImageData?.source || "Unknown"} 
              </span>
            </div>
          </div>
        </div>

        {/* 右側：路徑與資訊區塊 */}
        <div className="flex-1 flex flex-col">
          
          {/* 全新 Tab 設計：改為手帳標籤頁外觀，融入米灰框線與微黃紙襯底 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8 bg-[#fbf8f1]/60 p-2 rounded-2xl border border-[#eadfce]">
            <button 
              onClick={() => setDirIndex(0)}
              className={`flex justify-center items-center py-2 w-full h-full rounded-xl transition-all group ${dirIndex === 0 ? "bg-white shadow-sm border border-[#eadfce]/40" : "hover:bg-white/40"}`}
            >
              <span className={`text-sm font-bold transition-all ${dirIndex === 0 ? "text-emerald-700 scale-105" : "text-[#6f7b76] group-hover:text-gray-600"}`}>
                {routeData.directions[0]?.label}
              </span>
            </button>
            
            <div className="p-3 rounded-full bg-white text-[#eadfce] shadow-sm border border-[#eadfce]/60 mx-4 flex items-center justify-center pointer-events-none select-none">
              <ArrowRightLeft size={20} />
            </div>
            
            <button
              onClick={() => routeData.directions[1] && setDirIndex(1)}
              disabled={!routeData.directions[1]}
              className={`flex justify-center items-center py-2 w-full h-full rounded-xl transition-all group ${
                routeData.directions[1] 
                  ? (dirIndex === 1 ? "bg-white shadow-sm border border-[#eadfce]/40 cursor-pointer" : "hover:bg-white/40 cursor-pointer") 
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className={`text-sm font-bold transition-all ${dirIndex === 1 ? "text-emerald-700 scale-105" : "text-[#6f7b76] group-hover:text-gray-600"}`}>
                {routeData.directions[1]?.label || "N/A"}
              </span>
            </button>
          </div>

          {/* 推薦路徑卡片：【卡片指定】底色換成 bg-[#fffefb] 與米灰框線 */}
          <div className="bg-[#fffefb] rounded-2xl p-6 border border-[#eadfce] shadow-sm mb-4">
            <h3 className="text-sm font-bold text-[#6f7b76] uppercase tracking-wider mb-6">Recommended Path</h3>
            <div className="relative pl-2 space-y-8">
              {/* 垂直導引軸線換成米灰材質色 */}
              <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-[#eadfce]"></div>
              
              {(routeData.directions[dirIndex] || routeData.directions[0])?.steps.map((step, idx) => (
                <div key={idx} className="relative flex gap-4 items-start group">
                  {/* 節點圓圈換成米灰框線 */}
                  <div className="w-10 h-10 rounded-full bg-white border border-[#eadfce] flex items-center justify-center text-emerald-600 shadow-sm z-10">
                    <step.icon size={18} />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-bold text-gray-800 text-base">{step.title}</h4>
                    <p className="text-sm text-[#6f7b76] leading-relaxed mt-1 font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 預估費用卡片 */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                <Banknote size={20} />
              </div>
              <div>
                <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-tight">Estimated Cost</p>
                <p className="text-base font-bold text-emerald-700">{(routeData.directions[dirIndex] || routeData.directions[0])?.fare}</p>
              </div>
            </div>
            <div className="text-[10px] font-bold text-emerald-600/50 px-2 py-1 bg-white rounded-md border border-emerald-100">
              Cash / Card
            </div>
          </div>

          {/* Google 地圖跳轉按鈕：改為卡片指定的 #fffefb 紙張底色 */}
          <div className="flex gap-3 mt-auto">
            <a 
              href={routeData.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#fffefb] border border-[#eadfce] rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:border-emerald-300 hover:text-emerald-700 shadow-sm transition-all"
            >
              <MapPin size={16} className="text-emerald-600" /> Open On Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* 底部探索更多區塊 - 換成手帳虛線分隔 */}
      <div className="pt-8 border-t-2 border-dashed border-[#eadfce]/60">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 px-1">
          Explore More Routes <span className="text-emerald-600 text-sm font-bold">→</span>
        </h3>
        
        {/* 橫向滾動列表優化：
            1. custom-scrollbar 改為 no-scrollbar 徹底隱藏捲軸
            2. 注入 pt-6 為紙膠帶預留浮出的高度空間，防止被滾動邊界切斷
            3. 滾動功能完全恢復（Shift 滑動完美修復） */}
        <div className="flex gap-6 overflow-x-auto pt-6 pb-6 px-2 no-scrollbar overflow-visible">
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          {relatedRoutes.map((route, index) => {
            const rotation = tapeRotations[index % tapeRotations.length];

            return (
              <div 
                key={route.id} 
                onClick={() => {
                  onSelectRoute(route.id);
                  setCurrentImgIndex(0);
                  setDirIndex(0); 
                }} 
                className="min-w-[26%] md:min-w-[28%] group cursor-pointer relative"
              >
                {/* 相關推薦圖片包裹層：外層加上紙膠帶，內層維持圓角裁剪 */}
                <div className="w-full aspect-video rounded-2xl mb-3 flex items-center justify-center relative transition-all group-hover:scale-[1.02] shadow-sm">
                  
                  {/* 🎨 拍立得照片紙膠帶效果復合：一半完美露在圖片上方 */}
                  <MaskingTape className={`-top-2.5 left-3 w-14 h-4.5 ${rotation}`} />
                  
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-[#eadfce]/40">
                    {route.images && route.images.length > 0 ? (
                      <img src={route.images[0].url} alt={route.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#fbf8f1] flex items-center justify-center text-[#eadfce] font-bold text-sm">IMG</div>
                    )}
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-700 group-hover:text-emerald-700 transition-colors text-center truncate px-2 tracking-wide">
                  {route.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}