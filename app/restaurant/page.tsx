

// "use client";
// import { useState, useMemo, useEffect, Suspense } from "react";
// import { useRouter, useSearchParams, usePathname } from "next/navigation"; 
// import useSWR from "swr";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, X, UtensilsCrossed } from "lucide-react"; // 引入 UtensilsCrossed 作為餐廳的 Icon
// import RestaurantCard from "./RestaurantCard";
// import RestaurantDetail from "./RestaurantDetail";

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

// const fetcher = (url: string) => fetch(url).then((res) => {
//   if (!res.ok) throw new Error(`伺服器回應錯誤: ${res.status}`);
//   return res.json();
// });

// function RestaurantContent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const view = searchParams.get("view") || "list";
//   const selectedId = searchParams.get("id");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTag, setActiveTag] = useState("All");
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [activeCategoryTab, setActiveCategoryTab] = useState("Type");

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [view, selectedId]);

//   const apiUrl = "https://campus-ai-backend-1.onrender.com/api/campus/restaurant";
  
//   const { data: rawData, error, isLoading } = useSWR(apiUrl, fetcher, {
//     revalidateOnFocus: true, 
//     dedupingInterval: 5000,  
//   });

//   const { restaurants, dynamicBasicTags, dynamicMoreTags } = useMemo(() => {
//     const actualList = rawData && Array.isArray(rawData.data) ? rawData.data : [];
    
//     const uniqueList: any[] = [];
//     const seenNames = new Set();
//     actualList.forEach((item: any) => {
//         const itemName = item.name || "未知餐廳";
//         if (!seenNames.has(itemName)) {
//             seenNames.add(itemName);
//             uniqueList.push(item);
//         }
//     });

//     const formattedData: RestaurantData[] = uniqueList.map((item: any) => ({
//       id: item.id || item._id,
//       label: item.label || "restaurant",
//       data: {
//         name: item.name || "未知餐廳",
//         description: item.description || "暫無簡介",
//         content: item.content || item.description || "",
//         rating: item.rating || 0,
//         address: item.address || "地址未提供",
//         contact: item.contact || "電話未提供",
//         mapUrl: item.mapUrl || "#",
//         imageUrl: item.imageUrl || item.image || item.image_url || "bg-emerald-50",
//         attributes: item.attributes || [],
//         tags: item.tags || [],
//       },
//     }));

//     if (formattedData.length === 0) {
//       return { restaurants: [], dynamicBasicTags: ["All"], dynamicMoreTags: [] };
//     }

//     const tagCounts: Record<string, number> = {};
//     formattedData.forEach((item) => {
//       if (Array.isArray(item.data.tags)) {
//         item.data.tags.forEach((tag) => {
//           tagCounts[tag] = (tagCounts[tag] || 0) + 1;
//         });
//       }
//     });
//     const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

//     const excludeFromBasic = ["dine-in available", "takeout available", "takeout only"];
//     const basicTagsPool = sortedTags.filter((tag) => !excludeFromBasic.includes(tag.toLowerCase()));
//     const basicTags = ["All", ...basicTagsPool.slice(0, 7)];

//     const tagCategories: Record<string, string[]> = {
//       Type: [], Time: [], Feature: [], Others: [],
//     };

//     const typeKeywords = ["noodle", "rice", "hot pot", "dessert", "beverage", "burger", "fried", "italian", "japanese", "thai", "korean", "vietnamese", "steak", "bread", "street food", "braised", "ice", "healthy", "brunch", "snack", "cafe", "buffet", "dumpling", "taiwanese", "vegetarian", "halal"];
//     const timeKeywords = ["breakfast", "lunch", "dinner", "late-night", "weekend", "weekday", "morning"];
//     const featureKeywords = ["dine-in", "takeout", "cheap", "gym", "spicy", "sweet"];

//     sortedTags.forEach((tag) => {
//       const lowerTag = tag.toLowerCase();
//       if (typeKeywords.some((k) => lowerTag.includes(k))) {
//         tagCategories["Type"].push(tag);
//       } else if (timeKeywords.some((k) => lowerTag.includes(k))) {
//         tagCategories["Time"].push(tag);
//       } else if (featureKeywords.some((k) => lowerTag.includes(k))) {
//         tagCategories["Feature"].push(tag);
//       } else {
//         tagCategories["Others"].push(tag);
//       }
//     });

//     const moreTags = Object.keys(tagCategories)
//       .filter((key) => tagCategories[key].length > 0)
//       .map((key) => ({ category: key, tags: tagCategories[key] }));

//     return {
//       restaurants: formattedData,
//       dynamicBasicTags: basicTags,
//       dynamicMoreTags: moreTags
//     };
//   }, [rawData]);

//   const filteredRestaurants = restaurants.filter((r) => {
//     const matchActiveTag = activeTag === "All" || r.data.tags.includes(activeTag);
//     const query = searchQuery.toLowerCase().trim();
//     if (!query) return matchActiveTag;

//     const nameMatch = r.data.name.toLowerCase().includes(query);
//     const tagMatch = r.data.tags.some((t) => t.toLowerCase().includes(query));
//     const attributeMatch = r.data.attributes?.some((attr) => attr.toLowerCase().includes(query));
    
//     return matchActiveTag && (nameMatch || tagMatch || attributeMatch);
//   });

//   // --- 【新增：全版 Loading 狀態】 ---
//   // 當正在抓取資料，且目前畫面上還沒有任何餐廳可以顯示時，蓋上全版遮罩
//   if (isLoading && restaurants.length === 0) {
//     return (
//       <div className="w-full h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mb-4"></div>
//         <p className="text-gray-400 font-medium">Discovering delicious food...</p>
//       </div>
//     );
//   }

//   // --- 【新增：API 壞掉或完全無資料時的防呆】 ---
//   if (restaurants.length === 0 && !isLoading) {
//     return (
//       <div className="w-full h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
//         <UtensilsCrossed className="text-gray-200 mb-4" size={48} />
//         <p className="text-gray-400 font-medium">Restaurant information is currently unavailable.</p>
//         <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-gray-50 text-emerald-600 rounded-full font-bold text-sm hover:bg-emerald-50 transition-colors">
//           Retry Connection
//         </button>
//       </div>
//     );
//   }

//   const selectedRestaurant = restaurants.find((r) => r.id === selectedId);

//   const relatedRestaurants = selectedRestaurant
//     ? restaurants
//         .filter(
//           (r) =>
//             r.id !== selectedId &&
//             r.data.tags.some((t) => selectedRestaurant.data.tags.includes(t)),
//         )
//         .slice(0, 3)
//     : [];

//   if (error) {
//      console.error("載入餐廳失敗", error);
//   }

//   const openDetail = (id: string) => {
//     router.push(`?view=detail&id=${id}`);
//   };

//   const goBackToList = () => {
//     router.push(pathname); 
//   };

//   return (
//     <div className="w-full relative">
//       <AnimatePresence mode="wait">
//         {view === "list" ? (
//           <motion.div
//             key="list"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="w-full flex flex-col gap-8"
//           >
//             {/* 搜尋與標籤區塊 */}
//             <div className="bg-white rounded-3xl p-6 md:p-8 mb-10 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative z-20">
//               <div className="w-full max-w-2xl mb-4 relative">
//                 <div className="relative w-full z-30">
//                   <Search
//                     className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-emerald-600" : "text-gray-400"}`}
//                     size={22}
//                   />
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => setIsSearchFocused(true)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         setIsSearchFocused(false);
//                         e.currentTarget.blur();
//                       }
//                     }}
//                     placeholder="Search for food..."
//                     className={`w-full bg-gray-100 rounded-2xl py-4 pl-14 pr-10 text-base focus:outline-none transition-all ${isSearchFocused ? "ring-2 ring-emerald-200 bg-white shadow-lg" : ""}`}
//                   />
//                   {searchQuery && (
//                     <button
//                       onClick={() => setSearchQuery("")}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//                     >
//                       <X size={18} />
//                     </button>
//                   )}
//                 </div>

//                 {/* 進階標籤選單 */}
//                 <AnimatePresence>
//                   {isSearchFocused && (
//                     <>
//                       <div
//                         className="fixed inset-0 z-10"
//                         onClick={() => setIsSearchFocused(false)}
//                       />
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
//                       >
//                         <div className="flex flex-col">
//                           {/* 上半部：水平分頁標籤 (Tabs) */}
//                           <div className="flex border-b border-gray-100 bg-gray-50/50">
//                             {dynamicMoreTags.map((group) => {
//                               const isActive = activeCategoryTab === group.category || (!activeCategoryTab && group.category === dynamicMoreTags[0]?.category);
//                               return (
//                                 <button
//                                   key={group.category}
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     setActiveCategoryTab(group.category); 
//                                   }}
//                                   className={`flex-1 py-3 text-sm font-bold transition-colors ${
//                                     isActive
//                                       ? "text-emerald-600 border-b-2 border-emerald-500 bg-white"
//                                       : "text-gray-400 hover:text-gray-600"
//                                   }`}
//                                 >
//                                   {group.category}
//                                 </button>
//                               );
//                             })}
//                           </div>

//                           {/* 下半部：該 Tab 對應的標籤內容區 */}
//                           <div className="p-5 bg-white max-h-[250px] overflow-y-auto">
//                             <div className="flex flex-wrap gap-2">
//                               {dynamicMoreTags
//                                 .find((g) => g.category === (activeCategoryTab || dynamicMoreTags[0]?.category))
//                                 ?.tags.map((tag) => (
//                                   <button
//                                     key={tag}
//                                     onClick={() => {
//                                       setActiveTag(tag);
//                                       setSearchQuery("");
//                                       setIsSearchFocused(false);
//                                     }}
//                                     className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                                       activeTag === tag 
//                                         ? "bg-emerald-500 text-white shadow-md" 
//                                         : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50"
//                                     }`}
//                                   >
//                                     {tag}
//                                   </button>
//                                 ))}
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     </>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* 基礎標籤 */}
//               <div className="w-full flex justify-center flex-wrap gap-3 pt-2">
//                 {dynamicBasicTags.map((tag) => (
//                   <button
//                     key={tag}
//                     onClick={() => {
//                       setActiveTag(tag);
//                       setSearchQuery(""); 
//                     }}
//                     className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${activeTag === tag ? "bg-emerald-500 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:text-emerald-600"}`}
//                   >
//                     {tag}
//                   </button>
//                 ))}
//               </div>

//               {/* 列表內容 - 既然上面已經有全版 Loading 了，這裡就可以拔掉轉圈圈邏輯 */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10 mt-8">
//                 {filteredRestaurants.map((item) => (
//                   <RestaurantCard
//                     key={item.id}
//                     item={item}
//                     onClick={(id) => openDetail(id)} 
//                   />
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           selectedRestaurant && (
//             <RestaurantDetail
//               restaurant={selectedRestaurant}
//               relatedRestaurants={relatedRestaurants}
//               onBack={() => goBackToList()} 
//               onSelectRelated={(id) => openDetail(id)} 
//             />
//           )
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
// export default function RestaurantPage() {
//   return (
//     // 👉 3. 加入 Suspense 邊界，並設定載入中的 fallback 畫面
//     <Suspense fallback={<div>Loading...</div>}>
//       <RestaurantContent />
//     </Suspense>
//   );
// }

"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; 
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, UtensilsCrossed } from "lucide-react"; 
import RestaurantCard from "./RestaurantCard";
import RestaurantDetail from "./RestaurantDetail";

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

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error(`伺服器回應錯誤: ${res.status}`);
  return res.json();
});

function RestaurantContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const view = searchParams.get("view") || "list";
  const selectedId = searchParams.get("id");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState("Type");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view, selectedId]);

  const apiUrl = "https://campus-ai-backend-1.onrender.com/api/campus/restaurant";
  
  const { data: rawData, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: true, 
    dedupingInterval: 5000,  
  });

  const { restaurants, dynamicBasicTags, dynamicMoreTags } = useMemo(() => {
    const actualList = rawData && Array.isArray(rawData.data) ? rawData.data : [];
    
    const uniqueList: any[] = [];
    const seenNames = new Set();
    actualList.forEach((item: any) => {
        const itemName = item.name || "未知餐廳";
        if (!seenNames.has(itemName)) {
            seenNames.add(itemName);
            uniqueList.push(item);
        }
    });

    const formattedData: RestaurantData[] = uniqueList.map((item: any) => ({
      id: item.id || item._id,
      label: item.label || "restaurant",
      data: {
        name: item.name || "未知餐廳",
        description: item.description || "暫無簡介",
        content: item.content || item.description || "",
        rating: item.rating || 0,
        address: item.address || "地址未提供",
        contact: item.contact || "電話未提供",
        mapUrl: item.mapUrl || "#",
        imageUrl: item.imageUrl || item.image || item.image_url || "bg-emerald-50",
        attributes: item.attributes || [],
        tags: item.tags || [],
      },
    }));

    if (formattedData.length === 0) {
      return { restaurants: [], dynamicBasicTags: ["All"], dynamicMoreTags: [] };
    }

    const tagCounts: Record<string, number> = {};
    formattedData.forEach((item) => {
      if (Array.isArray(item.data.tags)) {
        item.data.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

    const excludeFromBasic = ["dine-in available", "takeout available", "takeout only"];
    const basicTagsPool = sortedTags.filter((tag) => !excludeFromBasic.includes(tag.toLowerCase()));
    const basicTags = ["All", ...basicTagsPool.slice(0, 7)];

    const tagCategories: Record<string, string[]> = {
      Type: [], Time: [], Feature: [], Others: [],
    };

    const typeKeywords = ["noodle", "rice", "hot pot", "dessert", "beverage", "burger", "fried", "italian", "japanese", "thai", "korean", "vietnamese", "steak", "bread", "street food", "braised", "ice", "healthy", "brunch", "snack", "cafe", "buffet", "dumpling", "taiwanese", "vegetarian", "halal"];
    const timeKeywords = ["breakfast", "lunch", "dinner", "late-night", "weekend", "weekday", "morning"];
    const featureKeywords = ["dine-in", "takeout", "cheap", "gym", "spicy", "sweet"];

    sortedTags.forEach((tag) => {
      const lowerTag = tag.toLowerCase();
      if (typeKeywords.some((k) => lowerTag.includes(k))) {
        tagCategories["Type"].push(tag);
      } else if (timeKeywords.some((k) => lowerTag.includes(k))) {
        tagCategories["Time"].push(tag);
      } else if (featureKeywords.some((k) => lowerTag.includes(k))) {
        tagCategories["Feature"].push(tag);
      } else {
        tagCategories["Others"].push(tag);
      }
    });

    const moreTags = Object.keys(tagCategories)
      .filter((key) => tagCategories[key].length > 0)
      .map((key) => ({ category: key, tags: tagCategories[key] }));

    return {
      restaurants: formattedData,
      dynamicBasicTags: basicTags,
      dynamicMoreTags: moreTags
    };
  }, [rawData]);

  const filteredRestaurants = restaurants.filter((r) => {
    const matchActiveTag = activeTag === "All" || r.data.tags.includes(activeTag);
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchActiveTag;

    const nameMatch = r.data.name.toLowerCase().includes(query);
    const tagMatch = r.data.tags.some((t) => t.toLowerCase().includes(query));
    const attributeMatch = r.data.attributes?.some((attr) => attr.toLowerCase().includes(query));
    
    return matchActiveTag && (nameMatch || tagMatch || attributeMatch);
  });

  // --- 【全版 Loading 狀態：換膚】 ---
  if (isLoading && restaurants.length === 0) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center bg-[#fffefb] rounded-3xl border border-[#eadfce] shadow-[0_10px_30px_rgba(90,70,40,0.06)]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-[#6f7b76] font-bold tracking-wide">Discovering delicious food...</p>
      </div>
    );
  }

  // --- 【API 壞掉或完全無資料時的防呆：換膚】 ---
  if (restaurants.length === 0 && !isLoading) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center bg-[#fffefb] rounded-3xl border border-dashed border-[#eadfce] shadow-inner">
        <UtensilsCrossed className="text-[#eadfce] mb-4" size={48} />
        <p className="text-[#6f7b76] font-bold">Restaurant information is currently unavailable.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-[#fffdf8] text-emerald-700 border border-[#eadfce] rounded-full font-bold text-sm hover:bg-[#eadfce]/20 transition-all shadow-sm">
          Retry Connection
        </button>
      </div>
    );
  }

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

  if (error) {
     console.error("載入餐廳失敗", error);
  }

  const openDetail = (id: string) => {
    router.push(`?view=detail&id=${id}`);
  };

  const goBackToList = () => {
    router.push(pathname); 
  };

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
            {/* 搜尋與標籤區塊：大面積背景改用用戶指定的極淺紙白 #fffefb */}
            <div className="bg-[#fffdf8] rounded-3xl p-6 md:p-8 mb-10 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col items-center justify-center relative z-20">
              <div className="w-full max-w-2xl mb-4 relative">
                <div className="relative w-full z-30">
                  <Search
                    className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-emerald-600" : "text-[#6f7b76]"}`}
                    size={22}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsSearchFocused(false);
                        e.currentTarget.blur();
                      }
                    }}
                    placeholder="Search for food..."
                    // 輸入框聚焦時改為純白背景，與極淺紙白拉開層次
                    className={`w-full bg-[#fbf8f1] rounded-2xl py-4 pl-14 pr-10 text-base focus:outline-none transition-all ${isSearchFocused ? "ring-2 ring-emerald-200 bg-white shadow-md" : "border border-transparent"}`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* 進階標籤選單：改用紙張材質與溫暖色調 */}
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
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#eadfce] overflow-hidden z-20"
                      >
                        <div className="flex flex-col">
                          {/* 上半部：水平分頁標籤 (Tabs) - 未選中使用米色底與米灰分隔線 */}
                          <div className="flex border-b border-[#eadfce] bg-[#fbf8f1]/60">
                            {dynamicMoreTags.map((group) => {
                              const isActive = activeCategoryTab === group.category || (!activeCategoryTab && group.category === dynamicMoreTags[0]?.category);
                              return (
                                <button
                                  key={group.category}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveCategoryTab(group.category); 
                                  }}
                                  className={`flex-1 py-3 text-sm font-bold transition-all ${
                                    isActive
                                      ? "text-emerald-700 border-b-2 border-emerald-500 bg-white"
                                      : "text-[#6f7b76] hover:text-gray-700"
                                  }`}
                                >
                                  {group.category}
                                </button>
                              );
                            })}
                          </div>

                          {/* 下半部：該 Tab 對應的標籤內容區 */}
                          <div className="p-5 bg-white max-h-[250px] overflow-y-auto custom-scrollbar">
                            <div className="flex flex-wrap gap-2">
                              {dynamicMoreTags
                                .find((g) => g.category === (activeCategoryTab || dynamicMoreTags[0]?.category))
                                ?.tags.map((tag) => (
                                  <button
                                    key={tag}
                                    onClick={() => {
                                      setActiveTag(tag);
                                      setSearchQuery("");
                                      setIsSearchFocused(false);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                      activeTag === tag 
                                        ? "bg-emerald-500 text-white shadow-md" 
                                        : "bg-[#fffdf8] text-gray-600 border border-[#eadfce] hover:border-emerald-300 hover:bg-emerald-50/50"
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* 基礎標籤：改為手帳標籤貼紙風格，未選中改用指定的 fffdf8 */}
              <div className="w-full flex justify-center flex-wrap gap-3 pt-2">
                {dynamicBasicTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveTag(tag);
                      setSearchQuery(""); 
                    }}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                      activeTag === tag 
                        ? "bg-emerald-500 text-white shadow-md border-transparent" 
                        : "bg-[#fffdf8] text-gray-600 border-[#eadfce] hover:text-emerald-700 hover:border-emerald-300 hover:bg-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* 列表內容 - 自由發揮點：在上方加入一條淡淡的手帳分頁虛線，拉開與下方卡片的間距 */}
              <div className="w-full border-t-2 border-dashed border-[#eadfce]/60 mt-8 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
                  {filteredRestaurants.map((item) => (
                    <RestaurantCard
                      key={item.id}
                      item={item}
                      onClick={(id) => openDetail(id)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          selectedRestaurant && (
            <RestaurantDetail
              restaurant={selectedRestaurant}
              relatedRestaurants={relatedRestaurants}
              onBack={() => goBackToList()} 
              onSelectRelated={(id) => openDetail(id)} 
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RestaurantPage() {
  return (
    // 👉 加入 Suspense 邊界，加載狀態也同步維持極淺紙白的視覺感受
    <Suspense fallback={
      <div className="w-full h-[500px] flex items-center justify-center bg-[#fffefb] rounded-3xl border border-[#eadfce] shadow-sm">
        <span className="text-[#6f7b76] font-bold tracking-widest">Loading menu...</span>
      </div>
    }>
      <RestaurantContent />
    </Suspense>
  );
}