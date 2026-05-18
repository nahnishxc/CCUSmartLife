
// "use client";

// import { useState, useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import useSWR from "swr";
// import {
//   ArrowLeft,
//   MapPin,
//   ChevronDown,
//   ExternalLink,
//   Bike,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- 資料結構 ---
// interface UbikeStation {
//   uid: string; 
//   name: string; 
//   nameEn: string; 
//   locationEn: string; 
//   rentBikes: number; 
//   returnDocks: number; 
//   status: string; 
//   latitude: number;
//   longitude: number;
// }

// interface UbikeDetailProps {
//   onBack: () => void;
// }

// // --- 定義 SWR Fetcher ---
// const fetcher = async (url: string) => {
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   const res = await fetch(url, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) {
//     console.warn(`Server error ${res.status}: API might be down or out of service.`);
//     return { stations: [] };
//   }
//   return res.json();
// };

// export default function UbikeDetail({ onBack }: UbikeDetailProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const selectedArea = searchParams.get("area") || "All Areas";
//   const selectedStationId = searchParams.get("station");

//   const [isAreaOpen, setIsAreaOpen] = useState(false);
//   const [isStationOpen, setIsStationOpen] = useState(false);

//   const updateUrlState = (area: string, stationId: string | null) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("area", area);
//     if (stationId) {
//       params.set("station", stationId);
//     } else {
//       params.delete("station");
//     }
//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   const { data, isLoading } = useSWR(
//     `https://campus-ai-backend-1.onrender.com/api/traffic/ubike`,
//     fetcher,
//     {
//       refreshInterval: 60000, 
//       revalidateOnFocus: true, 
//     }
//   );

//   const allStations: UbikeStation[] = data?.stations || [];

//   const filteredStations = useMemo(() => {
//     if (selectedArea === "All Areas") return allStations;
//     return allStations.filter((s) => s.locationEn === selectedArea);
//   }, [allStations, selectedArea]);

//   const dynamicAreas = useMemo(() => {
//     const uniqueAreas = Array.from(
//       new Set(allStations.map((s) => s.locationEn))
//     );
//     return ["All Areas", ...uniqueAreas];
//   }, [allStations]);

//   const currentStation = useMemo(() => {
//     return allStations.find((s) => s.uid === selectedStationId) || null;
//   }, [allStations, selectedStationId]);

//   const translateStatus = (status: string) => {
//     switch (status) {
//       case "正常":
//         return "Normal";
//       case "停止營運":
//         return "Closed";
//       case "暫停營運":
//         return "Suspended";
//       default:
//         return status; 
//     }
//   };

//   const handleOpenMap = () => {
//     if (currentStation) {
//       // 順手修復了這裡原本漏掉的 $ 符號
//       window.open(
//         `https://www.google.com/maps/search/?api=1&query=$$${currentStation.latitude},${currentStation.longitude}`,
//         "_blank"
//       );
//     }
//   };

//   return (
//     // 🔴 調整了最外層的響應式 Padding (p-4 md:p-8)
//     <div className="w-full h-full bg-white rounded-3xl p-4 md:p-8 pt-16 md:pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//       {/* --- Header --- */}
//       <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>
        
//         <div>
//           <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">
//             Ubike 2.0
//           </div>
//           <div className="text-base md:text-lg font-bold text-gray-800">
//             Real-time Availability
//           </div>
//         </div>
//       </div>

//       {/* --- Intro --- */}
//       <div className="mb-6 md:mb-8">
//         <p className="text-xs md:text-sm text-gray-500">
//           Access live data for bike rentals and parking spaces around the
//           university.
//         </p>
//       </div>

//       {/* --- Selectors --- */}
//       <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8">
        
//         {/* Area Selector */}
//         <div className="flex-1 relative">
//           <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">
//             Region
//           </label>
//           <button
//             onClick={() => {
//               setIsAreaOpen(!isAreaOpen);
//               setIsStationOpen(false);
//             }}
//             className="w-full text-left px-3 md:px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center"
//           >
//             <span className="font-bold text-gray-800 text-sm md:text-base truncate">{selectedArea}</span>
//             <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-2" />
//           </button>

//           <AnimatePresence>
//             {isAreaOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
//               >
//                 {dynamicAreas.map((area) => (
//                   <button
//                     key={area}
//                     onClick={() => {
//                       updateUrlState(area, null); 
//                       setIsAreaOpen(false);
//                     }}
//                     className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600"
//                   >
//                     {area}
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Station Selector */}
//         <div className="flex-1 relative">
//           <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">
//             Station Name
//           </label>
//           <button
//             onClick={() => {
//               setIsStationOpen(!isStationOpen);
//               setIsAreaOpen(false);
//             }}
//             disabled={isLoading}
//             className="w-full text-left px-3 md:px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center disabled:opacity-50"
//           >
//             <span
//               className={`font-bold text-sm md:text-base truncate ${currentStation ? "text-gray-800" : "text-gray-400"}`}
//             >
//               {currentStation?.nameEn ||
//                 (isLoading ? "Loading..." : "Choose a Station")}
//             </span>
//             <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-2" />
//           </button>

//           <AnimatePresence>
//             {isStationOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
//               >
//                 {filteredStations.map((station) => (
//                   <button
//                     key={station.uid}
//                     onClick={() => {
//                       updateUrlState(selectedArea, station.uid); 
//                       setIsStationOpen(false);
//                     }}
//                     className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600 border-b border-gray-50 last:border-0"
//                   >
//                     {station.nameEn}
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* --- Info Card --- */}
//       <AnimatePresence mode="wait">
//         {currentStation ? (
//           <motion.div
//             key={currentStation.uid}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="bg-gray-50 rounded-3xl p-5 md:p-6 border border-gray-100"
//           >
//             <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
//               <div className="flex-1">
//                 <div className="mb-6">
//                   <h3 className="text-sm md:text-lg font-bold text-gray-400 uppercase tracking-wider mb-1 md:mb-2">
//                     Station Details :
//                   </h3>
//                   <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
//                     {currentStation.nameEn}
//                   </div>
//                   <div className="flex items-start gap-2 text-xs md:text-sm text-gray-500 font-medium">
//                     <MapPin
//                       size={16}
//                       className="mt-0.5 shrink-0 text-emerald-500"
//                     />
//                     {currentStation.locationEn}
//                   </div>
//                 </div>

//                 {/* 🔴 數據方塊優化：調整 gap, padding，並給予動態字體大小防破版 */}
//                 <div className="grid grid-cols-3 gap-2 md:gap-3">
//                   <div className="bg-white p-2 md:p-3 rounded-xl text-center border border-gray-200 flex flex-col justify-center">
//                     <div className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase mb-1">
//                       Status
//                     </div>
//                     {/* 使用 tracking-tighter 與動態文字大小，避免 Suspended 爆版 */}
//                     <div className="text-[13px] md:text-xl font-black text-gray-700 tracking-tighter leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
//                       {translateStatus(currentStation.status)}
//                     </div>
//                   </div>
//                   <div className="bg-emerald-500 p-2 md:p-3 rounded-xl text-center border border-emerald-600 shadow-sm flex flex-col justify-center">
//                     <div className="text-[9px] md:text-[10px] text-emerald-50 font-bold uppercase mb-1">
//                       Available
//                     </div>
//                     <div className="text-lg md:text-xl font-black text-white leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
//                       {currentStation.rentBikes}
//                     </div>
//                   </div>
//                   <div className="bg-white p-2 md:p-3 rounded-xl text-center border border-gray-200 flex flex-col justify-center">
//                     <div className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase mb-1">
//                       Empty
//                     </div>
//                     <div className="text-lg md:text-xl font-black text-gray-400 leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
//                       {currentStation.returnDocks}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full lg:w-1/3 aspect-video lg:aspect-auto flex-shrink-0">
//                 <button
//                   onClick={handleOpenMap}
//                   className="w-full h-full min-h-[140px] md:min-h-[160px] rounded-2xl bg-gray-200 border-2 border-white shadow-sm overflow-hidden relative group"
//                 >
//                   <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i15!2i26392!3i13632!2m3!1e0!2sm!3i604115147!3m8!2szh-TW!3stn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
//                     <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md mb-2 text-emerald-500">
//                       <MapPin size={18} fill="currentColor" className="md:w-5 md:h-5" />
//                     </div>
//                     <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
//                       Navigation <ExternalLink size={10} />
//                     </span>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-16 md:py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
//             <Bike size={40} className="text-gray-200 mb-3 md:mb-4 md:w-12 md:h-12" />
//             <p className="text-xs md:text-sm text-gray-400 font-medium text-center px-4">
//               Please select a station to view real-time data
//             </p>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import {
  ArrowLeft,
  MapPin,
  ChevronDown,
  ExternalLink,
  Bike,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 資料結構 ---
interface UbikeStation {
  uid: string; 
  name: string; 
  nameEn: string; 
  locationEn: string; 
  rentBikes: number; 
  returnDocks: number; 
  status: string; 
  latitude: number;
  longitude: number;
}

interface UbikeDetailProps {
  onBack: () => void;
}

// --- 定義 SWR Fetcher ---
const fetcher = async (url: string) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    console.warn(`Server error ${res.status}: API might be down or out of service.`);
    return { stations: [] };
  }
  return res.json();
};

export default function UbikeDetail({ onBack }: UbikeDetailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedArea = searchParams.get("area") || "All Areas";
  const selectedStationId = searchParams.get("station");

  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isStationOpen, setIsStationOpen] = useState(false);

  const updateUrlState = (area: string, stationId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("area", area);
    if (stationId) {
      params.set("station", stationId);
    } else {
      params.delete("station");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const { data, isLoading } = useSWR(
    `https://campus-ai-backend-1.onrender.com/api/traffic/ubike`,
    fetcher,
    {
      refreshInterval: 60000, 
      revalidateOnFocus: true, 
    }
  );

  const allStations: UbikeStation[] = data?.stations || [];

  const filteredStations = useMemo(() => {
    if (selectedArea === "All Areas") return allStations;
    return allStations.filter((s) => s.locationEn === selectedArea);
  }, [allStations, selectedArea]);

  const dynamicAreas = useMemo(() => {
    const uniqueAreas = Array.from(
      new Set(allStations.map((s) => s.locationEn))
    );
    return ["All Areas", ...uniqueAreas];
  }, [allStations]);

  const currentStation = useMemo(() => {
    return allStations.find((s) => s.uid === selectedStationId) || null;
  }, [allStations, selectedStationId]);

  const translateStatus = (status: string) => {
    switch (status) {
      case "正常":
        return "Normal";
      case "停止營運":
        return "Closed";
      case "暫停營運":
        return "Suspended";
      default:
        return status; 
    }
  };

  const handleOpenMap = () => {
    if (currentStation) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=$$$${currentStation.latitude},${currentStation.longitude}`,
        "_blank"
      );
    }
  };

  return (
    // 【背板指定】大面板底色修改為 bg-[#fffdf8]，換上米灰邊框與手帳暖陰影
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] p-4 md:p-8 pt-8 md:pt-8 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* --- Header --- */}
      {/* 將原本的冷灰實線換成筆記本虛線分隔條 */}
      <div className="flex items-center gap-4 mb-6 border-b-2 border-dashed border-[#eadfce]/60 pb-4">
        <button
          onClick={onBack}
          // 返回按鈕同步換成精跡紙質標籤外觀
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fffefb] border border-[#eadfce] text-gray-600 font-bold text-sm shadow-sm hover:shadow-md hover:text-emerald-700 hover:bg-[#fbf8f1] transition-all"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        
        <div>
          <div className="text-[10px] md:text-xs text-[#6f7b76] font-bold uppercase tracking-wider">
            Ubike 2.0
          </div>
          <div className="text-base md:text-lg font-bold text-gray-800">
            Real-time Availability
          </div>
        </div>
      </div>

      {/* --- Intro --- */}
      <div className="mb-6 md:mb-8">
        <p className="text-xs md:text-sm text-[#6f7b76] font-medium">
          Access live data for bike rentals and parking spaces around the
          university.
        </p>
      </div>

      {/* --- Selectors --- */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8">
        
        {/* Area Selector */}
        <div className="flex-1 relative">
          <label className="text-[10px] md:text-xs font-bold text-[#6f7b76] uppercase mb-1 block pl-1 tracking-wide">
            Region
          </label>
          <button
            onClick={() => {
              setIsAreaOpen(!isAreaOpen);
              setIsStationOpen(false);
            }}
            // 下拉選擇按鈕更換為卡片指定的 #fffefb 底色與米灰邊框
            className="w-full text-left px-3 md:px-4 py-3 rounded-xl border border-[#eadfce] bg-[#fffefb] flex justify-between items-center shadow-sm hover:border-emerald-400 transition-colors"
          >
            <span className="font-bold text-gray-800 text-sm md:text-base truncate">{selectedArea}</span>
            <ChevronDown size={18} className="text-[#6f7b76] flex-shrink-0 ml-2" />
          </button>

          <AnimatePresence>
            {isAreaOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#fffefb] border border-[#eadfce] rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
              >
                {dynamicAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      updateUrlState(area, null); 
                      setIsAreaOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-700 text-sm font-bold text-[#6f7b76] transition-colors border-b border-[#eadfce]/30 last:border-0"
                  >
                    {area}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Station Selector */}
        <div className="flex-1 relative">
          <label className="text-[10px] md:text-xs font-bold text-[#6f7b76] uppercase mb-1 block pl-1 tracking-wide">
            Station Name
          </label>
          <button
            onClick={() => {
              setIsStationOpen(!isStationOpen);
              setIsAreaOpen(false);
            }}
            disabled={isLoading}
            // 同步更換為卡片指定的 #fffefb 底色與米灰邊框
            className="w-full text-left px-3 md:px-4 py-3 rounded-xl border border-[#eadfce] bg-[#fffefb] flex justify-between items-center disabled:opacity-50 shadow-sm hover:border-emerald-400 transition-colors"
          >
            <span
              className={`font-bold text-sm md:text-base truncate ${currentStation ? "text-gray-800" : "text-gray-400"}`}
            >
              {currentStation?.nameEn ||
                (isLoading ? "Loading..." : "Choose a Station")}
            </span>
            <ChevronDown size={18} className="text-[#6f7b76] flex-shrink-0 ml-2" />
          </button>

          <AnimatePresence>
            {isStationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#fffefb] border border-[#eadfce] rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
              >
                {filteredStations.map((station) => (
                  <button
                    key={station.uid}
                    onClick={() => {
                      updateUrlState(selectedArea, station.uid); 
                      setIsStationOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-700 text-sm font-bold text-[#6f7b76] border-b border-[#eadfce]/30 last:border-0 transition-colors"
                  >
                    {station.nameEn}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Info Card --- */}
      <AnimatePresence mode="wait">
        {currentStation ? (
          <motion.div
            key={currentStation.uid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            // 【卡片指定】詳細資訊面板底色修改為 bg-[#fffefb]，配上米灰框線與暖色調淡陰影
            className="bg-[#fffefb] rounded-3xl p-5 md:p-6 border border-[#eadfce] shadow-sm"
          >
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-sm md:text-lg font-bold text-[#6f7b76] uppercase tracking-wider mb-1 md:mb-2">
                    Station Details :
                  </h3>
                  <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                    {currentStation.nameEn}
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm text-[#6f7b76] font-medium">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    {currentStation.locationEn}
                  </div>
                </div>

                {/* 數據方塊 */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {/* Status 卡片：換成微黃背板底色 #fffdf8 */}
                  <div className="bg-[#fffdf8] p-2 md:p-3 rounded-xl text-center border border-[#eadfce] flex flex-col justify-center">
                    <div className="text-[9px] md:text-[10px] text-[#6f7b76] font-bold uppercase mb-1">
                      Status
                    </div>
                    <div className="text-[13px] md:text-xl font-black text-gray-700 tracking-tighter leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
                      {translateStatus(currentStation.status)}
                    </div>
                  </div>
                  
                  {/* Available 卡片：維持高對比功能主色調不變 */}
                  <div className="bg-emerald-500 p-2 md:p-3 rounded-xl text-center border border-emerald-600 shadow-sm flex flex-col justify-center">
                    <div className="text-[9px] md:text-[10px] text-emerald-50 font-bold uppercase mb-1">
                      Available
                    </div>
                    <div className="text-lg md:text-xl font-black text-white leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
                      {currentStation.rentBikes}
                    </div>
                  </div>
                  
                  {/* Empty 卡片：換成微黃背板底色 #fffdf8 */}
                  <div className="bg-[#fffdf8] p-2 md:p-3 rounded-xl text-center border border-[#eadfce] flex flex-col justify-center">
                    <div className="text-[9px] md:text-[10px] text-[#6f7b76] font-bold uppercase mb-1">
                      Empty
                    </div>
                    <div className="text-lg md:text-xl font-black text-gray-400 leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
                      {currentStation.returnDocks}
                    </div>
                  </div>
                </div>
              </div>

              {/* 地圖導航小卡片換膚 */}
              <div className="w-full lg:w-1/3 aspect-video lg:aspect-auto flex-shrink-0">
                <button
                  onClick={handleOpenMap}
                  className="w-full h-full min-h-[140px] md:min-h-[160px] rounded-2xl bg-[#fbf8f1] border border-[#eadfce] shadow-sm overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i15!2i26392!3i13632!2m3!1e0!2sm!3i604115147!3m8!2szh-TW!3stn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full border border-[#eadfce]/40 flex items-center justify-center shadow-md mb-2 text-emerald-600">
                      <MapPin size={18} fill="currentColor" className="md:w-5 md:h-5" />
                    </div>
                    {/* 按鈕標籤貼紙化 */}
                    <span className="bg-[#fffefb] border border-[#eadfce] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1 group-hover:bg-[#fbf8f1] transition-colors">
                      Navigation <ExternalLink size={10} />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          // 未選擇站點時的防呆提示區塊：【卡片指定】底色修改為 bg-[#fffefb] 與米灰虛線外框
          <div className="flex flex-col items-center justify-center py-16 md:py-20 bg-[#fffefb] rounded-3xl border-2 border-dashed border-[#eadfce] shadow-inner">
            <Bike size={40} className="text-[#eadfce] mb-3 md:mb-4 md:w-12 md:h-12" />
            <p className="text-xs md:text-sm text-[#6f7b76] font-bold text-center px-4 tracking-wide">
              Please select a station to view real-time data
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}