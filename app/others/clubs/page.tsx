// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Facebook, Instagram, Globe, Users } from "lucide-react";
// import { CLUB_DATA } from "../../Data/club";
// import Image from "next/image";

// interface Club {
//   id: string;
//   name: string;
//   desc: string;
//   image?: string;
//   tags?: string[];
//   links: {
//     fb?: string;
//     ig?: string;
//     web?: string;
//   };
// }

// interface ClubCategory {
//   id: string;
//   name: string;
//   clubs: Club[];
// }

// export default function ClubPage() {
//   const [activeTab, setActiveTab] = useState(0);
//   const data = CLUB_DATA as unknown as ClubCategory[];

//   return (
//     <>
//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       {/* 標題區 */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
//           Student Clubs
//         </h2>
//         <p className="text-gray-500 mt-3 max-w-3xl leading-relaxed">
//           From academic societies to sports teams, music, arts, and service groups,
//           CCU’s student clubs are where friendships begin, ideas spark, and campus life truly comes alive.
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="flex items-center gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
//         {data.map((category, index) => {
//           const isActive = activeTab === index;
//           return (
//             <button
//               key={category.id}
//               onClick={() => setActiveTab(index)}
//               className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
//                 isActive
//                   ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-100 transform scale-105"
//                   : "bg-white text-gray-500 border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
//               }`}
//             >
//               {category.name}
//             </button>
//           );
//         })}
//       </div>

//       {/* 卡片區 */}
//       <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -15 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {data[activeTab].clubs.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col h-full group"
//               >
//                 <div className="w-full aspect-video rounded-xl mb-5 overflow-hidden bg-gray-100 group-hover:bg-emerald-50 transition-colors relative">
//                   {item.image ? (
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-500"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold tracking-widest group-hover:text-emerald-200 transition-colors">
//                       NO IMAGE
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1 px-1">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
//                     {item.desc}
//                   </p>

//                   {(item.tags ?? []).length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-5">
//                       {(item.tags ?? []).map((tag) => (
//                         <span
//                           key={tag}
//                           className="text-[11px] bg-emerald-50/50 border border-emerald-100 px-2.5 py-1 rounded-lg text-emerald-600 font-semibold"
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="pt-5 border-t border-gray-50 flex items-center gap-4 mt-auto">
//                   {item.links.fb && (
//                     <a
//                       href={item.links.fb}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-gray-400 hover:text-blue-600 transition-all hover:scale-110"
//                     >
//                       <Facebook size={20} />
//                     </a>
//                   )}
//                   {item.links.ig && (
//                     <a
//                       href={item.links.ig}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-gray-400 hover:text-pink-600 transition-all hover:scale-110"
//                     >
//                       <Instagram size={20} />
//                     </a>
//                   )}
//                   {item.links.web && (
//                     <a
//                       href={item.links.web}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-gray-400 hover:text-emerald-600 transition-all hover:scale-110"
//                     >
//                       <Globe size={20} />
//                     </a>
//                   )}
//                   <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full">
//                     <Users size={13} className="text-gray-400" />
//                     <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter">
//                       Join us
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Globe, Users } from "lucide-react";
import { CLUB_DATA } from "../../Data/club";
import Image from "next/image";

interface Club {
  id: string;
  name: string;
  desc: string;
  image?: string;
  tags?: string[];
  links: {
    fb?: string;
    ig?: string;
    web?: string;
  };
}

interface ClubCategory {
  id: string;
  name: string;
  clubs: Club[];
}

export default function ClubPage() {
  const [activeTab, setActiveTab] = useState(0);
  const data = CLUB_DATA as unknown as ClubCategory[];

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-6 shadow-sm flex flex-col">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Student Clubs</h2>
        <p className="text-gray-500 mt-3 max-w-3xl leading-relaxed">
          From academic societies to sports teams, music, arts, and service groups,
          CCU’s student clubs are where friendships begin, ideas spark, and campus life truly comes alive.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
        {data.map((category, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-100 transform scale-105"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}

            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data[activeTab].clubs.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-gray-100  flex flex-col h-full group"
              >
                <div className="w-full aspect-[4/3] rounded-xl mb-5 overflow-hidden bg-gray-100  relative">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover "
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold tracking-widest ">
                      NO IMAGE
                    </div>
                  )}
                </div>

                <div className="flex-1 px-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 ">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-5">
                    {item.desc}
                  </p>

                  {(item.tags ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {(item.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] bg-emerald-50/50 border border-emerald-100 px-2.5 py-1 rounded-lg text-emerald-600 font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-gray-50 flex items-center gap-4 mt-auto">
                  {item.links.fb && (
                    <a
                      href={item.links.fb}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-all hover:scale-110"
                    >
                      <Facebook size={32} />
                    </a>
                  )}
                  {item.links.ig && (
                    <a
                      href={item.links.ig}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-pink-600 transition-all hover:scale-110"
                    >
                      <Instagram size={32} />
                    </a>
                  )}
                  {item.links.web && (
                    <a
                      href={item.links.web}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-emerald-600 transition-all hover:scale-110"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                  <div>

                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}