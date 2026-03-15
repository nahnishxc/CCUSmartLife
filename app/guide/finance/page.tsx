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

export default function HealthGuidePage() {
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
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* 標題與 Back：維持在最左邊，完全不動 */}
      <div className="mb-10 md:mb-12">
        <Link
          href="/guide"
          className="w-fit mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors bg-gray-50 px-4 py-2 rounded-full font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <h1 className="pl-4 mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Money & Banking
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
          Financial related issues. Search a keyword to quickly find the right
          answer.
        </p>
      </div>

      {/* 搜尋與 FAQ 列表：長度設為約 92% 並置中，增加呼吸感 */}
      <div className="w-[95%] max-w-6xl mx-auto">
        {/* 搜尋欄：字體微調大一點，更有質感 */}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50/50 px-6 py-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-black/5 transition-all">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by keywords..."
            className="w-full bg-transparent text-base md:text-lg outline-none placeholder:text-gray-400"
          />
        </div>

        {/* FAQ 列表 */}
        <section className="space-y-4 pb-10">
          {items.map((it) => {
            const isOpen = !!open[it.id];
            return (
              <div
                key={it.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-gray-200 shadow-lg translate-y-[-2px]"
                    : "border-gray-100 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggle(it.id)}
                  className="flex w-full items-start justify-between gap-4 px-8 py-6 text-left"
                >
                  {/* 問題字體改為 text-base/lg 並加粗 */}
                  <div className="text-base md:text-lg font-bold leading-snug text-gray-900">
                    {it.question}
                  </div>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-black" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50/30 px-10 py-8">
                    <div className="whitespace-pre-line font-sans text-base md:text-lg leading-8 text-gray-700">
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
                            className={`block 
                              ${isHeadingChunk ? "mt-5 mb-1" : "mb-0.5"} 
                               ${isBulletPoint ? "pl-4 md:pl-6" : ""} 
                            `}
                          >
                            {parts.map((part, i) => {
                              if (
                                part.startsWith("**") &&
                                part.endsWith("**")
                              ) {
                                return (
                                  <strong
                                    key={i}
                                    className="font-black text-black tracking-tight"
                                  >
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return <span key={i}>{part}</span>;
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
