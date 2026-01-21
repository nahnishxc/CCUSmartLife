"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft, ExternalLink } from "lucide-react";

// --- 1. 資料結構與假資料 ---
interface Department {
  name: string;
  url: string;
}

interface College {
  id: string;
  name: string;
  description: string;
  departments: Department[];
}

const COLLEGES_DATA: College[] = [
  {
    id: "humanities",
    name: "College of Humanities",
    description: "Dedicated to the study of human culture, history, and literature.",
    departments: [
      { name: "Department of Chinese Literature", url: "#" },
      { name: "Department of Foreign Languages and Literature", url: "#" },
      { name: "Department of History", url: "#" },
      { name: "Department of Philosophy", url: "#" },
    ]
  },
  {
    id: "science",
    name: "College of Science",
    description: "Fostering scientific innovation and research excellence.",
    departments: [
      { name: "Department of Mathematics", url: "#" },
      { name: "Department of Earth and Environmental Sciences", url: "#" },
      { name: "Department of Physics", url: "#" },
      { name: "Department of Chemistry and Biochemistry", url: "#" },
    ]
  },
  {
    id: "management",
    name: "College of Management",
    description: "Cultivating future leaders with global vision and professional skills.",
    departments: [
      { name: "Department of Economics", url: "#" },
      { name: "Department of Finance", url: "#" },
      { name: "Department of Business Administration", url: "#" },
      { name: "Department of Accounting and Information Technology", url: "#" },
      { name: "Department of Information Management", url: "#" },
    ]
  },
  {
    id: "engineering",
    name: "College of Engineering",
    description: "Leading the way in technological advancement and engineering solutions.",
    departments: [
      { name: "Department of Computer Science and Information Engineering", url: "#" },
      { name: "Department of Electrical Engineering", url: "#" },
      { name: "Department of Mechanical Engineering", url: "#" },
      { name: "Department of Chemical Engineering", url: "#" },
    ]
  },
  {
    id: "law",
    name: "College of Law",
    description: "Upholding justice and legal expertise.",
    departments: [
      { name: "Department of Law", url: "#" },
      { name: "Department of Financial and Economic Law", url: "#" },
    ]
  },
  {
    id: "education",
    name: "College of Education",
    description: "Nurturing educators and leaders in sports and health.",
    departments: [
      { name: "Department of Adult and Continuing Education", url: "#" },
      { name: "Center for Teacher Education", url: "#" },
      { name: "Department of Athletic Sports", url: "#" },
    ]
  },
  {
    id: "social",
    name: "College of Social Sciences",
    description: "Understanding society and human behavior.",
    departments: [
      { name: "Department of Social Welfare", url: "#" },
      { name: "Department of Psychology", url: "#" },
      { name: "Department of Labor Relations", url: "#" },
      { name: "Department of Communication", url: "#" },
    ]
  }
];

export default function Academic() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCollege = COLLEGES_DATA.find(c => c.id === selectedId);

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        
        {/* === View 1: Overview (Map + List) === */}
        {!selectedId && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col"
          >
            {/* 上半部：地圖區 */}
            <div className="w-full h-48 md:h-64 bg-gray-100 rounded-2xl mb-8 flex items-center justify-center border border-gray-200 relative overflow-hidden group">
              <div className="text-gray-400 font-bold text-lg tracking-widest z-10">
                MAP OF ACADEMIC UNITS
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent"></div>
            </div>

            {/* 下半部：學院列表 */}
            <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-y-auto custom-scrollbar">
              
              <div className="flex flex-col items-center md:items-start md:w-1/4 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-4 shadow-sm">
                  <BookOpen size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-bold text-gray-700">Academic</h2>
                <div className="w-8 h-1 bg-blue-200 rounded-full mt-2"></div>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {COLLEGES_DATA.map((college) => (
                    <button
                      key={college.id}
                      onClick={() => setSelectedId(college.id)}
                      className="text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium hover:text-emerald-600 hover:pl-6 transition-all duration-300 flex items-center justify-between group"
                    >
                      {college.name}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* === View 2: Detail (College Info + Departments) === */}
        {selectedId && selectedCollege && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col overflow-y-auto custom-scrollbar"
          >
            {/* 返回按鈕 */}
            <button 
              onClick={() => setSelectedId(null)}
              className="self-start mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors bg-gray-50 px-4 py-2 rounded-full font-medium"
            >
              <ArrowLeft size={18} />
              Back to Academic List
            </button>

            {/* 標題 */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{selectedCollege.name}</h2>

            {/* 內容區：左圖右文 */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-bold">
                COLLEGE IMG
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-700 mb-2">About the College</h3>
                <p className="text-gray-500 leading-relaxed">
                  {selectedCollege.description}
                </p>
              </div>
            </div>

            {/* 系所連結列表 (仿照圖片樣式：淺藍色底、藍色字) */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                Departments & Institutes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCollege.departments.map((dept, idx) => (
                  <a
                    key={idx}
                    href={dept.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-blue-50/50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors text-sm font-medium group"
                  >
                    <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                    {dept.name}
                  </a>
                ))}
              </div>
              
              {/* 底部總連結 */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <a 
                  href="#" 
                  className="text-emerald-600 font-bold hover:underline flex items-center gap-2 text-sm"
                >
                  Go to the Website of {selectedCollege.name} <ExternalLink size={14}/>
                </a>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}