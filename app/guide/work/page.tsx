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
          Work & Career
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
          Work, career, and internships. Search a keyword to quickly find the
          right answer.
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
