
// "use client";
// // 記得引入 useRef 和 Suspense
// import { useEffect, useMemo, useState, useRef, Suspense } from "react"; 
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
// import Image from "next/image";

// // 引入子頁面元件
// import About from "./section/About";
// import Administrative from "./section/Administrative";
// import Academic from "./section/Academic";
// import Facilities from "./section/Facilities";

// // --- 假資料：Banner 圖片 ---
// // --- 真實資料：Banner 圖片路徑 ---
// const BANNER_IMAGES = [
//   "/homepage/banner1.png",
//   "/homepage/banner2.png",
//   "/homepage/banner3.png",
// ];

// interface CampusViewProps {
//   subTab: string;
// }

// // 1. 把原本的 export default function Campus 改名為 CampusContent (去掉 export default)
// function CampusContent({ subTab }: CampusViewProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams(); // 這裡用到了 useSearchParams
  
//   // 新增：用來記錄上一次的 subTab，避免卡片點擊時被錯誤覆蓋
//   const previousSubTab = useRef(subTab);

//   // 【核心改動：URL 狀態管理】
//   const currentView = useMemo(() => {
//     return searchParams.get("view") || "LANDING";
//   }, [searchParams]);

//   // 【核心改動：自動捲回頂部】
//   useEffect(() => {
//     const container = document.querySelector(".custom-scrollbar");
//     if (container) {
//       container.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [currentView]);

//   // 【修復版：同步外部 Tab 導航】
//   useEffect(() => {
//     if (previousSubTab.current !== subTab) {
//       if (subTab === "Campus Map") {
//         router.replace(pathname); 
//       } else if (subTab !== "About CCU" && subTab !== "LANDING") { 
//         router.replace(`?view=${subTab}`);
//       } else {
//         router.replace(pathname);
//       }
//       previousSubTab.current = subTab;
//     }
//   }, [subTab, pathname, router]);

//   // 導航函數
//   const navigateTo = (viewName: string) => {
//     router.push(`?view=${viewName}`);
//   };

//   const handleBack = () => {
//     router.push(pathname); // 移除參數，回到 LANDING
//   };

//   return (
//     <div className="w-full h-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative">
//       <AnimatePresence mode="wait">
        
//         {/* === VIEW: LANDING PAGE === */}
//         {currentView === "LANDING" && (
//           <motion.div
//             key="landing"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0, x: -20 }}
//             className="w-full h-full flex flex-col overflow-y-auto custom-scrollbar p-6"
//           >
//             <div className="rounded-3xl overflow-hidden shadow-sm mb-8 shrink-0">
//               <BannerCarousel
//                 onBannerClick={() => navigateTo("About CCU")}
//               />
//             </div>

//             <div className="w-full">
//               <div className="flex items-center justify-center gap-4 mb-6">
//                 <div className="h-px bg-gray-200 w-16"></div>
//                 <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">
//                   Explore Campus
//                 </h3>
//                 <div className="h-px bg-gray-200 w-16"></div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <ImageNavCard
//                   title="Administrative"
//                   subtitle="Offices & Services"
//                   imageSrc="/homepage/Administration.JPG"
//                   onClick={() => navigateTo("Administrative")}
//                 />
//                 <ImageNavCard
//                   title="Academic Units"
//                   subtitle="Colleges & Departments"
//                   imageSrc="/homepage/Academic.JPG"
//                   onClick={() => navigateTo("Academic")}
//                 />
//                 <ImageNavCard
//                   title="Facilities"
//                   subtitle="Sports & Dormitories"
//                   imageSrc="/homepage/facilities.JPG"
//                   onClick={() => navigateTo("Facilities")}
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* === VIEW: SUB-PAGES (Content) === */}
//         {currentView !== "LANDING" && (
//           <motion.div
//             key="content"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             className="w-full h-full flex flex-col bg-white"
//           >
//             <div className="flex items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
//               <button
//                 onClick={handleBack}
//                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
//               >
//                 <ArrowLeft size={16} />
//                 Back
//               </button>
//               <div className="h-6 w-px bg-gray-200 mx-4"></div>
//               <span className="text-gray-800 font-bold text-lg">
//                 {currentView}
//               </span>
//             </div>

//             <div className="flex-1 overflow-y-auto custom-scrollbar">
//               {currentView === "About CCU" && <About />}
//               {currentView === "Administrative" && <Administrative />}
//               {currentView === "Academic" && <Academic />}
//               {currentView === "Facilities" && <Facilities />}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // 2. 建立新的 export default function，並將 CampusContent 包裝在 Suspense 裡面
// export default function Campus({ subTab }: CampusViewProps) {
//   return (
//     <Suspense fallback={
//       <div className="w-full h-full bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center">
//         <span className="text-gray-400">Loading campus...</span>
//       </div>
//     }>
//       <CampusContent subTab={subTab} />
//     </Suspense>
//   );
// }

// function BannerCarousel({ onBannerClick }: { onBannerClick: () => void }) {
//   const [index, setIndex] = useState(0);

//   const next = (e?: React.MouseEvent) => {
//     e?.stopPropagation();
//     setIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
//   };
//   const prev = (e?: React.MouseEvent) => {
//     e?.stopPropagation();
//     setIndex(
//       (prev) => (prev - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length,
//     );
//   };

//   useEffect(() => {
//     const timer = setInterval(() => next(), 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div
//       onClick={onBannerClick}
//       className="relative w-full h-[320px] md:h-[380px] cursor-pointer group"
//     >
//       <AnimatePresence initial={false} mode="popLayout">
//         <motion.div
//           key={index}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url('${BANNER_IMAGES[index]}')` }}
//         >
//           {/* 漸層陰影：稍微加重一點點底部，讓白色字體在任何圖片上都清楚 */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-10">
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
//                 CCU SmartLife
//               </h1>
//               <p className="text-white/90 text-sm md:text-lg font-light flex items-center gap-2 drop-shadow-sm">
//                 Discover National Chung Cheng University{" "}
//                 <ArrowRight size={16} />
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       <button
//         onClick={prev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10"
//       >
//         <ChevronLeft size={20} />
//       </button>
//       <button
//         onClick={next}
//         className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10"
//       >
//         <ChevronRight size={20} />
//       </button>

//       <div className="absolute bottom-4 right-8 flex gap-2 z-10">
//         {BANNER_IMAGES.map((_, i) => (
//           <div
//             key={i}
//             className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- 元件：圖片導航卡片 (新設計：一體成形大卡片) ---
// function ImageNavCard({ title, subtitle, imageSrc, onClick }: any) {
//   return (
//     <div
//       onClick={onClick}
//       className="group cursor-pointer flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 h-full"
//     >
//       {/* 圖片區域 (上半部) */}
//       <div className="w-full h-[200px] md:h-[240px] relative overflow-hidden bg-gray-100">
//         {/* 圖片 hover 遮罩層 */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />

//         {/* 使用 Next.js Image 優化渲染 */}
//         {imageSrc ? (
//           <Image
//             src={imageSrc}
//             alt={title}
//             fill
//             className="object-cover group-hover:scale-110 transition-transform duration-700"
//             sizes="(max-width: 768px) 100vw, 33vw"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-gray-400/30 font-bold text-3xl tracking-widest">
//             IMAGE
//           </div>
//         )}
//       </div>

//       {/* 文字區域 (下半部) */}
//       <div className="p-5 text-center flex flex-col justify-center flex-1 bg-gray-50/50 group-hover:bg-white transition-colors">
//         <h4 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
//           {title}
//         </h4>
//         <p className="text-sm text-gray-400 mt-1 font-medium tracking-wide">
//           {subtitle}
//         </p>

//         {/* 裝飾線條 */}
//         <div className="h-1 w-10 bg-gray-200 rounded-full mx-auto mt-4 group-hover:w-16 group-hover:bg-emerald-300 transition-all duration-300" />
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useMemo, useState, useRef, Suspense } from "react"; 
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

// 引入你的組件
import MaskingTape from "../components/MaskingTape"; 
import About from "./section/About";
import Administrative from "./section/Administrative";
import Academic from "./section/Academic";
import Facilities from "./section/Facilities";

const BANNER_IMAGES = [
  "/homepage/banner1.png",
  "/homepage/banner2.png",
  "/homepage/banner3.png",
];

interface CampusViewProps {
  subTab: string;
}

function CampusContent({ subTab }: CampusViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const previousSubTab = useRef(subTab);

  const currentView = useMemo(() => {
    return searchParams.get("view") || "LANDING";
  }, [searchParams]);

  useEffect(() => {
    const container = document.querySelector(".custom-scrollbar");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentView]);

  useEffect(() => {
    if (previousSubTab.current !== subTab) {
      if (subTab === "Campus Map") {
        router.replace(pathname); 
      } else if (subTab !== "About CCU" && subTab !== "LANDING") { 
        router.replace(`?view=${subTab}`);
      } else {
        router.replace(pathname);
      }
      previousSubTab.current = subTab;
    }
  }, [subTab, pathname, router]);

  const navigateTo = (viewName: string) => {
    router.push(`?view=${viewName}`);
  };

  const handleBack = () => {
    router.push(pathname); 
  };

  return (
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        
        {currentView === "LANDING" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full h-full flex flex-col overflow-y-auto custom-scrollbar p-6"
          >
            {/* 大 Banner 區塊 */}
            <div className="rounded-[24px] overflow-hidden shadow-sm mb-8 shrink-0 relative group cursor-pointer border border-[#eadfce]">
              {/* 【修改】：這裡原本的 MaskingTape 已經拔掉了 */}
              <BannerCarousel
                onBannerClick={() => navigateTo("About CCU")}
              />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="border-t-2 border-dashed border-[#eadfce] w-16"></div>
                <h3 className="text-[#6f7b76] font-bold uppercase tracking-[0.2em] text-sm">
                  Explore Campus
                </h3>
                <div className="border-t-2 border-dashed border-[#eadfce] w-16"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 【修改】：tapeRotation 改為直接傳入數字角度 */}
                <ImageNavCard
                  title="Administrative"
                  subtitle="Offices & Services"
                  imageSrc="/homepage/Administration.JPG"
                  onClick={() => navigateTo("Administrative")}
                  tapeRotation={-2} 
                />
                <ImageNavCard
                  title="Academic Units"
                  subtitle="Colleges & Departments"
                  imageSrc="/homepage/Academic.JPG"
                  onClick={() => navigateTo("Academic")}
                  tapeRotation={3}
                />
                <ImageNavCard
                  title="Facilities"
                  subtitle="Sports & Dormitories"
                  imageSrc="/homepage/facilities.JPG"
                  onClick={() => navigateTo("Facilities")}
                  tapeRotation={-1}
                />
              </div>
            </div>
          </motion.div>
        )}

        {currentView !== "LANDING" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full h-full flex flex-col bg-[#fffdf8]"
          >
            <div className="flex items-center p-4 border-b-2 border-dashed border-[#eadfce] bg-[#fffefb] sticky top-0 z-10">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#fbf8f1] hover:bg-[#eadfce]/40 text-gray-600 font-bold text-sm transition-colors shadow-sm"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <div className="border-l-2 border-dashed border-[#eadfce] h-6 mx-4 opacity-60"></div>
              <span className="text-gray-800 font-extrabold text-lg tracking-tight">
                {currentView}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {currentView === "About CCU" && <About />}
              {currentView === "Administrative" && <Administrative />}
              {currentView === "Academic" && <Academic />}
              {currentView === "Facilities" && <Facilities />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Campus({ subTab }: CampusViewProps) {
  return (
    <Suspense fallback={
      <div className="w-full h-full bg-[#fffdf8] rounded-3xl shadow-sm border border-[#eadfce] flex items-center justify-center">
        <span className="text-gray-400 font-bold tracking-widest">Loading campus...</span>
      </div>
    }>
      <CampusContent subTab={subTab} />
    </Suspense>
  );
}

function BannerCarousel({ onBannerClick }: { onBannerClick: () => void }) {
  const [index, setIndex] = useState(0);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
  };
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex(
      (prev) => (prev - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      onClick={onBannerClick}
      className="relative w-full h-[320px] md:h-[380px] cursor-pointer group"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${BANNER_IMAGES[index]}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tighter">
                CCU SmartLife
              </h1>
              <p className="text-white/90 text-sm md:text-lg font-medium flex items-center gap-2 drop-shadow-sm">
                Discover National Chung Cheng University{" "}
                <ArrowRight size={16} />
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 right-8 flex gap-2 z-10">
        {BANNER_IMAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-white" : "w-3 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

// 【修改】：這裡接收數字型態的 rotation
interface NavCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  onClick: () => void;
  tapeRotation: number; 
}

function ImageNavCard({ title, subtitle, imageSrc, onClick, tapeRotation }: NavCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-[#fffefb] border border-[#eadfce] rounded-[24px] hover:shadow-[0_12px_32px_rgba(90,70,40,0.1)] transition-all duration-300 h-full relative hover:-translate-y-1 hover:-rotate-1"
    >
      {/* 【修改】：顏色統一換成 bg-[#f0ebe1]/65，並使用 props 傳遞角度與寬度 */}
      <MaskingTape 
        color="bg-[#f0ebe1]/65"
        width="96px"
        opacity={1}
        rotation={tapeRotation}
        className="-top-3 left-1/2 -translate-x-1/2" 
      />

      <div className="w-full h-[200px] md:h-[240px] relative bg-[#fbf8f1] rounded-t-[24px] overflow-hidden border-b border-[#eadfce]/60">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />

        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#eadfce] font-bold text-3xl tracking-widest">
            IMAGE
          </div>
        )}
      </div>

      <div className="p-5 text-center flex flex-col justify-center flex-1 bg-[#fffefb] rounded-b-[24px] overflow-hidden group-hover:bg-[#fbf8f1]/50 transition-colors">
        <h4 className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors tracking-tight">
          {title}
        </h4>
        <p className="text-sm text-[#6f7b76] mt-1 font-medium tracking-wide">
          {subtitle}
        </p>
        
        <div className="h-[3px] w-10 bg-[#eadfce] rounded-full mx-auto mt-4 group-hover:w-16 group-hover:bg-emerald-300 transition-all duration-300" />
      </div>
    </div>
  );
}