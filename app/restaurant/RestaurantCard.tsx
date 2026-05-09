
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
      // 【微調 1】手機版稍微縮小 padding 和高度，避免太擁擠 (p-4 sm:p-5)
      className="cursor-pointer group bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all flex gap-4 sm:gap-5 items-stretch h-[150px] sm:h-[170px]"
    >
      {/* 【微調 2】手機版圖片稍微變窄 (w-[100px] sm:w-[130px])，把寶貴的空間讓給文字 */}
      <div
        className={`w-[100px] sm:w-[130px] h-full rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden bg-gray-100 ${
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
          <span className="text-gray-400/50 font-bold tracking-wider text-[10px] sm:text-xs">
            IMG
          </span>
        )}
      </div>

      {/* 【關鍵修復 3】加入 min-w-0 ！！！這是防止 Flex 撐破版面的終極護城河 */}
      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
        <div>
          {/* 標題在手機版稍微縮小字體 */}
          <h3 className="font-bold text-gray-800 text-lg sm:text-xl group-hover:text-emerald-600 transition-colors line-clamp-1">
            {data.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mt-1 sm:mt-1.5 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          {/* 【關鍵修復 4】地址列也加上 min-w-0 和 flex-1，確保 MapPin 不會被壓縮，且文字能正確點點點 */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate flex-1">{data.address}</span>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex gap-1.5 flex-wrap overflow-hidden h-6 justify-end w-full">
              {data.tags.slice(0, 2).map((t, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap"
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