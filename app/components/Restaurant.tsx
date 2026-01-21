"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  ArrowLeft, 
  ExternalLink,
  X,
  Filter
} from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  brief: string;
  intro: string;
  rating: number;
  address: string;
  contact: string;
  googleMapUrl: string;
  tags: string[];
  imageUrl: string;
}

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Morning Glory Breakfast",
    brief: "Best sandwiches in CCU.",
    intro: "Located right next to the dormitory, Morning Glory has been serving students for over 10 years. We are famous for our handmade sandwiches and fresh brewed coffee.",
    rating: 4.8,
    address: "No. 168, Daxue Rd.",
    contact: "05-272-0001",
    googleMapUrl: "#",
    tags: ["Breakfast", "Coffee", "Cheap"],
    imageUrl: "bg-green-100",
  },
  {
    id: "2",
    name: "Uncle John's Pasta",
    brief: "Authentic Italian pasta.",
    intro: "Uncle John brings the taste of Italy to Chiayi. Our sauces are made from scratch every morning.",
    rating: 4.5,
    address: "No. 123, Sec. 2, Wenhua Rd.",
    contact: "05-272-1234",
    googleMapUrl: "#",
    tags: ["Lunch", "Pasta", "Vegetarian"],
    imageUrl: "bg-green-100",
  },
  {
    id: "3",
    name: "CCU Cafeteria",
    brief: "Buffet style dishes.",
    intro: "The main cafeteria on campus offering a wide range of buffet style dishes. Quick, easy, and nutritious.",
    rating: 3.8,
    address: "Activity Center 1F",
    contact: "05-272-5678",
    googleMapUrl: "#",
    tags: ["Buffet", "Campus", "Dinner", "Cheap"],
    imageUrl: "bg-green-100",
  },
  {
    id: "4",
    name: "Late Night Snacks",
    brief: "Fried chicken & tea.",
    intro: "Open until 2 AM. The best choice for students burning the midnight oil.",
    rating: 4.9,
    address: "Mingxiong Night Market",
    contact: "0912-345-678",
    googleMapUrl: "#",
    tags: ["Snack", "Late Night", "Fried"],
    imageUrl: "bg-green-100",
  },
  {
    id: "5",
    name: "Healthy Green Box",
    brief: "Low calorie boiled meals.",
    intro: "Perfect for gym lovers. Balanced nutrition with low sodium and oil.",
    rating: 4.6,
    address: "Daxue Rd. Alley 5",
    contact: "05-272-9999",
    googleMapUrl: "#",
    tags: ["Healthy", "Lunch", "Gym", "Vegetarian"],
    imageUrl: "bg-green-100",
  },
  {
    id: "6",
    name: "Seven Tea Shop",
    brief: "Refreshments & toast.",
    intro: "Best bubble tea in town with freshly baked toast.",
    rating: 4.2,
    address: "Commotion Street",
    contact: "05-272-8888",
    googleMapUrl: "#",
    tags: ["Drink", "Snack", "Sweet"],
    imageUrl: "bg-green-100",
  },
  {
    id: "7",
    name: "Beef Noodle King",
    brief: "Traditional spicy noodles.",
    intro: "Soup simmered for 24 hours with secret herbs.",
    rating: 4.7,
    address: "Main Street",
    contact: "05-272-7777",
    googleMapUrl: "#",
    tags: ["Dinner", "Noodle", "Spicy"],
    imageUrl: "bg-green-100",
  },
  {
    id: "8",
    name: "Family Dumplings",
    brief: "Handmade juicy dumplings.",
    intro: "Taste like home. Freshly made every day.",
    rating: 4.4,
    address: "Side Gate",
    contact: "05-272-6666",
    googleMapUrl: "#",
    tags: ["Lunch", "Dumpling", "Cheap"],
    imageUrl: "bg-green-100",
  },
];

// 基礎標籤
const BASIC_TAGS = ["All", "Breakfast", "Lunch", "Dinner", "Vegetarian", "Halal"];

// 進階標籤 (用於搜尋展開時顯示)
const MORE_TAGS = [
  { category: "Type", tags: ["Cafe", "Snack", "Drink", "Buffet", "Noodle", "Dumpling"] },
  { category: "Feature", tags: ["Cheap", "Gym", "Late Night", "Spicy", "Fried", "Sweet"] }
];

export default function Restaurant() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // --- 狀態管理 ---
  // 1. 搜尋文字
  const [searchQuery, setSearchQuery] = useState("");
  // 2. 目前選中的標籤 (預設 All)
  const [activeTag, setActiveTag] = useState("All");
  // 3. 搜尋框是否被 Focus (用來控制展開面板)
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // 當切換檢視時滾動回頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedId]);

  // --- 核心邏輯：過濾餐廳 ---
  const filteredRestaurants = MOCK_RESTAURANTS.filter((restaurant) => {
    // 1. 標籤篩選：如果是 "All" 就通過，否則檢查 tags 是否包含 activeTag
    const matchTag = activeTag === "All" || restaurant.tags.includes(activeTag);
    
    // 2. 關鍵字搜尋：檢查名稱或簡介是否包含搜尋文字 (不分大小寫)
    const query = searchQuery.toLowerCase();
    const matchSearch = 
      restaurant.name.toLowerCase().includes(query) || 
      restaurant.brief.toLowerCase().includes(query) ||
      restaurant.tags.some(t => t.toLowerCase().includes(query));

    // 兩者都要符合
    return matchTag && matchSearch;
  });

  // 取得選中的餐廳資料 (詳情頁用)
  const selectedRestaurant = MOCK_RESTAURANTS.find(r => r.id === selectedId);

  // 詳情頁的推薦邏輯
  const relatedRestaurants = selectedRestaurant 
    ? MOCK_RESTAURANTS.filter(r => 
        r.id !== selectedRestaurant.id && 
        r.tags.some(t => selectedRestaurant.tags.includes(t))
      ).slice(0, 3) 
    : [];

  // 處理點擊標籤 (包含一般標籤和進階標籤)
  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // 如果是在搜尋展開模式下點的，可以選擇要不要關閉面板，這裡先選擇保持開啟或依需求調整
    // setIsSearchFocused(false); // 如果想點了就收起來，把這行註解打開
  };

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        
        {/* === List View === */}
        {view === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col gap-8"
          >
            {/* --- 上方控制區 (Search & Tags) --- */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative z-20">
              
              {/* 1. 搜尋列 */}
              <div className="w-full max-w-2xl mb-6 relative">
                <div className="relative w-full z-30">
                  <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-emerald-600" : "text-gray-400"}`} size={22} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    // 這裡不放 onBlur 是因為點擊下方的 Tag 會先觸發 Blur 導致面板消失無法點擊
                    // 我們改用下方的透明遮罩層來處理關閉
                    placeholder="Search for food..." 
                    className={`w-full bg-gray-100 rounded-2xl py-4 pl-14 pr-10 text-base focus:outline-none transition-all placeholder-gray-400 font-medium ${isSearchFocused ? "ring-2 ring-emerald-200 bg-white shadow-lg" : ""}`}
                  />
                  {/* 清除搜尋按鈕 */}
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* 2. 圖一功能：搜尋展開面板 (Mega Menu) */}
                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
                    >
                      <div className="p-6 bg-gray-50/50">
                        <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs font-bold uppercase tracking-wider">
                          <Filter size={12} />
                          More Filters
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {MORE_TAGS.map((group, idx) => (
                            <div key={idx}>
                              <h4 className="text-sm font-bold text-gray-800 mb-3">{group.category}</h4>
                              <div className="flex flex-wrap gap-2">
                                {group.tags.map((tag) => (
                                  <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                      activeTag === tag 
                                        ? "bg-emerald-500 text-white border-emerald-500 shadow-md" 
                                        : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. 基礎標籤列 (圖二功能) */}
              {/* 當搜尋展開時，這一列可以選擇隱藏，或是保留。這裡我保留它，讓使用者知道目前狀態 */}
              <div className="w-full flex justify-center flex-wrap gap-3">
                {BASIC_TAGS.map((tag, i) => {
                  const isActive = activeTag === tag;
                  return (
                    <button 
                      key={i}
                      onClick={() => handleTagClick(tag)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border hover:scale-105 active:scale-95 ${
                        isActive 
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md" // 圖二：選中時變色
                          : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-emerald-50 hover:text-emerald-600"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 透明遮罩層：當搜尋展開時，點擊背景關閉面板 */}
            {isSearchFocused && (
              <div 
                className="fixed inset-0 z-10 bg-black/5" 
                onClick={() => setIsSearchFocused(false)}
              />
            )}

            {/* --- 下方列表區 --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10 relative z-0"> 
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedId(item.id);
                      setView("detail");
                    }}
                    className="cursor-pointer group bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all flex gap-5 items-stretch h-[170px]"
                  >
                    <div className={`w-[130px] h-full ${item.imageUrl} rounded-2xl flex-shrink-0 flex items-center justify-center text-gray-400/50 font-bold tracking-wider`}>
                        IMG
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-bold text-gray-800 text-xl group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                          {item.brief}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin size={14} className="shrink-0" />
                          <span className="truncate">{item.address}</span>
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="flex items-center gap-1.5">
                              <Star size={16} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-bold text-gray-700">{item.rating}</span>
                            </div>
                            <div className="flex gap-1.5 flex-wrap overflow-hidden h-6 justify-end">
                              {item.tags.slice(0, 2).map((t, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap">
                                  {t}
                                </span>
                              ))}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // 查無資料時的顯示
                <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-20 text-gray-400">
                  <Search size={48} className="mb-4 opacity-20" />
                  <p>No restaurants found matching "{activeTag}" or "{searchQuery}"</p>
                  <button 
                    onClick={() => { setActiveTag("All"); setSearchQuery(""); }}
                    className="mt-4 text-emerald-600 font-bold hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* === Detail View (保持不變) === */}
        {view === "detail" && selectedRestaurant && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100"
          >
            <button 
              onClick={() => setView("list")}
              className="self-start mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors bg-gray-50 px-4 py-2 rounded-full font-medium"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
              <div className={`md:col-span-5 w-full aspect-[4/3] ${selectedRestaurant.imageUrl} rounded-3xl shadow-inner relative overflow-hidden`}>
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400/30 font-bold text-2xl">
                    4:3 IMAGE
                 </div>
              </div>
              
              <div className="md:col-span-7 flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
                    {selectedRestaurant.name}
                  </h2>
                  <p className="text-base text-gray-500 font-medium">
                    {selectedRestaurant.brief}
                  </p>
                </div>
                
                 <div className="flex items-center gap-3">
                   <div className="flex">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={22} className={`${i < Math.floor(selectedRestaurant.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                     ))}
                   </div>
                   <span className="text-xl font-bold text-gray-700">({selectedRestaurant.rating})</span>
                </div>

                <div className="space-y-4 text-base text-gray-600 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <MapPin size={22} className="mt-0.5 shrink-0 text-gray-400" />
                    <span className="font-medium">{selectedRestaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={22} className="text-gray-400" />
                    <span className="font-medium">{selectedRestaurant.contact}</span>
                  </div>
                  <a href={selectedRestaurant.googleMapUrl} target="_blank" className="flex items-center gap-4 text-emerald-600 hover:underline font-bold transition-colors group">
                    <ExternalLink size={22} className="group-hover:scale-110 transition-transform"/>
                    View on Google Maps
                  </a>
                </div>

                 <div className="flex gap-2 pt-2 flex-wrap">
                  {selectedRestaurant.tags.map((t, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wide">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-16 max-w-4xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                About the Restaurant
                <div className="h-px w-20 bg-gray-200"></div>
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg text-justify">
                {selectedRestaurant.intro}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-10">
              <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider flex items-center gap-2">
                Explore More <ArrowLeft className="rotate-180" size={14}/>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedRestaurants.length > 0 ? (
                  relatedRestaurants.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                      }}
                      className="cursor-pointer group bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-emerald-200 transition-all flex flex-col h-[220px]"
                    >
                      <div className={`w-full aspect-video ${item.imageUrl} rounded-xl mb-3 flex items-center justify-center text-gray-400/50 text-xs font-bold`}>
                        IMG
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1 text-lg">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                           <Star size={14} className="fill-yellow-400 text-yellow-400" />
                           <span className="text-xs font-bold text-gray-600">{item.rating}</span>
                        </div>
                         <div className="flex gap-1 mt-3 flex-wrap h-6 overflow-hidden">
                            {item.tags.slice(0, 2).map((t, i) => (
                              <span key={i} className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-medium">
                                {t}
                              </span>
                            ))}
                         </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-400 py-8 italic">
                    No similar restaurants found nearby.
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}