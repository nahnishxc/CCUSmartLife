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
import { ROUTE_DATA } from "./data/routes";
import BusDetail from "./sections/BusDetail";
import TrainDetail from "./sections/TrainDetail";
import UbikeDetail from "./sections/UbikeDetail";
import RouteDetail from "./sections/RouteDetail";

export default function Transportation() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  const currentRouteData = activeRouteId ? ROUTE_DATA[activeRouteId] : null;

  if (selectedMode === "bus") {
    return <BusDetail onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === "train") {
    return <TrainDetail onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === "ubike") {
    return <UbikeDetail onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === "route" && currentRouteData) {
    return (
      <RouteDetail
        routeData={currentRouteData as any}
        onBack={() => {
          setSelectedMode(null);
          setActiveRouteId(null);
        }}
        onSelectRoute={(id) => setActiveRouteId(id)}
      />
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Transportation</h2>
        <p className="text-sm text-gray-500 mt-1">
          Real-time traffic info and route guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
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

      <div className="mt-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 ">
          Frequently Used Routes
        </h3>
        <div className="flex gap-5 overflow-x-auto pb-6 px-1 custom-scrollbar">
          {Object.values(ROUTE_DATA).map((route) => (
            <div
              key={route.id}
              onClick={() => {
                setSelectedMode("route");
                setActiveRouteId(route.id);
              }}
              /* 1. 這裡使用 min-w 控制每張卡片佔比 
                 2. 在螢幕寬度內，min-w-[22%] 左右會讓使用者看到約四張半
              */
              className="min-w-[21%] md:min-w-[23%] group cursor-pointer"
            >
              <div
                className={`w-full aspect-square rounded-2xl mb-3 overflow-hidden group-hover:scale-[1.02] transition-transform shadow-sm`}
              >
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${route.images?.[0]?.url || ""})`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 truncate">
                  {route.name}
                </span>
                <ArrowRight size={14} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
