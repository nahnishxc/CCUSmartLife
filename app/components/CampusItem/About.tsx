"use client";
import { MapPin, Calendar, Award, School } from "lucide-react";
// 引入我們剛建立的地圖元件
import MapContainer from "../Maps/MapContainer";
import MainCampusMap from "../Maps/MainCampusMap";

export default function About() {
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* 1. 頂部大圖與標題 */}
      <div className="w-full aspect-[21/9] bg-emerald-50 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden group shrink-0">
        {/* 圖片 Placeholder */}
        <div className="text-emerald-200 font-bold text-3xl tracking-widest z-10">
          CCU CAMPUS IMAGE
        </div>
        {/* 裝飾圓圈 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-100/50 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        {/* 2. 標題與簡介 */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            National Chung Cheng University
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <div className="text-gray-500 leading-loose text-lg text-justify space-y-6">
            <p>
              If you are preparing to begin a new academic journey in Taiwan,
              National Chung Cheng University (CCU) could be a place where you
              feel both supported and inspired.
            </p>

            <p>
              Located in Chiayi County in southern Taiwan, CCU is widely known
              for its spacious and beautiful campus. Surrounded by greenery,
              lakes, and wide walking paths, it is often considered one of the
              most picturesque university campuses in Taiwan. Here, you are not
              just attending classes — you are learning and growing in a
              peaceful natural environment that helps you focus and reflect.
            </p>

            <p>
              CCU offers a wide range of academic programs, including
              humanities, social sciences, management, engineering, and
              education. The university is committed to building an
              international learning environment, providing English-taught
              courses and exchange opportunities. The Office of International
              Affairs (OIA) supports international students with visas,
              accommodation arrangements, and daily life adaptation, helping you
              feel at home from the moment you arrive.
            </p>

            <p>
              In terms of daily life, Chiayi is a friendly and comfortable city
              with a relatively affordable cost of living. Transportation is
              convenient, and the city center and train station are easily
              accessible from campus. On campus, you will find comprehensive
              facilities such as a modern library, sports centers, dormitories,
              and a wide variety of student clubs and activities. Beyond
              academics, you will have many opportunities to meet new friends
              and explore your interests.
            </p>
          </div>
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
              <School size={24} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Students</h3>
            <p className="text-sm text-gray-500">Over 10000 people</p>
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
            <div className="text-gray-500 leading-loose text-lg text-justify space-y-6 mt-12 md:mt-16">
          <p>
            At CCU, you will discover that it is more than just a university —
            it is a welcoming community where you can pursue your goals, connect
            with people from around the world, and create meaningful memories.
          </p>

          <p>
            If you are looking for a study destination that combines academic
            excellence, a beautiful environment, and a supportive community,
            National Chung Cheng University may be the perfect place to begin
            your next chapter.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
