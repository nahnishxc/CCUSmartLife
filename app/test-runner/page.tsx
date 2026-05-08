"use client";
import { useState, useRef } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://campus-ai-backend-1.onrender.com";

export default function TestRunner() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, isWarmup: false });
  
  // 煞車控制器
  const abortTest = useRef(false);

  // 1. 讀取並解析 JSON 檔案
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        let parsedQuestions: string[] = [];

        // 判斷同學給的是 Array 還是 Object (處理 {"0": "...", "1": "..."} 的格式)
        if (Array.isArray(json)) {
          parsedQuestions = json;
        } else if (typeof json === 'object' && json !== null) {
          parsedQuestions = Object.values(json);
        }

        if (parsedQuestions.length > 0) {
          setQuestions(parsedQuestions);
          alert(`成功載入 ${parsedQuestions.length} 題！\n前 69 題將作為暖身不列入平均計算。`);
        } else {
          alert("JSON 格式無法解析出題目！");
        }
      } catch (err) {
        alert("檔案解析失敗！請確認是否為合法的 JSON 檔。");
      }
    };
    reader.readAsText(file);
  };

// 2. 核心迴圈：開始跑測試
  const runTests = async () => {
    if (questions.length === 0) {
      alert("請先上傳題庫！");
      return;
    }
    
    setIsTesting(true);
    setResults([]);
    setMessages([]);
    setProgress({ current: 0, total: questions.length, isWarmup: true });
    
    abortTest.current = false;
    const token = localStorage.getItem("token");
    const testResults: any[] = [];

    // 紀錄正式題目的計數器（用來判斷每 50 題休息一次）
    let validQuestionCounter = 0;

    for (let i = 0; i < questions.length; i++) {
      if (abortTest.current) {
        console.log("⚠️ 測試已手動中斷");
        break;
      }

      const q = questions[i];
      const isWarmupPhase = i < 69; 

      setProgress({ current: i + 1, total: questions.length, isWarmup: isWarmupPhase });

      const apiStartTime = performance.now();
      let aiReply = "Error";

      try {
        const res = await fetch(`${API_BASE_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ message: q, sessionId: null }),
        });
        
        if (!res.ok) {
           aiReply = `API 錯誤 (Status: ${res.status})`;
        } else {
           const data = await res.json();
           aiReply = data.answer || data.message || "Empty response";
        }
      } catch (e) {
        aiReply = "網路連線失敗或跨域錯誤";
      }

      const apiEndTime = performance.now();
      const apiDuration = apiEndTime - apiStartTime;

      const renderStartTime = performance.now();
      setMessages((prev) => [...prev, { role: "user", content: q }, { role: "ai", content: aiReply }]);

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const renderEndTime = performance.now();
            const renderDuration = renderEndTime - renderStartTime;
            
            testResults.push({
              id: i + 1,
              question: q,
              apiTimeMs: Number(apiDuration.toFixed(2)),
              renderTimeMs: Number(renderDuration.toFixed(2)),
              isWarmup: isWarmupPhase
            });
            resolve();
          });
        });
      });

      // --- 休息與冷卻邏輯 ---
      if (!isWarmupPhase) {
        validQuestionCounter++;
        
        // 如果剛好跑滿 50 題，且不是最後一題
        if (validQuestionCounter % 50 === 0 && i < questions.length - 1) {
          console.log(`❄️ 已完成 ${validQuestionCounter} 題正式測試，進入 10 秒冷卻期...`);
          
          // 在介面上提示正在休息，你可以透過修改 progress 的文字來呈現
          // 這裡我們簡單用一個 10 秒的等待
          await new Promise((r) => setTimeout(r, 10000)); 
          continue; // 跳過下面的 1 秒暫停，因為已經休息 10 秒了
        }
      }

      // 每題之間固定的 1 秒緩衝
      await new Promise((r) => setTimeout(r, 1000)); 
    }

    setResults(testResults);
    setIsTesting(false);
    
    if (abortTest.current) {
        alert("測試已中斷！你仍然可以匯出目前已跑完的數據。");
    } else {
        alert("測試完成！可以匯出數據了。");
    }
  };

  // 3. 計算平均與標準差並打包成 JSON 下載 (排除暖身題)
  const handleExport = () => {
    if (results.length === 0) return;

    // 只過濾出「非暖身」的數據來進行統計
    const validResults = results.filter(r => !r.isWarmup);

    const getStats = (arr: number[]) => {
      if (arr.length === 0) return { mean: 0, stdDev: 0 };
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
      return { mean: Number(mean.toFixed(2)), stdDev: Number(Math.sqrt(variance).toFixed(2)) };
    };

    const apiTimes = validResults.map(r => r.apiTimeMs);
    const renderTimes = validResults.map(r => r.renderTimeMs);

    const finalReport = {
      reportSummary: {
        totalQuestionsFired: results.length,
        warmupQuestionsIgnored: results.filter(r => r.isWarmup).length,
        validQuestionsCalculated: validResults.length,
      },
      apiStats: getStats(apiTimes),
      renderStats: getStats(renderTimes),
      rawData: results
    };

    const blob = new Blob([JSON.stringify(finalReport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frontend_performance_report.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">前端效能自動化測試站</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">1. 上傳題庫 (.json)：</label>
          <input type="file" accept=".json" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
        </div>

        <div className="flex gap-4">
          <button onClick={runTests} disabled={isTesting || questions.length === 0} className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {isTesting 
              ? `執行中... (${progress.current}/${progress.total}) ${progress.isWarmup ? '🔥 暖身中' : '📊 紀錄中'}` 
              : "2. 開始執行測試"}
          </button>
          
          {/* 緊急煞車按鈕，只有在 isTesting 為 true 時才會顯示 */}
          {isTesting && (
            <button 
              onClick={() => { abortTest.current = true; }} 
              className="bg-red-500 hover:bg-red-600 transition-colors text-white px-6 py-2 rounded-lg shadow-sm font-bold animate-pulse"
            >
              🛑 停止測試
            </button>
          )}
          
          <button onClick={handleExport} disabled={results.length === 0 || isTesting} className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
            3. 匯出測試報告 (.json)
          </button>
        </div>
      </div>

      <div className="h-64 overflow-y-auto bg-gray-50 p-4 border rounded-lg opacity-60 pointer-events-none">
        <p className="text-sm text-gray-400 mb-3 font-mono">Terminal Output ({messages.length} messages)...</p>
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 text-xs p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-100 text-blue-800 ml-8' : 'bg-green-100 text-green-800 mr-8'}`}>
            <span className="font-bold opacity-50 mr-2">[{m.role.toUpperCase()}]</span>
            {m.content.length > 60 ? m.content.substring(0, 60) + '...' : m.content}
          </div>
        ))}
      </div>
    </div>
  );
}