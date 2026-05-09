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
      let firstTokenTime: number | null = null; // 紀錄 TTFT 專用
      let apiEndTime = apiStartTime;
      let aiReply = "";

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
           apiEndTime = performance.now();
        } else if (!res.body) {
           aiReply = "ReadableStream not supported by response";
           apiEndTime = performance.now();
        } else {
          // 【Streaming 解析邏輯整合】
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            // 如果在串流過程中按下停止，馬上切斷
            if (abortTest.current) {
              reader.cancel();
              break;
            }

            const { done, value } = await reader.read();

            if (value) {
              buffer += decoder.decode(value, { stream: true });
            }

            const lines = buffer.split("\n");

            if (!done) {
              buffer = lines.pop() || "";
            } else {
              buffer = "";
            }

            let newTextToAdd = "";

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine) continue;

              let jsonStr = "";
              if (trimmedLine.startsWith("data:")) {
                jsonStr = trimmedLine.slice(5).trim();
              } else if (trimmedLine.startsWith("{") && trimmedLine.endsWith("}")) {
                jsonStr = trimmedLine;
              }

              if (jsonStr === "[DONE]") continue;

              if (jsonStr) {
                try {
                  const parsed = JSON.parse(jsonStr);
                  const tokenString = parsed.token || parsed.message || parsed.answer || parsed.content || "";
                  if (tokenString) {
                    newTextToAdd += tokenString;
                  }
                } catch (e) {
                  // 解析失敗可忽略
                }
              }
            }

            if (newTextToAdd) {
              // 捕捉第一個 Token 的時間 (TTFT)
              if (!firstTokenTime) {
                firstTokenTime = performance.now();
              }
              aiReply += newTextToAdd;
            }

            if (done) {
              apiEndTime = performance.now();
              break;
            }
          }
        }
      } catch (e) {
        aiReply = "網路連線失敗或跨域錯誤";
        apiEndTime = performance.now();
      }

      // 如果完全沒收到 Token 就失敗了，TTFT 視為跟總時間一樣
      const ttftDuration = firstTokenTime ? (firstTokenTime - apiStartTime) : (apiEndTime - apiStartTime);
      const totalApiDuration = apiEndTime - apiStartTime;

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
              ttftMs: Number(ttftDuration.toFixed(2)),            // 新增: 首字時間
              totalApiTimeMs: Number(totalApiDuration.toFixed(2)), // 新增: 整題跑完時間
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
        if (validQuestionCounter % 50 === 0 && i < questions.length - 1) {
          console.log(`❄️ 已完成 ${validQuestionCounter} 題正式測試，進入 10 秒冷卻期...`);
          await new Promise((r) => setTimeout(r, 10000)); 
          continue; 
        }
      }
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

    const validResults = results.filter(r => !r.isWarmup);

    const getStats = (arr: number[]) => {
      if (arr.length === 0) return { mean: 0, stdDev: 0 };
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
      return { mean: Number(mean.toFixed(2)), stdDev: Number(Math.sqrt(variance).toFixed(2)) };
    };

    const ttftTimes = validResults.map(r => r.ttftMs);
    const totalApiTimes = validResults.map(r => r.totalApiTimeMs);
    const renderTimes = validResults.map(r => r.renderTimeMs);

    const finalReport = {
      reportSummary: {
        totalQuestionsFired: results.length,
        warmupQuestionsIgnored: results.filter(r => r.isWarmup).length,
        validQuestionsCalculated: validResults.length,
      },
      ttftStats: getStats(ttftTimes),          // 首字時間統計
      totalApiStats: getStats(totalApiTimes),  // 總生成時間統計
      renderStats: getStats(renderTimes),      // 畫面渲染時間統計
      rawData: results
    };

    const blob = new Blob([JSON.stringify(finalReport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frontend_streaming_performance_report.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">前端效能自動化測試站 (Streaming 版)</h1>
      
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