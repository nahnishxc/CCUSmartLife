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
    id: "e1",
    question: "What emergency numbers should I save on my phone?",
    answer: `As an international student in Taiwan, you should save the following important numbers:
**1. Nationwide Emergency Numbers**
• 110 – Police
• 119 – Fire department & ambulance
• 112 – Mobile emergency number (Can connect to 110 or 119 even if your signal is weak but another network is available)
**2. Foreigners’ Hotline – 1990**
• Free hotline provided by the National Immigration Agency
• Available 24 hours a day
• Languages: Chinese, English, Japanese
• Some Southeast Asian languages available on weekdays
You can ask about:
• Visa and residence issues
• Work permits
• Health insurance
• Medical care
• Personal safety
• Legal information
**3. University Emergency Contacts**
You should also save:
• The Office of International Affairs (OIA) phone number
• The campus emergency contact number`,
  },
  {
    id: "e2",
    question:
      "What should I do if I lose important documents (passport, ARC, or student ID)?",
    answer: `If you lose important documents, stay calm and take action as soon as possible.
**1. If You Lose Your Passport**
(1) Report the loss at the nearest police station and obtain a police report
(2) Contact your country’s representative o<ice or embassy in Taiwan to apply for a replacement passport
(3) After receiving your new passport, update your ARC information within 30 days
(4) Inform the Office of International Affairs (OIA) so your student records can be updated
**2. If You Lose Your ARC**
(1) Prepare required documents:
• Written statement or police report
• One recent ID photo (white background)
• Passport (original + copy)
• Proof of enrollment
(2) Apply for a replacement:
• Online through the National Immigration Agency system
• Or in person at a local Immigration Service Center
**3. If You Lose Your Student ID Card**
(1) Report the loss immediately through the university online system (This will deactivate the card)
(2) Apply for a replacement and pay the NT$300 fee
(3) Submit required documents to the Academic Affairs Office
(4) New card is usually ready in about 4 working days
※ If there was stored value on the card, you can apply for a refund.`,
  },
  {
    id: "e3",
    question: "What should I do in a medical emergency or accident?",
    answer: `Act immediately depending on the seriousness of the situation.
**1. For Serious Emergency**
For severe conditions such as:
• Heavy bleeding
• Broken bones
• Difficulty breathing
• Loss of consciousness
(3) Call 119 immediately for an ambulance. If it is a traffic accident, also call 110 to report it to the police.
(4) When going to the hospital, bring:
• NHI card (if applicable)
• ARC or passport
• Cash or credit card
**2. For Minor Injuries**
For minor injuries, you can:
• Visit a nearby clinic or hospital
• On weekdays (9:00 a.m.–5:00 p.m.), go to the Health Center (2nd floor of the Activity Center) for basic wound care and dressing changes (free of charge)
※ Additional Support
• If you live in a dormitory, contact the dormitory office for assistance
• If you have language difficulties, call 1990 for 24-hour foreign resident language support`,
  },
  {
    id: "e4",
    question:
      "What should I do during typhoons or earthquakes? Will classes be canceled?",
    answer: `Taiwan experiences earthquakes and typhoons. Stay calm and follow safety guidelines.
**1. During an Earthquake**
Follow the “Drop, Cover, and Hold On” rule:
• Drop to the ground
• Take cover under a sturdy table
• Hold on until the shaking stops
If no table is nearby:
• Stand next to a strong wall or pillar
• Protect your head and neck
• Stay away from windows and falling objects
**2. During a Typhoon**
• Monitor official weather updates
• Stay indoors if your residence is safe
• Avoid beaches, rivers, mountains, and flooded areas
• Do not touch fallen power lines
• Never drive through flooded roads
**3. Will Classes Be Canceled?**
Yes, classes or activities may be canceled during severe weather in Taiwan, especially during typhoons. When wind speeds or rainfall reach certain safety standards, the city or county government will officially announce whether work and classes are suspended.`,
  },
  {
    id: "e5",
    question: "What should I do if I lose my ARC?",
    answer: `If you lose your ARC, apply for a replacement as soon as possible.
**Step 1: Prepare Required Documents**
• A written statement explaining the loss or a police report
• One recent color photo (white background)
• Passport (original and copy)
• Proof of enrollment (e.g., student ID with current semester registration stamp)
**Step 2: Submit Your Application**
You can apply:
• Through the National Immigration Agency’s online system (recommended for students)
• Or in person at your local Immigration Service Center
※ Replacement Fee
• NT$500 (general applicants)
• NT$2,600 (Hong Kong or Macau residents)
※ Processing Time: Approximately 10 working days(Additional time may be required if documents are incomplete.)`,
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
          Emergency & Safety
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-[#6f7b76] font-medium leading-relaxed max-w-2xl">
          Lost Documents and Daily Security. Search a keyword to quickly find
          the right answer.
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
                  // 【套用】：淡灰方眼格紋背景，繼承純淨底色，已移除紅線
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