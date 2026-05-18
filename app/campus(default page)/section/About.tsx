"use client";
import { MapPin, Calendar, Award, School } from "lucide-react";
import Image from "next/image";
// 引入我們剛建立的地圖元件 (若目前註解掉則沒關係)
// import MapContainer from "../../components/Maps/MapContainer";
// import MainCampusMap from "../../components/Maps/MainCampusMap";

export default function About() {
  return (
    // 【套用】：外層底色 bg-[#fffdf8]、大圓角、米灰邊框與專屬陰影
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] pt-12 px-6 pb-6 md:pt-12 md:px-10 md:pb-10 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar relative">
      
      {/* 淡淡的全域方眼格紋背景 */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(#f1f5f9 1px, transparent 1px), 
            linear-gradient(90deg, #f1f5f9 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 8px'
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col">
        {/* 1. 頂部大圖區塊 */}
        {/* 【修改】：幫你把 Image 標籤準備好了！替換 src 即可 */}
        <div className="w-full aspect-[21/9] rounded-[24px] mb-12 relative overflow-hidden group shrink-0 shadow-sm border border-[#eadfce]">
          <Image 
            src="/homepage/About.jpg" 
            alt="CCU Campus"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          {/* 圖片上的一層淡雅漸層，讓圖片看起來更柔和 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          {/* 2. 標題與簡介 */}
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              National Chung Cheng University
            </h2>
            {/* 手帳風的分隔線 */}
            <div className="w-16 h-[3px] bg-emerald-500 mx-auto rounded-full mb-8"></div>
            
            <div className="text-[#6f7b76] font-medium leading-8 text-justify space-y-8 text-base md:text-lg">
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
            {/* 【套用】：卡片底色 bg-[#fffefb]、米灰邊框、Hover 綠色框 */}
            <div className="p-6 rounded-2xl bg-[#fffefb] border border-[#eadfce] shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
                <Calendar size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Established</h3>
              <p className="text-sm font-medium text-[#6f7b76]">Founded in 1989</p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-[#fffefb] border border-[#eadfce] shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Location</h3>
              <p className="text-sm font-medium text-[#6f7b76]">Minxiong, Chiayi</p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-[#fffefb] border border-[#eadfce] shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
                <School size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Students</h3>
              <p className="text-sm font-medium text-[#6f7b76]">Over 10,000 people</p>
            </div>
          </div>

          {/* 4. 校園平面地圖 (保留給未來開啟) */}
          <div className="w-full mb-10">
            {/* <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Campus Map</h3>
              <div className="h-px bg-[#eadfce] flex-1"></div>
            </div> */}

            {/* 地圖容器 */}
            {/* <div className="w-full h-[600px] rounded-[24px] border border-[#eadfce] bg-[#fffefb] overflow-hidden shadow-sm">
              <MapContainer>
                <MainCampusMap />
              </MapContainer>
            </div> */} 
            {/* <p className="text-center text-[#a8a196] font-medium text-sm mt-3">
              * You can zoom and drag the map to explore.
            </p> */}

            {/* 結尾文字：加上手帳風虛線頂部邊界 */}
            <div className="text-[#6f7b76] font-medium leading-8 text-justify space-y-8 mt-12 md:mt-16 pt-10 border-t-2 border-dashed border-[#eadfce]/60 text-base md:text-lg">
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
    </div>
  );
}