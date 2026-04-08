

// "use client";
// import { useState, useRef } from "react";
// import { MapPin, Phone, ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { medicalData, hospitalData, ClinicCategory, Clinic } from "../../Data/Medical";

// const HOSPITALS_CATEGORY = hospitalData;
// const CLINICS_DATA = medicalData;

// export default function Healthcare() {
//   const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

//   return (
//     <div className="w-full bg-white rounded-3xl p-6 md:p-6 shadow-sm flex flex-col">
//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Campus Healthcare</h2>
//         <p className="text-sm text-gray-500 mt-1">
//           Contracted clinics and hospitals nearby. Click on a card to open Google Maps.
//         </p>
//       </div>

//       <div className="flex flex-col gap-10 flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
//         <ClinicRow category={HOSPITALS_CATEGORY} />

//         <div className="flex flex-col gap-4">
//           <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-1">
//             <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1 mr-2 flex-shrink-0"></div>
//             {CLINICS_DATA.map((cat, index) => {
//               const isActive = selectedCategoryIndex === index;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedCategoryIndex(index)}
//                   className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
//                     isActive
//                       ? "bg-emerald-500 text-white border-emerald-500 shadow-md transform scale-105"
//                       : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
//                   }`}
//                 >
//                   {cat.title}
//                 </button>
//               );
//             })}
//           </div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selectedCategoryIndex}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//             >
//               <ClinicRow
//                 category={CLINICS_DATA[selectedCategoryIndex]}
//                 hideDefaultTitle={true}
//                 customTitle={CLINICS_DATA[selectedCategoryIndex].fullTitle}
//               />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ClinicRow({
//   category,
//   hideDefaultTitle = false,
//   customTitle,
// }: {
//   category: ClinicCategory;
//   hideDefaultTitle?: boolean;
//   customTitle?: string;
// }) {
//   const rowRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (rowRef.current) {
//       const scrollAmount = 420;
//       rowRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleCardClick = (clinic: Clinic) => {
//     const query = `${clinic.name} ${clinic.address}`;
//     const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div className="flex flex-col gap-4 relative group/row">
//       {!hideDefaultTitle && (
//         <div className="flex items-center gap-2 px-1">
//           <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1"></div>
//           <h3 className="text-lg font-bold text-gray-800">【 {category.fullTitle} 】</h3>
//         </div>
//       )}

//       {hideDefaultTitle && customTitle && (
//         <div className="px-2 text-sm text-gray-400 font-bold flex items-center gap-2">
//           <Stethoscope size={14} />
//           {customTitle}
//         </div>
//       )}

//       <div className="absolute top-[60%] -translate-y-1/2 left-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
//         <button
//           onClick={() => scroll("left")}
//           className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -ml-3"
//         >
//           <ChevronLeft size={24} />
//         </button>
//       </div>

//       <div className="absolute top-[60%] -translate-y-1/2 right-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
//         <button
//           onClick={() => scroll("right")}
//           className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -mr-3"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       <div ref={rowRef} className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar scroll-smooth">
//         {category.clinics.map((clinic) => (
//           <div
//             key={clinic.id}
//             onClick={() => handleCardClick(clinic)}
//             className="flex-shrink-0 w-[400px] bg-gray-50 p-5 rounded-2xl border border-gray-100 flex gap-5 items-start hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all select-none cursor-pointer active:scale-95"
//             title="Click to view on Google Maps"
//           >


//             <div className="flex-1 min-w-0">
//               <h4 className="font-bold text-gray-800 text-lg truncate mb-1">{clinic.name}</h4>
//               <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed h-10">{clinic.desc}</p>

//               <div className="space-y-1.5">
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <Phone size={14} className="shrink-0 text-emerald-600" />
//                   <span className="truncate font-medium">{clinic.contact}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <MapPin size={14} className="shrink-0 text-emerald-600" />
//                   <span className="truncate">{clinic.address}</span>
//                 </div>
//               </div>

//               <div className="mt-4 flex justify-between items-center">
//                 <span className="inline-block bg-white border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-md font-bold tracking-wide">
//                   {clinic.tag}
//                 </span>
//                 <span className="text-xs text-emerald-500 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                   Open Map <ChevronRight size={12} />
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="w-2 flex-shrink-0"></div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useRef } from "react";
import { MapPin, Phone, ChevronLeft, ChevronRight, Stethoscope, BadgeDollarSign, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// 確保路徑正確指向你更新後的真資料
import { medicalData, hospitalData } from "../../Data/Medical";

// 1. 定義符合新格式的型別
export interface ClinicData {
  id: string;
  label: string;
  data: {
    name: string;
    fare: string;
    contact: string;
    address: string;
    tags: string[]; 
    distance: string;
  };
}

interface ClinicCategory {
  title: string;
  fullTitle: string;
  clinics: ClinicData[];
}

// 修正重點：移除 Props 定義，改為直接在組件內存取匯入的資料
export default function Healthcare() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  // 直接使用從 Medical 匯入的資料，避免 undefined
  const CLINICS_DATA = medicalData;
  const HOSPITALS_CATEGORY = hospitalData;

  // 增加保護機制：如果資料沒抓到，回傳 loading 或空，不讓程式崩潰
  if (!CLINICS_DATA || CLINICS_DATA.length === 0) {
    return <div className="p-10 text-center text-gray-400">Loading Healthcare Data...</div>;
  }

  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-sm flex flex-col">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Campus Healthcare</h2>
        <p className="text-sm text-gray-500 mt-1">
          Contracted clinics and hospitals nearby. Click on a card to open Google Maps.
        </p>
      </div>

      <div className="flex flex-col gap-10 flex-1 overflow-y-auto pr-2 no-scrollbar pb-10">
        {/* 醫院區塊 */}
        {HOSPITALS_CATEGORY && <ClinicRow category={HOSPITALS_CATEGORY} />}

        {/* 診所分類切換區塊 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-1">
            <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1 mr-2 flex-shrink-0"></div>
            {CLINICS_DATA.map((cat, index) => {
              const isActive = selectedCategoryIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategoryIndex(index)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                    isActive
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-md transform scale-105"
                      : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategoryIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {CLINICS_DATA[selectedCategoryIndex] && (
                <ClinicRow
                  category={CLINICS_DATA[selectedCategoryIndex]}
                  hideDefaultTitle={true}
                  customTitle={CLINICS_DATA[selectedCategoryIndex].fullTitle}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ClinicRow 組件保持不變
function ClinicRow({
  category,
  hideDefaultTitle = false,
  customTitle,
}: {
  category: ClinicCategory;
  hideDefaultTitle?: boolean;
  customTitle?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = 420;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (clinic: ClinicData) => {
    const query = `${clinic.data.name} ${clinic.data.address}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4 relative group/row">
      {!hideDefaultTitle && (
        <div className="flex items-center gap-2 px-1">
          <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1"></div>
          <h3 className="text-lg font-bold text-gray-800">【 {category.fullTitle} 】</h3>
        </div>
      )}

      {hideDefaultTitle && customTitle && (
        <div className="px-2 text-sm text-gray-400 font-bold flex items-center gap-2">
          <Stethoscope size={14} />
          {customTitle}
        </div>
      )}

      <div className="absolute top-[60%] -translate-y-1/2 left-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button onClick={() => scroll("left")} className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -ml-3">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute top-[60%] -translate-y-1/2 right-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button onClick={() => scroll("right")} className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -mr-3">
          <ChevronRight size={24} />
        </button>
      </div>

      <div ref={rowRef} className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar scroll-smooth">
        {category.clinics.map((clinic) => {
          const { data } = clinic;
          return (
            <div
              key={clinic.id}
              onClick={() => handleCardClick(clinic)}
              className="flex-shrink-0 w-[380px] bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all select-none cursor-pointer active:scale-95 group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                  {data.tags[0]}
                </span>
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                  <Navigation size={12} />
                  {data.distance}
                </div>
              </div>

              <h4 className="font-bold text-gray-800 text-xl truncate mb-4">{data.name}</h4>

              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={16} className="shrink-0 text-emerald-500" />
                  <span className="font-medium">{data.contact}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin size={16} className="shrink-0 text-emerald-500 mt-0.5" />
                  <span className="line-clamp-1">{data.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <BadgeDollarSign size={16} className="shrink-0 text-emerald-500" />
                  <span>{data.fare}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200/60 flex justify-between items-center">
                <div className="flex gap-1.5">
                  {data.tags.slice(1).map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-gray-200/50 text-gray-500 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                  View Map <ChevronRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
        <div className="w-2 flex-shrink-0"></div>
      </div>
    </div>
  );
}