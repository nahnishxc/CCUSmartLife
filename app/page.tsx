// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { MapPin, Bus, Utensils, Megaphone, Calendar } from "lucide-react";

// import Announcement from "./components/Announcement";
// import Restaurant from "./components/Restaurant";
// import Campus from "./components/Campus";
// import Transportation from "./components/Transportation";
// import ChatWidget from "./components/ChatWidget";

// export default function Home() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("campus");
//   const [campusSubTab, setCampusSubTab] = useState("About CCU");

//   const navItems = [
//     { name: "Campus", icon: MapPin, id: "campus" },
//     { name: "Announcement", icon: Megaphone, id: "announcement" },
//     { name: "Restaurant", icon: Utensils, id: "restaurant" },
//     { name: "Transportation", icon: Bus, id: "transportation" },
//     { name: "Guide", icon: MapPin, id: "guide" },
//     { name: "Reservation", icon: Calendar, id: "reservation" },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "campus":
//         return <Campus subTab={campusSubTab} />;
//       case "announcement":
//         return <Announcement />;
//       case "restaurant":
//         return <Restaurant />;
//       case "transportation":
//         return <Transportation />;
//       case "reservation":
//         return <div className="flex items-center justify-center h-full text-gray-400">Reservation system coming soon...</div>;
//       default:
//         return <Campus subTab={campusSubTab} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans relative">
//       <main className="w-full max-w-[1440px] mx-auto px-6 pt-8 pb-20">
//         <div className="max-w-6xl mx-auto mb-12">
//           <div className="flex flex-wrap items-center justify-between gap-y-6">
//             {navItems.map((item, idx) => {
//               const isActive = activeTab === item.id;

//               if (item.id === "guide") {
//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => router.push("/guide")}
//                     className="flex flex-row items-center gap-3 group cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-white/60"
//                   >
//                     <div className="w-10 h-10 flex items-center justify-center rounded-full transition-all bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110">
//                       <item.icon size={20} />
//                     </div>
//                     <span className="text-sm font-bold tracking-wide transition-colors text-gray-500 group-hover:text-gray-800">
//                       {item.name}
//                     </span>
//                   </button>
//                 );
//               }

//               return (
//                 <button
//                   key={idx}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`flex flex-row items-center gap-3 group cursor-pointer p-2 rounded-lg transition-all duration-200 ${
//                     isActive ? "bg-white shadow-sm ring-1 ring-emerald-100" : "hover:bg-white/60"
//                   }`}
//                 >
//                   <div
//                     className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//                       isActive
//                         ? "bg-emerald-100 text-emerald-600 scale-110"
//                         : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110"
//                     }`}
//                   >
//                     <item.icon size={20} />
//                   </div>
//                   <span
//                     className={`text-sm font-bold tracking-wide transition-colors ${
//                       isActive ? "text-black" : "text-gray-500 group-hover:text-gray-800"
//                     }`}
//                   >
//                     {item.name}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="w-full min-h-[500px] flex flex-col"
//         >
//           {renderContent()}
//         </motion.div>
//       </main>

//       <ChatWidget />
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Campus from "./components/Campus";

export default function Page() {
  const [campusSubTab, setCampusSubTab] = useState("About CCU");
  return <Campus subTab={campusSubTab} />;
}