// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, X } from "lucide-react";
// import RestaurantCard from "./RestaurantCard";
// import RestaurantDetail from "./RestaurantDetail";

// // 1. 介面定義 (對齊後端 Schema)
// export interface RestaurantData {
//   id: string;
//   label: string;
//   data: {
//     name: string;
//     description: string;
//     content: string;
//     rating: number;
//     address: string;
//     contact: string;
//     mapUrl: string;
//     imageUrl: string;
//     attributes: string[];
//     tags: string[];
//   };
// }

// // 2. 轉換後的假資料 (已包裹在 data 內)
// const MOCK_RESTAURANTS: RestaurantData[] = [
//   {
//     id: "1",
//     label: "restaurant",
//     data: {
//       name: "Morning Glory Breakfast",
//       description: "Best sandwiches in CCU.",
//       content: "Located right next to the dormitory, Morning Glory has been serving students for over 10 years. We are famous for our handmade sandwiches and fresh brewed coffee.",
//       rating: 4.8,
//       address: "No. 168, Daxue Rd.",
//       contact: "05-272-0001",
//       mapUrl: "#",
//       tags: ["Breakfast", "Coffee", "Cheap"],
//       attributes: ["Breakfast", "Cheap"],
//       imageUrl: "bg-green-100",
//     },
//   },
//   {
//     id: "2",
//     label: "restaurant",
//     data: {
//       name: "Uncle John's Pasta",
//       description: "Authentic Italian pasta.",
//       content: "Uncle John brings the taste of Italy to Chiayi. Our sauces are made from scratch every morning.",
//       rating: 4.5,
//       address: "No. 123, Sec. 2, Wenhua Rd.",
//       contact: "05-272-1234",
//       mapUrl: "#",
//       tags: ["Lunch", "Pasta", "Vegetarian"],
//       attributes: ["Lunch", "Vegetarian"],
//       imageUrl: "bg-green-100",
//     },
//   },
//   {
//     id: "3",
//     label: "restaurant",
//     data: {
//       name: "CCU Cafeteria",
//       description: "Buffet style dishes.",
//       content: "The main cafeteria on campus offering a wide range of buffet style dishes. Quick, easy, and nutritious.",
//       rating: 3.8,
//       address: "Activity Center 1F",
//       contact: "05-272-5678",
//       mapUrl: "#",
//       tags: ["Buffet", "Campus", "Dinner", "Cheap"],
//       attributes: ["Campus", "Cheap"],
//       imageUrl: "bg-green-100",
//     },
//   },
//   {
//     id: "4",
//     label: "restaurant",
//     data: {
//       name: "Late Night Snacks",
//       description: "Fried chicken & tea.",
//       content: "Open until 2 AM. The best choice for students burning the midnight oil.",
//       rating: 4.9,
//       address: "Mingxiong Night Market",
//       contact: "0912-345-678",
//       mapUrl: "#",
//       tags: ["Snack", "Late Night", "Fried"],
//       attributes: ["Late Night", "Fried"],
//       imageUrl: "bg-green-100",
//     },
//   },
//   {
//     id: "5",
//     label: "restaurant",
//     data: {
//       name: "Healthy Green Box",
//       description: "Low calorie boiled meals.",
//       content: "Perfect for gym lovers. Balanced nutrition with low sodium and oil.",
//       rating: 4.6,
//       address: "Daxue Rd. Alley 5",
//       contact: "05-272-9999",
//       mapUrl: "#",
//       tags: ["Healthy", "Lunch", "Gym", "Vegetarian"],
//       attributes: ["Healthy", "Vegetarian"],
//       imageUrl: "bg-green-100",
//     },
//   },
//   {
//     id: "6",
//     label: "restaurant",
//     data: {
//       name: "Seven Tea Shop",
//       description: "Refreshments & toast.",
//       content: "Best bubble tea in town with freshly baked toast.",
//       rating: 4.2,
//       address: "Commotion Street",
//       contact: "05-272-8888",
//       mapUrl: "#",
//       tags: ["Drink", "Snack", "Sweet"],
//       attributes: ["Drink", "Snack"],
//       imageUrl: "bg-green-100",
//     },
//   },
//   {
//     id: "7",
//     label: "restaurant",
//     data: {
//       name: "Beef Noodle King",
//       description: "Traditional spicy noodles.",
//       content: "Soup simmered for 24 hours with secret herbs.",
//       rating: 4.7,
//       address: "Main Street",
//       contact: "05-272-7777",
//       mapUrl: "#",
//       tags: ["Dinner", "Noodle", "Spicy"],
//       attributes: ["Dinner", "Spicy"],
//       imageUrl: "bg-green-100",
//     },
//   },
//   {
//     id: "8",
//     label: "restaurant",
//     data: {
//       name: "Family Dumplings",
//       description: "Handmade juicy dumplings.",
//       content: "Taste like home. Freshly made every day.",
//       rating: 4.4,
//       address: "Side Gate",
//       contact: "05-272-6666",
//       mapUrl: "#",
//       tags: ["Lunch", "Dumpling", "Cheap"],
//       attributes: ["Lunch", "Cheap"],
//       imageUrl: "bg-green-100",
//     },
//   },
// ];

// const BASIC_TAGS = ["All", "Breakfast", "Lunch", "Dinner", "Vegetarian", "Halal"];
// const MORE_TAGS = [
//   { category: "Type", tags: ["Cafe", "Snack", "Drink", "Buffet", "Noodle", "Dumpling"] },
//   { category: "Feature", tags: ["Cheap", "Gym", "Late Night", "Spicy", "Fried", "Sweet"] }
// ];

// export default function RestaurantPage() {
//   const [restaurants] = useState<RestaurantData[]>(MOCK_RESTAURANTS);
//   const [view, setView] = useState<"list" | "detail">("list");
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTag, setActiveTag] = useState("All");
//   const [isSearchFocused, setIsSearchFocused] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [view, selectedId]);

//   // 修改篩選邏輯：從 r.data 存取欄位
//   const filteredRestaurants = restaurants.filter((r) => {
//     const matchTag = activeTag === "All" || r.data.tags.includes(activeTag);
//     const query = searchQuery.toLowerCase();
//     const nameMatch = r.data.name.toLowerCase().includes(query);
//     const tagMatch = r.data.tags.some(t => t.toLowerCase().includes(query));
//     return matchTag && (nameMatch || tagMatch);
//   });

//   const selectedRestaurant = restaurants.find(r => r.id === selectedId);

//   // 修改相關餐廳邏輯：從 r.data.tags 存取
//   const relatedRestaurants = selectedRestaurant
//     ? restaurants.filter(r =>
//         r.id !== selectedId &&
//         r.data.tags.some(t => selectedRestaurant.data.tags.includes(t))
//       ).slice(0, 3)
//     : [];

//   return (
//     <div className="w-full relative">
//       <AnimatePresence mode="wait">
//         {view === "list" ? (
//           <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col gap-8">
//             <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative z-20">
//               <div className="w-full max-w-2xl mb-6 relative">
//                 <div className="relative w-full z-30">
//                   <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-emerald-600" : "text-gray-400"}`} size={22} />
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => setIsSearchFocused(true)}
//                     placeholder="Search for food..."
//                     className={`w-full bg-gray-100 rounded-2xl py-4 pl-14 pr-10 text-base focus:outline-none transition-all ${isSearchFocused ? "ring-2 ring-emerald-200 bg-white shadow-lg" : ""}`}
//                   />
//                   {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><X size={18} /></button>}
//                 </div>

//                 <AnimatePresence>
//                   {isSearchFocused && (
//                     <>
//                       {/* 點擊遮罩，點擊搜尋框以外的地方關閉進階選單 */}
//                       <div className="fixed inset-0 z-10" onClick={() => setIsSearchFocused(false)} />
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
//                       >
//                         <div className="p-6 bg-gray-50/50">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {MORE_TAGS.map((group, idx) => (
//                               <div key={idx}>
//                                 <h4 className="text-sm font-bold text-gray-800 mb-3">{group.category}</h4>
//                                 <div className="flex flex-wrap gap-2">
//                                   {group.tags.map(tag => (
//                                     <button
//                                       key={tag}
//                                       onClick={() => {
//                                         setActiveTag(tag);
//                                         setIsSearchFocused(false);
//                                       }}
//                                       className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTag === tag ? "bg-emerald-500 text-white" : "bg-white text-gray-600 border"}`}
//                                     >
//                                       {tag}
//                                     </button>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </motion.div>
//                     </>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <div className="w-full flex justify-center flex-wrap gap-3">
//                 {BASIC_TAGS.map((tag) => (
//                   <button
//                     key={tag}
//                     onClick={() => setActiveTag(tag)}
//                     className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${activeTag === tag ? "bg-emerald-500 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:text-emerald-600"}`}
//                   >
//                     {tag}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
//               {filteredRestaurants.map((item) => (
//                 <RestaurantCard
//                   key={item.id}
//                   item={item}
//                   onClick={(id) => { setSelectedId(id); setView("detail"); }}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         ) : (
//           selectedRestaurant && (
//             <RestaurantDetail
//               restaurant={selectedRestaurant}
//               relatedRestaurants={relatedRestaurants}
//               onBack={() => setView("list")}
//               onSelectRelated={(id) => setSelectedId(id)}
//             />
//           )
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import RestaurantCard from "./RestaurantCard";
import RestaurantDetail from "./RestaurantDetail";

// 1. 介面定義 (保持與後端 Schema 一致)
export interface RestaurantData {
  id: string;
  label: string;
  data: {
    name: string;
    description: string;
    content: string;
    rating: number;
    address: string;
    contact: string;
    mapUrl: string;
    imageUrl: string;
    attributes: string[];
    tags: string[];
  };
}

const BASIC_TAGS = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Vegetarian",
  "Halal",
];
const MORE_TAGS = [
  {
    category: "Type",
    tags: ["Cafe", "Snack", "Drink", "Buffet", "Noodle", "Dumpling"],
  },
  {
    category: "Feature",
    tags: ["Cheap", "Gym", "Late Night", "Spicy", "Fried", "Sweet"],
  },
];

export default function RestaurantPage() {
  // 狀態管理
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // === 獲取 API 資料 ===
  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch("https://campus-ai-backend-1.onrender.com/restaurants");
  //       if (!response.ok) throw new Error("Network response was not ok");
  //       const data = await response.json();
  //       setRestaurants(data);
  //     } catch (error) {
  //       console.error("Failed to fetch:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchRestaurants();
  // }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        // 1. 執行抓取
        const response = await fetch(
          "https://campus-ai-backend-1.onrender.com/api/campus/restaurant",
        );

        // 2. 檢查 HTTP 狀態 (預防 404 或 500 錯誤回傳 HTML)
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API 回應錯誤內容:", errorText);
          throw new Error(`伺服器回應錯誤: ${response.status}`);
        }

        const rawData = await response.json();
console.log("API 原始資料:", rawData);

// 根據截圖，資料陣列在 rawData.data 裡面
const actualList = Array.isArray(rawData.data) ? rawData.data : [];

const formattedData: RestaurantData[] = actualList.map((item: any) => {
  return {
    // 1. 保持外層 ID 與 Label
    id: item.id || item._id,
    label: item.label || "restaurant",
    
    // 2. 核心：將後端平鋪的欄位，包裝進前端組件需要的 data 物件中
    data: {
      name: item.name || "未知餐廳",
      description: item.description || "暫無簡介", // 如果後端沒給，就給預設值
      content: item.content || item.description || "", 
      rating: item.rating || 0,
      address: item.address || "地址未提供",
      contact: item.contact || "電話未提供",
      mapUrl: item.mapUrl || "#",
      // 檢查後端欄位名是 imageUrl 還是 image_url
      imageUrl: item.imageUrl || item.image || item.image_url || "bg-emerald-50", 
      attributes: item.attributes || [],
      tags: item.tags || []
    }
  };
});

setRestaurants(formattedData);

        setRestaurants(formattedData);
      } catch (error) {
        console.error("RestaurantPage 發生錯誤:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view, selectedId]);

  // 篩選邏輯
  const filteredRestaurants = restaurants.filter((r) => {
    const matchTag = activeTag === "All" || r.data.tags.includes(activeTag);
    const query = searchQuery.toLowerCase();
    const nameMatch = r.data.name.toLowerCase().includes(query);
    const tagMatch = r.data.tags.some((t) => t.toLowerCase().includes(query));
    return matchTag && (nameMatch || tagMatch);
  });

  const selectedRestaurant = restaurants.find((r) => r.id === selectedId);

  const relatedRestaurants = selectedRestaurant
    ? restaurants
        .filter(
          (r) =>
            r.id !== selectedId &&
            r.data.tags.some((t) => selectedRestaurant.data.tags.includes(t)),
        )
        .slice(0, 3)
    : [];

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {view === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col gap-8"
          >
            {/* 搜尋與標籤區塊 */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative z-20">
              <div className="w-full max-w-2xl mb-6 relative">
                <div className="relative w-full z-30">
                  <Search
                    className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-emerald-600" : "text-gray-400"}`}
                    size={22}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search for food..."
                    className={`w-full bg-gray-100 rounded-2xl py-4 pl-14 pr-10 text-base focus:outline-none transition-all ${isSearchFocused ? "ring-2 ring-emerald-200 bg-white shadow-lg" : ""}`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* 進階標籤選單 */}
                <AnimatePresence>
                  {isSearchFocused && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsSearchFocused(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
                      >
                        <div className="p-6 bg-gray-50/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {MORE_TAGS.map((group, idx) => (
                              <div key={idx}>
                                <h4 className="text-sm font-bold text-gray-800 mb-3">
                                  {group.category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {group.tags.map((tag) => (
                                    <button
                                      key={tag}
                                      onClick={() => {
                                        setActiveTag(tag);
                                        setIsSearchFocused(false);
                                      }}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTag === tag ? "bg-emerald-500 text-white" : "bg-white text-gray-600 border"}`}
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
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* 基礎標籤 */}
              <div className="w-full flex justify-center flex-wrap gap-3">
                {BASIC_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${activeTag === tag ? "bg-emerald-500 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:text-emerald-600"}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 列表內容 */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
                {filteredRestaurants.map((item) => (
                  <RestaurantCard
                    key={item.id}
                    item={item}
                    onClick={(id) => {
                      setSelectedId(id);
                      setView("detail");
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          selectedRestaurant && (
            <RestaurantDetail
              restaurant={selectedRestaurant}
              relatedRestaurants={relatedRestaurants}
              onBack={() => setView("list")}
              onSelectRelated={(id) => setSelectedId(id)}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}
