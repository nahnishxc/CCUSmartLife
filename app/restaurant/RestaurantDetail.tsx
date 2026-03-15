"use client";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, ExternalLink, Star } from "lucide-react";

// 重複定義型別以保持組件自足
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

interface RestaurantDetailProps {
  restaurant: RestaurantData;
  relatedRestaurants: RestaurantData[];
  onBack: () => void;
  onSelectRelated: (id: string) => void;
}

export default function RestaurantDetail({ 
  restaurant, 
  relatedRestaurants, 
  onBack, 
  onSelectRelated 
}: RestaurantDetailProps) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100"
    >
      {/* 返回按鈕 */}
      <button 
        onClick={onBack}
        className="self-start mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors bg-gray-50 px-4 py-2 rounded-full font-medium"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* 上半部：圖片與基本資訊 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <div className={`md:col-span-5 w-full aspect-[4/3] ${restaurant.imageUrl} rounded-3xl shadow-inner relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center text-gray-400/30 font-bold text-2xl">
            4:3 IMAGE
          </div>
        </div>
        
        <div className="md:col-span-7 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
              {restaurant.name}
            </h2>
            <p className="text-base text-gray-500 font-medium">
              {restaurant.brief}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className={`${i < Math.floor(restaurant.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-xl font-bold text-gray-700">({restaurant.rating})</span>
          </div>

          <div className="space-y-4 text-base text-gray-600 pt-6 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <MapPin size={22} className="mt-0.5 shrink-0 text-gray-400" />
              <span className="font-medium">{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={22} className="text-gray-400" />
              <span className="font-medium">{restaurant.contact}</span>
            </div>
            <a href={restaurant.googleMapUrl} target="_blank" className="flex items-center gap-4 text-emerald-600 hover:underline font-bold transition-colors group">
              <ExternalLink size={22} className="group-hover:scale-110 transition-transform"/>
              View on Google Maps
            </a>
          </div>

          <div className="flex gap-2 pt-2 flex-wrap">
            {restaurant.tags.map((t, i) => (
              <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wide">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 中間部：詳細介紹 */}
      <div className="mb-16 max-w-4xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          About the Restaurant
          <div className="h-px w-20 bg-gray-200"></div>
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg text-justify">
          {restaurant.intro}
        </p>
      </div>

      {/* 下半部：相關推薦 */}
      <div className="border-t border-gray-100 pt-10">
        <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider flex items-center gap-2">
          Explore More <ArrowLeft className="rotate-180" size={14}/>
        </h3>
        
        {/* 改為 grid-cols-1 到 md:grid-cols-2 或 3，並移除固定高度 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedRestaurants.length > 0 ? (
            relatedRestaurants.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectRelated(item.id)}
                className="cursor-pointer group bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col"
              >
                {/* 圖片容器：使用 aspect-video 並確保圖片填滿 */}
                <div className={`w-full aspect-video ${item.imageUrl} rounded-xl mb-4 flex items-center justify-center text-gray-400/50 text-xs font-bold overflow-hidden shadow-inner`}>
                  IMG
                </div>
                
                {/* 文字內容區：移除固定高度限制 */}
                <div className="px-1 pb-1">
                  <h4 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1 text-lg mb-1">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-600">{item.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-12 italic">
              No similar restaurants found nearby.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}