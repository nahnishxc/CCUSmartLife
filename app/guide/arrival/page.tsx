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
    id: "a1",
    question:
      "What if my student visa is not ready before the semester starts? Can I enter Taiwan with a visitor visa?",
    answer: `If your Resident Visa is delayed, do not panic. Follow these steps:
**Step 1: Contact your university**
• Inform the Office of International Affairs (OIA) immediately
• Ask about registration deadlines or possible arrangements
**Step 2: Check your visa status**
• Contact the Taiwanese overseas office (TECO) where you applied
• Confirm whether additional documents or an interview are required
※ Important: Entry status matters
1. If you enter visa-free or with a landing visa, you cannot change it to a student Resident Visa inside Taiwan.
2. If you enter with a Visitor Visa for study purposes, you may apply for conversion to a Resident Visa in Taiwan.
3. If your visa states “No Extension”, it normally cannot be extended or changed.`,
  },
  {
    id: "a2",
    question: "What items are prohibited or restricted when entering Taiwan?",
    answer: `When entering Taiwan, certain items are strictly controlled. Please check carefully before departure.
**1. Strictly Prohibited:**
• Meat and meat products (especially pork products from ASF-affected countries)
• Illegal drugs
• Weapons or dangerous items without permission
**2. Restricted or Regulated:**
• Fresh fruits and vegetables
• Plants, soil, live insects, or agricultural products
• Certain medicines and medical devices (may require approval)
**※ Shipping items separately?**
If you send unaccompanied luggage by air or sea freight, you must:
1. Declare the items at customs
2. Go through the red channel upon arrival
Failure to declare restricted items may result in fines.`,
  },
  {
    id: "a3",
    question: "How do I apply for an ARC after arriving in Taiwan?",
    answer: `**1. International students **must** apply for an ARC **within 30 days** of:**
• Entering Taiwan with a Resident Visa, or
• Receiving a Resident Visa in Taiwan
**2. You can apply:**
• At a local service center of the National Immigration Agency
• Or through the online application system for foreign students
**3. Required Documents**
• ID Photo: 2x2 inches
• Passport: Scanned copy
• Resident Visa: Scanned copy
• Certificate of Residence (provided by OIA)
• NT 1,000 for payment
※ After approval, you will receive your ARC card, which serves as your official residence ID in Taiwan.`,
  },
  {
    id: "a4",
    question: "What happens if I miss the ARC application deadline?",
    answer: `If you apply late, you may face a fine.
**1. Late application (within valid stay period)**
• Fine: NT$2,000–10,000
• You can still apply after paying the fine
**2. Overstaying (after visa expires)**
• Higher fine: NT$10,000–50,000
• You may be required to leave Taiwan
• It may affect future visa or residency applications
※ If you miss the deadline, go to the Immigration Agency as soon as possible to resolve the issue.`,
  },
  {
    id: "a5",
    question: "What type of clothing should I prepare for Taiwan’s weather?",
    answer: `Taiwan has a subtropical climate, meaning it is warm and humid for most of the year.
**1. Spring & Autumn (mild to warm): March to May & September to November**
• Light long-sleeve shirts
• T-shirts
• Thin jackets
**2. Summer (hot and humid): June to August**
• Lightweight, breathable clothing (cotton T-shirts, shorts)
• Sandals
• Sunscreen, sunglasses, and a hat
**3. Winter (cool in southern Taiwan): December to February**
• Sweater or hoodie
• Light jacket
Heavy winter coats are rarely needed in Chiayi.
**4. Rainy & Typhoon Season (mainly summer)**
• Umbrella or light raincoat
• Waterproof shoes (recommended)
※ Because temperatures may change between day and night, layered clothing is a practical choice.`,
  },
  {
    id: "a6",
    question:
      "How do I travel from Taoyuan International Airport (or other airports) to CCU?",
    answer: `There are two main ways to travel to CCU. You can choose based on speed or budget.
**Option 1: High-Speed Rail (Fastest)**
1. Take the Airport MRT from Terminal 1 (A12) or Terminal 2 (A13) to THSR Taoyuan Station (A18)
2. Transfer to the High-Speed Rail (HSR) to Chiayi Station
3. From HSR Chiayi Station, go to CCU by:
• Taxi (about NT$600)
• Bus 106 (about NT$113)
Total cost: around NT$950+
Fastest and most convenient option
**Option 2: TRA Train (Lower Cost)**
1. Take the Airport MRT to Taipei Main Station (A1)
2. Transfer to a TRA train to Chiayi or Minxiong Station
3. From the station, take:
• Taxi (Chiayi: NT$500–600 / Minxiong: NT$100–200)
• Bus 106 from Chiayi Station (about NT$47)
Total cost: around NT$600–900
Slower, but more budget-friendly`,
  },
  {
    id: "a7",
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
※ Important: If you bring more than USD 10,000 (or equivalent) in cash when entering Taiwan,
you must declare it to customs.`,
  },
  {
    id: "a8",
    question:
      "How can I get a SIM card in Taiwan? Can I buy one at the airport and use it long-term?",
    answer: `Yes, you can buy a SIM card at the airport. Major telecom providers have service counters upon arrival.
**1. Where to Get a SIM Card**
You can purchase a SIM card or eSIM from major telecom providers at:
• Airport service counters (most convenient)
• City branch offices
You will need:
• Passport
• A second form of ID (e.g., ARC, entry permit, driver’s license)
• You must be at least 20 years old
**2. Airport SIM Cards**
Airport SIM cards are usually:
• Prepaid traveler plans
• Valid for a fixed period (e.g., 5–30 days)
• Difficult or not possible to convert into long-term plans
They are suitable for short-term use when you first arrive.
**3. Long-Term Plans for Students**
If you plan to stay for your full study period:
• Apply for a monthly postpaid plan after receiving your ARC
• Some providers may require a Taiwanese guarantor
• Unlimited data plans are common and affordable`,
  },
  {
    id: "a9",
    question:
      "What should I do after arriving on campus? When can I move into the dormitory?",
    answer: `If you are staying in a dormitory, you can move in after arriving at CCU. Dormitory check-in is the first step of the registration process.
**After Arriving on Campus**
Please complete the following steps:
**1. Dormitory Check-in:** Complete your dormitory check-in if you are living in student housing.
**2. Visit the OZice of International AZairs (OIA):** Complete your registration procedures.
**3. Pay Your Tuition Fees:** Make sure to pay before the o<icial deadline.
**4. Submit Required Documents:** Go to the Division of Curriculum and Instruction in the Administration Building to submit your documents.
After completing all steps, you will receive your student ID card.`,
  },
  {
    id: "a10",
    question: "What payment methods are available for school fees?",
    answer: `School fees can usually be paid through the following methods:
**1. Bank Transfer:** Transfer the payment directly through a bank.
**2. ATM Payment:** Use an ATM to complete the payment.
**3. Online Credit Card Payment:** Pay online using a credit card.
**4. Convenience Store (Cash):** Bring an electronic or printed payment slip to a convenience store and pay in cash.`,
  },
  {
    id: "a11",
    question:
      "How do I apply for an ARC? What documents are required and when should I apply?",
    answer: `International students must apply for an ARC within 30 days of:
• Entering Taiwan with a Resident Visa, or
• Receiving a Resident Visa in Taiwan
Applying late may result in a fine.
**1. Where to Apply**
You can apply:
• At a local service center of the National Immigration Agency
• Or through the online application system for foreign students
**2. Required Documents**
Please prepare:
• Completed ARC application form
• Passport (original and copy, including visa page)
• Passport-sized photo (meeting official requirements)
• Proof of enrollment (admission letter, student ID, or certificate of enrollment)
• Proof of residence (rental contract or dormitory certificate)
• Application fee (usually NT$1,000 per year)
※ If You Apply Late
• You may be fined
• If you overstay your visa, you may face heavier penalties and possible departure from Taiwan`,
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
          Arrival & Documents
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
          Pre-arrival preparation and registration. Search a keyword to quickly
          find the right answer.
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
