"use client";
import { MapPin, Calendar, Award } from "lucide-react";
// 引入我們剛建立的地圖元件
import MapContainer from "../Maps/MapContainer";
import MainCampusMap from "../Maps/MainCampusMap";

export default function About() {
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* 1. 頂部大圖與標題 */}
      <div className="w-full aspect-[21/9] bg-emerald-50 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden group shrink-0">
        {/* 圖片 Placeholder */}
        <div className="text-emerald-200 font-bold text-3xl tracking-widest z-10">CCU CAMPUS IMAGE</div>
        {/* 裝飾圓圈 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-100/50 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        {/* 2. 標題與簡介 */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">National Chung Cheng University</h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 leading-loose text-lg text-justify">
            Founded in 1989, National Chung Cheng University (CCU) is a research-oriented university located in Minxiong Township, Chiayi. 
            Known for its beautiful campus environment and rich humanities atmosphere, CCU provides a diverse learning environment for students 
            from all over the world. Our mission is to cultivate talents with global vision and social responsibility.
          </p>
        </div>

        {/* 3. 重點資訊卡片 (Key Facts) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm mb-3">
              <Calendar size={24} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Established</h3>
            <p className="text-sm text-gray-500">Founded in 1989</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm mb-3">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Location</h3>
            <p className="text-sm text-gray-500">Minxiong, Chiayi</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm mb-3">
              <Award size={24} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Excellence</h3>
            <p className="text-sm text-gray-500">Top Research Univ.</p>
          </div>
        </div>

        {/* 4. 校園平面地圖 (新增區塊) */}
        <div className="w-full mb-10">
            <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Campus Map</h3>
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            
            {/* 地圖容器：設定高度為 600px，確保有足夠空間操作 */}
            <div className="w-full h-[600px] rounded-2xl border border-gray-200 overflow-hidden shadow-inner">
                <MapContainer>
                    <MainCampusMap />
                </MapContainer>
            </div>
            <p className="text-center text-slate-400 text-sm mt-3">
                * You can zoom and drag the map to explore.
            </p>
        </div>

      </div>
    </div>
  );
}