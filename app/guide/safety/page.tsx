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
    question:
      "What emergency numbers should I save on my phone?",
    answer: `As an international student in Taiwan, you should save the following important numbers:
1. Nationwide Emergency Numbers
• 110 – Police
• 119 – Fire department & ambulance
• 112 – Mobile emergency number (Can connect to 110 or 119 even if your signal is weak but
another network is available)
2. Foreigners’ Hotline – 1990
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
3. University Emergency Contacts
You should also save:
• The O<ice of International A<airs (OIA) phone number
• The campus emergency contact number`,
  },
  {
    id: "e2",
    question: "What should I do if I lose important documents (passport, ARC, or student ID)?",
    answer: `If you lose important documents, stay calm and take action as soon as possible.
1. If You Lose Your Passport
(1) Report the loss at the nearest police station and obtain a police report
(2) Contact your country’s representative o<ice or embassy in Taiwan to apply for a
replacement passport
(3) After receiving your new passport, update your ARC information within 30 days
(4) Inform the O<ice of International A<airs (OIA) so your student records can be updated
2. If You Lose Your ARC
(1) Prepare required documents:
• Written statement or police report
• One recent ID photo (white background)
• Passport (original + copy)
• Proof of enrollment
(2) Apply for a replacement:
• Online through the National Immigration Agency system
• Or in person at a local Immigration Service Center
3. If You Lose Your Student ID Card
(1) Report the loss immediately through the university online system (This will deactivate the card)
(2) Apply for a replacement and pay the NT$300 fee
(3) Submit required documents to the Academic A<airs O<ice
(4) New card is usually ready in about 4 working days
※ If there was stored value on the card, you can apply for a refund.`,
  },
  {
    id: "e3",
    question: "What should I do in a medical emergency or accident?",
    answer: `Act immediately depending on the seriousness of the situation.
1. For Serious Emergency
For severe conditions such as:
• Heavy bleeding
• Broken bones
• Di<iculty breathing
• Loss of consciousness
(3) Call 119 immediately for an ambulance. If it is a tra<ic accident, also call 110 to report it to the
police.
(4) When going to the hospital, bring:
• NHI card (if applicable)
• ARC or passport
• Cash or credit card
2. For Minor Injuries
For minor injuries, you can:
• Visit a nearby clinic or hospital
• On weekdays (9:00 a.m.–5:00 p.m.), go to the Health Center (2nd floor of the Activity
Center) for basic wound care and dressing changes (free of charge)
※ Additional Support
• If you live in a dormitory, contact the dormitory o<ice for assistance
• If you have language di<iculties, call 1990 for 24-hour foreign resident language support`,
  },
  {
    id: "e4",
    question:"What should I do during typhoons or earthquakes? Will classes be canceled?",
    answer: `Taiwan experiences earthquakes and typhoons. Stay calm and follow safety guidelines.
1. During an Earthquake
Follow the “Drop, Cover, and Hold On” rule:
• Drop to the ground
• Take cover under a sturdy table
• Hold on until the shaking stops
If no table is nearby:
• Stand next to a strong wall or pillar
• Protect your head and neck
24
• Stay away from windows and falling objects
2. During a Typhoon
• Monitor o<icial weather updates
• Stay indoors if your residence is safe
• Avoid beaches, rivers, mountains, and flooded areas
• Do not touch fallen power lines
• Never drive through flooded roads
3. Will Classes Be Canceled?
Yes, classes or activities may be canceled during severe weather in Taiwan, especially during
typhoons. When wind speeds or rainfall reach certain safety standards, the city or county
government will o<icially announce whether work and classes are suspended.`,
  },
  {
    id: "e5",
    question:"What should I do if I lose my ARC?",
    answer: `If you lose your ARC, apply for a replacement as soon as possible.
Step 1: Prepare Required Documents
• A written statement explaining the loss or a police report
• One recent color photo (white background)
• Passport (original and copy)
• Proof of enrollment (e.g., student ID with current semester registration stamp)
Step 2: Submit Your Application
You can apply:
• Through the National Immigration Agency’s online system (recommended for students)
• Or in person at your local Immigration Service Center
※ Replacement Fee
• NT$500 (general applicants)
• NT$2,600 (Hong Kong or Macau residents)
※ Processing Time: Approximately 10 working days(Additional time may be required if
documents are incomplete.)`,
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
          Emergency & Safety
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
          Lost Documents and Daily Security. Search a keyword to quickly find the right answer.
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
            placeholder="Search in Health & Insurance…"
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
                    {/* 答案內容：改善字體大小、行高與斷落感 */}
                    <div className="whitespace-pre-line font-sans text-base md:text-lg leading-8 text-gray-700">
                      {it.answer.split("\n").map((line, index) => {
                        // 偵測標題行 (1. ..., 2. ... 或 問句) 加粗並增加間距
                        const isHeading =
                          /^\d+\.|\?$/.test(line.trim()) ||
                          line.match(/^[A-Z][a-z]+ (?:Do|About|What|If)/);
                        return (
                          <span
                            key={index}
                            className={
                              isHeading
                                ? "font-bold text-gray-900 block mt-5 mb-2"
                                : "block"
                            }
                          >
                            {line}
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