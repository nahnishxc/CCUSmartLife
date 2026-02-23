"use client";
import { useMemo, useRef } from "react";
import Link from "next/link";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
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
  desc: string;
  href: string;
  anim: any;
};

function GuideCard({ item }: { item: GuideItem }) {
  const ref = useRef<LottieRefCurrentProps | null>(null);

  return (
    <Link href={item.href} className="block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.18 }}
        onMouseEnter={() => {
          const inst = ref.current;
          if (!inst) return;
          inst.stop();
          inst.goToAndPlay(0, true);
        }}
        className="group h-full rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start gap-5">
            <div className="w-[84px] h-[84px] rounded-2xl bg-emerald-50 flex items-center justify-center ring-1 ring-emerald-100 transition-all duration-200 group-hover:bg-emerald-100">
              <div className="w-[56px] h-[56px]">
                <Lottie lottieRef={ref} animationData={item.anim} autoplay={false} loop={false} />
              </div>
            </div>

            <div className="flex-1 pt-1">
              <div className="text-[15px] font-bold tracking-wide text-gray-900">
                {item.title}
              </div>
              <div className="mt-2 text-sm leading-6 text-gray-500">
                {item.desc}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-600 opacity-80 group-hover:opacity-100 transition-opacity">
            OPEN
            <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function GuidePage() {
  const items = useMemo<GuideItem[]>(
    () => [
      {
        key: "arrival",
        title: "Arrival & Documents",
        desc: "What to prepare before coming to Taiwan, after arrival steps, ARC, and key checklists.",
        href: "/guide/arrival",
        anim: arrivalAnim,
      },
      {
        key: "daily-life",
        title: "Daily Life",
        desc: "Housing, food, shopping, campus utilities, and practical tips for everyday living.",
        href: "/guide/daily-life",
        anim: dailyLifeAnim,
      },
      {
        key: "finance",
        title: "Money & Banking",
        desc: "Bank accounts, payments, budgeting, and common finance questions for international students.",
        href: "/guide/finance",
        anim: financeAnim,
      },
      {
        key: "health",
        title: "Healthcare",
        desc: "Hospitals/clinics, NHI basics, and how to get help when you’re sick or need support.",
        href: "/guide/health",
        anim: healthAnim,
      },
      {
        key: "safety",
        title: "Safety & Emergency",
        desc: "Emergency contacts, reporting, and important reminders to stay safe in daily situations.",
        href: "/guide/safety",
        anim: safetyAnim,
      },
      {
        key: "work",
        title: "Work & Internships",
        desc: "Work permits, part-time rules, and internship-related guidance and resources.",
        href: "/guide/work",
        anim: workAnim,
      },
    ],
    []
  );

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* Header（照你 Transportation 的寫法：上面一段標題 + 描述） */}
      <div className="mb-8">
        <h2 className="mt-2 text-2xl font-bold text-gray-800">
          Everything you need to <span className="text-emerald-600">settle in</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-[680px]">
          Browse essential guides for international students at CCU. Pick a topic to see step-by-step info and FAQs.
        </p>
      </div>

      {/* Quick tip（跟原本一樣，但做成像 Transportation 那種卡片區塊感） */}
      <div className="mb-10">
        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-5">
          <div className="text-sm font-bold text-gray-900">Quick tip</div>
          <div className="mt-2 text-sm leading-6 text-gray-500">
            Hover any icon to preview the motion. Click to open the full guide page.
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Arrival", "Daily life", "Money", "Health", "Safety", "Work"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {items.map((item) => (
          <GuideCard key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}