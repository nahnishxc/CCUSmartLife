
// // "use client";
// // import { useState, useRef, useEffect } from "react";
// // import {
// //   MapPin,
// //   Clock,
// //   Phone,
// //   ChevronLeft,
// //   ChevronRight,
// //   Stethoscope,
// //   BadgeDollarSign,
// //   Navigation,
// // } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";

// // // 1. 定義符合新格式的型別
// // export interface ClinicData {
// //   id: string;
// //   label: string;
// //   data: {
// //     name: string;
// //     fare: string;
// //     contact: string;
// //     address: string;
// //     tags: string[];
// //     distance: string;
// //   };
// // }

// // interface ClinicCategory {
// //   title: string;
// //   fullTitle: string;
// //   clinics: ClinicData[];
// // }
// // export default function Healthcare() {
// //   const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
// //   const [clinicsData, setClinicsData] = useState<ClinicCategory[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchHealthcareData = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await fetch(
// //           "https://campus-ai-backend-1.onrender.com/api/campus/clinic",
// //         );
// //         const json = await response.json();

// //         const rawItems = Array.isArray(json)
// //           ? json
// //           : json.data || json.clinics || [];
// //         if (rawItems.length === 0) {
// //           setClinicsData([]);
// //           return;
// //         }

// //         const categoriesMap: { [key: string]: ClinicData[] } = {};

// //         rawItems.forEach((item: any) => {
// //           const formattedItem: ClinicData = {
// //             id: item._id || item.id || Math.random().toString(),
// //             label: item.type || "General",
// //             data: {
// //               name: item.name || "未提供名稱",
// //               fare: item.fare || "現場洽詢",
// //               contact: item.contact || item.phone || "無電話",
// //               address: item.address || "無地址",
// //               tags: Array.isArray(item.tags)
// //                 ? item.tags
// //                 : [item.category || "一般"],
// //               distance: item.distance || "距離確認中",
// //             },
// //           };

// //           const mainTag = formattedItem.data.tags[0] || "其他";
// //           if (!categoriesMap[mainTag]) categoriesMap[mainTag] = [];
// //           categoriesMap[mainTag].push(formattedItem);
// //         }); // --- 排序邏輯實作 ---

// //         const transformedData = Object.keys(categoriesMap).map((key) => {
// //           // 對該分類下的診所進行排序
// //           const sortedClinics = categoriesMap[key].sort((a, b) => {
// //             // 提取分鐘數字，例如從 "around 17 mins from CCU" 提取 17
// //             const getTime = (distStr: string) => {
// //               const match = distStr.match(/(\d+)\s*mins/);
// //               return match ? parseInt(match[1], 10) : 999; // 若無時間資訊則排到最後
// //             };
// //             return getTime(a.data.distance) - getTime(b.data.distance);
// //           });

// //           return {
// //             title: key,
// //             fullTitle: key,
// //             clinics: sortedClinics,
// //           };
// //         });

// //         setClinicsData(transformedData);
// //       } catch (error) {
// //         console.error("抓取失敗:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHealthcareData();
// //   }, []);

// //   if (loading)
// //     return (
// //       <div className="p-10 text-center text-gray-400">
// //         Loading Healthcare Data...
// //       </div>
// //     );
// //   if (clinicsData.length === 0)
// //     return (
// //       <div className="p-10 text-center text-gray-400">No Data Available</div>
// //     );

// //   // --- 重點修改：過濾掉 General Practice 診所選單 ---
// //   const filteredCategories = clinicsData.filter(
// //     (cat) => cat.title !== "General Practice",
// //   );
// //   // 找到原本的醫院資料 (作為固定顯示)
// //   const hospitalCategory = clinicsData.find(
// //     (cat) => cat.title === "General Practice",
// //   );




// // "use client";
// // import { useState, useRef, useMemo } from "react";
// // import useSWR from "swr";
// // import {
// //   MapPin,
// //   Clock,
// //   Phone,
// //   ChevronLeft,
// //   ChevronRight,
// //   Stethoscope,
// //   BadgeDollarSign,
// //   Navigation,
// // } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";

// // // 1. 定義符合新格式的型別
// // export interface ClinicData {
// //   id: string;
// //   label: string;
// //   data: {
// //     name: string;
// //     fare: string;
// //     contact: string;
// //     address: string;
// //     tags: string[];
// //     distance: string;
// //   };
// // }

// // interface ClinicCategory {
// //   title: string;
// //   fullTitle: string;
// //   clinics: ClinicData[];
// // }

// // // SWR 共用 Fetcher
// // const fetcher = (url: string) => fetch(url).then((res) => {
// //   if (!res.ok) throw new Error("Network response was not ok");
// //   return res.json();
// // });

// // export default function Healthcare() {
// //   // 客戶端狀態 (維持不變)
// //   const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

// //   // SWR 資料抓取
// //   const apiUrl = "https://campus-ai-backend-1.onrender.com/api/campus/clinic";
// //   const { data: rawData, error, isLoading } = useSWR(apiUrl, fetcher, {
// //     revalidateOnFocus: true,
// //     dedupingInterval: 5000,
// //   });

// //   // 使用 useMemo 將繁雜的資料處理邏輯包起來，只要 rawData 更新才重算
// //   const { clinicsData, filteredCategories, hospitalCategory } = useMemo(() => {
// //     if (!rawData) {
// //       return { clinicsData: [], filteredCategories: [], hospitalCategory: undefined };
// //     }

// //     const rawItems = Array.isArray(rawData)
// //       ? rawData
// //       : rawData.data || rawData.clinics || [];
      
// //     if (rawItems.length === 0) {
// //       return { clinicsData: [], filteredCategories: [], hospitalCategory: undefined };
// //     }

// //     const categoriesMap: { [key: string]: ClinicData[] } = {};

// //     rawItems.forEach((item: any) => {
// //       const formattedItem: ClinicData = {
// //         id: item._id || item.id || Math.random().toString(),
// //         label: item.type || "General",
// //         data: {
// //           name: item.name || "未提供名稱",
// //           fare: item.fare || "現場洽詢",
// //           contact: item.contact || item.phone || "無電話",
// //           address: item.address || "無地址",
// //           tags: Array.isArray(item.tags)
// //             ? item.tags
// //             : [item.category || "一般"],
// //           distance: item.distance || "距離確認中",
// //         },
// //       };

// //       const mainTag = formattedItem.data.tags[0] || "其他";
// //       if (!categoriesMap[mainTag]) categoriesMap[mainTag] = [];
// //       categoriesMap[mainTag].push(formattedItem);
// //     });

// //     // --- 排序邏輯實作 ---
// //     const transformedData = Object.keys(categoriesMap).map((key) => {
// //       const sortedClinics = categoriesMap[key].sort((a, b) => {
// //         const getTime = (distStr: string) => {
// //           const match = distStr.match(/(\d+)\s*mins/);
// //           return match ? parseInt(match[1], 10) : 999;
// //         };
// //         return getTime(a.data.distance) - getTime(b.data.distance);
// //       });

// //       return {
// //         title: key,
// //         fullTitle: key,
// //         clinics: sortedClinics,
// //       };
// //     });

// //     // 過濾出 一般診所 與 醫院
// //     const filtered = transformedData.filter((cat) => cat.title !== "General Practice");
// //     const hospital = transformedData.find((cat) => cat.title === "General Practice");

// //     return { 
// //       clinicsData: transformedData, 
// //       filteredCategories: filtered, 
// //       hospitalCategory: hospital 
// //     };
// //   }, [rawData]);

// //   // --- 狀態處理畫面 ---
// //   if (isLoading && clinicsData.length === 0) {
// //     return (
// //       <div className="p-10 text-center text-gray-400">
// //         Loading Healthcare Data...
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-10 text-center text-red-400">
// //         Failed to load healthcare data.
// //       </div>
// //     );
// //   }

// //   if (clinicsData.length === 0 && !isLoading) {
// //     return (
// //       <div className="p-10 text-center text-gray-400">No Data Available</div>
// //     );
// //   }

// //   return (
// //     <div className="w-full bg-white rounded-3xl p-6 shadow-sm flex flex-col">
// //       <style jsx global>{`
// //         .no-scrollbar::-webkit-scrollbar {
// //           display: none;
// //         }
// //         .no-scrollbar {
// //           -ms-overflow-style: none;
// //           scrollbar-width: none;
// //         }
// //       `}</style>

// //       <div className="mb-6">
// //         <h2 className="text-2xl font-bold text-gray-800">Campus Healthcare</h2>
// //         <p className="text-m text-gray-500 mt-1">
// //           Contracted clinics and hospitals nearby. Click on a card to open
// //           Google Maps.
// //         </p>
// //       </div>

// //       <div className="flex flex-col gap-10 flex-1 overflow-y-auto pr-2 no-scrollbar pb-10">
// //         {/* 固定顯示：第一區塊 - 醫院 (General Practice) */}
// //         {hospitalCategory && <ClinicRow category={hospitalCategory} />}

// //         <div className="flex flex-col gap-4">
// //           <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-1">
// //             <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1 mr-2 flex-shrink-0"></div>

// //             {/* 修改：使用過濾後的陣列來產生按鈕 */}
// //             {filteredCategories.map((cat, index) => {
// //               const isActive = selectedCategoryIndex === index;
// //               return (
// //                 <button
// //                   key={index}
// //                   onClick={() => setSelectedCategoryIndex(index)}
// //                   className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
// //                     isActive
// //                       ? "bg-emerald-500 text-white border-emerald-500 shadow-md transform scale-105"
// //                       : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
// //                   }`}
// //                 >
// //                   {cat.title}
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           <AnimatePresence mode="wait">
// //             <motion.div
// //               key={selectedCategoryIndex}
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -10 }}
// //               transition={{ duration: 0.2 }}
// //             >
// //               {/* 修改：顯示過濾後對應的診所分類 */}
// //               {filteredCategories[selectedCategoryIndex] && (
// //                 <ClinicRow
// //                   category={filteredCategories[selectedCategoryIndex]}
// //                   hideDefaultTitle={true}
// //                   customTitle={
// //                     filteredCategories[selectedCategoryIndex].fullTitle
// //                   }
// //                 />
// //               )}
// //             </motion.div>
// //           </AnimatePresence>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function ClinicRow({
// //   category,
// //   hideDefaultTitle = false,
// //   customTitle,
// // }: {
// //   category: ClinicCategory;
// //   hideDefaultTitle?: boolean;
// //   customTitle?: string;
// // }) {
// //   const rowRef = useRef<HTMLDivElement>(null);

// //   const scroll = (direction: "left" | "right") => {
// //     if (rowRef.current) {
// //       const scrollAmount = 420;
// //       rowRef.current.scrollBy({
// //         left: direction === "left" ? -scrollAmount : scrollAmount,
// //         behavior: "smooth",
// //       });
// //     }
// //   };

// //   const handleCardClick = (clinic: ClinicData) => {
// //     const query = `${clinic.data.name} ${clinic.data.address}`;
// //     // 這裡保留你原始的網址串接方式 (但修正了 $ 符號缺失的問題)
// //     const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
// //     window.open(url, "_blank");
// //   };

// //   return (
// //     <div className="flex flex-col gap-4 relative group/row">
// //       {!hideDefaultTitle && (
// //         <div className="flex items-center gap-2 px-1">
// //           <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1"></div>
// //           <h3 className="text-lg font-bold text-gray-800">
// //             【 {category.fullTitle} 】
// //           </h3>
// //         </div>
// //       )}

// //       {hideDefaultTitle && customTitle && (
// //         <div className="px-2 text-sm text-gray-400 font-bold flex items-center gap-2">
// //           <Stethoscope size={14} />
// //           {customTitle}
// //         </div>
// //       )}

// //       <div className="absolute top-[60%] -translate-y-1/2 left-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
// //         <button
// //           onClick={() => scroll("left")}
// //           className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -ml-3"
// //         >
// //           <ChevronLeft size={24} />
// //         </button>
// //       </div>

// //       <div className="absolute top-[60%] -translate-y-1/2 right-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
// //         <button
// //           onClick={() => scroll("right")}
// //           className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -mr-3"
// //         >
// //           <ChevronRight size={24} />
// //         </button>
// //       </div>

// //       <div
// //         ref={rowRef}
// //         className="flex gap-4 overflow-x-auto pt-2 pb-4 px-2 no-scrollbar scroll-smooth"
// //       >
// //         {category.clinics.map((clinic) => {
// //           const { data } = clinic;

// //           // 邏輯拆分：提取公里數與時間
// //           const kmText = data.distance.split("(")[0].trim(); // 得到 "10 km"
// //           const timeDetail = data.distance.match(/\(([^)]+)\)/)?.[1]; // 得到 "around 17 mins from CCU"

// //           return (
// //             <div
// //               key={clinic.id}
// //               onClick={() => handleCardClick(clinic)}
// //               className="flex-shrink-0 w-[380px] bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all select-none cursor-pointer active:scale-95 group"
// //             >
// //               {/* --- 上方區域：恢復簡潔，僅保留公里數 --- */}
// //               <div className="flex justify-between items-start mb-6">
// //                 <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider leading-none">
// //                   {data.tags[0]}
// //                 </span>
// //                 <div className="flex items-center gap-1 text-emerald-600 font-bold text-[11px] mt-1">
// //                   <Navigation size={12} fill="currentColor" />
// //                   {kmText}
// //                 </div>
// //               </div>

// //               {/* --- 標題與內容區：保持不變 --- */}
// //               <h4 className="font-bold text-gray-800 text-xl truncate mb-5 leading-tight">
// //                 {data.name}
// //               </h4>

// //               <div className="space-y-3 flex-1">
// //                 <div className="flex items-center gap-3 text-sm text-gray-600">
// //                   <Phone size={16} className="shrink-0 text-emerald-500" />
// //                   <span className="font-semibold">{data.contact}</span>
// //                 </div>
// //                 <div className="flex items-start gap-3 text-sm text-gray-600">
// //                   <MapPin
// //                     size={16}
// //                     className="shrink-0 text-emerald-500 mt-0.5"
// //                   />
// //                   <span className="line-clamp-1">{data.address}</span>
// //                 </div>
// //                 <div className="flex items-center gap-3 text-sm text-gray-600">
// //                   <BadgeDollarSign
// //                     size={16}
// //                     className="shrink-0 text-emerald-500"
// //                   />
// //                   <span className="font-medium">{data.fare}</span>
// //                 </div>
// //               </div>

// //               {/* --- 底部區域：將時間膠囊塞入 Tags 旁邊 --- */}
// //               <div className="mt-6 pt-4 border-t border-gray-200/60 flex justify-between items-center">
// //                 <div className="flex gap-1.5 overflow-hidden items-center">
// //                   {/* 新增的時間膠囊 */}
// //                   {timeDetail && (
// //                     <div className="flex items-center gap-1 text-[10px] bg-white text-emerald-600 px-2 py-1 rounded-md border border-emerald-100 shadow-sm font-bold whitespace-nowrap">
// //                       <Clock size={10} />
// //                       {
// //                         timeDetail.replace(
// //                           "around ",
// //                           "",
// //                         ) /* 縮短文字，去掉預設的 around */
// //                       }
// //                     </div>
// //                   )}
// //                   {/* 原本的其他標籤 */}
// //                   {data.tags.slice(1).map((tag, idx) => (
// //                     <span
// //                       key={idx}
// //                       className="text-[10px] bg-gray-200/50 text-gray-500 px-2 py-1 rounded-md font-medium whitespace-nowrap"
// //                     >
// //                       {tag}
// //                     </span>
// //                   ))}
// //                 </div>

// //                 <span className="text-xs text-emerald-500 font-bold flex items-center gap-1 shrink-0 ml-2">
// //                   View Map <ChevronRight size={12} />
// //                 </span>
// //               </div>
// //             </div>
// //           );
// //         })}
// //         <div className="w-2 flex-shrink-0"></div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";
// import { useState, useRef, useMemo, useEffect, Suspense } from "react";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import useSWR from "swr";
// import {
//   MapPin,
//   Clock,
//   Phone,
//   ChevronLeft,
//   ChevronRight,
//   Stethoscope,
//   BadgeDollarSign,
//   Navigation,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";



// // 1. 定義型別 (保持不變)
// export interface ClinicData {
//   id: string;
//   label: string;
//   data: {
//     name: string;
//     fare: string;
//     contact: string;
//     address: string;
//     tags: string[];
//     distance: string;
//   };
// }

// interface ClinicCategory {
//   title: string;
//   fullTitle: string;
//   clinics: ClinicData[];
// }

// const fetcher = (url: string) => fetch(url).then((res) => {
//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// });

// function HealthcareContent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const activeType = searchParams.get("type");

//   // --- 【SWR 資料抓取 + 建議加入 Fallback】 ---
//   const apiUrl = "https://campus-ai-backend-1.onrender.com/api/campus/clinic";
//   const { data: rawData, error, isLoading } = useSWR(apiUrl, fetcher, {
//     revalidateOnFocus: true,
//     dedupingInterval: 5000,
//     // fallbackData: CLINIC_DATA, // 👈 如果你有本地資料，請取消這行註解
//   });

//   const { filteredCategories, hospitalCategory } = useMemo(() => {
//     // 這裡確保即便 rawData 是空的，我們也會回傳結構正確的空陣列，避免畫面崩潰
//     if (!rawData) return { filteredCategories: [], hospitalCategory: undefined };

//     const rawItems = Array.isArray(rawData) ? rawData : rawData.data || rawData.clinics || [];
//     if (rawItems.length === 0) return { filteredCategories: [], hospitalCategory: undefined };

//     const categoriesMap: { [key: string]: ClinicData[] } = {};

//     rawItems.forEach((item: any) => {
//       const formattedItem: ClinicData = {
//         id: item._id || item.id || Math.random().toString(),
//         label: item.type || "General",
//         data: {
//           name: item.name || "未提供名稱",
//           fare: item.fare || "現場洽詢",
//           contact: item.contact || item.phone || "無電話",
//           address: item.address || "無地址",
//           tags: Array.isArray(item.tags) ? item.tags : [item.category || "一般"],
//           distance: item.distance || "距離確認中",
//         },
//       };

//       const mainTag = formattedItem.data.tags[0] || "其他";
//       if (!categoriesMap[mainTag]) categoriesMap[mainTag] = [];
//       categoriesMap[mainTag].push(formattedItem);
//     });

//     const transformedData = Object.keys(categoriesMap).map((key) => {
//       const sortedClinics = categoriesMap[key].sort((a, b) => {
//         const getTime = (distStr: string) => {
//           const match = distStr.match(/(\d+)\s*mins/);
//           return match ? parseInt(match[1], 10) : 999;
//         };
//         return getTime(a.data.distance) - getTime(b.data.distance);
//       });

//       return { title: key, fullTitle: key, clinics: sortedClinics };
//     });

//     return { 
//       filteredCategories: transformedData.filter((cat) => cat.title !== "General Practice"), 
//       hospitalCategory: transformedData.find((cat) => cat.title === "General Practice") 
//     };
//   }, [rawData]);

//   const selectedCategoryIndex = useMemo(() => {
//     if (!activeType) return 0;
//     const index = filteredCategories.findIndex(cat => cat.title === activeType);
//     return index === -1 ? 0 : index;
//   }, [filteredCategories, activeType]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [activeType]);

//   const switchCategory = (title: string) => {
//     router.push(`?type=${encodeURIComponent(title)}`);
//   };

//   // --- 狀態處理 (優化：如果已有快取或本地資料，就不要顯示全螢幕 Loading) ---
//   if (isLoading && filteredCategories.length === 0) {
//     return (
//       <div className="w-full h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mb-4"></div>
//         <p className="text-gray-400 font-medium">Updating Healthcare Data...</p>
//       </div>
//     );
//   }

//   // 如果真的完全沒資料（API 爆掉且沒本地資料）
//   if (filteredCategories.length === 0 && !isLoading) {
//     return (
//       <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
//         <Stethoscope className="mx-auto text-gray-300 mb-4" size={48} />
//         <p className="text-gray-400">Healthcare information is currently unavailable.</p>
//         <button onClick={() => window.location.reload()} className="mt-4 text-emerald-600 font-bold text-sm">Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-white rounded-3xl p-6 shadow-sm flex flex-col">
//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Campus Healthcare</h2>
//         <p className="text-sm text-gray-500 mt-1">
//           Contracted clinics and hospitals nearby. Click on a card to open Google Maps.
//         </p>
//       </div>

//       <div className="flex flex-col gap-10 flex-1 overflow-y-auto pr-2 no-scrollbar pb-10">
//         {hospitalCategory && <ClinicRow category={hospitalCategory} />}

//         <div className="flex flex-col gap-4">
// {/* 👇 容器加上 pr-4 讓最右邊有一點留白 */}
//           <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-2 pr-4">
//             <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1 mr-2 flex-shrink-0"></div>

//             {filteredCategories.map((cat, index) => {
//               const isActive = selectedCategoryIndex === index;
//               return (
//                 <button
//                   key={cat.title}
//                   onClick={() => switchCategory(cat.title)}
//                   // 👇 加上 flex-shrink-0，確保按鈕絕對不會被擠壓變形
//                   className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
//                     isActive
//                       ? "bg-emerald-500 text-white border-emerald-500 shadow-md transform scale-105"
//                       : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
//                   }`}
//                 >
//                   {cat.title}
//                 </button>
//               );
//             })}
//             {/* 👇 迴圈結束後，加一個隱形的佔位元素，確保滾到底時不會貼死邊緣 */}
//             <div className="w-4 flex-shrink-0"></div>
//           </div>
//           </div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeType || "default"}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//             >
//               {filteredCategories[selectedCategoryIndex] && (
//                 <ClinicRow
//                   category={filteredCategories[selectedCategoryIndex]}
//                   hideDefaultTitle={true}
//                   customTitle={filteredCategories[selectedCategoryIndex].fullTitle}
//                 />
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
    
//   );
// }

// // 修正了 handleCardClick 的網址 Bug
// function ClinicRow({ category, hideDefaultTitle = false, customTitle }: any) {
//   const rowRef = useRef<HTMLDivElement>(null);
//   const scroll = (direction: "left" | "right") => {
//     if (rowRef.current) {
//       const scrollAmount = 460;
//       rowRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
//     }
//   };

//   const handleCardClick = (clinic: ClinicData) => {
//     const query = `${clinic.data.name} ${clinic.data.address}`;
//     // 🔴 修正處：使用標準 Google Maps Search URL 並加上正確的變數語法
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
//         <button onClick={() => scroll("left")} className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -ml-3">
//           <ChevronLeft size={24} />
//         </button>
//       </div>
//       <div className="absolute top-[60%] -translate-y-1/2 right-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
//         <button onClick={() => scroll("right")} className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -mr-3">
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       <div ref={rowRef} className="flex gap-4 overflow-x-auto pt-2 pb-4 px-2 no-scrollbar scroll-smooth">
//         {category.clinics.map((clinic: any) => {
//           const { data } = clinic;
//           const kmText = data.distance.split("(")[0].trim();
//           const timeDetail = data.distance.match(/\(([^)]+)\)/)?.[1];
// const nameParts = data.name.split(" ("); 
// const engName = nameParts[0];
// const chiName = nameParts[1] ? `(${nameParts[1]}` : null;
//           return (
//             <div key={clinic.id} onClick={() => handleCardClick(clinic)} className="flex-shrink-0 w-[400px] bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all select-none cursor-pointer active:scale-95 group">
//               <div className="flex justify-between items-start mb-6">
//                 <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider leading-none">{data.tags[0]}</span>
//                 <div className="flex items-center gap-1 text-emerald-600 font-bold text-[11px] mt-1">
//                   <Navigation size={12} fill="currentColor" />{kmText}
//                 </div>
//               </div>
// <h4 className="font-bold text-gray-800 text-xl mb-4 leading-tight min-h-[56px]">
//   {engName}
//   {chiName && (
//     <span className="block text-lg text-gray-500 mt-1">
//       {chiName}
//     </span>
//   )}
// </h4>
//           <div className="space-y-3 flex-1">
//                 <div className="flex items-center gap-3 text-sm text-gray-600"><Phone size={16} className="shrink-0 text-emerald-500" /><span className="font-semibold">{data.contact}</span></div>
//                 <div className="flex items-start gap-3 text-sm text-gray-600"><MapPin size={16} className="shrink-0 text-emerald-500 mt-0.5" /><span className="line-clamp-1">{data.address}</span></div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600"><BadgeDollarSign size={16} className="shrink-0 text-emerald-500" /><span className="font-medium">{data.fare}</span></div>
//               </div>
//               <div className="mt-6 pt-4 border-t border-gray-200/60 flex justify-between items-center">
//                 <div className="flex gap-1.5 overflow-hidden items-center">
//                   {timeDetail && <div className="flex items-center gap-1 text-[10px] bg-white text-emerald-600 px-2 py-1 rounded-md border border-emerald-100 shadow-sm font-bold whitespace-nowrap"><Clock size={10} />{timeDetail.replace("around ", "")}</div>}
//                   {data.tags.slice(1).map((tag: any, idx: any) => (<span key={idx} className="text-[10px] bg-gray-200/50 text-gray-500 px-2 py-1 rounded-md font-medium whitespace-nowrap">{tag}</span>))}
//                 </div>
//                 <span className="text-xs text-emerald-500 font-bold flex items-center gap-1 shrink-0 ml-2">View Map <ChevronRight size={12} /></span>
//               </div>
//             </div>
//           );
//         })}
//         <div className="w-2 flex-shrink-0"></div>
//       </div>
//     </div>
//   );
// }

// export default function HealthcarrePage() {
//   return (
//     // 👉 3. 加入 Suspense 邊界，並設定載入中的 fallback 畫面
//     <Suspense fallback={<div>Loading...</div>}>
//       <HealthcareContent />
//     </Suspense>
//   );
// }

"use client";
import { useState, useRef, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useSWR from "swr";
import {
  MapPin,
  Clock,
  Phone,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  BadgeDollarSign,
  Navigation,
  ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
});

function HealthcareContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeType = searchParams.get("type");

  const apiUrl = "https://campus-ai-backend-1.onrender.com/api/campus/clinic";
  const { data: rawData, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  const { filteredCategories, hospitalCategory } = useMemo(() => {
    if (!rawData) return { filteredCategories: [], hospitalCategory: undefined };

    const rawItems = Array.isArray(rawData) ? rawData : rawData.data || rawData.clinics || [];
    if (rawItems.length === 0) return { filteredCategories: [], hospitalCategory: undefined };

    const categoriesMap: { [key: string]: ClinicData[] } = {};

    rawItems.forEach((item: any) => {
      const formattedItem: ClinicData = {
        id: item._id || item.id || Math.random().toString(),
        label: item.type || "General",
        data: {
          name: item.name || "未提供名稱",
          fare: item.fare || "現場洽詢",
          contact: item.contact || item.phone || "無電話",
          address: item.address || "無地址",
          tags: Array.isArray(item.tags) ? item.tags : [item.category || "一般"],
          distance: item.distance || "距離確認中",
        },
      };

      const mainTag = formattedItem.data.tags[0] || "其他";
      if (!categoriesMap[mainTag]) categoriesMap[mainTag] = [];
      categoriesMap[mainTag].push(formattedItem);
    });

    const transformedData = Object.keys(categoriesMap).map((key) => {
      const sortedClinics = categoriesMap[key].sort((a, b) => {
        const getTime = (distStr: string) => {
          const match = distStr.match(/(\d+)\s*mins/);
          return match ? parseInt(match[1], 10) : 999;
        };
        return getTime(a.data.distance) - getTime(b.data.distance);
      });

      return { title: key, fullTitle: key, clinics: sortedClinics };
    });

    return { 
      filteredCategories: transformedData.filter((cat) => cat.title !== "General Practice"), 
      hospitalCategory: transformedData.find((cat) => cat.title === "General Practice") 
    };
  }, [rawData]);

  const selectedCategoryIndex = useMemo(() => {
    if (!activeType) return 0;
    const index = filteredCategories.findIndex(cat => cat.title === activeType);
    return index === -1 ? 0 : index;
  }, [filteredCategories, activeType]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeType]);

  const switchCategory = (title: string) => {
    router.push(`?type=${encodeURIComponent(title)}`);
  };

  // 給電腦版分類標籤區用的橫向捲動參考
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const scrollCategory = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      categoryScrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  if (isLoading && filteredCategories.length === 0) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center bg-[#fffdf8] rounded-[32px] border border-[#eadfce] shadow-sm">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-[#6f7b76] font-bold tracking-wide">Updating Healthcare Data...</p>
      </div>
    );
  }

  if (filteredCategories.length === 0 && !isLoading) {
    return (
      <div className="p-20 text-center bg-[#fffdf8] rounded-[32px] border border-dashed border-[#eadfce] shadow-sm">
        <Stethoscope className="mx-auto text-[#eadfce] mb-4" size={48} />
        <p className="text-[#6f7b76] font-bold">Healthcare information is currently unavailable.</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-[#fffefb] text-emerald-700 border border-[#eadfce] rounded-full font-bold text-sm hover:bg-[#eadfce]/20 transition-all shadow-sm">Retry</button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fffdf8] rounded-[32px] p-4 md:p-6 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mb-6 border-b-2 border-dashed border-[#eadfce]/60 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Campus Healthcare</h2>
        <p className="text-sm text-[#6f7b76] mt-1 font-medium">
          Contracted clinics and hospitals nearby. Click on a card to open Google Maps.
        </p>
      </div>

      <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-2 no-scrollbar pb-10">
        {hospitalCategory && <ClinicRow category={hospitalCategory} />}

        <div className="flex flex-col gap-4">
          
          {/* 手機版：下拉選單 */}
          <div className="relative md:hidden mb-2">
            <select
              value={filteredCategories[selectedCategoryIndex]?.title || ""}
              onChange={(e) => switchCategory(e.target.value)}
              className="w-full appearance-none bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-base py-3 pl-5 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            >
              {filteredCategories.map((cat) => (
                <option key={cat.title} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-600">
              <ChevronDown size={20} />
            </div>
          </div>

          {/* 電腦版：橫向分頁標籤 - 加入包裹層與左右箭頭 */}
          <div className="hidden md:flex items-center relative group/cat mb-2">
            {/* 左捲動按鈕 */}
            <button 
              onClick={() => scrollCategory("left")} 
              className="absolute left-0 z-10 w-8 h-8 rounded-full bg-white/90 shadow-sm border border-[#eadfce] flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-105 transition-all opacity-0 group-hover/cat:opacity-100 -ml-4"
            >
              <ChevronLeft size={16} />
            </button>

            {/* 標籤滾動區塊 */}
            <div 
              ref={categoryScrollRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pr-4 scroll-smooth w-full"
            >
              <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1 mr-2 flex-shrink-0"></div>
              {filteredCategories.map((cat, index) => {
                const isActive = selectedCategoryIndex === index;
                return (
                  <button
                    key={cat.title}
                    onClick={() => switchCategory(cat.title)}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                      isActive
                        ? "bg-emerald-500 text-white border-transparent shadow-md transform scale-105"
                        : "bg-[#fffefb] text-gray-500 border-[#eadfce] hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
              <div className="w-4 flex-shrink-0"></div>
            </div>

            {/* 右捲動按鈕 */}
            <button 
              onClick={() => scrollCategory("right")} 
              className="absolute right-0 z-10 w-8 h-8 rounded-full bg-white/90 shadow-sm border border-[#eadfce] flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-105 transition-all opacity-0 group-hover/cat:opacity-100 mr-2"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeType || "default"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filteredCategories[selectedCategoryIndex] && (
                <ClinicRow
                  category={filteredCategories[selectedCategoryIndex]}
                  hideDefaultTitle={true}
                  customTitle={filteredCategories[selectedCategoryIndex].fullTitle}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ClinicRow({ category, hideDefaultTitle = false, customTitle }: any) {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = 460;
      rowRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const handleCardClick = (clinic: ClinicData) => {
    const query = `${clinic.data.name} ${clinic.data.address}`;
    const url = `http://googleusercontent.com/maps.google.com/?q=${encodeURIComponent(query)}`;
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
        <div className="px-2 text-sm text-[#6f7b76] font-bold flex items-center gap-2">
          <Stethoscope size={14} className="text-emerald-600" />
          {customTitle}
        </div>
      )}

      <div className="hidden md:flex absolute top-[60%] -translate-y-1/2 left-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button onClick={() => scroll("left")} className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-[#eadfce] flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -ml-3">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="hidden md:flex absolute top-[60%] -translate-y-1/2 right-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button onClick={() => scroll("right")} className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-[#eadfce] flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -mr-3">
          <ChevronRight size={24} />
        </button>
      </div>

      <div ref={rowRef} className="flex gap-4 overflow-x-auto pt-2 pb-4 px-2 no-scrollbar scroll-smooth">
        {category.clinics.map((clinic: any) => {
          const { data } = clinic;
          const kmText = data.distance.split("(")[0].trim();
          const timeDetail = data.distance.match(/\(([^)]+)\)/)?.[1];
          const nameParts = data.name.split(" ("); 
          const engName = nameParts[0];
          const chiName = nameParts[1] ? `(${nameParts[1]}` : null;
          
          return (
            <div 
              key={clinic.id} 
              onClick={() => handleCardClick(clinic)} 
              className="flex-shrink-0 w-[85vw] md:w-[400px] bg-[#fffefb] p-6 rounded-2xl border border-[#eadfce] flex flex-col hover:border-emerald-300 hover:shadow-[0_12px_32px_rgba(90,70,40,0.08)] hover:-translate-y-1 transition-all duration-300 select-none cursor-pointer active:scale-95 group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider leading-none">{data.tags[0]}</span>
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-[11px] mt-1">
                  <Navigation size={12} fill="currentColor" />{kmText}
                </div>
              </div>
              <h4 className="font-bold text-gray-800 text-xl mb-4 leading-tight min-h-[56px]">
                {engName}
                {chiName && (
                  <span className="block text-lg text-gray-500 mt-1">
                    {chiName}
                  </span>
                )}
              </h4>
              <div className="space-y-3 ">
                <div className="flex items-center gap-3 text-sm text-gray-600"><Phone size={16} className="shrink-0 text-emerald-500" /><span className="font-semibold">{data.contact}</span></div>
                <div className="flex items-start gap-3 text-sm text-gray-600"><MapPin size={16} className="shrink-0 text-emerald-500 mt-0.5" /><span className="line-clamp-1">{data.address}</span></div>
                <div className="flex items-center gap-3 text-sm text-gray-600"><BadgeDollarSign size={16} className="shrink-0 text-emerald-500" /><span className="font-medium">{data.fare}</span></div>
              </div>
              
              {/* 【修正重點】：調整了虛線的間距，讓 mt (5) 和 pt (5) 平衡對稱 */}
              <div className="mt-5 pt-5 border-t-2 border-dashed border-[#eadfce]/60 flex justify-between items-center">
                <div className="flex gap-1.5 overflow-hidden items-center">
                  {timeDetail && <div className="flex items-center gap-1 text-[10px] bg-[#fffdf8] text-emerald-600 px-2 py-1 rounded-md border border-emerald-100 shadow-sm font-bold whitespace-nowrap"><Clock size={10} />{timeDetail.replace("around ", "")}</div>}
                  {data.tags.slice(1).map((tag: any, idx: any) => (<span key={idx} className="text-[10px] bg-gray-200/40 text-gray-500 px-2 py-1 rounded-md font-medium whitespace-nowrap">{tag}</span>))}
                </div>
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1 shrink-0 ml-2">View Map <ChevronRight size={12} /></span>
              </div>
            </div>
          );
        })}
        <div className="w-2 flex-shrink-0"></div>
      </div>
    </div>
  );
}

// 【修復重點】：確保檔案最底部有導出這個 Component！
export default function HealthcarePage() {
  return (
    <Suspense fallback={
      <div className="w-full h-[500px] flex items-center justify-center bg-[#fffdf8] rounded-[32px] border border-[#eadfce] shadow-sm">
        <span className="text-[#6f7b76] font-bold tracking-widest">Loading...</span>
      </div>
    }>
      <HealthcareContent />
    </Suspense>
  );
}