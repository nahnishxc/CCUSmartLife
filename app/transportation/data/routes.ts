import {
  Bus,
  Train,
  Map,
  Footprints,
  Flag,
  Plane,
  Building2,
  Utensils,
  Landmark,
  Coins,
} from "lucide-react";

export interface Step {
  icon: any;
  title: string;
  desc: string;
}

export interface Direction {
  label: string;
  fare: string;
  steps: Step[];
}

export interface RouteImage {
  url: string;
  source: string;
}

export interface RouteData {
  id: string;
  name: string;
  images: RouteImage[]; 
  url: string;
  directions: Direction[];
}

export const ROUTE_DATA: Record<string, RouteData> = {
  chiayi_hsr: {
    id: "chiayi_hsr",
    name: "HSR Chiayi Station",
    images: [
      {
        url: "/route/chiayi_hsr_1.jpg",
        source:
          "https://iyochiayi.ouorange.com/travel-content/c3217100-0048-11ea-a7d5-db6547181d64",
      },
      {
        url: "/route/chiayi_hsr_2.jpg",
        source: "https://reurl.cc/MMrdzn  ",
      },
    ],
    url: "https://www.google.com/maps/place/%E9%AB%98%E9%90%B5%E5%98%89%E7%BE%A9%E7%AB%99/@23.4592693,120.3125203,15z/data=!3m1!4b1!4m6!3m5!1s0x346e9a182cc54793:0xb809dda185a13cf1!8m2!3d23.45925!4d120.32282!16s%2Fm%2F04g155l?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D",
    directions: [
      {
        label: "CCU to HSR Chiayi Station",
        fare: "Approximately NT$113 by bus.",
        steps: [
          {
            icon: Map,
            title: "Depart from CCU",
            desc: "Boarding at CCU Station outside Activity Center (1F).",
          },
          {
            icon: Bus,
            title: "Head to HSR Chiayi Station",
            desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward HSR Chiayi Station).",
          },
          {
            icon: Flag,
            title: "Arrive",
            desc: "Get off at HSR Chiayi Station.",
          },
        ],
      },
      {
        label: "HSR Chiayi Station to CCU",
        fare: "Approximately NT$113 by bus.",
        steps: [
          {
            icon: Map,
            title: "Depart from HSR Chiayi Station",
            desc: "Boarding location: Bus stop at Chiayi HSR Station.",
          },
          {
            icon: Bus,
            title: "Head to CCU",
            desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward Taiwan Railway Chiayi Station).",
          },
          { icon: Flag, title: "Arrive", desc: "Get off at CCU Station." },
        ],
      },
    ],
  },
  chiayi_railway: {
    id: "chiayi_railway",
    name: "Railway Chiayi Station",
    images: [
      {
        url: "/route/chiayi_railway_1.jpg",
        source: "https://reurl.cc/Ebkzav",
      },
      {
        url: "/route/chiayi_railway_2.jpg",
        source: "https://reurl.cc/xKd0kz ",
      },
    ],
    url: "https://www.google.com/maps/place/%E5%98%89%E7%BE%A9%E7%81%AB%E8%BB%8A%E7%AB%99(%E5%89%8D%E7%AB%99)/@23.4795228,120.4304085,15z/data=!4m10!1m2!2m1!1z54Gr6LuK5ZiJ576p56uZ!3m6!1s0x346e9428d3fa07fb:0x4d8daa7e36150067!8m2!3d23.479075!4d120.441209!15sCg_ngavou4rlmInnvqnnq5laEyIR54Gr6LuKIOWYiee-qSDnq5mSARN0cmFpbl90aWNrZXRfYWdlbmN54AEA!16s%2Fg%2F11g0z9dzl1?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D",
    directions: [
      {
        label: "CCU to Railway Chiayi Station",
        fare: "Approximately NT$47 by bus.",
        steps: [
          {
            icon: Map,
            title: "Depart from CCU",
            desc: "Boarding location: “CCU Station” outside the Activity Center (1st Floor)",
          },
          {
            icon: Bus,
            title: "Head to Railway Chiayi Station",
            desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward Railway Chiayi Station) ",
          },
          {
            icon: Flag,
            title: "Arrive",
            desc: "Get off at Railway Chiayi Station.",
          },
        ],
      },
      {
        label: "Railway Chiayi Station to CCU",
        fare: "Approximately NT$47 by bus.",
        steps: [
          {
            icon: Map,
            title: "Depart from Railway Chiayi Station",
            desc: "Depart from Railway Chiayi Station.",
          },
          {
            icon: Bus,
            title: "Head to CCU",
            desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward HSR Chiayi Station).",
          },
          {
            icon: Flag,
            title: "Arrive",
            desc: "Get off at Railway Chiayi Station.",
          },
        ],
      },
    ],
  },
  minxiong_railway: {
    id: "minxiong_railway",
    name: "Railway Minxiong Station",
    images: [
      {
        url: "/route/minxiong_railway_1.jpg",
        source: "https://reurl.cc/5beqzM",
      },
      {
        url: "/route/minxiong_railway_2.jpg",
        source: "https://another-source.com/...",
      },
    ],
    url: "https://www.google.com/maps/place/%E6%B0%91%E9%9B%84%E8%BB%8A%E7%AB%99/@23.5552284,120.4316457,17z/data=!3m1!4b1!4m6!3m5!1s0x346ebdde3f046b9d:0x23a98910b108c29c!8m2!3d23.5552284!4d120.4316457!16s%2Fm%2F04jfnf0?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D",
    directions: [
      {
        label: "CCU to Railway Minxiong Station",
        fare: "Approximately NT$20-30",
        steps: [
          {
            icon: Map,
            title: "Depart from CCU",
            desc: "Boarding location: “CCU Station” outside the Activity Center (1st Floor).",
          },
          {
            icon: Bus,
            title: "Head to Railway Minxiong Station",
            desc: "Transportation (Bus): Take Bus 7309 (toward Daya Station) .",
          },
          {
            icon: Flag,
            title: "Arrive",
            desc: "Get off at Railway Minxiong Station.",
          },
        ],
      },
      {
        label: "Railway Minxiong Station to CCU",
        fare: "Approximately NT$20-30",
        steps: [
          {
            icon: Map,
            title: "Depart from Railway Minxiong Station",
            desc: "Boarding location: Bus stop at Railway Minxiong Station.",
          },
          {
            icon: Bus,
            title: " Head to CCU",
            desc: "Transportation (Bus): Take Bus 7309 (toward Nanhua University).",
          },
          { icon: Flag, title: "Arrive", desc: "Get off at CCU Station." },
        ],
      },
    ],
  },
  taoyuan_airport: {
    id: "taoyuan_airport",
    name: "Taoyuan Airport",
    images: [
      {
        url: "/route/taoyuan_airport_1.jpg",
        source: "https://reurl.cc/QV076q",
      },
      {
        url: "/route/taoyuan_airport_2.jpg",
        source: "https://reurl.cc/5beoGM",
      },
    ],
    url: "https://www.google.com/maps/place/%E8%87%BA%E7%81%A3%E6%A1%83%E5%9C%92%E5%9C%8B%E9%9A%9B%E6%A9%9F%E5%A0%B4/@25.0777806,121.2113399,14z/data=!3m1!4b1!4m6!3m5!1s0x34429fc062d215d5:0x70a3b690a9b5b109!8m2!3d25.0804884!4d121.2311579!16zL20vMDFuZnBk?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D",
    directions: [
      {
        label: "CCU to Taoyuan Airport",
        fare: "Approximately NT$1038-1068",
        steps: [
          {
            icon: Bus,
            title: "Depart from CCU",
            desc: "Boarding location: “CCU Station” outside the Activity Center (1st Floor).",
          },
          {
            icon: Train,
            title: "Head to HSR Chiayi Station",
            desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward HSR Chiayi Station) and get off at “HSR Chiayi Station.”",
          },
          {
            icon: Train,
            title: "HSR Chiayi Station to HSR Taoyuan Station",
            desc: "Transportation (HSR): Take the High Speed Rail to“HSR Taoyuan Station.”",
          },
          {
            icon: Plane,
            title: "HSR Taoyuan Station to Taoyuan Airport",
            desc: "Walk from HSR Taoyuan Station to “Taoyuan HSR MRT Station (A18)”, and take the Airport MRT to “Airport Terminal 1 Station (A12)” or “Airport Terminal 2 Station (A13).”",
          },
        ],
      },
      {
        label: "Taoyuan Airport to CCU",
        fare: "Approximately NT$1038-1068",
        steps: [
          {
            icon: Bus,
            title: "Depart from Taoyuan Airport",
            desc: "Boarding location: Airport MRT “Airport Terminal 1 Station (A12)” or “Airport Terminal 2 Station (A13)”.",
          },
          {
            icon: Train,
            title: " Head to HSR Taoyuan Station",
            desc: "Transportation (MRT): Take the Airport MRT to “Taoyuan HSR MRT Station (A18)” and get off there.",
          },
          {
            icon: Train,
            title: "HSR Taoyuan Station to HSR Chiayi Station",
            desc: "Walk from Taoyuan HSR MRT Station to “HSR Taoyuan Station”, and take the High Speed Rail to “HSR Chiayi Station.”",
          },
          {
            icon: Plane,
            title: "HSR Chiayi Station to CCU",
            desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward Railway Chiayi Station) and get off at “CCU Station.”",
          },
        ],
      },
    ],
  },
  minxiong_police_precinct: {
    id: "minxiong_police_precinct",
    name: "Minxiong Police Precinct",
    images: [
      {
        url: "/route/minxiong_police_precinct.jpg",
        source: "https://www.facebook.com/CYPDsunday/",
      },
    ],
    url: "https://www.google.com/maps/place/%E5%98%89%E7%BE%A9%E7%B8%A3%E8%AD%A6%E5%AF%9F%E5%B1%80%E6%B0%91%E9%9B%84%E5%88%86%E5%B1%80/@23.5551291,120.4199231,15z/data=!4m6!3m5!1s0x346ebdde0a3364a1:0xa34c41411adc0e35!8m2!3d23.5551098!4d120.4302228!16s%2Fg%2F11b6hypvcr?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D",
    directions: [
      {
        label: "CCU to Minxiong Police Precinct",
        fare: "Approximately NT$20-30",
        steps: [
          {
            icon: Map,
            title: "Depart from CCU",
            desc: "Boarding location: “CCU Station” outside the Activity Center (1st Floor).",
          },
          {
            icon: Bus,
            title: "Head to Railway Minxiong Station",
            desc: "Transportation (Bus): Take Bus 7309 (toward Daya Station) and get off at “Railway Minxiong Station.”",
          },
          {
            icon: Footprints,
            title: "Head to Minxiong Police Precinct",
            desc: "Walking: Approximately 170 meters.",
          },
        ],
      },
      {
        label: "Minxiong Police Precinct to CCU",
        fare: "Approximately NT$20-30",
        steps: [
          {
            icon: Footprints,
            title: "Walking: Approximately 170 meters.",
            desc: "Walking: Approximately 170 meters to “Railway Minxiong Station.”",
          },
          {
            icon: Bus,
            title: "Head to CCU",
            desc: "Transportation (Bus): Take Bus 7309 (toward Nanhua University) and get off at “CCU Station.”",
          },
        ],
      },
    ],
  },
  kaohsiung_airport: {
    id: "kaohsiung_airport",
    name: "Kaohsiung Airport",
    images: [
      {
        url: "/route/kaohsiung_airport_1.jpg",
        source: "https://reurl.cc/Xaoej3",
      },
      {
        url: "/route/kaohsiung_airport_2.jpg",
        source: "https://reurl.cc/R9A6rZ",
      },
    ],
    url: "https://www.google.com/maps/place/%E9%AB%98%E9%9B%84%E5%9C%8B%E9%9A%9B%E6%A9%9F%E5%A0%B4/@22.5749333,120.3471544,17z/data=!3m1!4b1!4m6!3m5!1s0x346e1cce3ff6bb99:0x1ceaaec46945d129!8m2!3d22.5749333!4d120.3471544!16zL20vMDMyZGN0?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D",
    directions: [
      {
        label: "CCU to Kaohsiung Airport",
        fare: "Approximately NT$1038-1068",
        steps: [
          {
            icon: Bus,
            title: "Depart from CCU",
            desc: "Boarding location: “CCU Station” outside the Activity Center (1st Floor).",
          },
          {
            icon: Train,
            title: "Head to HSR Chiayi Station",
            desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward HSR Chiayi Station) and get off at “HSR Chiayi Station.”",
          },
          {
            icon: Train,
            title: "HSR Chiayi Station to HSR Zuoying Station",
            desc: "Transportation (HSR): Take the High Speed Rail to “HSR Zuoying Station.”",
          },
          {
            icon: Plane,
            title: "HSR Zuoying Station to Kaohsiung Airport",
            desc: "Walk from HSR Zuoying Station to “Taoyuan HSR MRT Station (A18)”, and take the MRT to “Kaohsiung International Airport Station (R4)” and get off there.",
          },
        ],
      },
      {
        label: "Kaohsiung Airport to CCU",
        fare: "Approximately NT$558-573",
        steps: [
          {
            icon: Bus,
            title: "Depart from Kaohsiung Airport",
            desc: "Boarding location: MRT “Kaohsiung International Airport Station (R4)”",
          },
          {
            icon: Train,
            title: " Head to HSR Zuoying Station",
            desc: "Transportation (MRT): Take the MRT to “Zuoying Station (R16)” and get off there, and then walk from Zuoying MRT Station to “HSR Zuoying Station.”",
          },
          {
            icon: Train,
            title: "HSR Zuoying Station to HSR Chiayi Station",
            desc: "Transportation (HSR): Take the High Speed Rail to “HSR Chiayi Station.”",
          },
          {
            icon: Plane,
            title: "HSR Chiayi Station to CCU",
            desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward Railway Chiayi Station) and get off at “CCU Station.”",
          },
        ],
      },
    ],
  },
};
