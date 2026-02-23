"use client";
import { useState } from "react";
import { X, ArrowLeft, Eye, EyeOff, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData?: any) => void;
}

type ViewState = "LOGIN" | "FORGOT_PASSWORD" | "SIGNUP";

// 同學提供的 Base URL
const API_BASE_URL = "https://campus-ai-backend-1.onrender.com";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [currentView, setCurrentView] = useState<ViewState>("LOGIN");
  const [signupStep, setSignupStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 新增載入狀態
  const [formData, setFormData] = useState({
    email: "", password: "", nickname: "", country: "", gender: ""
  });

  const handleInputChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();
  
  const handleClose = () => {
    if (isLoading) return; 
    setCurrentView("LOGIN");
    setSignupStep(1);
    setFormData({ email: "", password: "", nickname: "", country: "", gender: "" });
    onClose();
  };

  // 處理註冊邏輯
  const handleSignupSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.nickname, // 將 UI 的 nickname 對應到 API 的 name
          country: formData.country,
          gender: formData.gender.toLowerCase() // 轉小寫以符合慣例
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 註冊成功後自動登入，或直接使用回傳的 token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        onLoginSuccess(data.user);
        handleClose();
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Network error, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (signupStep === 1) {
      if (!formData.email || !formData.password) return alert("Please fill in email and password");
      setSignupStep(2);
    } else if (signupStep === 2) {
      if (!formData.nickname || !formData.country || !formData.gender) return alert("Please fill in all profile info");
      setSignupStep(3);
    } else if (signupStep === 3) {
      handleSignupSubmit(); // 第三步點擊時正式送出後端
    }
  };

  // 處理登入邏輯
  const handleLogin = async () => {
    if (!formData.email || !formData.password) return alert("Please enter email and password");
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // 儲存 JWT Token
        onLoginSuccess(data.user);
        handleClose();
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      alert("Network error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={handleModalClick}
            className="relative bg-white/95 w-full max-w-[450px] min-h-[500px] rounded-sm shadow-2xl overflow-hidden mx-4 flex flex-col"
          >
            <button 
              disabled={isLoading}
              onClick={handleClose} 
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-20 disabled:opacity-50"
            >
              <X size={24} />
            </button>
            
            {currentView === "SIGNUP" && signupStep < 3 && (
              <div className="absolute top-6 left-0 right-0 flex justify-center gap-2 z-10">
                {[1, 2, 3].map((step) => (<div key={step} className={`w-2 h-2 rounded-full transition-colors duration-300 ${signupStep >= step ? "bg-emerald-500" : "bg-gray-300"}`} />))}
              </div>
            )}

            <div className="p-8 md:p-10 w-full flex-1 flex flex-col justify-center">
              {/* === LOGIN VIEW === */}
              {currentView === "LOGIN" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6 text-center">
                  <div className="mt-4">
                    <h2 className="text-2xl font-medium text-gray-800 mb-2">Welcome Back !</h2>
                    <p className="text-sm text-gray-500">Don't have an account? <button onClick={() => {setCurrentView("SIGNUP"); setSignupStep(1);}} className="text-emerald-600 font-bold hover:underline">sign up</button></p>
                  </div>
                  <div className="space-y-3 text-left">
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-none rounded-md text-sm focus:ring-2 focus:ring-emerald-200 outline-none"/>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-none rounded-md text-sm focus:ring-2 focus:ring-emerald-200 outline-none"/>
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                  </div>
                  <button 
                    disabled={isLoading}
                    onClick={handleLogin}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md transition-all disabled:bg-emerald-400"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </motion.div>
              )}

              {/* === SIGNUP VIEW === */}
              {currentView === "SIGNUP" && (
                <div className="h-full flex flex-col">
                  {signupStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5 mt-4">
                      <div className="flex items-center"><button onClick={() => setCurrentView("LOGIN")} className="p-1 text-gray-400"><ArrowLeft size={20} /></button><h2 className="text-xl font-bold text-gray-800 mx-auto">Sign up</h2></div>
                      <div className="space-y-3">
                        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full px-4 py-3 bg-gray-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-emerald-200"/>
                        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="w-full px-4 py-3 bg-gray-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-emerald-200"/>
                      </div>
                      <button onClick={handleNextStep} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-md">Next Step</button>
                    </motion.div>
                  )}
                  {signupStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5 mt-4">
                      <h2 className="text-lg font-bold text-gray-800 text-center">Tell us about yourself</h2>
                      <div className="space-y-4">
                        <input type="text" placeholder="Nickname" value={formData.nickname} onChange={(e) => handleInputChange("nickname", e.target.value)} className="w-full px-4 py-3 bg-gray-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-emerald-200"/>
                        <input type="text" placeholder="Country" value={formData.country} onChange={(e) => handleInputChange("country", e.target.value)} className="w-full px-4 py-3 bg-gray-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-emerald-200"/>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {["Male", "Female", "Non-binary", "Secret"].map((g) => (
                            <label key={g} className="flex items-center gap-1 cursor-pointer">
                              <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={(e) => handleInputChange("gender", e.target.value)} className="accent-emerald-600"/>{g}
                            </label>
                          ))}
                        </div>
                      </div>
                      <button onClick={handleNextStep} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-md">Continue</button>
                    </motion.div>
                  )}
                  {signupStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center h-full gap-6 mt-8">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><User size={32} /></div>
                      <h2 className="text-xl font-bold">Ready to go, {formData.nickname}!</h2>
                      <button 
                        disabled={isLoading}
                        onClick={handleNextStep}
                        className="w-full py-3 bg-emerald-600 text-white font-bold rounded-md disabled:bg-emerald-400"
                      >
                        {isLoading ? "Creating account..." : "Get Started!"}
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