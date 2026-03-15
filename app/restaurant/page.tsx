"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter } from "lucide-react";
import RestaurantCard from "./RestaurantCard";
import RestaurantDetail from "./RestaurantDetail";

// 這裡假設你把介面放在 types.ts，或者直接留在這也行
export interface RestaurantData {
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

const MOCK_RESTAURANTS: RestaurantData[] = [
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

const BASIC_TAGS = ["All", "Breakfast", "Lunch", "Dinner", "Vegetarian", "Halal"];
const MORE_TAGS = [
  { category: "Type", tags: ["Cafe", "Snack", "Drink", "Buffet", "Noodle", "Dumpling"] },
  { category: "Feature", tags: ["Cheap", "Gym", "Late Night", "Spicy", "Fried", "Sweet"] }
];

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>(MOCK_RESTAURANTS);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedId]);

  const filteredRestaurants = restaurants.filter((r) => {
    const matchTag = activeTag === "All" || r.tags.includes(activeTag);
    const query = searchQuery.toLowerCase();
    return matchTag && (r.name.toLowerCase().includes(query) || r.tags.some(t => t.toLowerCase().includes(query)));
  });

  const selectedRestaurant = restaurants.find(r => r.id === selectedId);
  const relatedRestaurants = selectedRestaurant 
    ? restaurants.filter(r => r.id !== selectedId && r.tags.some(t => selectedRestaurant.tags.includes(t))).slice(0, 3) 
    : [];

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {view === "list" ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col gap-8">
            {/* 搜尋欄部分 */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative z-20">
              <div className="w-full max-w-2xl mb-6 relative">
                <div className="relative w-full z-30">
                  <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-emerald-600" : "text-gray-400"}`} size={22} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search for food..." 
                    className={`w-full bg-gray-100 rounded-2xl py-4 pl-14 pr-10 text-base focus:outline-none transition-all ${isSearchFocused ? "ring-2 ring-emerald-200 bg-white shadow-lg" : ""}`}
                  />
                  {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><X size={18} /></button>}
                </div>

                {/* 進階標籤選單 */}
                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20">
                      <div className="p-6 bg-gray-50/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {MORE_TAGS.map((group, idx) => (
                            <div key={idx}>
                              <h4 className="text-sm font-bold text-gray-800 mb-3">{group.category}</h4>
                              <div className="flex flex-wrap gap-2">
                                {group.tags.map(tag => (
                                  <button key={tag} onClick={() => setActiveTag(tag)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTag === tag ? "bg-emerald-500 text-white" : "bg-white text-gray-600 border"}`}>{tag}</button>
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

              {/* 基礎標籤 */}
              <div className="w-full flex justify-center flex-wrap gap-3">
                {BASIC_TAGS.map((tag) => (
                  <button key={tag} onClick={() => setActiveTag(tag)} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${activeTag === tag ? "bg-emerald-500 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:text-emerald-600"}`}>{tag}</button>
                ))}
              </div>
            </div>

            {/* 列表渲染 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
              {filteredRestaurants.map((item) => (
                <RestaurantCard 
                  key={item.id} 
                  item={item} 
                  onClick={(id) => { setSelectedId(id); setView("detail"); }} 
                />
              ))}
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