// "use client";
// import { MapPin, Star } from "lucide-react";

// // 直接在這裡定義型別，確保組件獨立運作
// export interface RestaurantData {
//   id: string;
//   name: string;
//   brief: string;
//   intro: string;
//   rating: number;
//   address: string;
//   contact: string;
//   googleMapUrl: string;
//   tags: string[];
//   imageUrl: string;
// }

// interface RestaurantCardProps {
//   item: RestaurantData;
//   onClick: (id: string) => void;
// }

// export default function RestaurantCard({ item, onClick }: RestaurantCardProps) {
//   return (
//     <div 
//       onClick={() => onClick(item.id)}
//       className="cursor-pointer group bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all flex gap-5 items-stretch h-[170px]"
//     >
//       {/* 圖片佔位 */}
//       <div className={`w-[130px] h-full ${item.imageUrl} rounded-2xl flex-shrink-0 flex items-center justify-center text-gray-400/50 font-bold tracking-wider`}>
//         IMG
//       </div>

//       <div className="flex-1 flex flex-col justify-between py-1">
//         <div>
//           <h3 className="font-bold text-gray-800 text-xl group-hover:text-emerald-600 transition-colors line-clamp-1">
//             {item.name}
//           </h3>
//           <p className="text-sm text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
//             {item.brief}
//           </p>
//         </div>

//         <div className="space-y-2">
//           <div className="flex items-center gap-1.5 text-xs text-gray-500">
//             <MapPin size={14} className="shrink-0" />
//             <span className="truncate">{item.address}</span>
//           </div>

//           <div className="flex items-end justify-between">
//             <div className="flex items-center gap-1.5">
//               <Star size={16} className="fill-yellow-400 text-yellow-400" />
//               <span className="text-sm font-bold text-gray-700">{item.rating}</span>
//             </div>
//             <div className="flex gap-1.5 flex-wrap overflow-hidden h-6 justify-end">
//               {item.tags.slice(0, 2).map((t, idx) => (
//                 <span key={idx} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { MapPin } from "lucide-react";

// 根據你給後端的 Schema 調整型別定義
export interface RestaurantData {
  id: string;
  label: string;
  data: {
    name: string;
    description: string; // 原本的 brief
    content: string;     // 原本的 intro
    rating: number;
    address: string;
    contact: string;
    mapUrl: string;      // 原本的 googleMapUrl
    imageUrl: string;
    attributes: string[];
    tags: string[];
  };
}

interface RestaurantCardProps {
  item: RestaurantData;
  onClick: (id: string) => void;
}

export default function RestaurantCard({ item, onClick }: RestaurantCardProps) {
  const { data } = item; // 解構出 data 方便後續使用

  return (
    <div 
      onClick={() => onClick(item.id)}
      className="cursor-pointer group bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all flex gap-5 items-stretch h-[170px]"
    >
      {/* 圖片佔位 */}
      <div className={`w-[130px] h-full ${data.imageUrl} rounded-2xl flex-shrink-0 flex items-center justify-center text-gray-400/50 font-bold tracking-wider`}>
        IMG
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-bold text-gray-800 text-xl group-hover:text-emerald-600 transition-colors line-clamp-1">
            {data.name}
          </h3>
          {/* 這裡保留原本的簡短敘述樣式 */}
          <p className="text-sm text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{data.address}</span>
          </div>

          <div className="flex items-end justify-between">
            {/* 移除星星，改為顯示 description (或你想要加強呈現的簡介) */}

            
            <div className="flex gap-1.5 flex-wrap overflow-hidden h-6 justify-end">
              {data.tags.slice(0, 2).map((t, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}