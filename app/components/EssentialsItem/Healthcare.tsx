"use client";
import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. 定義資料結構 ---
interface Clinic {
  id: string;
  name: string;
  desc: string;
  contact: string;
  address: string;
  tag: string;
  imageColor: string;
}

interface ClinicCategory {
  title: string; // 用於選單顯示的名稱 (例如: "Internal Med")
  fullTitle: string; // 完整標題 (例如: "Internal Medicine & Surgery Clinics")
  clinics: Clinic[];
}

// --- 2. 假資料：醫院 (固定顯示) ---
const HOSPITALS_CATEGORY: ClinicCategory = {
  title: "Hospitals",
  fullTitle: "Hospitals (Large Medical Centers)",
  clinics: [
    {
      id: "h1",
      name: "Dalin Tzu Chi Hospital",
      desc: "Comprehensive medical center with 24hr ER.",
      contact: "05-264-8000",
      address: "No. 2, Minsheng Rd., Dalin",
      tag: "General Hospital",
      imageColor: "bg-emerald-100"
    },
    {
      id: "h2",
      name: "Chiayi Christian Hospital",
      desc: "Regional teaching hospital nearby.",
      contact: "05-276-5041",
      address: "No. 539, Zhongxiao Rd., East Dist.",
      tag: "General Hospital",
      imageColor: "bg-blue-100"
    },
  ]
};

// --- 3. 假資料：診所 (選單切換) ---
const CLINICS_DATA: ClinicCategory[] = [
  {
    title: "Internal & Surgery",
    fullTitle: "Internal Medicine & Surgery Clinics",
    clinics: [
      {
        id: "is1",
        name: "Dr. Lin's ENT & Internal Medicine",
        desc: "Specializes in flu, cold, and throat issues.",
        contact: "05-272-1111",
        address: "No. 88, University Rd. Sec 1",
        tag: "Internal Med",
        imageColor: "bg-orange-100"
      },
      {
        id: "is2",
        name: "Minxiong Orthopedic Surgery",
        desc: "Sports injuries, rehabilitation & X-ray.",
        contact: "05-226-2222",
        address: "No. 45, Minxiong Downtown Rd.",
        tag: "Surgery",
        imageColor: "bg-red-100"
      },
      {
        id: "is3",
        name: "Care Plus Family Medicine",
        desc: "Vaccinations and general health checkups.",
        contact: "05-226-3333",
        address: "No. 12, Fuxing Rd.",
        tag: "Family Med",
        imageColor: "bg-yellow-100"
      },
      {
        id: "is4",
        name: "Healthy Life Clinic",
        desc: "Chronic disease management.",
        contact: "05-226-4444",
        address: "No. 101, Wenhua Rd.",
        tag: "Internal Med",
        imageColor: "bg-green-100"
      },
    ]
  },
  {
    title: "Dental",
    fullTitle: "Dental Clinics",
    clinics: [
      {
        id: "d1",
        name: "Smile Dental Clinic",
        desc: "Professional teeth cleaning and filling.",
        contact: "05-272-5555",
        address: "No. 168, Daxue Rd.",
        tag: "Dental",
        imageColor: "bg-purple-100"
      },
      {
        id: "d2",
        name: "Bright Tooth Clinic",
        desc: "Root canal specialist and implants.",
        contact: "05-226-6666",
        address: "No. 5, Minxiong Station St.",
        tag: "Dental",
        imageColor: "bg-pink-100"
      },
      {
        id: "d3",
        name: "University Dental Center",
        desc: "Convenient location for students.",
        contact: "05-272-7777",
        address: "Near Activity Center",
        tag: "Dental",
        imageColor: "bg-indigo-100"
      },
    ]
  },
  {
    title: "TCM",
    fullTitle: "Traditional Chinese Medicine",
    clinics: [
      {
        id: "t1",
        name: "Harmony TCM Clinic",
        desc: "Acupuncture, cupping and herbal medicine.",
        contact: "05-272-8888",
        address: "No. 20, Minxiong Old Street",
        tag: "TCM",
        imageColor: "bg-amber-100"
      },
      {
        id: "t2",
        name: "Nature Heal TCM",
        desc: "Bone setting and massage therapy.",
        contact: "05-226-9999",
        address: "No. 33, Jianguo Rd.",
        tag: "TCM",
        imageColor: "bg-lime-100"
      },
    ]
  },
  {
    title: "Eye & Skin",
    fullTitle: "Ophthalmology & Dermatology",
    clinics: [
      {
        id: "es1",
        name: "Bright Eyes Clinic",
        desc: "Vision check and eye infections.",
        contact: "05-226-1010",
        address: "Minxiong Downtown",
        tag: "Eye",
        imageColor: "bg-cyan-100"
      },
      {
        id: "es2",
        name: "Clear Skin Center",
        desc: "Acne treatment and allergies.",
        contact: "05-226-2020",
        address: "Wenhua Rd.",
        tag: "Skin",
        imageColor: "bg-rose-100"
      }
    ]
  }
];

export default function Healthcare() {
  // 狀態：目前選中的診所分類索引 (預設第 0 個)
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 總標題區 */}
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">Campus Healthcare</h2>
        <p className="text-sm text-gray-500 mt-1">Contracted clinics and hospitals nearby.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10 flex flex-col gap-10">
        
        {/* --- 第一排：固定顯示醫院 (Hospitals) --- */}
        <ClinicRow category={HOSPITALS_CATEGORY} />

        {/* --- 第二排：診所 (選單 + 動態內容) --- */}
        <div className="flex flex-col gap-4">
          
          {/* 1. 選單列 (Menu Bar) */}
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

          {/* 2. 動態顯示對應的診所內容 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategoryIndex} // Key 改變會觸發重新渲染與動畫
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* 這裡複用 ClinicRow，但要稍微改造一下讓它不顯示重複的標題，或者顯示完整標題 */}
              <ClinicRow 
                category={CLINICS_DATA[selectedCategoryIndex]} 
                hideDefaultTitle={true} // 我們自己上面有選單了，所以隱藏元件內的小標題
                customTitle={CLINICS_DATA[selectedCategoryIndex].fullTitle} // 顯示在卡片上方的完整描述
              />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}

// --- 單列元件 (負責橫向捲動) ---
// 增加 props: hideDefaultTitle, customTitle 來適應不同場景
function ClinicRow({ 
  category, 
  hideDefaultTitle = false, 
  customTitle 
}: { 
  category: ClinicCategory, 
  hideDefaultTitle?: boolean,
  customTitle?: string
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

  return (
    <div className="flex flex-col gap-4 relative group/row">
      {/* 標題區：如果是醫院(預設)就顯示，如果是診所區(有選單)則顯示客製化副標題 */}
      {!hideDefaultTitle && (
        <div className="flex items-center gap-2 px-1">
          <div className="w-0 h-0 border-l-[6px] border-l-emerald-500 border-y-[6px] border-y-transparent ml-1"></div>
          <h3 className="text-lg font-bold text-gray-800">【 {category.fullTitle} 】</h3>
        </div>
      )}
      
      {/* 診所區的副標題提示 (灰色小字) */}
      {hideDefaultTitle && customTitle && (
        <div className="px-2 text-sm text-gray-400 font-bold flex items-center gap-2">
           <Stethoscope size={14} />
           {customTitle}
        </div>
      )}

      {/* 左右控制按鈕 */}
      <div className="absolute top-[60%] -translate-y-1/2 left-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button 
          onClick={() => scroll("left")}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -ml-3"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute top-[60%] -translate-y-1/2 right-0 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button 
          onClick={() => scroll("right")}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all -mr-3"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* 橫向捲動區 */}
      <div 
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar scroll-smooth"
      >
        {category.clinics.map((clinic) => (
          <div 
            key={clinic.id}
            className="flex-shrink-0 w-[400px] bg-gray-50 p-5 rounded-2xl border border-gray-100 flex gap-5 items-start hover:border-emerald-200 hover:shadow-md transition-all select-none"
          >
            <div className={`w-20 h-20 ${clinic.imageColor} rounded-xl flex-shrink-0 flex items-center justify-center text-gray-500/30 font-bold text-xs`}>
              IMG
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-800 text-lg truncate mb-1">
                {clinic.name}
              </h4>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed h-10">
                {clinic.desc}
              </p>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="shrink-0 text-emerald-600" />
                  <span className="truncate font-medium">{clinic.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} className="shrink-0 text-emerald-600" />
                  <span className="truncate">{clinic.address}</span>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-block bg-white border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-md font-bold tracking-wide">
                  {clinic.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="w-2 flex-shrink-0"></div>
      </div>
    </div>
  );
}