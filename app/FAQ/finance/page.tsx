"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    id: "f1",
    question: "How do I open a post office or a bank account in Taiwan?",
    answer: `**1. Post ffice Accounts**
Currently, Chunghwa Post has suspended opening regular savings accounts for most foreign nationals due to financial security policies.
**2. Opening a Bank Account**
You can open an account at a commercial bank near your school or residence.
Common banks used by students include:
• Cathay United Bank
• CTBC Bank
• E.Sun Bank
• HSBC Taiwan
• Mega International Commercial Bank
You will usually need:
• ARC (most important document)
• Passport or student ID
• Taiwanese phone number
• Proof of address
※ Some banks may ask for a personal seal, but most accept a signature.
※ Important Tips
• Make an appointment in advance
• Confirm required documents with the bank beforehand
• The process may take several hours
• Consider applying for online banking and a Visa debit card
• If you need to receive money from abroad, you may also consider opening a foreign currency account.`,
  },
  {
    id: "f2",
    question:
      "Should I bring cash or use international credit cards? Where can I exchange money in Taiwan?",
    answer: `It is recommended to prepare both cash and a credit card, but cash is especially important for daily life in Taiwan.
**1. Payment Methods in Taiwan**
(1) Cash (Very Important)
Cash is widely used, especially at:
• Small shops
• Traditional markets
• Street food stalls
• Some local restaurants
For everyday meals and small purchases, carrying enough cash is necessary.
(2) Credit Cards & Digital Payments
• Accepted at department stores and chain stores
• Not always accepted by small businesses
• Some online platforms accept foreign credit cards
• LINE Pay and Apple Pay are common in chain stores and convenience stores
When you arrive at the airport, it is a good idea to withdraw or exchange some New Taiwan Dollars.
**2. Where Can I Exchange Money?**
You can exchange foreign currency at:
(1) Airport Exchange Counters (24 hours)
• Available at Taoyuan International Airport
• Convenient for exchanging money upon arrival
(2) Bank Branches
• Open Monday–Friday, 9:00 a.m.–3:30 p.m.
• Bring your passport or ARC
(3) ATMs
• Many convenience stores (e.g., 7-Eleven, FamilyMart) have ATMs
• International cards (Visa/Plus, MasterCard/Cirrus) are usually supported
※ Important: If you bring more than USD 10,000 (or equivalent) in cash when entering Taiwan, you must declare it to customs.`,
  },
  {
    id: "f3",
    question: "Which banks are commonly used by students?",
    answer: `Common banks used by students in Taiwan include:
• Cathay United Bank
• CTBC Bank
• E.Sun Bank
• Mega International Commercial Bank
• HSBC Taiwan`,
  },
];


const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;

  const escapeRegExp = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          // 【套用】：手繪實體螢光筆質感高光
          <mark
            key={i}
            className="bg-[#fef08a]/90 text-[#1f2937] px-1 mx-[1px] rounded-sm shadow-[inset_0_-3px_0_rgba(0,0,0,0.06)] font-semibold"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default function FAQPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const items = useMemo(() => {
    const key = q.trim().toLowerCase();
    if (!key) return FAQS;
    return FAQS.filter((it) => {
      const hay = (it.question + "\n" + it.answer).toLowerCase();
      return hay.includes(key);
    });
  }, [q]);

  const toggle = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    // 【套用】：外層底色 bg-[#fffdf8]、大圓角、米灰邊框與專屬陰影
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] pt-8 px-6 pb-6 md:pt-8 md:px-10 md:pb-10 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* 標題區：下方改為手帳感 dashed 虛線分隔條 */}
      <div className="mb-10 md:mb-12 border-b-2 border-dashed border-[#eadfce]/60 pb-6">
        <Link
          href="/FAQ"
          // 【套用】：返回按鈕換成精緻的紙質標籤外觀，加入綠色 Hover 呼應
          className="w-fit mb-8 flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-all bg-[#fffefb] border border-[#eadfce] px-4 py-2 rounded-xl font-bold shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <h1 className="pl-4 mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Money & Banking
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-[#6f7b76] font-medium leading-relaxed max-w-2xl">
          Financial related issues. Search a keyword to quickly find the right
          answer.
        </p>
      </div>

      <div className="w-[95%] max-w-6xl mx-auto">
        {/* 搜尋框：【套用】底色修改為 bg-[#fffefb]，邊框更換為米灰線條，Focus 綠色光暈 */}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-[#eadfce] bg-[#fffefb] px-6 py-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-200 transition-all shadow-sm">
          <Search className="h-5 w-5 text-[#6f7b76]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by keywords..."
            className="w-full bg-transparent text-base md:text-lg outline-none placeholder:text-gray-400 text-gray-800 font-semibold"
          />
        </div>

        {/* 風琴摺問答列表 */}
        <section className="space-y-4 pb-10">
          {items.map((it) => {
            const isOpen = !!open[it.id];
            return (
              <div
                key={it.id}
                // 【套用】：問答外殼底色一律修改為 bg-[#fffefb]，溫潤米灰邊框
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#eadfce] shadow-md translate-y-[-2px] bg-[#fffefb]"
                    : "border-[#eadfce]/60 shadow-sm bg-[#fffefb]"
                }`}
              >
                <button
                  onClick={() => toggle(it.id)}
                  className="flex w-full items-start justify-between gap-4 px-8 py-6 text-left"
                >
                  <div className="text-base md:text-lg font-bold leading-snug text-gray-800 group-hover:text-emerald-700 transition-colors">
                    <HighlightText text={it.question} query={q} />
                  </div>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-[#6f7b76] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-700" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  // 【套用】：淡灰方眼格紋背景，繼承純淨底色，移除紅線
                  <div 
                    className="relative border-t-2 border-dashed border-[#eadfce]/60 px-10 py-8 overflow-hidden"
                    style={{
                      backgroundImage: `
                        linear-gradient(#f1f5f9 1px, transparent 1px), 
                        linear-gradient(90deg, #f1f5f9 1px, transparent 1px)
                      `,
                      backgroundSize: '32px 32px',
                      backgroundPosition: '0 8px'
                    }}
                  >
                    <div className="relative z-10 whitespace-pre-line font-sans text-base md:text-lg leading-8 text-[#6f7b76] font-medium">
                      {it.answer.split("\n").map((line, index) => {
                        const trimmedLine = line.trim();
                        const isHeadingChunk =
                          (line.includes("**") && /^\d+\./.test(trimmedLine)) ||
                          trimmedLine.includes("※");

                        const isBulletPoint = trimmedLine.startsWith("•");
                        const parts = line.split(/(\*\*.*?\*\*)/g);

                        return (
                          <span
                            key={index}
                            // 【套用】：為了對齊方格線，margin 設定為 32px 的倍數 (mt-8, mb-0)
                            className={`block 
                              ${isHeadingChunk ? "mt-8 mb-0" : "mb-0"} 
                              ${isBulletPoint ? "pl-4 md:pl-6" : ""} 
                            `}
                          >
                            {parts.map((part, i) => {
                              if (
                                part.startsWith("**") &&
                                part.endsWith("**")
                              ) {
                                return (
                                  // 【套用】：粗體字改為專題經典綠色 text-emerald-700
                                  <strong
                                    key={i}
                                    className="font-black text-emerald-700 tracking-tight"
                                  >
                                    <HighlightText
                                      text={part.slice(2, -2)}
                                      query={q}
                                    />
                                  </strong>
                                );
                              }
                              return (
                                <span key={i}>
                                  <HighlightText text={part} query={q} />
                                </span>
                              );
                            })}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}