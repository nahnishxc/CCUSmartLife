// @/app/announcement/CategoryCard.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CategoryCardConfig, AnnouncementCategory } from "./announcementData";


export const CATEGORY_CARDS: Array<CategoryCardConfig> = [
  {
    key: "活動訊息",
    title: "Campus Events",
    subtitle: "Activities, festivals, and student events",
    imageSrc: "https://images.unsplash.com/photo-1506784919141-93ad14948a4a?w=400", 
  },
  {
    key: "OIA",
    title: "OIA Announcements",
    subtitle: "International Office updates & guides",
    imageSrc: "https://images.unsplash.com/photo-1506784919141-93ad14948a4a?w=400",
  },
  {
    key: "精選訊息",
    title: "Highlights",
    subtitle: "Featured & important notices",
    imageSrc: "https://images.unsplash.com/photo-1506784919141-93ad14948a4a?w=400",
  },
  {
    key: "學術活動",
    title: "Academic Events",
    subtitle: "Talks, seminars, and academic activities",
    imageSrc: "https://images.unsplash.com/photo-1506784919141-93ad14948a4a?w=400",
  },
  {
    key: "行政事務",
    title: "Administration Notice",
    subtitle: "Dorm, utilities, policies, deadlines",
    imageSrc: "https://images.unsplash.com/photo-1506784919141-93ad14948a4a?w=400L",
  },
];

export function CategoryCard({
  card,
  className,
  onClick,
}: {
  card: CategoryCardConfig;
  className?: string;
  onClick: () => void;
}) {
  const hasImage = Boolean(card.imageSrc);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={[
        "group relative w-full rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 text-left",
        className ?? "",
      ].join(" ")}
    >
      {/* 圖片區 (cover -> 自動裁切，不會灰邊) */}
      <div className="absolute inset-0">
        {hasImage ? (
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${card.imageSrc})` }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
      </div>

      {/* 文字 */}
      <div className="relative h-full p-5 md:p-6 flex flex-col justify-end">
        <p className="text-white/90 text-[11px] md:text-xs tracking-wide">
          {card.subtitle}
        </p>
        <div className="mt-1 flex items-end justify-between gap-4">
          <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
            {card.title}
          </h3>

          <div className="shrink-0 w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white group-hover:bg-emerald-500 transition-all duration-300">
            <ArrowRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
}