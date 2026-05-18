
// "use client";
// import { MapPin } from "lucide-react";

// // 根據你給後端的 Schema 調整型別定義
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

// interface RestaurantCardProps {
//   item: RestaurantData;
//   onClick: (id: string) => void;
// }

// export default function RestaurantCard({ item, onClick }: RestaurantCardProps) {
//   const { data } = item; // 解構出 data 方便後續使用

//   return (
//     <div 
//       onClick={() => onClick(item.id)}
//       className="cursor-pointer group bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all flex gap-5 items-stretch h-[170px]"
//     >
//       {/* 圖片佔位 */}
//       <div className={`w-[130px] h-full ${data.imageUrl} rounded-2xl flex-shrink-0 flex items-center justify-center text-gray-400/50 font-bold tracking-wider`}>
//         IMG
//       </div>

//       <div className="flex-1 flex flex-col justify-between py-1">
//         <div>
//           <h3 className="font-bold text-gray-800 text-xl group-hover:text-emerald-600 transition-colors line-clamp-1">
//             {data.name}
//           </h3>
//           {/* 這裡保留原本的簡短敘述樣式 */}
//           <p className="text-sm text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
//             {data.description}
//           </p>
//         </div>

//         <div className="space-y-2">
//           <div className="flex items-center gap-1.5 text-xs text-gray-500">
//             <MapPin size={14} className="shrink-0" />
//             <span className="truncate">{data.address}</span>
//           </div>

//           <div className="flex items-end justify-between">
//             {/* 移除星星，改為顯示 description (或你想要加強呈現的簡介) */}

            
//             <div className="flex gap-1.5 flex-wrap overflow-hidden h-6 justify-end">
//               {data.tags.slice(0, 2).map((t, idx) => (
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

interface RestaurantCardProps {
  item: RestaurantData;
  onClick: (id: string) => void;
}

export default function RestaurantCard({ item, onClick }: RestaurantCardProps) {
  const { data } = item;

  const isExternalImage = data.imageUrl?.startsWith("http");

  return (
    <div
      onClick={() => onClick(item.id)}
      // 【修改點】將 border-gray-100 替換為米灰邊框 border-[#eadfce]，升級陰影為手帳暖陰影
      className="cursor-pointer group bg-[#fffefb] p-4 sm:p-5 rounded-3xl border border-[#eadfce] shadow-sm hover:shadow-[0_12px_24px_rgba(90,70,40,0.08)] hover:-translate-y-1 hover:border-emerald-300 transition-all flex gap-4 sm:gap-5 items-stretch h-[150px] sm:h-[170px]"
    >
      {/* 圖片區域：將 NO IMAGE 預設背景從 bg-gray-100 換成更搭的暖米色 bg-[#fbf8f1] */}
      <div
        className={`w-[100px] sm:w-[130px] h-full rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden bg-[#fbf8f1] ${
          !isExternalImage ? data.imageUrl : ""
        }`}
      >
        {isExternalImage ? (
          <img
            src={data.imageUrl}
            alt={data.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          // 將文字顏色換成精緻的米灰色
          <span className="text-[#eadfce] font-bold tracking-wider text-[10px] sm:text-xs">
            IMG
          </span>
        )}
      </div>

      {/* 核心排版完全不動，僅調整文字顏色至手帳墨綠灰（#6f7b76） */}
      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
        <div>
          <h3 className="font-bold text-gray-800 text-lg sm:text-xl group-hover:text-emerald-700 transition-colors line-clamp-1">
            {data.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#6f7b76] line-clamp-2 mt-1 sm:mt-1.5 leading-relaxed font-medium">
            {data.description}
          </p>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          {/* 地址列：MapPin 圖示改為綠色點綴，文字顏色優化 */}
          <div className="flex items-center gap-1.5 text-xs text-[#6f7b76] font-medium min-w-0">
            <MapPin size={14} className="shrink-0 text-emerald-600" />
            <span className="truncate flex-1">{data.address}</span>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex gap-1.5 flex-wrap overflow-hidden h-6 justify-end w-full">
              {data.tags.slice(0, 2).map((t, idx) => (
                // 【修改點】小標籤由灰底換成紙白底（#fffdf8）加微小的米灰邊框，更有手工剪貼標籤的精緻感
                <span
                  key={idx}
                  className="bg-[#fffdf8] text-gray-600 border border-[#eadfce]/70 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-sm"
                >
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