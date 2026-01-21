"use client";
import { useState } from "react";
import {
  Bus,
  Train,
  Bike,
  Map,
  ArrowRight,
  Clock,
  Navigation,
} from "lucide-react";
// 引入剛剛建立的詳細頁面
import BusDetail from "./TransportationItem/BusDetail";
import TrainDetail from "./TransportationItem/TrainDetail";
import UbikeDetail from "./TransportationItem/UbikeDetail";
import RouteDetail from "./TransportationItem/RouteDetail";

const ROUTE_GUIDES = [
  { id: "chiayi", name: "To Chiayi City", imageColor: "bg-blue-100" },
  { id: "minxiong", name: "To Minxiong Town", imageColor: "bg-orange-100" },
  { id: "hsr", name: "To Chiayi HSR", imageColor: "bg-emerald-100" },
  { id: "douliu", name: "To Douliu City", imageColor: "bg-purple-100" },
];

export default function Transportation() {
  // 控制是否顯示詳細頁面
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  // --- 1. 如果選了 Bus，顯示詳細頁面 ---
  if (selectedMode === "bus") {
    return <BusDetail onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === "train") {
    return <TrainDetail onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === "ubike") {
    return <UbikeDetail onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === "route_chiayi") {
    return <RouteDetail onBack={() => setSelectedMode(null)} />;
  }

  // --- 2. 預設總覽畫面 ---
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Transportation</h2>
        <p className="text-sm text-gray-500 mt-1">
          Real-time traffic info and route guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
        {/* --- Card A: Bus (點擊切換) --- */}
        <div
          onClick={() => setSelectedMode("bus")}
          className="group bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer flex flex-col h-[220px] relative overflow-hidden"
        >
          <Bus className="absolute -right-4 -bottom-4 text-gray-200/50 w-32 h-32 group-hover:text-emerald-100/50 transition-colors" />

          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h3 className="text-3xl font-black text-gray-800">7309</h3>
              <p className="text-xs text-gray-500 font-bold">Chiayi - CCU</p>
            </div>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
              Approaching
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center relative z-10 space-y-3">
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
              <span className="text-sm text-gray-600 font-medium">
                To Nanhua Univ.
              </span>
              <span className="text-lg font-bold text-emerald-600">5 mins</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">
                To Chiayi City
              </span>
              <span className="text-lg font-bold text-gray-400">18 mins</span>
            </div>
          </div>

          <div className="mt-auto pt-2 text-xs text-gray-400 font-medium flex items-center gap-1">
            <Map size={12} /> Stop: University Gate
          </div>
        </div>

        {/* --- Card B: Ubike (尚未實作詳細頁，僅可點擊) --- */}
        <div
          onClick={() => setSelectedMode("ubike")}
          className="group bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer flex flex-col h-[220px] relative overflow-hidden"
        >
          <Bike className="absolute -right-4 -bottom-4 text-gray-200/50 w-32 h-32 group-hover:text-orange-100/50 transition-colors" />
          <div className="mb-4 relative z-10">
            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">
              CCU Activity Center
            </h3>
            <p className="text-xs text-gray-500">Ubike 2.0 Station</p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 relative z-10">
            <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center shadow-sm border border-gray-100">
              <span className="text-2xl font-black text-orange-500">12</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Bikes
              </span>
            </div>
            <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center shadow-sm border border-gray-100">
              <span className="text-2xl font-black text-gray-400">8</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Empty
              </span>
            </div>
          </div>
          <div className="mt-4 pt-2 text-xs text-gray-400 font-medium flex items-center gap-1">
            <Navigation size={12} /> Distance: 50m
          </div>
        </div>

        {/* --- Card C: Train (尚未實作詳細頁) --- */}
        <div
          onClick={() => setSelectedMode("train")}
          className="group bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer flex flex-col h-[220px] relative overflow-hidden"
        >
          <Train className="absolute -right-4 -bottom-4 text-gray-200/50 w-32 h-32 group-hover:text-blue-100/50 transition-colors" />
          <div className="mb-3 relative z-10 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">
              Minxiong Station
            </h3>
            <Clock size={16} className="text-gray-400" />
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative z-10">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="p-2 font-medium">Type</th>
                  <th className="p-2 font-medium">Dest.</th>
                  <th className="p-2 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-2 text-gray-600">Local</td>
                  <td className="p-2 font-bold text-gray-800">Kaohsiung</td>
                  <td className="p-2 text-right font-mono text-emerald-600 font-bold">
                    14:00
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600">Express</td>
                  <td className="p-2 font-bold text-gray-800">Taichung</td>
                  <td className="p-2 text-right font-mono text-gray-800">
                    14:15
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600">Local</td>
                  <td className="p-2 font-bold text-gray-800">Tainan</td>
                  <td className="p-2 text-right font-mono text-gray-800">
                    14:28
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          Frequently Used Routes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ROUTE_GUIDES.map((route) => (
            <div
              key={route.id}
              onClick={() => {
                if (route.id === "chiayi") setSelectedMode("route_chiayi");
              }}
              className="group cursor-pointer"
            >
              <div
                className={`w-full aspect-square ${route.imageColor} rounded-2xl mb-3 flex items-center justify-center text-gray-400/50 font-bold tracking-wider group-hover:scale-[1.02] transition-transform shadow-sm`}
              >
                IMG
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
                  {route.name}
                </span>
                <ArrowRight
                  size={14}
                  className="text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="text-sm font-bold text-gray-400 hover:text-emerald-600 transition-colors flex items-center gap-1 mx-auto">
            Explore more routes <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
