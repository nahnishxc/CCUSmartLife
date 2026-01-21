"use client";
import { MapPin, Star } from "lucide-react";

// --- 資料結構 ---
interface Venue {
  id: string;
  name: string;
  type: string;
  desc: string;
  address: string;
  rating: number;
}

// --- 假資料 ---
const VENUES: Venue[] = [
  {
    id: "1",
    name: "Sing Song KTV",
    type: "Karaoke",
    desc: "Best sound system in town. Student discounts available on weekdays.",
    address: "Minxiong Downtown",
    rating: 4.5
  },
  {
    id: "2",
    name: "Strike Bowling Alley",
    type: "Bowling",
    desc: "12 lanes, arcade games, and snack bar inside.",
    address: "Near Chiayi City",
    rating: 4.2
  },
  {
    id: "3",
    name: "Meeple Board Game Cafe",
    type: "Board Game",
    desc: "Over 500 games to choose from. Unlimited drinks included.",
    address: "University Rd. Alley",
    rating: 4.8
  },
  {
    id: "4",
    name: "Chill Bar & Bistro",
    type: "Bar",
    desc: "Relaxing atmosphere with live jazz music on weekends.",
    address: "Daxue Rd. Sec 2",
    rating: 4.6
  },
  {
    id: "5",
    name: "Movie Theater World",
    type: "Cinema",
    desc: "Showing the latest blockbusters with IMAX screens.",
    address: "Chiayi Showtime Plaza",
    rating: 4.3
  },
  {
    id: "6",
    name: "Night Net Cafe",
    type: "Internet Cafe",
    desc: "High-spec gaming PCs and comfortable seating.",
    address: "Minxiong Street",
    rating: 4.0
  }
];

export default function EntertainmentFacilitiesView() {
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
      {/* 標題與簡介 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Entertainment Facilities</h2>
        <p className="text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
          Looking for fun places to hang out with friends? Here are some popular entertainment venues nearby, 
          including KTVs, bowling alleys, and board game cafes.
        </p>
      </div>

      {/* 卡片列表 (2欄佈局) */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VENUES.map((venue) => (
            <div 
              key={venue.id}
              className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex flex-col gap-4 hover:border-emerald-200 hover:shadow-md transition-all group"
            >
              {/* 圖片 Placeholder (長條型) */}
              <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold tracking-wider group-hover:bg-emerald-50 group-hover:text-emerald-300 transition-colors">
                VENUE IMG
              </div>

              {/* 內容資訊 */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {venue.name}
                  </h3>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                    {venue.type}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-gray-700">{venue.rating}</span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {venue.desc}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <MapPin size={14} />
                  {venue.address}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}