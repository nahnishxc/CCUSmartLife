
// "use client";
// import { useEffect, Suspense } from "react";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import {
//   Bus,
//   Train,
//   Bike,
//   Map,
//   ArrowRight,
//   Clock,
//   Navigation,
// } from "lucide-react";

// // 靜態資料，直接吃本地端即可
// import { ROUTE_DATA } from "./data/routes";
// import BusDetail from "./sections/BusDetail";
// import TrainDetail from "./sections/TrainDetail";
// import UbikeDetail from "./sections/UbikeDetail";
// import RouteDetail from "./sections/RouteDetail";

// function TransportationContent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // 1. 【路由狀態管理】：取代原本的 useState，改從網址讀取狀態
//   const selectedMode = searchParams.get("mode");
//   const activeRouteId = searchParams.get("routeId");

//   const currentRouteData = activeRouteId ? ROUTE_DATA[activeRouteId] : null;

//   // 2. 【自動置頂功能】：監聽 URL 參數變化，一變就捲回最上面
//   useEffect(() => {
//     const container = document.querySelector(".custom-scrollbar");
//     if (container) {
//       container.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [selectedMode, activeRouteId]);

//   // --- 導航控制函數 ---
//   const navigateTo = (mode: string, routeId?: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("mode", mode);
//     if (routeId) {
//       params.set("routeId", routeId);
//     } else {
//       params.delete("routeId"); // 清除舊的 routeId 避免干擾
//     }
//     router.push(`?${params.toString()}`);
//   };

//   const goBack = () => {
//     // 退回沒有參數的首頁狀態
//     router.push(pathname);
//   };

//   // --- 根據 URL 狀態切換子頁面 ---
//   if (selectedMode === "bus") {
//     return <BusDetail onBack={goBack} />;
//   }

//   if (selectedMode === "train") {
//     return <TrainDetail onBack={goBack} />;
//   }

//   if (selectedMode === "ubike") {
//     return <UbikeDetail onBack={goBack} />;
//   }

//   if (selectedMode === "route" && currentRouteData) {
//     return (
//       <RouteDetail
//         routeData={currentRouteData as any}
//         onBack={goBack}
//         onSelectRoute={(id) => navigateTo("route", id)}
//       />
//     );
//   }

//   // --- 主頁面 UI ---
//   return (
//     <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-800">Transportation</h2>
//         <p className="text-sm text-gray-500 mt-1">
//           Real-time traffic info and route guides.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
//         <div
//           onClick={() => navigateTo("bus")}
//           className="group bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer flex flex-col h-[280px] relative overflow-hidden"
//         >
//           <Bus className="absolute -right-4 -bottom-4 text-gray-200/50 w-32 h-32 group-hover:text-emerald-100/50 transition-colors" />

//           <div className="relative z-10 mb-4">
//             <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-emerald-600">
//               <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
//                 <Bus size={15} />
//               </span>
//               Bus
//             </div>
//           </div>

//           <div className="flex justify-between items-start mb-4 relative z-10">
//             <div>
//               <h3 className="text-4xl font-black text-gray-800">7309</h3>
//               <p className="text-xs text-gray-500 font-bold">Chiayi - CCU</p>
//             </div>
//             <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse mt-2">
//               Approaching
//             </span>
//           </div>
//           <div className="flex-1 flex flex-col justify-center relative z-10 space-y-3">
//             <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
//               <span className="text-sm text-gray-600 font-medium">
//                 To Nanhua Univ.
//               </span>
//               <span className="text-lg font-bold text-emerald-600">5 mins</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600 font-medium">
//                 To Chiayi City
//               </span>
//               <span className="text-lg font-bold text-gray-400">18 mins</span>
//             </div>
//           </div>
//           <div className="mt-auto pt-2 text-xs text-gray-400 font-medium flex items-center gap-1 relative z-10">
//             <Map size={12} /> Stop: University Gate
//           </div>
//         </div>

//         <div
//           onClick={() => navigateTo("ubike")}
//           className="group bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer flex flex-col h-[280px] relative overflow-hidden"
//         >
//           <Bike className="absolute -right-4 -bottom-4 text-gray-200/50 w-32 h-32 group-hover:text-green-100/50 transition-colors" />

//           <div className="relative z-10 mb-4">
//             <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-emerald-600">
//               <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
//                 <Bike size={15} />
//               </span>
//               YouBike
//             </div>
//           </div>

//           <div className="mb-4 relative z-10">
//             <h3 className="text-2xl font-bold text-gray-800 leading-tight mb-1">
//               CCU Activity Center
//             </h3>
//             <p className="text-xs text-gray-500">Ubike 2.0 Station</p>
//           </div>
//           <div className="flex-1 grid grid-cols-2 gap-3 relative z-10">
//             <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center shadow-sm border border-gray-100">
//               <span className="text-2xl font-black text-orange-500">12</span>
//               <span className="text-[10px] text-gray-400 font-bold uppercase">
//                 Bikes
//               </span>
//             </div>
//             <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center shadow-sm border border-gray-100">
//               <span className="text-2xl font-black text-gray-400">8</span>
//               <span className="text-[10px] text-gray-400 font-bold uppercase">
//                 Empty
//               </span>
//             </div>
//           </div>
//           <div className="mt-auto pt-4 text-xs text-gray-400 font-medium flex items-center gap-1 relative z-10">
//             <Navigation size={12} /> Distance: 50m
//           </div>
//         </div>

//         <div
//           onClick={() => navigateTo("train")}
//           className="group bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer flex flex-col h-[280px] relative overflow-hidden"
//         >
//           <Train className="absolute -right-4 -bottom-4 text-gray-200/50 w-32 h-32 group-hover:text-green-100/50 transition-colors" />

//           <div className="relative z-10 mb-4">
//             <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-emerald-600">
//               <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
//                 <Train size={15} />
//               </span>
//               Train
//             </div>
//           </div>

//           <div className="mb-3 relative z-10 flex justify-between items-center">
//             <h3 className="text-2xl font-bold text-gray-800">
//               Minxiong Station
//             </h3>
//             <Clock size={16} className="text-gray-400" />
//           </div>
//           <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative z-10">
//             <table className="w-full text-left text-xs">
//               <thead className="bg-gray-50 text-gray-400 border-b border-gray-100">
//                 <tr>
//                   <th className="p-2 font-medium">Type</th>
//                   <th className="p-2 font-medium">Dest.</th>
//                   <th className="p-2 font-medium text-right">Time</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 <tr>
//                   <td className="p-2 text-gray-600">Local</td>
//                   <td className="p-2 font-bold text-gray-800">Kaohsiung</td>
//                   <td className="p-2 text-right font-mono text-emerald-600 font-bold">
//                     14:00
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="p-2 text-gray-600">Express</td>
//                   <td className="p-2 font-bold text-gray-800">Taichung</td>
//                   <td className="p-2 text-right font-mono text-gray-800">
//                     14:15
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="p-2 text-gray-600">Local</td>
//                   <td className="p-2 font-bold text-gray-800">Tainan</td>
//                   <td className="p-2 text-right font-mono text-gray-800">
//                     14:28
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
// <div className="mt-6">
//         <h3 className="text-3xl font-bold text-gray-800 mb-6 md:mb-8">
//           Frequently Used Routes
//         </h3>
        
//         {/* 🔴 響應式混合排版：手機版直向列表 (flex-col)，電腦版恢復橫向捲軸 (md:flex-row md:overflow-x-auto) */}
//         <div className="flex flex-col md:flex-row gap-4 md:gap-5 md:overflow-x-auto pb-6 md:px-1 custom-scrollbar">
//           {Object.values(ROUTE_DATA).map((route) => (
//             <div
//               key={route.id}
//               onClick={() => navigateTo("route", route.id)}
//               // 手機版：flex 橫向卡片 (帶灰底) | 電腦版：恢復 block 與指定最小寬度 (md:min-w-[23%])
//               className="group cursor-pointer flex items-center md:block md:min-w-[21%] lg:min-w-[23%] bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-2xl md:rounded-none border border-gray-100 md:border-transparent hover:border-emerald-200 md:hover:border-transparent transition-all"
//             >
//               <div
//                 // 手機版：固定 64px 小方塊 | 電腦版：滿版正方形 (md:aspect-square)
//                 className="w-16 h-16 md:w-full md:h-auto md:aspect-square rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 md:mb-3 group-hover:scale-[1.02] transition-transform shadow-sm"
//               >
//                 <div
//                   className="w-full h-full bg-center bg-cover"
//                   style={{
//                     backgroundImage: `url(${route.images?.[0]?.url || ""})`,
//                   }}
//                 />
//               </div>
              
//               {/* 文字與箭頭區塊 */}
//               <div className="flex-1 flex items-center justify-between px-4 md:px-1 overflow-hidden">
//                 <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 truncate">
//                   {route.name}
//                 </span>
//                 <ArrowRight size={14} className="text-gray-300 shrink-0" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function TransportationPage() {
//   return (
//     // 👉 3. 加入 Suspense 邊界，並設定載入中的 fallback 畫面
//     <Suspense fallback={<div>Loading...</div>}>
//       <TransportationContent />
//     </Suspense>
//   );
// }


"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Bus,
  Train,
  Bike,
  Map,
  ArrowRight,
  Clock,
  Navigation,
} from "lucide-react";

// 本地端資料與子頁面
import { ROUTE_DATA } from "./data/routes";
import BusDetail from "./sections/BusDetail";
import TrainDetail from "./sections/TrainDetail";
import UbikeDetail from "./sections/UbikeDetail";
import RouteDetail from "./sections/RouteDetail";

// 🎨 引入我們之前的紙膠帶組件 (請根據你的專案結構確認路徑)
import MaskingTape from "../components/MaskingTape";

function TransportationContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedMode = searchParams.get("mode");
  const activeRouteId = searchParams.get("routeId");

  const currentRouteData = activeRouteId ? ROUTE_DATA[activeRouteId] : null;

  useEffect(() => {
    const container = document.querySelector(".custom-scrollbar");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedMode, activeRouteId]);

  const navigateTo = (mode: string, routeId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", mode);
    if (routeId) {
      params.set("routeId", routeId);
    } else {
      params.delete("routeId"); 
    }
    router.push(`?${params.toString()}`);
  };

  const goBack = () => {
    router.push(pathname);
  };

  // 膠帶角度輪替，增加手工隨機感
  const tapeRotations = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[4deg]"];

  if (selectedMode === "bus") {
    return <BusDetail onBack={goBack} />;
  }

  if (selectedMode === "train") {
    return <TrainDetail onBack={goBack} />;
  }

  if (selectedMode === "ubike") {
    return <UbikeDetail onBack={goBack} />;
  }

  if (selectedMode === "route" && currentRouteData) {
    return (
      <RouteDetail
        routeData={currentRouteData as any}
        onBack={goBack}
        onSelectRoute={(id) => navigateTo("route", id)}
      />
    );
  }

  return (
    // 【背板指定】修改為 bg-[#fffdf8]，換上米灰邊框與手帳暖陰影
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] p-6 md:p-8 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* 標題與簡介 - 加上淡淡的虛線分隔 */}
      <div className="mb-8 border-b-2 border-dashed border-[#eadfce]/60 pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Transportation</h2>
        <p className="text-sm text-[#6f7b76] mt-1 font-medium">
          Real-time traffic info and route guides.
        </p>
      </div>

      {/* 頂部三大交通卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
        
        {/* 公車卡片：【卡片指定】修改為 bg-[#fffefb] 與米灰框線 */}
        <div
          onClick={() => navigateTo("bus")}
          className="group bg-[#fffefb] p-5 rounded-2xl border border-[#eadfce] hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(90,70,40,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-[280px] relative overflow-hidden"
        >
          <Bus className="absolute -right-4 -bottom-4 text-gray-200/40 w-32 h-32 group-hover:text-emerald-100/30 transition-colors" />

          <div className="relative z-10 mb-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-emerald-700">
              <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Bus size={15} />
              </span>
              Bus
            </div>
          </div>

          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h3 className="text-4xl font-black text-gray-800">7309</h3>
              <p className="text-xs text-[#6f7b76] font-bold">Chiayi - CCU</p>
            </div>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse mt-2 border border-emerald-200">
              Approaching
            </span>
          </div>
          
          {/* 內部資訊線條：改為 dashed 虛線 */}
          <div className="flex-1 flex flex-col justify-center relative z-10 space-y-3">
            <div className="flex justify-between items-center border-b-2 border-dashed border-[#eadfce]/60 pb-2">
              <span className="text-sm text-gray-600 font-bold">To Nanhua Univ.</span>
              <span className="text-lg font-bold text-emerald-600">5 mins</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-bold">To Chiayi City</span>
              <span className="text-lg font-bold text-gray-400">18 mins</span>
            </div>
          </div>
          <div className="mt-auto pt-2 text-xs text-[#6f7b76] font-bold flex items-center gap-1 relative z-10">
            <Map size={12} className="text-emerald-600" /> Stop: University Gate
          </div>
        </div>

        {/* YouBike 卡片：【卡片指定】修改為 bg-[#fffefb] 與米灰框線 */}
        <div
          onClick={() => navigateTo("ubike")}
          className="group bg-[#fffefb] p-5 rounded-2xl border border-[#eadfce] hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(90,70,40,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-[280px] relative overflow-hidden"
        >
          <Bike className="absolute -right-4 -bottom-4 text-gray-200/40 w-32 h-32 group-hover:text-green-100/30 transition-colors" />

          <div className="relative z-10 mb-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-emerald-700">
              <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Bike size={15} />
              </span>
              YouBike
            </div>
          </div>

          <div className="mb-4 relative z-10">
            <h3 className="text-2xl font-bold text-gray-800 leading-tight mb-1">
              CCU Activity Center
            </h3>
            <p className="text-xs text-[#6f7b76] font-bold">Ubike 2.0 Station</p>
          </div>
          
          {/* 內層計數卡片：底色採用微黃紙色 #fffdf8 與米灰邊框拉開層次 */}
          <div className="flex-1 grid grid-cols-2 gap-3 relative z-10">
            <div className="bg-[#fffdf8] rounded-xl p-3 flex flex-col items-center justify-center shadow-sm border border-[#eadfce]">
              <span className="text-2xl font-black text-orange-500">12</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bikes</span>
            </div>
            <div className="bg-[#fffdf8] rounded-xl p-3 flex flex-col items-center justify-center shadow-sm border border-[#eadfce]">
              <span className="text-2xl font-black text-gray-400">8</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Empty</span>
            </div>
          </div>
          <div className="mt-auto pt-4 text-xs text-[#6f7b76] font-bold flex items-center gap-1 relative z-10">
            <Navigation size={12} className="text-emerald-600" /> Distance: 50m
          </div>
        </div>

        {/* 火車卡片：【卡片指定】修改為 bg-[#fffefb] 與米灰框線 */}
        <div
          onClick={() => navigateTo("train")}
          className="group bg-[#fffefb] p-5 rounded-2xl border border-[#eadfce] hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(90,70,40,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-[280px] relative overflow-hidden"
        >
          <Train className="absolute -right-4 -bottom-4 text-gray-200/40 w-32 h-32 group-hover:text-green-100/30 transition-colors" />

          <div className="relative z-10 mb-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-emerald-700">
              <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Train size={15} />
              </span>
              Train
            </div>
          </div>

          <div className="mb-3 relative z-10 flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">
              Minxiong Station
            </h3>
            <Clock size={16} className="text-[#6f7b76]" />
          </div>
          
          {/* 內層表格：改為 #fffdf8 底色，並將分隔線全數虛線化 */}
          <div className="flex-1 bg-[#fffdf8] rounded-xl shadow-sm border border-[#eadfce] overflow-hidden relative z-10">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fbf8f1] text-[#6f7b76] border-b-2 border-dashed border-[#eadfce]/60">
                <tr>
                  <th className="p-2 font-bold uppercase tracking-wider">Type</th>
                  <th className="p-2 font-bold uppercase tracking-wider">Dest.</th>
                  <th className="p-2 font-bold uppercase tracking-wider text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-dashed divide-[#eadfce]/40">
                <tr>
                  <td className="p-2 text-gray-600 font-medium">Local</td>
                  <td className="p-2 font-bold text-gray-800">Kaohsiung</td>
                  <td className="p-2 text-right font-mono text-emerald-600 font-bold">14:00</td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">Express</td>
                  <td className="p-2 font-bold text-gray-800">Taichung</td>
                  <td className="p-2 text-right font-mono text-gray-800 font-medium">14:15</td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">Local</td>
                  <td className="p-2 font-bold text-gray-800">Tainan</td>
                  <td className="p-2 text-right font-mono text-gray-800 font-medium">14:28</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
{/* 下半部：常用路徑區塊 */}
      <div className="mt-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 md:mb-8">
          Frequently Used Routes
        </h3>
        
        {/* 常用路徑卡片列表 - 移除 overflow-hidden 確保膠帶露出來 */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 md:overflow-x-auto pb-6 md:px-1 custom-scrollbar overflow-visible">
          {Object.values(ROUTE_DATA).map((route, index) => {
            // 【修改】：既然我們更新了 MaskingTape 的 API，這裡可以直接算出數字角度
            const rotate = index % 2 === 0 ? -3 : 2; // 簡單的交錯角度

            return (
              <div
                key={route.id}
                onClick={() => navigateTo("route", route.id)}
                // 手機版直向卡片底色同步換成卡片指定的 #fffefb
                className="group cursor-pointer flex items-center md:block md:min-w-[21%] lg:min-w-[23%] bg-[#fffefb] md:bg-transparent p-3 md:p-0 rounded-2xl md:rounded-none border border-[#eadfce] md:border-transparent hover:border-emerald-300 md:hover:border-transparent transition-all duration-300 relative"
              >
                {/* 圖片包裹層：移除 overflow-hidden，外層定位膠帶，內層圖片保留圓角與裁剪 */}
                <div className="w-16 h-16 md:w-full md:h-auto md:aspect-square flex-shrink-0 md:mb-3 relative group-hover:scale-[1.02] transition-transform">
                  
                  {/* 【修改】：統一顏色為 bg-[#f0ebe1]/65，並使用新的 props 寫法 */}
                  {/* -top-2.5 讓膠帶露出一半，left-1/2 -translate-x-1/2 讓膠帶置中 */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <MaskingTape 
                      width="60px" 
                      opacity={1} 
                      color="bg-[#f0ebe1]/65" 
                      rotation={rotate} 
                      // 如果想要邊緣變化，也可以根據 index 給 flipX
                      flipX={index % 3 === 0} 
                    />
                  </div>
                  
                  <div
                    className="w-full h-full bg-center bg-cover rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-[#eadfce]/40"
                    style={{
                      backgroundImage: `url(${route.images?.[0]?.url || ""})`,
                    }}
                  />
                </div>
                
                {/* 文字與箭頭區塊 */}
                <div className="flex-1 flex items-center justify-between px-4 md:px-1 overflow-hidden mt-1">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-700 truncate tracking-wide">
                    {route.name}
                  </span>
                  <ArrowRight size={14} className="text-[#a8a196] group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default function TransportationPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-full bg-[#fffdf8] rounded-[32px] p-6 md:p-8 shadow-sm border border-[#eadfce] flex items-center justify-center">
        <span className="text-[#6f7b76] font-bold tracking-widest">Loading routes...</span>
      </div>
    }>
      <TransportationContent />
    </Suspense>
  );
}