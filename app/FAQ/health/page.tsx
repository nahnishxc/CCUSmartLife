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
    id: "h1",
    question: "Is National Health Insurance (NHI) mandatory? When can international students join?",
    answer: `International students cannot join NHI immediately after arrival.
**1. Is NHI Mandatory?**
Yes. For degree-seeking students, joining NHI is required by law once you meet the eligibility conditions. The current monthly premium is NT$826, and universities usually assist with enrollment.
**2. What About the First Six Months?**
Before becoming eligible for NHI, you must have valid health insurance, such as:
• A university group medical insurance plan in Taiwan
• A private insurance policy from your home country (officially verified)
Additionally, exchange students must have valid medical insurance for their entire stay.
**3. When Can I Join NHI?**
You become eligible after:
• Obtaining an ARC
• Living in Taiwan for six consecutive months
During these six months:
• You may leave Taiwan only once
• The total number of days abroad must not exceed 29 days
After meeting these requirements, you can apply to join NHI.`,
  },
  {
    id: "h2",
    question: "How do I apply for NHI? What documents are required?",
    answer: `**1. If Applying Through Your University**
• The NHI premium is usually included in your tuition bill
• The school will guide you through the enrollment process
**2. If Applying at an NHI Office**
Prepare the following documents:
• ARC (original and copy)
• Passport (original and copy)
• One recent 2-inch color photo (white background)
• Proof of enrollment (student ID with registration stamp or enrollment certificate)
• NHI card application form
• Card processing fee: NT$200
※ The current NHI premium is NT$826 per month.`,
  },
  {
    id: "h3",
    question: "How much is the NHI premium and how do I pay it?",
    answer: `The current National Health Insurance (NHI) premium for international students is: NT$826 per month
**How Do I Pay?**
• The NHI premium is usually included in your semester tuition and fees bill
• You pay it together with your tuition during registration
※ Once your NHI coverage starts in a given month, you must pay for the entire month, even if you join near the end of the month.`,
  },
  {
    id: "h4",
    question: "What medical services are covered by NHI? How do I use my NHI card?",
    answer: `After joining NHI, you can receive medical care at NHI-contracted clinics and hospitals.
**1. What Is Covered?**
NHI generally covers:
• Outpatient visits
• Hospitalization
• Prescribed medications
• Some preventive services (e.g., adult health checkups)
※ In emergencies, if you visit a non-NHI-contracted hospital, you may apply for reimbursement according to regulations.
**2. What Is Not Covered?**
You still need to pay a small registration fee and co-payment for each visit.
NHI does not cover:
• Private hospital rooms
• Expensive medications or special medical materials not listed under NHI
• Cosmetic surgery or non-essential treatments
• Choosing a specific doctor or hiring a private caregiver
**3. How to Use Your NHI Card**
(1) Show your NHI card at the registration counter
(2) The doctor will use it during your visit
(3) After treatment, pay the registration fee and co-payment
(4) Collect your medicine at the hospital or a nearby NHI-contracted pharmacy`,
  },
  {
    id: "h5",
    question: "What should I do if I lose my NHI card?",
    answer: `If you lose your NHI card, apply for a replacement as soon as possible.
**How to Apply for a Replacement**
Bring the following:
• One recent 2-inch photo
• Replacement fee: NT$200
You can apply at:
• A post office
• The nearest NHI office
Once processed, you will receive a new NHI card.`,
  },
  {
    id: "m1",
    question: "Can I see a doctor if I don’t speak Chinese?",
    answer: `Yes. You can still see a doctor even if you do not speak Chinese.
**Communication Tips**
• Type your symptoms in English and show them to the doctor
• Use a translation app for real-time communication
• Translate your symptoms into Chinese before your visit
※ Some doctors and nurses can speak basic English, but not all clinics provide full English services. If possible, bringing a Chinese-speaking friend can make the visit easier and more reassuring.`,
  },
  {
    id: "m2",
    question: "Where are the nearest hospitals or clinics?",
    answer: `There is a clinic called Huide Clinic located about 400 meters from the school gate — simply turn left after exiting the main entrance and walk straight ahead. 
**1. Clinics Near CCU (Minxiong Area)**
In the Minxiong area around CCU, there are many local clinics that can handle common health issues, such as:
• Anxin Minxiong Clinic
• Ho Chun Keng ENT Clinic
These clinics are located in Minxiong town and are easy to reach from campus. They are suitable for general outpatient visits and minor illnesses.
**2. Large Hospitals (Chiayi City)**
If you need more comprehensive examinations, hospitalization, or specialist treatment, you can visit larger hospitals in Chiayi City, such as:
• Chiayi Christian Hospital
• Dalin Tzu Chi Hospital
• St. Martin De Porres Hospital
These hospitals have full medical departments and provide emergency services.`,
  },
  {
    id: "m3",
    question: "What should I do in a medical emergency or accident (including at night or on weekends)?",
    answer: `Act immediately depending on the seriousness of the situation.
**1. For Serious Emergency**
For severe conditions such as:
• Heavy bleeding
• Broken bones
• Difficulty breathing
• Loss of consciousness
(1) Call 119 immediately for an ambulance. If it is a traffic accident, also call 110 to report it to the police.
(2) When going to the hospital, bring:
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
          Health & Insurance
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-[#6f7b76] font-medium leading-relaxed max-w-2xl">
          NHI, clinics, and emergency care. Search a keyword to quickly find the
          right answer.
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