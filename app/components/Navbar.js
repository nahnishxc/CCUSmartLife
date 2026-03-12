"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, User, ChevronRight } from "lucide-react";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const linkStyle = "text-sm text-[#333333] hover:underline";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        userData={user}
      />

      <header className="fixed top-0 left-0 right-0 h-20 px-8 flex items-center justify-between bg-white border-b border-[#e5e5e5] z-[100]">
        <Link href="/" className="font-bold text-lg tracking-wider text-black">
          OIA STAMP
        </Link>
        
        <nav className="flex items-center gap-6 relative">
          <a href="https://oia.ccu.edu.tw/" target="_blank" rel="noreferrer" className={linkStyle}>OIA</a>
          <a href="https://www.ccu.edu.tw/" target="_blank" rel="noreferrer" className={linkStyle}>CCU</a>
          {/* <Link href="/guides" className={linkStyle}>guides</Link>

          <button className="flex items-center gap-1 hover:text-black text-sm text-[#333333]">
            <Globe size={16} /> EN/ZH
          </button> */}

          {!isLoggedIn ? (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hover:text-black flex items-center gap-1 text-sm text-[#333333] ml-2"
            >
              Log in / Sign up
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors ml-2"
              >
                <User size={20} />
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  
                  <div className="absolute top-14 right-0 w-64 bg-[#E5E5E5] rounded-xl shadow-xl overflow-hidden z-20 text-sm">
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsProfileOpen(true);
                      }}
                      className="w-full flex items-center justify-between p-4 border-b border-gray-300 hover:bg-[#D4D4D4] transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                          <User size={20} />
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-bold text-gray-800 truncate">{user?.name || "User Name"}</div>
                          <div className="text-xs text-gray-500 truncate">{user?.email || "Email"}</div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-500" />
                    </button>

                    <div className="py-2">
                      <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Calendar</button>
                      <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Notifications</button>
                      <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Policies & Agreements</button>
                      <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Contact Us</button>
                    </div>

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