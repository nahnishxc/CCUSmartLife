// // FAQ page 

// "use client";

// import { useMemo } from "react";
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

// function GuideCard({ item }: { item: GuideItem }) {
  
//   return (
//     <Link href={item.href} className="block h-full">
//       <motion.div
//         whileHover={{ y: -6 }}
//         transition={{ duration: 0.18 }}
//         className="group h-full rounded-3xl bg-white border border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] transition-shadow duration-200 overflow-hidden"
//       >
//         {/* 讓卡片「窄高一點」：固定高度 + 上下結構 */}
//         <div className="h-[240px] md:h-[270px] p-6 md:p-7 flex flex-col items-center justify-center text-center">
//           <div className="w-[110px] h-[110px] md:w-[128px] md:h-[128px] rounded-3xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
//             <div className="w-[88px] h-[88px] md:w-[104px] md:h-[104px]">
//               <Lottie animationData={item.anim} autoplay loop />
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

// export default function GuidePage() {
//   const items = useMemo<GuideItem[]>(
//     () => [
//       { key: "arrival", title: "Arrival & Documents", href: "/guide/arrival", anim: arrivalAnim },
//       { key: "daily-life", title: "Daily Life", href: "/guide/daily", anim: dailyLifeAnim },
//       { key: "finance", title: "Money & Banking", href: "/guide/finance", anim: financeAnim },
//       { key: "health", title: "Healthcare", href: "/guide/health", anim: healthAnim },
//       { key: "safety", title: "Safety & Emergency", href: "/guide/safety", anim: safetyAnim },
//       { key: "work", title: "Work & Internships", href: "/guide/work", anim: workAnim },
//     ],
//     []
//   );

//   // 你其他頁（Transportation）是用這種容器：w-full bg-white rounded-3xl p-6 md:p-8...
//   return (
//     <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//       {/* Title + content（上面說清楚一點） */}
//       <div className="mb-8">
//         <div className="text-xs font-bold tracking-[0.22em] text-gray-400">GUIDE</div>

//         <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
//           Everything you need to <span className="text-emerald-600">settle in</span>
//         </h2>

//         <p className="mt-3 text-sm md:text-base text-gray-500 leading-7 max-w-[820px]">
//           Step-by-step essentials for CCU international students — from arrival checklists and documents, to daily life,
//           banking, healthcare, safety, and work rules. Pick a topic below to open the full guide page.
//         </p>
//       </div>

//       {/* Cards：窄高、icon上標題下 */}
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

// 1. 內部元件：單張卡片 (保留了你剛剛寫好的 2 秒停頓邏輯)
function GuideCard({ item }: { item: GuideItem }) {
  const lottieRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // 清除計時器，避免你切換頁面時報錯 (Memory Leak)
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 動畫播完時會觸發這個函數
  const handleComplete = () => {
    timerRef.current = setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.goToAndPlay(0, true); // 停頓 2 秒後，從第 0 幀重新開始播
      }
    }, 0);
  };

  return (
    <Link href={item.href} className="block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.18 }}
        className="group h-full rounded-3xl bg-white border border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] transition-shadow duration-200 overflow-hidden"
      >
        <div className="h-[240px] md:h-[270px] p-6 md:p-7 flex flex-col items-center justify-center text-center">
          <div className="w-[110px] h-[110px] md:w-[128px] md:h-[128px] rounded-3xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
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

          <div className="mt-6 text-base md:text-lg font-extrabold tracking-wide text-gray-900">
            {item.title}
          </div>

          <div className="mt-3 text-xs font-bold tracking-wider text-emerald-600/80 group-hover:text-emerald-600 transition-colors">
            OPEN →
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// 2. 外部元件：真正 Export 給 Next.js 渲染的頁面
export default function FAQPage() {
  const items = useMemo<GuideItem[]>(
    () => [
      // 注意這裡的 href 我幫你改成 /FAQ/ 開頭，對應你的資料夾結構
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
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* Title + content */}
      <div className="mb-8">
        <div className="text-xs font-bold tracking-[0.22em] text-gray-400">FAQ</div>

        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Everything you need to <span className="text-emerald-600">settle in</span>
        </h2>

        <p className="mt-3 text-sm md:text-base text-gray-500 leading-7 max-w-[820px]">
          Step-by-step essentials for CCU international students — from arrival checklists and documents, to daily life,
          banking, healthcare, safety, and work rules. Pick a topic below to open the full guide page.
        </p>
      </div>

      {/* Cards：把上面的資料迴圈生成出來 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {items.map((item) => (
          <GuideCard key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}