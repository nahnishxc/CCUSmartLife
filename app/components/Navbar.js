"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, User, ChevronRight } from "lucide-react";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal"; // 引入新檔案

export default function Navbar() {
  // 視窗開關
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // 登入狀態 (實際專案會用 Context 或 NextAuth)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 下拉選單開關
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const linkStyle = "text-sm text-[#333333] hover:underline";

  // 登出
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* 登入視窗：登入成功後，設定 isLoggedIn = true */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={() => setIsLoggedIn(true)}
      />

      {/* 個人資料視窗 */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      <header className="fixed top-0 left-0 right-0 h-20 px-8 flex items-center justify-between bg-white border-b border-[#e5e5e5] z-[100]">
        <Link href="/" className="font-bold text-lg tracking-wider text-black">
          OIA STAMP
        </Link>
        
        <nav className="flex items-center gap-6 relative">
          <a href="https://oia.ccu.edu.tw/" target="_blank" rel="noreferrer" className={linkStyle}>OIA</a>
          <a href="https://www.ccu.edu.tw/" target="_blank" rel="noreferrer" className={linkStyle}>ccu</a>
          <Link href="/guides" className={linkStyle}>guides</Link>

          <button className="flex items-center gap-1 hover:text-black text-sm text-[#333333]">
            <Globe size={16} /> EN/ZH
          </button>

          {/* 判斷登入狀態 */}
          {!isLoggedIn ? (
            // 未登入：顯示登入按鈕
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hover:text-black flex items-center gap-1 text-sm text-[#333333] ml-2"
            >
              Log in / Sign up
            </button>
          ) : (
            // 已登入：顯示頭像與下拉選單
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors ml-2"
              >
                <User size={20} />
              </button>

              {/* 下拉選單 (圖二) */}
              {isDropdownOpen && (
                <>
                  {/* 透明層，點擊外部關閉選單 */}
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  
                  {/* 選單本體 */}
                  <div className="absolute top-14 right-0 w-64 bg-[#E5E5E5] rounded-xl shadow-xl overflow-hidden z-20 text-sm">
                    {/* Header: User Info (可點擊) */}
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsProfileOpen(true); // 打開 Profile Modal
                      }}
                      className="w-full flex items-center justify-between p-4 border-b border-gray-300 hover:bg-[#D4D4D4] transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                          <User size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">user name</div>
                          <div className="text-xs text-gray-500">Email</div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-500" />
                    </button>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Calendar</button>
                      <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Notifications</button>
                      <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Policies & Agreements</button>
                      <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Contact Us</button>
                    </div>

                    {/* Log out */}
                    <div className="p-4 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full bg-white py-2 rounded-md font-bold text-gray-700 hover:bg-gray-100 transition-colors text-center shadow-sm"
                      >
                        log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}