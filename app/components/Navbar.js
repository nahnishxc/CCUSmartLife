// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Globe, User, ChevronRight } from "lucide-react";
// import LoginModal from "./LoginModal";
// import ProfileModal from "./ProfileModal";


// export default function Navbar() {
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   const linkStyle = "text-sm text-[#333333] hover:underline";

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");
//     if (token && savedUser) {
//       setIsLoggedIn(true);
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setIsLoggedIn(true);
//     if (userData) {
//       setUser(userData);
//       localStorage.setItem("user", JSON.stringify(userData));
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUser(null);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <>
//       <LoginModal 
//         isOpen={isLoginOpen} 
//         onClose={() => setIsLoginOpen(false)} 
//         onLoginSuccess={handleLoginSuccess}
//       />

//       <ProfileModal 
//         isOpen={isProfileOpen} 
//         onClose={() => setIsProfileOpen(false)} 
//         userData={user}
//       />

//       <header className="fixed top-0 left-0 right-0 h-20 px-8 flex items-center justify-between bg-white border-b border-[#e5e5e5] z-[100]">
//         <Link href="/" className="font-bold text-xl tracking-wider text-black">
//           CCU SmartLife
//         </Link>
        
//         <nav className="flex items-center gap-6 relative">
//           <a href="https://oia.ccu.edu.tw/" target="_blank" rel="noreferrer" className={linkStyle}>OIA</a>
//           <a href="https://www.ccu.edu.tw/" target="_blank" rel="noreferrer" className={linkStyle}>CCU</a>
//           {/* <Link href="/guides" className={linkStyle}>guides</Link>

//           <button className="flex items-center gap-1 hover:text-black text-sm text-[#333333]">
//             <Globe size={16} /> EN/ZH
//           </button> */}

//           {/* {!isLoggedIn ? (
//             <button
//               onClick={() => setIsLoginOpen(true)}
//               className="hover:text-black flex items-center gap-1 text-sm text-[#333333] ml-2"
//             >
//               Log in / Sign up
//             </button>
//           ) : (
//             <div className="relative">
//               <button 
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors ml-2"
//               >
//                 <User size={20} />
//               </button>

//               {isDropdownOpen && (
//                 <>
//                   <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  
//                   <div className="absolute top-14 right-0 w-64 bg-[#E5E5E5] rounded-xl shadow-xl overflow-hidden z-20 text-sm">
//                     <button 
//                       onClick={() => {
//                         setIsDropdownOpen(false);
//                         setIsProfileOpen(true);
//                       }}
//                       className="w-full flex items-center justify-between p-4 border-b border-gray-300 hover:bg-[#D4D4D4] transition-colors text-left"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
//                           <User size={20} />
//                         </div>
//                         <div className="overflow-hidden">
//                           <div className="font-bold text-gray-800 truncate">{user?.name || "User Name"}</div>
//                           <div className="text-xs text-gray-500 truncate">{user?.email || "Email"}</div>
//                         </div>
//                       </div>
//                       <ChevronRight size={16} className="text-gray-500" />
//                     </button>

//                     <div className="py-2">
//                       <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Calendar</button>
//                       <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Notifications</button>
//                       <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Policies & Agreements</button>
//                       <button className="w-full px-6 py-2 text-left text-gray-700 hover:bg-[#D4D4D4] transition-colors">Contact Us</button>
//                     </div>

//                     <div className="p-4 pt-2">
//                       <button 
//                         onClick={handleLogout}
//                         className="w-full bg-white py-2 rounded-md font-bold text-gray-700 hover:bg-gray-100 transition-colors text-center shadow-sm"
//                       >
//                         log out
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           )} */}
//         </nav>
//       </header>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// 引入 Menu (漢堡) 和 X (關閉)，並把 MainNav 會用到的圖示一起引進來
import { Globe, User, ChevronRight, Menu, X, MapPin, Megaphone, Utensils, Bus, BookOpen, Calendar } from "lucide-react";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // 新增：控制手機版漢堡選單的開關
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyle = "text-sm text-[#333333] hover:underline";

  // 將原本在 MainNav 的選項搬過來，供手機版選單使用
  const navItems = [
    { name: "Campus", icon: MapPin, href: "/" },
    { name: "Announcement", icon: Megaphone, href: "/announcement" },
    { name: "Restaurant", icon: Utensils, href: "/restaurant" },
    { name: "Transportation", icon: Bus, href: "/transportation" },
    { name: "FAQ", icon: BookOpen, href: "/FAQ" },
    { name: "Others", icon: Calendar, href: "/others" }, // 手機版為求簡化，可先將 Others 做成單一連結
  ];

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
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} userData={user} />

      {/* 最外層 header */}
      <header className="fixed top-0 left-0 right-0 h-20 px-4 md:px-8 flex items-center justify-between bg-white border-b border-[#e5e5e5] z-[100]">
        <Link href="/" className="font-bold text-xl tracking-wider text-black z-[101]">
          CCU SmartLife
        </Link>
        
        {/* 電腦版：原本右側的連結 (加上 hidden md:flex 讓它在手機版消失) */}
        <nav className="hidden md:flex items-center gap-6 relative">
          <a href="https://oia.ccu.edu.tw/" target="_blank" rel="noreferrer" className={linkStyle}>OIA</a>
          <a href="https://www.ccu.edu.tw/" target="_blank" rel="noreferrer" className={linkStyle}>CCU</a>
          {/* 其他 Login 邏輯維持不變... */}
        </nav>

        {/* 手機版：漢堡按鈕 (加上 md:hidden 讓它在電腦版消失) */}
        <button 
          className="md:hidden p-2 text-gray-600 z-[101]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* 手機版：全螢幕下拉選單 */}
      {/* 判斷 isMobileMenuOpen 來決定是否顯示，並加入動畫 */}
      <div 
        className={`fixed inset-0 bg-white z-[90] transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: "80px" }} // 避開上方 80px (h-20) 的 Navbar
      >
        <div className="flex flex-col p-6 gap-2 overflow-y-auto h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)} // 點擊後自動收合選單
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  isActive ? "bg-emerald-50 text-emerald-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon size={24} className={isActive ? "text-emerald-600" : "text-gray-400"} />
                <span className={`text-lg font-bold ${isActive ? "text-emerald-700" : "text-gray-700"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
          
          <div className="h-[1px] bg-gray-200 my-4" />
          
          {/* 原本在 Navbar 上的外部連結也移進手機選單底部 */}
          <a href="https://oia.ccu.edu.tw/" target="_blank" rel="noreferrer" className="p-4 text-gray-600 font-medium">To OIA</a>
          <a href="https://www.ccu.edu.tw/" target="_blank" rel="noreferrer" className="p-4 text-gray-600 font-medium">To CCU</a>
        </div>
      </div>
    </>
  );
}