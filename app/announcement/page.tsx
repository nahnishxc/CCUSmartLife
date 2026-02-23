"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Bell, ChevronLeft } from "lucide-react";

/** 1) 來源：維持你原本寫法 */
interface AnnouncementSourceType {
  // 只是為了給 TS 用，不影響 runtime
}
type AnnouncementSource = "OIA" | "CCU" | "General";

/** 2) 分類 key */
type AnnouncementCategory =
  | "campus_event"
  | "oia_announcement"
  | "highlights"
  | "academic_events"
  | "administration_notice";

/** 3) 你的資料結構（我只新增 category，可選） */
interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  source: AnnouncementSource;
  link: string;
  isNew?: boolean;
  category?: AnnouncementCategory;
}

/** 假資料 */
const mockData: AnnouncementItem[] = [
  {
    id: "1",
    title: "2026 Spring Semester International Student Enrollment Guide",
    date: "2026-01-15",
    source: "OIA",
    link: "https://oia.ccu.edu.tw",
    isNew: true,
    category: "oia_announcement",
  },
  {
    id: "2",
    title: "Important: Dormitory Application Deadline Extension",
    date: "2026-01-14",
    source: "CCU",
    link: "https://www.ccu.edu.tw",
    isNew: true,
    category: "administration_notice",
  },
  {
    id: "3",
    title: "Campus Main Library Opening Hours during Lunar New Year",
    date: "2026-01-10",
    source: "General",
    link: "#",
    category: "highlights",
  },
  {
    id: "4",
    title: "Suspension of water supply in District A on Jan 20",
    date: "2026-01-08",
    source: "CCU",
    link: "#",
    category: "administration_notice",
  },
  {
    id: "5",
    title: "Scholarship Opportunity: Taiwan Grid Iron Security",
    date: "2026-01-05",
    source: "OIA",
    link: "#",
    category: "oia_announcement",
  },
  {
    id: "6",
    title: "Invitation to the International Cultural Festival",
    date: "2025-12-28",
    source: "OIA",
    link: "#",
    category: "campus_event",
  },
];

/** 5 張入口卡（你只要換 imageSrc） */
const CATEGORY_CARDS: Array<{
  key: AnnouncementCategory;
  title: string;
  subtitle: string;
  imageSrc?: string;
}> = [
  {
    key: "campus_event",
    title: "Campus Events",
    subtitle: "Activities, festivals, and student events",
    imageSrc: "",
  },
  {
    key: "oia_announcement",
    title: "OIA Announcements",
    subtitle: "International Office updates & guides",
    imageSrc: "",
  },
  {
    key: "highlights",
    title: "Highlights",
    subtitle: "Featured & important notices",
    imageSrc: "",
  },
  {
    key: "academic_events",
    title: "Academic Events",
    subtitle: "Talks, seminars, and academic activities",
    imageSrc: "",
  },
  {
    key: "administration_notice",
    title: "Administration Notice",
    subtitle: "Dorm, utilities, policies, deadlines",
    imageSrc: "",
  },
];

function fallbackCategory(item: AnnouncementItem): AnnouncementCategory {
  if (item.category) return item.category;
  if (item.source === "OIA") return "oia_announcement";
  if (item.source === "CCU") return "administration_notice";
  return "highlights";
}

function SourceBadge({ source }: { source: AnnouncementSource }) {
  return (
    <span
      className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${
        source === "OIA"
          ? "bg-orange-50 text-orange-600"
          : source === "CCU"
          ? "bg-blue-50 text-blue-600"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {source}
    </span>
  );
}

/** ✅ 入口版型：左右同寬，但「長/高」不對稱（貼近你 Figma） */
function CategoryLanding({
  onPick,
}: {
  onPick: (c: AnnouncementCategory) => void;
}) {
  const campus = CATEGORY_CARDS[0];
  const oia = CATEGORY_CARDS[1];
  const highlights = CATEGORY_CARDS[2];
  const academic = CATEGORY_CARDS[3];
  const admin = CATEGORY_CARDS[4];

  return (
    <div className="w-full">
      {/* 外層固定 grid：左右兩欄等寬 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 左欄：上大（campus），下橫條（oia） */}
        <div className="flex flex-col gap-6">
          <CategoryCard
            card={campus}
            className="h-[240px] md:h-[360px]"
            onClick={() => onPick(campus.key)}
          />
          <CategoryCard
            card={oia}
            className="h-[160px] md:h-[240px]"
            onClick={() => onPick(oia.key)}
          />
        </div>

        {/* 右欄：上橫條（highlights），下兩張小卡（academic/admin） */}
        <div className="flex flex-col gap-6">
          <CategoryCard
            card={highlights}
            className="h-[180px] md:h-[300px]"
            onClick={() => onPick(highlights.key)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CategoryCard
              card={academic}
              className="h-[200px] md:h-[300px]"
              onClick={() => onPick(academic.key)}
            />
            <CategoryCard
              card={admin}
              className="h-[200px] md:h-[300px]"
              onClick={() => onPick(admin.key)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  card,
  className,
  onClick,
}: {
  card: (typeof CATEGORY_CARDS)[number];
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
      {/* 圖片區（cover -> 自動裁切，不會灰邊） */}
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

function AnnouncementList({ items }: { items: AnnouncementItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-4 custom-scrollbar">
      {items.map((item, index) => (
        <motion.a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <SourceBadge source={item.source} />
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                {item.date}
              </span>
            </div>

            {item.isNew && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </div>

          <h3 className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-relaxed">
            {item.title}
          </h3>

          <div className="mt-4 flex justify-end">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <ArrowRight
                size={16}
                className="-ml-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export default function Announcement() {
  const [activeCategory, setActiveCategory] =
    useState<AnnouncementCategory | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return [];
    return mockData.filter((x) => fallbackCategory(x) === activeCategory);
  }, [activeCategory]);

  const activeTitle = useMemo(() => {
    if (!activeCategory) return "Announcements";
    return CATEGORY_CARDS.find((c) => c.key === activeCategory)?.title ?? "Announcements";
  }, [activeCategory]);

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {activeCategory ? (
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="w-9 h-9 rounded-full border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition flex items-center justify-center text-gray-500"
              aria-label="Back"
              title="Back"
            >
              <ChevronLeft size={18} />
            </button>
          ) : null}

          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="text-emerald-600" size={20} />
            {activeTitle}
          </h2>
        </div>

        <span className="text-xs text-gray-400">
          Sources: CCU Official & OIA Website
        </span>
      </div>

      {!activeCategory ? (
        <CategoryLanding onPick={setActiveCategory} />
      ) : (
        <AnnouncementList items={filtered} />
      )}
    </div>
  );
}
