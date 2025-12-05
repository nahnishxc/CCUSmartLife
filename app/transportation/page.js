"use client"

import { motion } from "framer-motion"

const fakeBusStops = [
  {
    id: "ccu-main-gate",
    name: "CCU Main Gate",
    distance: "2 min walk",
    tag: "Most used",
    routes: [
      { name: "7323", direction: "To Minxiong Downtown", eta: "5 min" },
      { name: "7314", direction: "To Chiayi City", eta: "12 min" },
      { name: "7324", direction: "To Chiayi Station", eta: "18 min" }
    ]
  },
  {
    id: "ccu-library",
    name: "CCU Library Stop",
    distance: "4 min walk",
    tag: "Inside campus",
    routes: [
      { name: "7316", direction: "To HSR Chiayi", eta: "26 min" },
      { name: "7315", direction: "To Minxiong Township", eta: "9 min" }
    ]
  }
]

const howToGetHere = [
  {
    id: "from-tpe",
    title: "From Taoyuan International Airport (TPE)",
    steps: [
      "Take THSR from Taoyuan Station to Chiayi Station (about 1.5 hours).",
      "From THSR Chiayi, take shuttle bus or taxi to Minxiong/CCU.",
      "Taxi from THSR Chiayi to CCU: about 35–45 minutes."
    ]
  },
  {
    id: "from-khh",
    title: "From Kaohsiung International Airport (KHH)",
    steps: [
      "Take KMRT to Zuoying THSR Station.",
      "Take THSR from Zuoying to Chiayi (about 30 minutes).",
      "From THSR Chiayi, take shuttle bus or taxi to CCU."
    ]
  },
  {
    id: "from-chiayi-city",
    title: "From Chiayi City",
    steps: [
      "Take bus 7314 or 7324 from Chiayi Station to CCU stops.",
      "Or take a taxi from downtown Chiayi to CCU (about 25–35 minutes)."
    ]
  },
  {
    id: "from-minxiong",
    title: "From Minxiong Township",
    steps: [
      "Take bus 7315 from Minxiong to CCU.",
      "Taxi from Minxiong downtown to CCU: about 10 minutes."
    ]
  }
]

const travelTimes = [
  { destination: "Minxiong Downtown", byBus: "8–12 min", byTaxi: "4–6 min" },
  { destination: "Chiayi City Center", byBus: "25–35 min", byTaxi: "18–25 min" },
  { destination: "Chiayi Train Station", byBus: "25–35 min", byTaxi: "20–30 min" },
  { destination: "THSR Chiayi Station", byBus: "40–50 min", byTaxi: "35–45 min" }
]

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:flex lg:items-center lg:gap-16 lg:py-28">
        <div className="max-w-xl space-y-6">
          <motion.h1
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find your way around CCU
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Real-time bus schedules, taxi booking, and simple guides to help you travel between campus, Minxiong, Chiayi City, and the major stations.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <button className="rounded-full bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-200">
              View bus schedules
            </button>
            <button className="rounded-full border border-slate-500/70 px-5 py-2.5 text-sm font-medium text-slate-100/90 backdrop-blur-sm hover:border-slate-300 hover:text-slate-50">
              Book a taxi
            </button>
          </motion.div>
          <motion.p
            className="text-xs text-slate-400"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
          >
            Designed for CCU international students who need clear and simple transportation information.
          </motion.p>
        </div>
        <motion.div
          className="mt-12 flex-1 lg:mt-0 lg:flex lg:justify-end"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative h-64 w-full max-w-sm rounded-3xl bg-slate-900/60 p-4 ring-1 ring-slate-700/70 shadow-[0_18px_60px_rgba(15,23,42,0.8)]">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Nearby stops</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300">
                Live
              </span>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              {fakeBusStops.map((stop) => (
                <div
                  key={stop.id}
                  className="rounded-2xl bg-slate-900/80 p-3 ring-1 ring-slate-700/60"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium text-slate-50">
                        {stop.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {stop.distance}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      {stop.tag}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {stop.routes.slice(0, 2).map((route) => (
                      <div
                        key={route.name + route.direction}
                        className="flex items-center justify-between text-[11px] text-slate-300"
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-5 w-8 items-center justify-center rounded-full bg-sky-500/20 text-[11px] font-semibold text-sky-300">
                            {route.name}
                          </span>
                          <span className="truncate max-w-[140px]">
                            {route.direction}
                          </span>
                        </div>
                        <span className="text-[11px] text-emerald-300">
                          {route.eta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BusSection() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Nearby buses around CCU
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
              Check estimated arrival times for the most commonly used routes between CCU, Minxiong, Chiayi City, and major stations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="rounded-full border border-slate-200 px-3 py-1">
              Default location: CCU campus
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1">
              Data from Chiayi bus APIs
            </span>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {fakeBusStops.map((stop) => (
            <motion.article
              key={stop.id}
              className="flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-100/70"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {stop.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {stop.distance} from main campus
                  </p>
                </div>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] text-slate-500 border border-slate-100">
                  {stop.tag}
                </span>
              </div>
              <div className="mt-4 space-y-2.5">
                {stop.routes.map((route) => (
                  <div
                    key={route.name + route.direction}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-10 items-center justify-center rounded-full bg-sky-500/10 text-[11px] font-semibold text-sky-600">
                        {route.name}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-800">
                          {route.direction}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          From this stop
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-emerald-600">
                        {route.eta}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Estimated arrival
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TaxiSection() {
  return (
    <section className="bg-slate-50 pb-4 pt-4">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-slate-50 px-6 py-8 sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <div className="max-w-xl space-y-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Taxi service
            </p>
            <h2 className="text-lg font-semibold sm:text-xl">
              Need a taxi between CCU, Minxiong, or Chiayi?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Book a ride with our partner taxi company to travel safely between campus, nearby towns, and major stations like Chiayi Train Station or THSR Chiayi.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1.5">
              <button className="rounded-full bg-slate-50 px-5 py-2.5 text-xs font-medium text-slate-950 shadow-sm transition hover:bg-slate-200">
                Book a ride
              </button>
              <p className="text-[11px] text-slate-400">
                Typical rides: CCU ↔ Minxiong, CCU ↔ Chiayi City, CCU ↔ THSR.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end lg:mt-0">
            <div className="h-28 w-28 rounded-3xl bg-slate-800/80 backdrop-blur flex items-center justify-center text-4xl">
              🚕
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HowToGetHereSection() {
  return (
    <section className="bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            How to get to CCU
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
            Simple step-by-step routes from the main airports and nearby cities, so you can plan your arrival before coming to Chiayi.
          </p>
          <div className="mt-6 space-y-4">
            {howToGetHere.map((item) => (
              <motion.div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  {item.steps.map((step, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-slate-300" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:pl-6">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            Estimated travel times
          </h2>
          <p className="mt-2 text-xs text-slate-600">
            Times are approximate and may vary depending on traffic and time of day.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-medium">Destination</th>
                  <th className="px-4 py-3 font-medium">By bus</th>
                  <th className="px-4 py-3 font-medium">By taxi</th>
                </tr>
              </thead>
              <tbody>
                {travelTimes.map((row) => (
                  <tr key={row.destination} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-xs text-slate-800">
                      {row.destination}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {row.byBus}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {row.byTaxi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-900 text-slate-50 p-4 text-xs space-y-2">
            <p className="font-medium">Tip for new students</p>
            <p className="text-slate-300">
              If you arrive late at night or travel with heavy luggage, using a taxi from THSR Chiayi or Chiayi City to CCU is usually the most comfortable option.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TransportationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSection />
      <BusSection />
      <TaxiSection />
      <HowToGetHereSection />
    </main>
  )
}
