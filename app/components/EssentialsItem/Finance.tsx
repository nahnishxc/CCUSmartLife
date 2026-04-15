// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronRight, ChevronDown, Map, FileText } from "lucide-react";

// // --- Finance 的假資料 ---
// const FINANCE_DATA = [
//   {
//     id: "q1",
//     question: "How to open a bank account in Taiwan?",
//     answer: (
//       <div className="space-y-4">
//         <p>You will need to visit the bank in person. Please bring the following documents:</p>
//         <ul className="list-disc pl-5 space-y-1">
//           <li>Passport</li>
//           <li>ARC (Alien Resident Certificate)</li>
//           <li>Student ID</li>
//           <li>Initial deposit (usually 1,000 NTD)</li>
//         </ul>
//         {/* 綠色系的提示框 */}
//         <div className="p-4 bg-emerald-50 rounded-lg text-emerald-700 text-xs font-bold border border-emerald-100">
//           💡 Tip: We recommend E.Sun Bank or Post Office on campus.
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "q2",
//     question: "ATM locations map",
//     answer: (
//       <div className="flex flex-col gap-3">
//         <p>There are ATMs located at the Administration Building, Activity Center, and Convenience Stores.</p>
//         <div className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
//            <Map size={32} className="mb-2" />
//            <span></span>
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "q3",
//     question: "Tuition payment procedure",
//     answer: (
//       <div className="space-y-3">
//         <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
//            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">1</div>
//            <p>Download bill from school portal</p>
//         </div>
//         <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
//            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">2</div>
//            <p>Pay at any Convenience Store (7-11/FamilyMart)</p>
//         </div>
//         <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
//            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">3</div>
//            <p>Keep the receipt for verification</p>
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "q4",
//     question: "Currency Exchange",
//     answer: "The Post Office on campus does NOT offer currency exchange services. You need to go to 'Bank of Taiwan' in Chiayi City for the best rates."
//   }
// ];

// export default function Finance() {
//   const [openId, setOpenId] = useState<string | null>(null);

//   const toggle = (id: string) => {
//     setOpenId(openId === id ? null : id);
//   };

//   return (
//     <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col">
//       {/* 標題區 */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-800">Financial FAQ</h2>
//         <p className="text-sm text-gray-500 mt-1">Common questions about banking and payments.</p>
//       </div>

//       {/* 列表區 */}
//       {/* 這裡不用設定 overflow，讓它自然跟著頁面撐開 */}
//       <div className="flex flex-col gap-4">
//         {FINANCE_DATA.map((item, index) => {
//           const isOpen = openId === item.id;
//           return (
//             <div key={item.id} className="group">
//               {/* 問題按鈕 */}
//               <button
//                 onClick={() => toggle(item.id)}
//                 className={`w-full px-6 py-4 flex items-center justify-between text-left transition-all duration-300 rounded-2xl border ${
//                   isOpen
//                     ? "bg-emerald-50 text-emerald-900 border-emerald-100 shadow-sm" // 展開：綠底
//                     : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-white hover:shadow-md hover:border-emerald-200" // 收合：灰底 hover 變白
//                 }`}
//               >
//                 <span className="font-bold text-sm md:text-base">
//                   Q{index + 1}. {item.question}
//                 </span>
//                 <motion.div
//                   animate={{ rotate: isOpen ? 180 : 0 }} // 箭頭旋轉 180 度比較符合常見設計
//                   transition={{ duration: 0.2 }}
//                   className={isOpen ? "text-emerald-600" : "text-gray-400"}
//                 >
//                   <ChevronDown size={20} />
//                 </motion.div>
//               </button>

//               {/* 答案區域 */}
//               <AnimatePresence>
//                 {isOpen && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     className="overflow-hidden"
//                   >
//                     <div className="p-6 text-gray-600 text-sm leading-relaxed border-l-2 border-emerald-100 ml-4 mt-2 mb-2">
//                       {item.answer}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }