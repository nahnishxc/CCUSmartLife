
// // FAQ page 
// "use client";

// import { useMemo, useRef, useEffect } from "react";
// import Link from "next/link";
// import Lottie from "lottie-react";
// import { motion } from "framer-motion";

// import arrivalAnim from "../Lottie/arrival.json";
// import dailyLifeAnim from "../Lottie/daily-life.json";
// import financeAnim from "../Lottie/finance.json";
// import healthAnim from "../Lottie/health.json";
// import safetyAnim from "../Lottie/safety.json";
// import workAnim from "../Lottie/work.json";

// type GuideItem = {
//   key: string;
//   title: string;
//   href: string;
//   anim: any;
// };

// // 1. 內部元件：單張卡片 (保留了你剛剛寫好的 2 秒停頓邏輯)
// function GuideCard({ item }: { item: GuideItem }) {
//   const lottieRef = useRef<any>(null);
//   const timerRef = useRef<any>(null);

//   // 清除計時器，避免你切換頁面時報錯 (Memory Leak)
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   // 動畫播完時會觸發這個函數
//   const handleComplete = () => {
//     timerRef.current = setTimeout(() => {
//       if (lottieRef.current) {
//         lottieRef.current.goToAndPlay(0, true); // 停頓 2 秒後，從第 0 幀重新開始播
//       }
//     }, 0);
//   };

//   return (
//     <Link href={item.href} className="block h-full">
//       <motion.div
//         whileHover={{ y: -6 }}
//         transition={{ duration: 0.18 }}
//         className="group h-full rounded-3xl bg-white border border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] transition-shadow duration-200 overflow-hidden"
//       >
//         <div className="h-[240px] md:h-[270px] p-6 md:p-7 flex flex-col items-center justify-center text-center">
//           <div className="w-[110px] h-[110px] md:w-[128px] md:h-[128px] rounded-3xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
//             <div className="w-[88px] h-[88px] md:w-[104px] md:h-[104px]">
//               <Lottie 
//                 lottieRef={lottieRef} 
//                 animationData={item.anim} 
//                 autoplay={true} 
//                 loop={false}               
//                 onComplete={handleComplete} 
//               />
//             </div>
//           </div>

//           <div className="mt-6 text-base md:text-lg font-extrabold tracking-wide text-gray-900">
//             {item.title}
//           </div>

//           <div className="mt-3 text-xs font-bold tracking-wider text-emerald-600/80 group-hover:text-emerald-600 transition-colors">
//             OPEN →
//           </div>
//         </div>
//       </motion.div>
//     </Link>
//   );
// }

// // 2. 外部元件：真正 Export 給 Next.js 渲染的頁面
// export default function FAQPage() {
//   const items = useMemo<GuideItem[]>(
//     () => [
//       // 注意這裡的 href 我幫你改成 /FAQ/ 開頭，對應你的資料夾結構
//       { key: "arrival", title: "Arrival & Documents", href: "/FAQ/arrival", anim: arrivalAnim },
//       { key: "daily-life", title: "Daily Life", href: "/FAQ/daily", anim: dailyLifeAnim },
//       { key: "finance", title: "Money & Banking", href: "/FAQ/finance", anim: financeAnim },
//       { key: "health", title: "Healthcare", href: "/FAQ/health", anim: healthAnim },
//       { key: "safety", title: "Safety & Emergency", href: "/FAQ/safety", anim: safetyAnim },
//       { key: "work", title: "Work & Internships", href: "/FAQ/work", anim: workAnim },
//     ],
//     []
//   );

//   return (
//     <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//       {/* Title + content */}
//       <div className="mb-8">

//         <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
//           Everything you need to <span className="text-emerald-600">settle in</span>
//         </h2>

//         <p className="mt-3 text-sm md:text-base text-gray-500 leading-7 max-w-[820px]">
//           Step-by-step essentials for CCU international students — from arrival checklists and documents, to daily life,
//           banking, healthcare, safety, and work rules. Pick a topic below to open the full guide page.
//         </p>
//       </div>

//       {/* Cards：把上面的資料迴圈生成出來 */}
//       <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
//         {items.map((item) => (
//           <GuideCard key={item.key} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }


// FAQ page 
"use client";

import { useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

import arrivalAnim from "../Lottie/arrival.json";
import dailyLifeAnim from "../Lottie/daily-life.json";
import financeAnim from "../Lottie/finance.json";
import healthAnim from "../Lottie/health.json";
import safetyAnim from "../Lottie/safety.json";
import workAnim from "../Lottie/work.json";

type GuideItem = {
  key: string;
  title: string;
  href: string;
  anim: any;
};

// 1. 內部元件：單張卡片
function GuideCard({ item }: { item: GuideItem }) {
  const lottieRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleComplete = () => {
    timerRef.current = setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.goToAndPlay(0, true); 
      }
    }, 0);
  };

  return (
    <Link href={item.href} className="block h-full">
      <motion.div
        // 自由發揮點：在往上提的基礎上加一絲絲微傾斜 (rotate: -0.5)，更有手帳紙片翻起的靈魂
        whileHover={{ y: -6, rotate: -0.5 }}
        transition={{ duration: 0.18 }}
        // 【卡片指定】底色修改為 bg-[#fffefb]，換上米灰邊框與手帳暖調陰影
        className="group h-full rounded-3xl bg-[#fffefb] border border-[#eadfce] shadow-[0_10px_30px_rgba(90,70,40,0.06)] hover:shadow-[0_16px_32px_rgba(90,70,40,0.09)] transition-all duration-300 overflow-hidden"
      >
        <div className="h-[240px] md:h-[270px] p-6 md:p-7 flex flex-col items-center justify-center text-center">
          {/* Lottie 容器：換上米色底 bg-[#fbf8f1] 與米灰細框，hover 時淡綠色貼紙化 */}
          <div className="w-[110px] h-[110px] md:w-[128px] md:h-[128px] rounded-3xl bg-[#fbf8f1] border border-[#eadfce]/60 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 shadow-sm transition-all duration-300">
            <div className="w-[88px] h-[88px] md:w-[104px] md:h-[104px]">
              <Lottie 
                lottieRef={lottieRef} 
                animationData={item.anim} 
                autoplay={true} 
                loop={false}               
                onComplete={handleComplete} 
              />
            </div>
          </div>

          <div className="mt-6 text-base md:text-lg font-extrabold tracking-wide text-gray-800 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </div>

          {/* 指引箭頭改為更有精神的翠綠色 */}
          <div className="mt-3 text-sm font-black tracking-wider text-emerald-600 group-hover:text-emerald-700 transition-colors">
            OPEN →
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// 2. 外部元件：真正 Export 的頁面
export default function FAQPage() {
  const items = useMemo<GuideItem[]>(
    () => [
      { key: "arrival", title: "Arrival & Documents", href: "/FAQ/arrival", anim: arrivalAnim },
      { key: "daily-life", title: "Daily Life", href: "/FAQ/daily", anim: dailyLifeAnim },
      { key: "finance", title: "Money & Banking", href: "/FAQ/finance", anim: financeAnim },
      { key: "health", title: "Healthcare", href: "/FAQ/health", anim: healthAnim },
      { key: "safety", title: "Safety & Emergency", href: "/FAQ/safety", anim: safetyAnim },
      { key: "work", title: "Work & Internships", href: "/FAQ/work", anim: workAnim },
    ],
    []
  );

  return (
    // 【背板指定】修改底色為 bg-[#fffdf8]，升級為大圓角、米灰邊框與大面積暖陰影
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] p-6 md:p-8 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* Title + content */}
      {/* 自由發揮點：在標題與卡片群中間加上雙像素虛線分隔條，使章節索引的層次更明確 */}
      <div className="mb-8 border-b-2 border-dashed border-[#eadfce]/60 pb-6">
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Everything you need to <span className="text-emerald-600">settle in</span>
        </h2>

        {/* 內文說明文字顏色優化為手帳墨綠灰 */}
        <p className="mt-3 text-sm md:text-base text-[#6f7b76] font-medium leading-7 max-w-[820px]">
          Step-by-step essentials for CCU international students — from arrival checklists and documents, to daily life,
          banking, healthcare, safety, and work rules. Pick a topic below to open the full guide page.
        </p>
      </div>

      {/* Cards：保持原有 grid 排版結構 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {items.map((item) => (
          <GuideCard key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}