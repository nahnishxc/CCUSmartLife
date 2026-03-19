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
    id: "d1",
    question: "How do I report maintenance issues in the dormitory?",
    answer: `If you notice damaged equipment or need repairs in your dormitory room, you can submit a repair request online.
**How to Submit a Repair Request**
1. Log in to the CCU SSO system
2. Go to the dormitory maintenance platform
3. Fill out and submit the repair request form
The responsible unit will arrange for repairs after receiving your request. You do not need to visit any administrative office in person.`,
  },
  {
    id: "d2",
    question: "Can I cook in the dormitory?",
    answer: `Cooking inside the dormitory is generally restricted for safety reasons. Gas stoves, induction cookers, and high-power cooking appliances are not allowed in dorm rooms.

    However, small personal electric cooking pots (such as portable electric kettles or mini cookers) are usually acceptable. Many students who want to cook simple meals in the dormitory use this `,
  },
  {
    id: "d3",
    question: "Are vegetarian or special-diet options available near CCU?",
    answer: `Yes, vegetarian and special-diet options are available near CCU, but you may need to check ingredients carefully.
**1. Vegetarian & Special-Diet Options**
You can find vegetarian meals at nearby restaurants such as:
• Shí Fán
• Suitfood Salad
• Veggie House
Convenience stores also often sell:
• Vegetarian lunchboxes
• Noodle or rice meal options
※ Please note that vegetarian restaurants staff may be slightly more expensive than regular meals.
**2. Pork in Taiwanese Food**
Pork is very commonly used in Taiwanese cuisine, and lard is sometimes added for flavor. If you do not eat pork for religious or personal reasons:
• Inform the staff before ordering
• Ask about ingredients carefully
**※ Food Allergies**
If you have food allergies:
• Check ingredient labels on packaged foods
• Clearly inform restaurant staff about your allergy (e.g., peanuts, seafood, eggs, dairy)
• Double-check with staff if your allergy is serious`,
  },
  {
    id: "d4",
    question: " How much does a typical meal cost near CCU?",
    answer: `Meal prices around CCU are quite flexible. You can find simple lunchboxes or noodle dishes for under NT$100, and meals above NT$200 also exist. However, most places have an average price range between NT$100 and NT$150.`,
  },
  {
    id: "d5",
    question: "What food options are available late at night?",
    answer: `Most restaurants near campus are open until around 8:30–10:00 p.m. After 10:00 p.m., food options become more limited.
**1. Late-Night Options**
You can usually find:
• Taiwanese fried chicken stalls (e.g., Zhong Zheng Ji Chang)
• Braised snack shops (e.g., Hao Ji LuWei)
There are several of these near the university.
**2. 24-Hour Convenience Stores**
If you prefer something lighter, convenience stores are open 24 hours and offer:
• Ready-to-eat meals
• Instant noodles
• Snacks and drinks`,
  },
  {
    id: "d6",
    question:
      "What should I know about dining culture in Taiwan (sharing food and tipping)?",
    answer: `**1. Sharing Food**
Yes, sharing food is very common in Taiwan.
• People often order several dishes and share them together
• This is especially common at traditional restaurants and hot pot places
• It is seen as a warm and friendly way to enjoy a meal
However, not everyone prefers sharing. If you would rather order your own dish for personal or health reasons, that is completely acceptable.
**2. Tipping Culture**
Tipping is not expected in Taiwan.
• Most restaurants, cafes, taxis, and shops do not require tips
• Some restaurants include a 10% service charge in the bill
You do not need to tip extra, but leaving small change for excellent service is optional.`,
  },
  {
    id: "d7",
    question: "Is tap water safe to drink?",
    answer: `Tap water in Taiwan meets government quality standards and is treated and monitored regularly. However, it is not commonly consumed directly from the tap. Most people boil tap water before drinking it.
※ On campus and in many public places, you can find water dispensers that provide filtered and boiled water, which are safe and convenient for daily use.`,
  },
  {
    id: "d8",
    question: "Are food delivery services available near campus?",
    answer: `Yes, food delivery services are available near campus. Students commonly use platforms such as:
• Uber Eats
• Foodpanda
※ Ordering through delivery apps is usually more expensive than dining in, as delivery fees and service charges may apply.`,
  },
  {
    id: "d9",
    question: "Where can I buy daily necessities on or near campus?",
    answer: `You can easily buy daily necessities both on campus and near campus.
**1. On Campus**
• Campus Store: Bedding, toiletries, stationery, snacks, fruits, and vegetables
• Liwen Bookstore (2F, Activity Center): Textbooks, notebooks, and stationery
There are also three FamilyMart locations on campus:
• Activity Center (2F)
• Classroom Building (1F)
• Faculty Housing
**2. Just Outside the Campus Gate**
You can find convenience stores such as:
• 7-Eleven
• Hi-Life
• OK Mart
※ There is also Simple Mart, which sells daily goods.
**3. Supermarkets**
There are no large shopping centers very close to campus. However, two PX Mart supermarkets are about 4–5 km away, offering a wider range of groceries and household items.`,
  },
  {
    id: "d10",
    question: "Where can I buy bedding, kitchenware, or other household items?",
    answer: `You can purchase bedding, kitchenware, and other household items at the Co-op Store on campus. The store is located next to the Office of International A<airs (OIA) at CCU.
**What You Can Buy There**
In addition to basic household items, the Co-op Store also sells:
• Instant noodles
• Vegetables and fruits
• Snacks
• Drinks
It is a convenient place for students to buy daily necessities without leaving campus.`,
  },
  {
    id: "d11",
    question:
      "How do I use public transportation around CCU and travel to Chiayi City?",
    answer: `Public transportation near CCU is available, but options are relatively limited compared to large cities.
**1. Around CCU**
• There are bus stops on and near campus
• Buses connect CCU to Minxiong and Chiayi City
• YouBike stations near campus allow short-distance travel
※ For buses and YouBike, using an EasyCard is the most convenient payment method. (Some buses also accept cash, but exact change is required.)
**2. Traveling to Chiayi City**
You can take a bus from campus to Chiayi City.
• Travel time: about 30–40 minutes (depending on traffic)
• Many students visit Chiayi City for shopping, dining, and entertainment
※ If you have a scooter, traveling is more flexible and convenient.
**3. Taking a Bus or Train in Chiayi**
(1) Bus
• Check the route map and confirm the direction
• Pay with cash (exact change required) or EasyCard
• Tap your EasyCard when boarding
(2) TRA Train
• Buy tickets at the station counter or ticket machine
• You can also book online through the official TRA website
• Use a printed or electronic ticket to board`,
  },
  {
    id: "d12",
    question: "Do I need an EasyCard? Where can I buy or top it up?",
    answer: `You do not absolutely need an EasyCard, but it is highly recommended.
An EasyCard makes public transportation and daily payments much more convenient.
**1. Why Use an EasyCard?**
You can use it for:
• Buses and some trains
• YouBike rentals
• Convenience stores
• Some supermarkets
Instead of paying cash, simply tap your card. It helps you avoid carrying exact change and saves time.
**2. Where to Buy an EasyCard**
You can buy one at most convenience stores, including:
• 7-Eleven
• FamilyMart
• Hi-Life
• OK Mart
It is also available at MRT station service counters.
**3. How to Top Up**
• Ask staff at a convenience store counter to add money
• Use automatic top-up machines at MRT or train stations`,
  },
  {
    id: "d13",
    question: "Are taxis or ride-hailing apps available near campus?",
    answer: `Yes, taxis are available near campus. Many students take taxis when traveling to the train station or High-Speed Rail station.
**1. Taking a Taxi**
Unlike in large cities, you usually cannot wave down a taxi on the street.
• It is recommended to call and make a reservation in advance
• This is the most reliable way to get a taxi near campus
**2. Ride-Hailing Apps**
Ride-hailing apps such as Uber are available in Taiwan. However, these services are less common around campus compared to larger cities.`,
  },
  {
    id: "d14",
    question: "Is cycling common? Can I buy or rent a bicycle?",
    answer: `Yes, cycling is very common around campus. Because CCU has a large campus, many students use bicycles to travel between classrooms and dormitories.
**1. Renting a Bicycle**
You can rent public bicycles from nearby YouBike stations using an EasyCard. This is convenient for short-distance travel.
**2. Buying a Bicycle**
If you prefer to own one, you can:
• Buy a bicycle from local bike shops near the university
• Purchase a second-hand bike from other students`,
  },
  {
    id: "d15",
    question: "Can international students ride scooters? Are helmets required?",
    answer: `Yes, international students can ride scooters in Taiwan — but only if they have a valid license.
**1. Helmet Rules**
• Helmets are required by law when riding a scooter
• Both the driver and passenger must wear a helmet
• Scooters are not allowed inside the university campus
For bicycles, helmets are not legally required, but strongly recommended for safety.
**2. How Can International Students Ride Scooters Legally?**
You must have a valid license. There are three common ways:
(1) Use an International Driving Permit (IDP)
• Valid for up to 30 days without endorsement
• If staying longer than 30 days, you must apply for IDP endorsement at a Motor Vehicles
Office
• Valid for up to one year (cannot exceed your license or residence validity)
(2) Convert Your Foreign Driver’s License
• Available if your country has a reciprocal agreement with Taiwan
• Your license must be authenticated by your country’s representative office in Taiwan
• In many cases, written and road tests may be waived
(3) Take the License Test in Taiwan
You must prepare:
• Driver’s license application form
• Medical examination certificate
• ARC (with more than six months validity)
• Passport
• Three recent 1-inch photos
The test includes:
• A written test (pass mark: 85/100)
• A road test
After passing both tests, you will receive a Taiwanese motorcycle license.`,
  },
  {
    id: "d16",
    question: "How can I make friends and participate in campus life at CCU?",
    answer: `There are many ways to connect with local students and become part of campus life at CCU.
**1. Join Clubs and Activities**
Joining student clubs is one of the best ways to meet new people. CCU offers a wide variety of clubs, including:
• Academic clubs (innovation, debate, technology)
• Sports clubs (tennis, yoga, cycling, mountaineering)
• Cultural and recreational clubs (street dance, magic, Korean culture)
• Arts and music groups (choir, guitar, orchestra, photography)
• Service and volunteer clubs
Most clubs welcome international students, and Chinese is not always required.
**2. Join the Buddy Program**
CCU’s Buddy Program, organized by the Office of International Affairs (OIA), pairs international students with local students.
Buddies can help with:
• Enrollment and registration
• Course selection
• Health checks
• Adjusting to campus life
**3. Participate in Campus Events and Festivals**
You can find and register for activities through the CCU Smart Activity and Registration System.
• Lectures, workshops, cultural events, and festivals are listed online
• Log in with your university account to register
• You will usually receive a confirmation email`,
  },
  {
    id: "d17",
    question: "Is English commonly spoken on campus?",
    answer: `English is used in certain situations on campus, but Mandarin Chinese is still the main language of daily communication.
**In Classes and Offices**
• Many professors in international programs teach in English
• Staff in the Office of International Affairs (OIA) can communicate in English
• Some local students speak English and are willing to help`,
  },
  {
    id: "d18",
    question: "How do garbage sorting and recycling work in Taiwan?",
    answer: `Garbage sorting is very important in Taiwan. Residents are required to separate waste properly before disposal.
**1. Waste Categories**
Trash is usually divided into the following types:
(1) Recyclables
• Paper and cardboard (rinse and flatten)
• Plastic bottles
• Metal cans
• Glass
(2) Food Waste
• Leftovers
• Fruit peels
• Coffee grounds
(3) General Waste
• Tissues
• Plastic wrappers
• Diapers
• Broken items
(4) Bulky Items
• Furniture
• Appliances
Large items require special pickup (you can call 1999 for assistance).
**2. Garbage Collection**
In many cities:
• Garbage trucks come almost every day (except Wednesdays and Sundays)
• The truck plays music to signal its arrival
• You must use official government trash bags
**※ If You Live in CCU Dormitories**
• There are designated garbage and recycling areas near dorm buildings
• You can dispose of waste at these collection points
• Follow dormitory rules if you are unsure`,
  },
  {
    id: "d19",
    question: "What should I know about queueing and public manners?",
    answer: `Public manners in Taiwan are generally based on respect, patience, and consideration for others.
**1. Queueing**
• People usually line up in an orderly way
• This applies to buses, trains, elevators, shops, and restaurants
• Cutting in line is considered impolite
**2. Greetings and Respect**
• Names and titles are important in formal situations
• A slight nod is polite when greeting someone
• Handshakes are common in formal settings
• When giving or receiving something, using both hands is considered respectful
• If someone compliments you, responding modestly is customary
**3. Body Language**
• Avoid touching someone’s head (especially children)
• Do not point at people or objects with your feet
• Gesture with an open hand rather than a single finger
**4. Public Behavior**
• Public displays of a<ection are generally limited
• Loud or impatient behavior may be seen as impolite`,
  },
];

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
          Daily Life
        </h1>

        <p className="pl-5 mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
          Housing, Dining, Daily Necessities, Transportation, Campus Life &
          Social Life. Search a keyword to quickly find the right answer.
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
                    <div className="whitespace-pre-line font-sans text-base md:text-lg leading-10 text-gray-700">
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
                              ${isHeadingChunk ? "mt-7 mb-2" : "mb-2"} 
                               ${isBulletPoint ? "pl-5 md:pl-8" : ""} 
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
