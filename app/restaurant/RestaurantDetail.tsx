

// "use client";
// import { motion } from "framer-motion";
// import { ArrowLeft, MapPin, Phone, ExternalLink } from "lucide-react";

// // 保持與後端 Schema 一致
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

// interface RestaurantDetailProps {
//   restaurant: RestaurantData;
//   relatedRestaurants: RestaurantData[];
//   onBack: () => void;
//   onSelectRelated: (id: string) => void;
// }

// export default function RestaurantDetail({ 
//   restaurant, 
//   relatedRestaurants, 
//   onBack, 
//   onSelectRelated 
// }: RestaurantDetailProps) {
//   const { data } = restaurant; // 解構主資料

//   return (
//     <motion.div
//       key="detail"
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 20 }}
//       transition={{ duration: 0.3 }}
//       className="w-full flex flex-col bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100"
//     >
//       {/* 返回按鈕 */}
//       <button 
//         onClick={onBack}
//         className="self-start mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors bg-gray-50 px-4 py-2 rounded-full font-medium"
//       >
//         <ArrowLeft size={18} />
//         Back
//       </button>

//       {/* 上半部：圖片與基本資訊 */}
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
//         <div className={`md:col-span-5 w-full aspect-[4/3] ${data.imageUrl} rounded-3xl shadow-inner relative overflow-hidden`}>
//           <div className="absolute inset-0 flex items-center justify-center text-gray-400/30 font-bold text-2xl">
//             4:3 IMAGE
//           </div>
//         </div>
        
//         <div className="md:col-span-7 flex flex-col justify-center space-y-6">
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
//               {data.name}
//             </h2>
//             <p className="text-base text-gray-500 font-medium">
//               {data.description}
//             </p>
//           </div>
          
//           {/* 星星評分區塊已移除 */}

//           <div className="space-y-4 text-base text-gray-600 pt-6 border-t border-gray-100">
//             <div className="flex items-start gap-4">
//               <MapPin size={22} className="mt-0.5 shrink-0 text-gray-400" />
//               <span className="font-medium">{data.address}</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <Phone size={22} className="text-gray-400" />
//               <span className="font-medium">{data.contact}</span>
//             </div>
//             <a href={data.mapUrl} target="_blank" className="flex items-center gap-4 text-emerald-600 hover:underline font-bold transition-colors group">
//               <ExternalLink size={22} className="group-hover:scale-110 transition-transform"/>
//               View on Google Maps
//             </a>
//           </div>

//           <div className="flex gap-2 pt-2 flex-wrap">
//             {data.tags.map((t, i) => (
//               <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wide">
//                 {t}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 中間部：詳細介紹 */}
//       <div className="mb-16 max-w-4xl">
//         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//           About the Restaurant
//           <div className="h-px w-20 bg-gray-200"></div>
//         </h3>
//         <p className="text-gray-600 leading-relaxed text-lg text-justify">
//           {data.content}
//         </p>
//       </div>

//       {/* 下半部：相關推薦 */}
//       <div className="border-t border-gray-100 pt-10">
//         <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider flex items-center gap-2">
//           Explore More <ArrowLeft className="rotate-180" size={14}/>
//         </h3>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {relatedRestaurants.length > 0 ? (
//             relatedRestaurants.map((item) => (
//               <div 
//                 key={item.id}
//                 onClick={() => onSelectRelated(item.id)}
//                 className="cursor-pointer group bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col"
//               >
//                 {/* 相關推薦圖片 */}
//                 <div className={`w-full aspect-video ${item.data.imageUrl} rounded-xl mb-4 flex items-center justify-center text-gray-400/50 text-xs font-bold overflow-hidden shadow-inner`}>
//                   IMG
//                 </div>
                
//                 <div className="px-1 pb-1">
//                   <h4 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1 text-lg mb-1">
//                     {item.data.name}
//                   </h4>
//                   {/* 下方星星與評分已移除 */}
//                   <p className="text-xs text-gray-400 line-clamp-1 italic">
//                     {item.data.description}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-400 py-12 italic">
//               No similar restaurants found nearby.
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }
"use client";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, ExternalLink } from "lucide-react";

// 保持與後端 Schema 一致
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
  const { data } = restaurant; // 解構主資料

  // 輔助函式：判斷是否為真實網址（同步更新 Placeholder 顏色為溫和的米黃底色）
  const renderImage = (url: string, alt: string) => {
    if (url?.startsWith("http")) {
      return <img src={url} alt={alt} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />;
    }
    return (
      <div className={`w-full h-full flex items-center justify-center text-[#eadfce] font-bold text-2xl bg-[#fbf8f1] ${url}`}>
        IMAGE
      </div>
    );
  };

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      // 【背板指定】大背板底色改為 bg-[#fffdf8]，搭配米灰邊框與手帳暖陰影
      className="w-full flex flex-col bg-[#fffdf8] rounded-[32px] p-6 md:p-10 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce]"
    >
      {/* 返回按鈕：改為卡片指定的 #fffefb 紙張底色、米灰邊框與細緻陰影 */}
      <button 
        onClick={onBack}
        className="self-start mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-all bg-[#fffefb] border border-[#eadfce] px-4 py-2 rounded-xl font-bold shadow-sm hover:shadow-md"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* 上半部：圖片與基本資訊 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <div className="md:col-span-5 w-full aspect-[4/3] rounded-3xl shadow-inner relative overflow-hidden bg-[#fbf8f1] border border-[#eadfce]/40">
          {renderImage(data.imageUrl, data.name)}
        </div>
        
        <div className="md:col-span-7 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
              {data.name}
            </h2>
            <p className="text-base text-[#6f7b76] font-medium">
              {data.description}
            </p>
          </div>
          
          {/* 資訊欄分隔線：改為細緻的手帳雙像素虛線 */}
          <div className="space-y-4 text-base text-gray-600 pt-6 border-t-2 border-dashed border-[#eadfce]/60">
            <div className="flex items-start gap-4">
              <MapPin size={22} className="mt-0.5 shrink-0 text-emerald-600" />
              <span className="font-medium">{data.address}</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={22} className="text-emerald-600" />
              <span className="font-medium">{data.contact}</span>
            </div>
            <a 
              href={data.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-emerald-600 hover:text-emerald-700 hover:underline font-bold transition-colors group"
            >
              <ExternalLink size={22} className="group-hover:scale-110 transition-transform"/>
              View on Google Maps
            </a>
          </div>

          {/* 標籤小貼紙：改為卡片指定的 #fffefb，配上米灰邊框，營造手帳剪貼感 */}
          <div className="flex gap-2 pt-2 flex-wrap">
            {data.tags.map((t, i) => (
              <span key={i} className="bg-[#fffefb] text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wide border border-[#eadfce] shadow-sm">
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
          {/* 將原本的實線改為手帳感虛線 */}
          <div className="border-t-2 border-dashed border-[#eadfce] w-20"></div>
        </h3>
        <p className="text-[#6f7b76] leading-relaxed text-lg text-justify font-medium">
          {data.content}
        </p>
      </div>

      {/* 下半部：相關推薦 */}
      {/* 區塊分隔線一併改為 dashed 虛線 */}
      <div className="border-t-2 border-dashed border-[#eadfce]/60 pt-10">
        <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider flex items-center gap-2">
          Explore More <ArrowLeft className="rotate-180 text-emerald-600" size={14}/>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedRestaurants.length > 0 ? (
            relatedRestaurants.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectRelated(item.id)}
                // 【卡片指定】推薦餐廳卡片一律改為 bg-[#fffefb]，套用米灰邊框與手動卡片微傾斜翻起特效
                className="cursor-pointer group bg-[#fffefb] p-4 rounded-2xl border border-[#eadfce] hover:bg-[#fbf8f1]/30 hover:shadow-[0_12px_32px_rgba(90,70,40,0.08)] hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* 相關推薦圖片容器 */}
                <div className="w-full aspect-video rounded-xl mb-4 flex items-center justify-center overflow-hidden shadow-inner bg-[#fbf8f1] border border-[#eadfce]/30">
                  {item.data.imageUrl?.startsWith("http") ? (
                    <img src={item.data.imageUrl} alt={item.data.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="text-[#eadfce] text-xs font-bold uppercase">No Image</span>
                  )}
                </div>
                
                <div className="px-1 pb-1">
                  <h4 className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-1 text-lg mb-1">
                    {item.data.name}
                  </h4>
                  <p className="text-xs text-[#6f7b76] font-medium line-clamp-1 italic">
                    {item.data.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-[#6f7b76] py-12 italic font-bold">
              No similar restaurants found nearby.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}