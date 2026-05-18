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
    id: "w1",
    question:
      "Can international students work in Taiwan? Do I need a work permit and when can I start?",
    answer: `Yes, international students can work part-time in Taiwan while enrolled in a degree program — but you must have a valid work permit first.
**1. Do I Need a Work Permit?**
Yes. You must obtain a student work permit before starting any job.
• Your employer must apply for the work permit on your behalf
• You cannot begin working until the permit is officially approved
• You must already have your ARC to apply
Working without a valid work permit is illegal and may result in fines or a<ect your residency status.
**2. When Can I Start Working?**
You cannot work immediately after arriving in Taiwan.
You must:
(1) Complete university registration
(2) Receive your ARC
(3) Obtain an approved work permit
Only after these steps can you legally begin working.
**※ Working Hour Limits**
• During the semester: Up to 20 hours per week
• During winter and summer breaks: The 20-hour limit does not apply
• All work must comply with Taiwan’s Labor Standards Act.`,
  },
  {
    id: "w2",
    question: "How do I apply for a student work permit? How long is it valid?",
    answer: `You must apply online through the Ministry of Labor’s o<icial work permit system. You may apply by yourself or ask the Office of International Affairs (OIA) for assistance.
**1. Required Documents**
Prepare the following:
• Student ID (with current semester registration stamp) or certificate of enrollment
• Valid passport (copy)
• ARC (copy of both sides)
• Proof of payment of the NT$100 application fee
**2. Validity Period**
• A student work permit is valid for up to six months
• It is usually linked to the academic semester
If you want to continue working, you must reapply before the current permit expires.`,
  },
  {
    id: "w3",
    question:
      "How many hours can I work per week? Are there restrictions on job types and minimum age?",
    answer: `International students with a valid work permit must follow working hour and job regulations.
**1. Working Hour Limits**
(1) During the Semester
• Maximum 20 hours per week (total)
• The 20-hour limit applies to the combined hours of all jobs
(2) During Winter and Summer Breaks
• No weekly hour limit
• You may work more than 20 hours per week
※ You may have more than one part-time job, but the total hours during the semester must not exceed 20 hours.
**2. Job Restrictions**
With a valid student work permit, you may take most legal part-time jobs, such as:
• Restaurants
• Convenience stores
• O<ice or administrative work
• Language teaching (through registered institutions)
However:
• Jobs must be legal and properly registered
• Work must not interfere with your studies
• Jobs related to illegal activities are strictly prohibited
※ About Private Tutoring: Private one-on-one tutoring without a registered employer is legally risky and may be considered illegal. If you want to tutor, it is recommended to work through a registered school or institution.
3. **Minimum Wage**: As of January 1, 2026, the minimum hourly wage in Taiwan is NT$196 per hour, and the minimum monthly salary is NT$29,500.`,
  },
  {
    id: "w4",
    question:
      "Do I need a work permit for internships (on-campus or oZ-campus)?",
    answer: `Yes. International students must obtain a student work permit before starting any internship.
This applies to:
• O<-campus internships
• On-campus jobs
• Paid internships
• Unpaid internships
The rule is based on the nature of the work, not whether you receive a salary.
※ **Important Reminder**: Starting an internship without a valid work permit may lead to legal penalties. Always obtain approval before beginning any work.`,
  },
  {
    id: "w5",
    question: "What happens if I work without a valid work permit?",
    answer: `Working without a valid work permit is illegal and may result in serious consequences.
**1. Possible Penalties for Students**
Under Taiwan’s Employment Service Act, you may face:
• A fine of NT$30,000–150,000
• Cancellation of your work permit
• Cancellation of your residence permit (ARC)
• An order to leave Taiwan
• A possible ban from re-entering Taiwan
Even unpaid work or internships may be considered illegal without a valid permit.
**2. Penalties for Employers**
Employers who hire international students without a valid work permit may face:
• Fines of NT$150,000–750,000
• Additional legal consequences`,
  },
  {
    id: "w6",
    question: "Can international students work in Taiwan after graduation?",
    answer: `Yes. International students can stay and work in Taiwan after graduation under current regulations (effective January 1, 2026).
**1. Job-Seeking ARC (Most Common Option)**
After graduation, your student ARC will usually be cancelled.
You must apply for a Job-Seeking ARC at the National Immigration Agency before your ARC is cancelled.
(1) Validity: Up to 2 years (1 year + 1 extension)
(2) During This Period
You may work:
• Full-time
• Part-time
• Freelance
You do not need to apply for a separate work permit during this period.
**2. After Finding a Full-Time Job**
Once your employer receives a work permit from the Ministry of Labor, you must change your status to an Employment ARC.
**3. Other Options**
You may also apply for:
• Employment Gold Card (if you qualify in specific professional fields)
• Employment-Seeking Visa (if you leave Taiwan and later return to look for work)`,
  },
  {
    id: "w7",
    question: "Does CCU provide career counseling or job search support?",
    answer: `Yes. CCU provides career counseling and job search support for international students through the Office of International Affairs (OIA).
**1. What Support Is Available?**
International Academic & Career Counselors can help with:
• Career guidance and planning
• Internship and job-matching assistance
• Job search strategies
• Academic planning
• Language learning guidance
• General campus life support
**2. How to Make an Appointment**
• Book an appointment online
• All counseling sessions are free and confidential`,
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
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] pt-8 px-6 pb-6 md:pt-8 md:px-10 md:pb-10 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* 標題區 */}
      <div className="mb-10 md:mb-12 border-b-2 border-dashed border-[#eadfce]/60 pb-6">
        <Link
          href="/FAQ"
          className="w-fit mb-8 flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-all bg-[#fffefb] border border-[#eadfce] px-4 py-2 rounded-xl font-bold shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <h1 className="pl-4 mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Work & Career
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-[#6f7b76] font-medium leading-relaxed max-w-2xl">
          Work, career, and internships. Search a keyword to quickly find the
          right answer.
        </p>
      </div>

      <div className="w-[95%] max-w-6xl mx-auto">
        {/* 搜尋框 */}
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
                    {/* 【已移除】：剛剛紅色的筆記本打孔邊緣線 */}

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
                                  // 【修改這裡】：把粗體字的顏色換成經典綠色 text-emerald-700
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