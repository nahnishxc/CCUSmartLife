"use client";
import { X, User, ChevronRight, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
  email?: string;
}

export default function ProfileModal({ isOpen, onClose, username = "User Name", email = "student@ccu.edu.tw" }: ProfileModalProps) {
  
  // 防止點擊內部關閉
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center font-sans">
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal 本體 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={handleModalClick}
            className="relative bg-[#E5E5E5] w-full max-w-[500px] rounded-2xl shadow-xl overflow-hidden mx-4 p-8"
          >
            {/* 關閉按鈕 */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>

            {/* 頭像與名稱 */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center text-white mb-4 shadow-sm">
                <User size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-700">{username}</h2>
            </div>

            {/* 資料欄位區 */}
            <div className="space-y-4">
              
              {/* Account */}
              <div className="bg-[#D4D4D4] p-4 rounded-lg">
                <div className="text-xs font-bold text-gray-600 mb-1">Account</div>
                <div className="text-gray-800 font-medium">{email}</div>
              </div>

              {/* Password (可點擊更改) */}
              <button className="w-full bg-[#D4D4D4] p-4 rounded-lg flex justify-between items-center group hover:bg-[#C4C4C4] transition-colors text-left">
                <div>
                  <div className="text-xs font-bold text-gray-600 mb-1">Password</div>
                  <div className="text-gray-800 font-medium tracking-widest">••••••••</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-700">
                   <Key size={14}/>
                   <span>change</span>
                </div>
              </button>

              {/* Gender & Country (並排) */}
              <div className="flex gap-4">
                <div className="flex-1 bg-[#D4D4D4] p-4 rounded-lg flex items-center justify-center text-gray-700 font-bold">
                  Female
                </div>
                <div className="flex-1 bg-[#D4D4D4] p-4 rounded-lg flex items-center justify-center text-gray-700 font-bold">
                  Taiwan
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}