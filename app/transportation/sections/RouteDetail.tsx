
"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRightLeft, MapPin, ExternalLink, Link as LinkIcon, Banknote, ChevronLeft, ChevronRight } from "lucide-react";
import { ROUTE_DATA } from "../data/routes";

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
  
  // 取得當前圖片物件
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
return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Route Guide</div>
          <div className="text-2xl font-bold text-gray-800">{routeData.name}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* 左側：圖片區塊 */}
        <div className="w-full lg:w-5/12 aspect-square relative rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-black flex-shrink-0 group">
          {routeData.images && routeData.images.length > 0 ? (
            <img 
              src={currentImageData?.url}
              alt={routeData.name}
              className="w-full h-full object-contain transition-transform duration-500"
              style={{ imageRendering: '-webkit-optimize-contrast' as any }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <span className="text-gray-400/50 font-bold text-xl px-6 text-center">{routeData.name} VISUAL</span>
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
          
          {/* ✅ 這裡換成了全新的 Tab 文字點擊切換設計 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            <button 
              onClick={() => setDirIndex(0)}
              className="flex justify-center items-center py-2 w-full h-full rounded-xl hover:bg-white hover:shadow-sm transition-all group"
            >
              <span className={`text-sm font-bold transition-all ${dirIndex === 0 ? "text-emerald-600 scale-105" : "text-gray-400 group-hover:text-gray-600"}`}>
                {routeData.directions[0]?.label}
              </span>
            </button>
            
            <div className="p-3 rounded-full bg-white text-gray-300 shadow-sm border border-gray-100 mx-4 flex items-center justify-center pointer-events-none select-none">
              <ArrowRightLeft size={20} />
            </div>
            
            <button
              onClick={() => routeData.directions[1] && setDirIndex(1)}
              disabled={!routeData.directions[1]}
              className={`flex justify-center items-center py-2 w-full h-full rounded-xl transition-all group ${
                routeData.directions[1] ? "hover:bg-white hover:shadow-sm cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className={`text-sm font-bold transition-all ${dirIndex === 1 ? "text-emerald-600 scale-105" : "text-gray-400 group-hover:text-gray-600"}`}>
                {routeData.directions[1]?.label || "N/A"}
              </span>
            </button>
          </div>

          <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 mb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Recommended Path</h3>
            <div className="relative pl-2 space-y-8">
              <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200"></div>
              {/* ✅ 加上安全保護，確保單向路線切換時不會壞掉 */}
              {(routeData.directions[dirIndex] || routeData.directions[0])?.steps.map((step, idx) => (
                <div key={idx} className="relative flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-emerald-600 shadow-sm z-10">
                    <step.icon size={18} />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-bold text-gray-800 text-base">{step.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

          <div className="flex gap-3 mt-auto">
            <a 
              href={routeData.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:border-emerald-400 hover:text-emerald-600 shadow-sm transition-colors"
            >
              <MapPin size={16} /> Open On Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 px-1">
          Explore More Routes <span className="text-gray-300 text-sm font-normal">→</span>
        </h3>
        <div className="flex gap-6 overflow-x-auto pb-6 px-1 custom-scrollbar">
          {relatedRoutes.map((route) => (
            <div 
              key={route.id} 
              onClick={() => {
                onSelectRoute(route.id);
                setCurrentImgIndex(0);
                setDirIndex(0); // ✅ 切換新路線時，把方向切換重置回 0
              }} 
              className="min-w-[26%] md:min-w-[28%] group cursor-pointer"
            >
              <div className={`w-full aspect-video rounded-2xl mb-3 flex items-center justify-center overflow-hidden transition-all group-hover:scale-[1.02] shadow-sm`}>
                {route.images && route.images.length > 0 ? (
                  <img src={route.images[0].url} alt={route.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400/50 text-sm font-bold">IMG</span>
                )}
              </div>
              <p className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors text-center truncate px-2">
                {route.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect, useRef } from "react";
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

//   const scrollRef = useRef<HTMLDivElement>(null);

// useEffect(() => {
//   setDirIndex(0);
//   setCurrentImgIndex(0);

//   requestAnimationFrame(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });

//     document.documentElement.scrollTop = 0;
//     document.body.scrollTop = 0;
//   });
// }, [routeData.id]);
  
//   // 取得當前圖片物件
//   const currentImageData = routeData.images[currentImgIndex];
  
//   // 安全鎖：確保方向索引不會超出範圍（防呆機制）
//   const safeDirIndex = routeData.directions[dirIndex] ? dirIndex : 0;
//   const currentPath = routeData.directions[safeDirIndex];
  
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
//     <div ref={scrollRef} className="w-full h-full bg-white rounded-3xl p-6 md:p-8 pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 flex-shrink-0">        <button
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
//           <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
//             <div className="flex justify-center text-center">
//               <span className={`text-sm font-bold transition-all ${safeDirIndex === 0 ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
//                 {routeData.directions[0]?.label}
//               </span>
//             </div>
            
//             {/* 只有當存在兩個方向時，才允許切換 */}
//             <button
//               onClick={() => routeData.directions[1] && setDirIndex(safeDirIndex === 0 ? 1 : 0)}
//               disabled={!routeData.directions[1]}
//               className={`p-3 rounded-full shadow-sm border transition-all mx-4 ${
//                 routeData.directions[1] 
//                   ? "bg-white text-gray-500 hover:text-emerald-600 border-gray-100 active:scale-90" 
//                   : "bg-gray-100 text-gray-300 border-gray-50 cursor-not-allowed"
//               }`}
//             >
//               <ArrowRightLeft size={20} />
//             </button>
            
//             <div className="flex justify-center text-center">
//               <span className={`text-sm font-bold transition-all ${safeDirIndex === 1 ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
//                 {routeData.directions[1]?.label || "N/A"}
//               </span>
//             </div>
//           </div>

//           <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 mb-4">
//             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Recommended Path</h3>
//             <div className="relative pl-2 space-y-8">
//               <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200"></div>
//               {currentPath?.steps.map((step, idx) => (
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
//                 <p className="text-base font-bold text-emerald-700">{currentPath?.fare || "Free"}</p>
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
//               onClick={() => onSelectRoute(route.id)} 
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