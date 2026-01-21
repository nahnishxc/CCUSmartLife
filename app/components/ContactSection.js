'use client';

import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="py-20 bg-[#fff7d1]">
      <div className="w-full max-w-[1200px] mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] font-bold text-[#111111] leading-tight">
              Get in touch with CCU OIA
            </h2>
            <p className="text-[15px] text-[#333333] leading-relaxed">
              If you have questions about life at CCU or international student affairs, leave your contact information and we will get back to you.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <h3 className="text-[15px] font-semibold text-[#111111]">
              Office of International Affairs
            </h3>
            <div className="flex flex-col gap-1">
              <p className="text-[14px] text-[#444444]">
                Email: <Link href="mailto:oia@example.ccu.edu.tw" className="underline hover:text-black">oia@example.ccu.edu.tw</Link>
              </p>
              <p className="text-[14px] text-[#444444]">
                Phone: +886-5-123-4567
              </p>
              <p className="text-[14px] text-[#444444]">
                Address: No. 168, University Rd., Minxiong Township, Chiayi County, Taiwan
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_12px_28px_rgba(0,0,0,0.06)]">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="text-sm font-medium text-[#222222]">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="w-full text-sm px-3 py-2.5 rounded-lg border border-[#d4d4d4] outline-none transition-all duration-120 focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 placeholder:text-gray-400"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="text-sm font-medium text-[#222222]">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="w-full text-sm px-3 py-2.5 rounded-lg border border-[#d4d4d4] outline-none transition-all duration-120 focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 placeholder:text-gray-400"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-[#222222]">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="w-full text-sm px-3 py-2.5 rounded-lg border border-[#d4d4d4] outline-none transition-all duration-120 focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 resize-y placeholder:text-gray-400"
                placeholder="Tell us how we can help."
              />
            </div>

            <button 
              type="submit" 
              className="mt-1 w-full py-2.5 px-5 rounded-full bg-[#111111] text-white text-sm font-medium transition-colors hover:bg-[#222222]"
            >
              Send message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}