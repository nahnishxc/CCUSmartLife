// "use client";
// import { useState } from "react";
// import { ArrowLeft, ArrowRightLeft, MapPin, ExternalLink, Link as LinkIcon, Banknote } from "lucide-react";
// import { ROUTE_DATA } from "../data/routes";

// interface RouteDetailProps {
//   routeData: {
//     id: string;
//     name: string;
//     image: string;
//     imageSource: string;
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
//   const currentPath = routeData.directions[dirIndex];
//   const relatedRoutes = Object.values(ROUTE_DATA).filter(r => r.id !== routeData.id);

//   return (
//     <div className="w-full h-full flex flex-col relative overflow-y-auto custom-scrollbar">
//       {/* Header 與 Main Content 部分保持不變 */}
//       <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 flex-shrink-0">
//         <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
//           <ArrowLeft size={20} />
//         </button>
//         <div>
//           <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Route Guide</div>
//           <div className="text-lg font-bold text-gray-800">{routeData.name}</div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8 mb-12">
//         <div className="w-full lg:w-5/12 aspect-square relative rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex-shrink-0">
//           <div className={`w-full h-full ${routeData.image} flex items-center justify-center`}>
//             <span className="text-gray-400/50 font-bold text-xl px-6 text-center">{routeData.name} VISUAL</span>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 p-3">
//             <div className="bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 border border-white/10">
//               <LinkIcon size={12} className="text-white/70 flex-shrink-0" />
//               <span className="text-[10px] text-white/90 truncate font-medium">Source: {routeData.imageSource}</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col">
//           <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
//             <div className="flex justify-center text-center">
//               <span className={`text-sm font-bold transition-all ${dirIndex === 0 ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
//                 {routeData.directions[0].label}
//               </span>
//             </div>
//             <button
//               onClick={() => setDirIndex(dirIndex === 0 ? 1 : 0)}
//               className="p-3 rounded-full bg-white text-gray-500 hover:text-emerald-600 shadow-sm border border-gray-100 transition-all active:scale-90 mx-4"
//             >
//               <ArrowRightLeft size={20} />
//             </button>
//             <div className="flex justify-center text-center">
//               <span className={`text-sm font-bold transition-all ${dirIndex === 1 ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
//                 {routeData.directions[1]?.label}
//               </span>
//             </div>
//           </div>

//           <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 mb-4">
//             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Recommended Path</h3>
//             <div className="relative pl-2 space-y-8">
//               <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200"></div>
//               {currentPath.steps.map((step, idx) => (
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
//                 <p className="text-base font-bold text-emerald-700">{currentPath.fare}</p>
//               </div>
//             </div>
//             <div className="text-[10px] font-bold text-emerald-600/50 px-2 py-1 bg-white rounded-md border border-emerald-100">
//               Cash / Card
//             </div>
//           </div>

//           <div className="flex gap-3 mt-auto">
//             <button className="flex-1 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:border-emerald-400 shadow-sm">
//               <MapPin size={16} /> Google Maps
//             </button>
//             <button className="flex-1 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:border-orange-400 shadow-sm">
//               <ExternalLink size={16} /> Nearby Spots
//             </button>
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
//               <div className={`w-full aspect-video ${route.imageColor} rounded-2xl mb-3 flex items-center justify-center text-gray-400/50 text-sm font-bold transition-all group-hover:scale-[1.02] shadow-sm`}>
//                 IMG
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
    <div className="w-full h-full flex flex-col relative overflow-y-auto custom-scrollbar">
      {/* Header 保持文字放大後的 text-2xl */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 flex-shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Route Guide</div>
          <div className="text-2xl font-bold text-gray-800">{routeData.name}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="w-full lg:w-5/12 aspect-square relative rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-black flex-shrink-0 group">
          {routeData.images && routeData.images.length > 0 ? (
            <img 
              src={currentImageData.url} // 使用當前圖片的 URL
              alt={routeData.name}
              className="w-full h-full object-contain transition-transform duration-500"
              style={{ imageRendering: '-webkit-optimize-contrast' as any }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <span className="text-gray-400/50 font-bold text-xl px-6 text-center">{routeData.name} VISUAL</span>
            </div>
          )}

          {/* ... 切換箭頭和頁碼指示器程式碼保持不變 ... */}
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

          {/* 底部 Source 區塊，我們把 z-index 提高，確保在黑色背景上可見 */}
          <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
            <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 border border-white/10">
              <LinkIcon size={12} className="text-white/70 flex-shrink-0" />
              <span className="text-[10px] text-white/90 truncate font-medium">
                Source: {currentImageData?.source || "Unknown"} 
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            <div className="flex justify-center text-center">
              <span className={`text-sm font-bold transition-all ${dirIndex === 0 ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
                {routeData.directions[0].label}
              </span>
            </div>
            <button
              onClick={() => setDirIndex(dirIndex === 0 ? 1 : 0)}
              className="p-3 rounded-full bg-white text-gray-500 hover:text-emerald-600 shadow-sm border border-gray-100 transition-all active:scale-90 mx-4"
            >
              <ArrowRightLeft size={20} />
            </button>
            <div className="flex justify-center text-center">
              <span className={`text-sm font-bold transition-all ${dirIndex === 1 ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
                {routeData.directions[1]?.label}
              </span>
            </div>
          </div>

          <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 mb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Recommended Path</h3>
            <div className="relative pl-2 space-y-8">
              <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200"></div>
              {currentPath.steps.map((step, idx) => (
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
                <p className="text-base font-bold text-emerald-700">{currentPath.fare}</p>
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