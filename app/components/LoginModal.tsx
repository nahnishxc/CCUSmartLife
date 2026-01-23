"use client";
import { useState } from "react";
// ... 其他 imports (X, ArrowLeft, etc.)
import { X, ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react"; // 補全 import 以防萬一
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void; // <--- 新增這個 Prop
}

type ViewState = "LOGIN" | "FORGOT_PASSWORD" | "SIGNUP";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  // ... (中間的 state 與邏輯保持不變) ...
  const [currentView, setCurrentView] = useState<ViewState>("LOGIN");
  const [signupStep, setSignupStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "", password: "", nickname: "", country: "", gender: ""
  });

  const handleInputChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();
  
  const handleClose = () => {
    setCurrentView("LOGIN");
    setSignupStep(1);
    setFormData({ email: "", password: "", nickname: "", country: "", gender: "" });
    onClose();
  };

  // 處理下一步 / 完成註冊
  const handleNextStep = () => {
    if (signupStep === 1) {
      if (!formData.email || !formData.password) return alert("Please fill in all fields"); // 簡單驗證
      setSignupStep(2);
    } else if (signupStep === 2) {
      setSignupStep(3);
    } else if (signupStep === 3) {
      // 註冊成功！
      onLoginSuccess(); // <--- 通知 Navbar 登入成功
      handleClose();    // 關閉視窗
    }
  };

  // 處理登入
  const handleLogin = () => {
      // 這裡省略驗證邏輯，直接假設成功
      onLoginSuccess(); // <--- 通知 Navbar 登入成功
      handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans">
          {/* ... 背景遮罩保持不變 ... */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={handleModalClick}
            className="relative bg-white/95 w-full max-w-[450px] min-h-[500px] rounded-sm shadow-2xl overflow-hidden mx-4 flex flex-col"
          >
            {/* ... 頂部關閉按鈕與 Dots 保持不變 ... */}
            <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-20"><X size={24} /></button>
            {currentView === "SIGNUP" && signupStep < 3 && (
              <div className="absolute top-6 left-0 right-0 flex justify-center gap-2 z-10">
                {[1, 2, 3].map((step) => (<div key={step} className={`w-2 h-2 rounded-full transition-colors duration-300 ${signupStep >= step ? "bg-emerald-500" : "bg-gray-300"}`} />))}
              </div>
            )}

            <div className="p-8 md:p-10 w-full flex-1 flex flex-col justify-center">
              
              {/* === VIEW 1: LOGIN === */}
              {currentView === "LOGIN" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-6 text-center">
                  {/* ... 標題與 Input 保持不變 ... */}
                  <div className="mt-4">
                    <h2 className="text-2xl font-medium text-gray-800 mb-2">Welcome Back !</h2>
                    <p className="text-sm text-gray-500">Don't have an account? <button onClick={() => {setCurrentView("SIGNUP"); setSignupStep(1);}} className="text-emerald-600 font-bold hover:underline">sign up</button></p>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="relative">
                       <input type="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full pl-4 pr-4 py-3 bg-gray-100 border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"/>
                    </div>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="w-full pl-4 pr-10 py-3 bg-gray-100 border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"/>
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                  </div>
                  <button onClick={() => setCurrentView("FORGOT_PASSWORD")} className="text-xs text-red-400 font-medium hover:underline self-end -mt-2">Forget password?</button>
                  
                  {/* 修改登入按鈕 onClick */}
                  <button 
                    onClick={handleLogin} // <--- 綁定登入函式
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md transition-colors shadow-md shadow-emerald-100"
                  >
                    Login
                  </button>
                </motion.div>
              )}

              {/* ... FORGOT PASSWORD 保持不變 ... */}
              {currentView === "FORGOT_PASSWORD" && (
                 // (略，保持原樣)
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 text-center">
                    <div className="mt-8"><h2 className="text-xl font-medium text-gray-800 mb-4">Forget password</h2><p className="text-xs text-gray-500 leading-relaxed px-4">Enter your registered email and we'll send you instructions to reset your password.</p></div>
                    <div className="space-y-4 mt-2"><input type="email" placeholder="Email" className="w-full px-4 py-3 bg-gray-100 border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"/><button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md transition-colors">send email</button></div>
                    <button onClick={() => setCurrentView("LOGIN")} className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-gray-800 transition-colors mt-4"><ArrowLeft size={14} />back to login</button>
                 </motion.div>
              )}

              {/* ... SIGN UP (Step 1 & 2 保持不變，Step 3 修改按鈕) ... */}
              {currentView === "SIGNUP" && (
                <div className="h-full flex flex-col">
                  {/* Step 1 & 2 (略，保持原樣) */}
                  {signupStep === 1 && (
                     // 內容保持原樣
                     <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5 mt-4">
                        <div className="flex items-center mb-2"><button onClick={() => setCurrentView("LOGIN")} className="p-1 -ml-2 text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></button><h2 className="text-xl font-bold text-gray-800 ml-auto mr-auto">Sign up</h2><div className="w-6"></div></div>
                        <div className="text-center text-xs text-gray-500 mb-2">Already have an account? <button onClick={() => setCurrentView("LOGIN")} className="text-red-500 font-bold hover:underline">log in</button></div>
                        <div className="space-y-3"><input type="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"/><input type="password" placeholder="Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"/></div>
                        <div className="flex items-start gap-2 text-[10px] text-gray-400 mt-1"><input type="checkbox" id="terms" className="mt-0.5 accent-emerald-600" /><label htmlFor="terms">I have read and agree to the Privacy Policy and Terms of Service.</label></div>
                        <button onClick={handleNextStep} className="w-full py-3 bg-gray-300 hover:bg-emerald-600 hover:text-white text-gray-700 font-bold rounded-md transition-all mt-2">sign up</button>
                     </motion.div>
                  )}
                  {signupStep === 2 && (
                     // 內容保持原樣
                     <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5 mt-4">
                        <div className="flex items-center mb-4"><button onClick={() => setSignupStep(1)} className="p-1 -ml-2 text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></button><h2 className="text-lg font-bold text-gray-800 ml-auto mr-auto text-center">Help us get to know you better!</h2><div className="w-6"></div></div>
                        <div className="space-y-4"><div><label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Your Nickname</label><input type="text" placeholder="Enter your nickname" value={formData.nickname} onChange={(e) => handleInputChange("nickname", e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"/></div><div><label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1 block">Where are you from?</label><input type="text" placeholder="Country / Region" value={formData.country} onChange={(e) => handleInputChange("country", e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"/></div><div><label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-2 block">Gender</label><div className="grid grid-cols-2 gap-3 text-sm text-gray-600">{["Male", "Female", "Non-binary / Other", "Prefer not to say"].map((g) => (<label key={g} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition-colors"><input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={(e) => handleInputChange("gender", e.target.value)} className="accent-emerald-600 w-4 h-4"/>{g}</label>))}</div></div></div>
                        <button onClick={handleNextStep} className="w-full py-3 bg-gray-300 hover:bg-emerald-600 hover:text-white text-gray-700 font-bold rounded-md transition-all mt-4">keep on</button>
                     </motion.div>
                  )}

                  {/* Step 3: 修改按鈕觸發 handleNextStep -> onLoginSuccess */}
                  {signupStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full gap-6 mt-8">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2"><User size={40} /></div>
                      <div><h2 className="text-2xl font-bold text-gray-800 mb-2">Nice to meet you, {formData.nickname}!</h2><p className="text-sm text-gray-500 px-6 leading-relaxed">Everything is ready. Let's explore CCU together.</p></div>
                      <p className="text-xs text-gray-400 italic">website guidance...</p>
                      
                      <button 
                        onClick={handleNextStep} // <--- 這裡會觸發 onLoginSuccess
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md transition-colors shadow-lg shadow-emerald-100 mt-4"
                      >
                        get started!
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}