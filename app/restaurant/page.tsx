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

export default function RestaurantPage() {
  // 狀態管理
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState("Type");

  const [dynamicBasicTags, setDynamicBasicTags] = useState<string[]>(["All"]);
  const [dynamicMoreTags, setDynamicMoreTags] = useState<
    { category: string; tags: string[] }[]
  >([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://campus-ai-backend-1.onrender.com/api/campus/restaurant",
        );

        if (!response.ok) {
          throw new Error(`伺服器回應錯誤: ${response.status}`);
        }

        const rawData = await response.json();
        const actualList = Array.isArray(rawData.data) ? rawData.data : [];

        const formattedData: RestaurantData[] = actualList.map((item: any) => {
          return {
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
              imageUrl:
                item.imageUrl ||
                item.image ||
                item.image_url ||
                "bg-emerald-50",
              attributes: item.attributes || [],
              tags: item.tags || [],
            },
          };
        });

        // ✅ 1. 統計標籤出現次數
        const tagCounts: Record<string, number> = {};
        formattedData.forEach((item) => {
          if (Array.isArray(item.data.tags)) {
            item.data.tags.forEach((tag) => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        });
        const sortedTags = Object.keys(tagCounts).sort(
          (a, b) => tagCounts[b] - tagCounts[a],
        );

        // ✅ 2. 處理「基礎標籤 (Top 6)」：排除不想出現在外層的特定標籤
        const excludeFromBasic = [
          "dine-in available",
          "takeout available",
          "takeout only",
        ];
        const basicTagsPool = sortedTags.filter(
          (tag) => !excludeFromBasic.includes(tag.toLowerCase()),
        );
        const top6Tags = basicTagsPool.slice(0, 7);
        setDynamicBasicTags(["All", ...top6Tags]);

        // ✅ 3. 處理「進階標籤選單」：使用字典進行語意化分類
        const tagCategories: Record<string, string[]> = {
          Type: [],
          Time: [],
          Feature: [],
          Others: [],
        };

        // 你可以隨時在這裡擴充關鍵字
        const typeKeywords = [
          "noodle",
          "rice",
          "hot pot",
          "dessert",
          "beverage",
          "burger",
          "fried",
          "italian",
          "japanese",
          "thai",
          "korean",
          "vietnamese",
          "steak",
          "bread",
          "street food",
          "braised",
          "ice",
          "healthy",
          "brunch",
          "snack",
          "cafe",
          "buffet",
          "dumpling",
          "taiwanese",
          "vegetarian",
          "halal",
        ];
        const timeKeywords = [
          "breakfast",
          "lunch",
          "dinner",
          "late-night",
          "weekend",
          "weekday",
          "morning",
        ];
        const featureKeywords = [
          "dine-in",
          "takeout",
          "cheap",
          "gym",
          "spicy",
          "sweet",
        ];

        sortedTags.forEach((tag) => {
          const lowerTag = tag.toLowerCase();

          // 開始分門別類
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

        // 將分類好的資料轉成畫面需要的 Array 格式，並自動過濾掉空的分類
        const newMoreTags = Object.keys(tagCategories)
          .filter((key) => tagCategories[key].length > 0)
          .map((key) => ({
            category: key,
            tags: tagCategories[key],
          }));

        setDynamicMoreTags(newMoreTags);

        setRestaurants(formattedData);
      } catch (error) {
        console.error("RestaurantPage 發生錯誤:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((r) => {
    const matchActiveTag =
      activeTag === "All" || r.data.tags.includes(activeTag);
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchActiveTag;

    const nameMatch = r.data.name.toLowerCase().includes(query);
    const tagMatch = r.data.tags.some((t) => t.toLowerCase().includes(query));
    // 加入 Attribute 隱形篩選
    const attributeMatch = r.data.attributes?.some((attr) =>
      attr.toLowerCase().includes(query),
    );
    return matchActiveTag && (nameMatch || tagMatch || attributeMatch);
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
            <div className="bg-white rounded-3xl p-6 md:p-8 mb-10 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative z-20">
              <div className="w-full max-w-2xl mb-4 relative">
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
                    onKeyDown={(e) => {
    if (e.key === "Enter") {
      setIsSearchFocused(false); // 收起下拉選單
      e.currentTarget.blur();    // 取消輸入框的焦點（如果在手機上，這會順便把手機鍵盤收起來，體驗更好！）
    }
  }}
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
                        {/* 👇 從這裡開始替換 */}
                        <div className="flex flex-col">
                          {/* 上半部：水平分頁標籤 (Tabs) */}
                          <div className="flex border-b border-gray-100 bg-gray-50/50">
                            {dynamicMoreTags.map((group) => {
                              const isActive = activeCategoryTab === group.category || (!activeCategoryTab && group.category === dynamicMoreTags[0]?.category);
                              return (
                                <button
                                  key={group.category}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveCategoryTab(group.category); 
                                  }}
                                  className={`flex-1 py-3 text-sm font-bold transition-colors ${
                                    isActive
                                      ? "text-emerald-600 border-b-2 border-emerald-500 bg-white"
                                      : "text-gray-400 hover:text-gray-600"
                                  }`}
                                >
                                  {group.category}
                                </button>
                              );
                            })}
                          </div>

                          {/* 下半部：該 Tab 對應的標籤內容區 */}
                          <div className="p-5 bg-white max-h-[250px] overflow-y-auto">
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
                                        : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50"
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                        {/* 👆 到這裡結束替換 */}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* 基礎標籤 */}
              {/* 把 BASIC_TAGS 改成 dynamicBasicTags */}
              <div className="w-full flex justify-center flex-wrap gap-3 pt-2">
                {dynamicBasicTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveTag(tag);
                      setSearchQuery(""); // 點擊時清空搜尋欄
                    }}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${activeTag === tag ? "bg-emerald-500 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:text-emerald-600"}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* 列表內容 */}
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10 mt-8">
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
            </div>
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
