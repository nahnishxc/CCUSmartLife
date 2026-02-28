import { Bus, Train, Map, Footprints, Flag, Plane, Building2, Utensils, Landmark, Coins } from "lucide-react";

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
  images: RouteImage[]; // 修改為物件陣列
  imageColor: string;
  directions: Direction[];
}

export const ROUTE_DATA: Record<string, RouteData> = {
  chiayi_hsr: {
    id: "chiayi_hsr",
    name: "HSR Chiayi Station",
    images: [
      { 
        url: "/route/chiayi_hsr_1.jpg", 
        source: "https://iyochiayi.ouorange.com/travel-content/c3217100-0048-11ea-a7d5-db6547181d64" 
      },
      { 
        url: "/route/chiayi_hsr_2.jpg", 
        source: "https://reurl.cc/MMrdzn  " 
      }
    ],
    imageColor: "bg-blue-100",
    directions: [
      {
        label: "CCU to HSR Chiayi Station",
        fare: "Approximately NT$113 by bus.",
        steps: [
          { icon: Map, title: "Depart from CCU", desc: "Boarding at CCU Station outside Activity Center (1F)." },
          { icon: Bus, title: "Head to HSR Chiayi Station", desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward HSR Chiayi Station)." },
          { icon: Flag, title: "Arrive", desc: "Get off at HSR Chiayi Station." },
        ]
      },
      {
        label: "HSR Chiayi Station to CCU",
        fare: "Approximately NT$113 by bus.",
        steps: [
          { icon: Map, title: "Depart from HSR Chiayi Station", desc: "Boarding location: Bus stop at Chiayi HSR Station." },
          { icon: Bus, title: "Head to CCU", desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward Taiwan Railway Chiayi Station)." },
          { icon: Flag, title: "Arrive", desc: "Get off at CCU Station." },
        ]
      }
    ]
  },
  chiayi_railway: {
    id: "chiayi_railway",
    name: "Railway Chiayi Station",
     images: [
      { 
        url: "/route/chiayi_railway_1.jpg", 
        source: "https://reurl.cc/Ebkzav" 
      },
      { 
        url: "/route/chiayi_railway_2.jpg", 
        source: "https://reurl.cc/xKd0kz " 
      }
    ],
    imageColor: "bg-orange-100",
    directions: [
      {
        label: "CCU to Railway Chiayi Station",
        fare: "Approximately NT$47 by bus.",
        steps: [
          { icon: Map, title: "Depart from CCU", desc: "Boarding location: “CCU Station” outside the Activity Center (1st Floor)" },
          { icon: Bus, title: "Head to Railway Chiayi Station", desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward Railway Chiayi Station) " },
          { icon: Flag, title: "Arrive", desc: "Get off at Railway Chiayi Station." }
        ]
      },
      {
        label: "Railway Chiayi Station to CCU",
        fare: "Approximately NT$47 by bus.",
        steps: [
          { icon: Map, title: "Depart from Railway Chiayi Station", desc: "Depart from Railway Chiayi Station." },
          { icon: Bus, title: "Head to CCU", desc: "Transportation (Bus): Take Taiwan Tourist Shuttle Bus 106 (toward HSR Chiayi Station)." },
          { icon: Flag, title: "Arrive", desc: "Get off at Railway Chiayi Station." }        
        ]
      }
    ]
  },
  minxiong_railway: {
    id: "minxiong_railway",
    name: "Railway Minxiong Station",
     images: [
      { 
        url: "/route/chiayi_hsr_1.jpg", 
        source: "https://vechiayi.quorange.com/..." 
      },
      { 
        url: "/route/chiayi_hsr_2.jpg", 
        source: "https://another-source.com/..." 
      }
    ],
    imageColor: "bg-yellow-100",
    directions: [
      {
        label: "CCU to Minxiong",
        fare: "Approximately NT$113",
        steps: [
          { icon: Map, title: "Depart from CCU", desc: "Boarding at CCU Station outside Activity Center (1F)." },
          { icon: Bus, title: "Take Bus 7309", desc: "Toward Daya Station, get off at Railway Minxiong Station. Fare: ~$20-30." }
        ]
      },
      {
        label: "Minxiong to CCU",
        fare: "Approximately NT$113",
        steps: [
          { icon: Map, title: "Depart Minxiong", desc: "Boarding at bus stop at Railway Minxiong Station." },
          { icon: Bus, title: "Take Bus 7309", desc: "Toward Nanhua University, get off at CCU Station. Fare: ~$20-30." }
        ]
      }
    ]
  },
  taoyuan_airport: {
    id: "taoyuan_airport",
    name: "Taoyuan Airport",
     images: [
      { 
        url: "/route/chiayi_hsr_1.jpg", 
        source: "https://vechiayi.quorange.com/..." 
      },
      { 
        url: "/route/chiayi_hsr_2.jpg", 
        source: "https://another-source.com/..." 
      }
    ],
    imageColor: "bg-emerald-100",
    directions: [
      {
        label: "CCU to Airport",
        fare: "Approximately NT$113",
        steps: [
          { icon: Bus, title: "Step 1 & 2", desc: "Take Bus 106 to HSR Chiayi Station (~$113)." },
          { icon: Train, title: "Step 3", desc: "HSR to HSR Taoyuan Station (~$890-920)." },
          { icon: Plane, title: "Step 4", desc: "Walk to A18 MRT Station, take MRT to Terminal 1 or 2 (~$35)." }
        ]
      },
      {
        label: "Airport to CCU",
        fare: "Approximately NT$113",
        steps: [
          { icon: Plane, title: "Step 1 & 2", desc: "Take MRT from Terminal (A12/A13) to HSR Taoyuan Station (A18) (~$35)." },
          { icon: Train, title: "Step 3", desc: "HSR to HSR Chiayi Station (~$890-920)." },
          { icon: Bus, title: "Step 4", desc: "Take Bus 106 to CCU Station (~$113)." }
        ]
      }
    ]
  },
  wenhua_night_market: {
    id: "wenhua_night_market",
    name: "Wenhua Rd. Night Market",
    images: [
      { 
        url: "/route/chiayi_hsr_1.jpg", 
        source: "https://vechiayi.quorange.com/..." 
      },
      { 
        url: "/route/chiayi_hsr_2.jpg", 
        source: "https://another-source.com/..." 
      }
    ],
    imageColor: "bg-pink-100",
    directions: [
      {
        label: "CCU to Market",
        fare: "Approximately NT$113",
        steps: [
          { icon: Map, title: "Depart CCU", desc: "Boarding at CCU Station outside Activity Center (1F)." },
          { icon: Bus, title: "Head to Market", desc: "Take Bus 7309 toward Daya Station, get off at Central Fountain. Fare: ~$40-60." },
          { icon: Footprints, title: "Walk to Market", desc: "Walk about 300 meters to reach the night market." }
        ]
      },
      {
        label: "Market to CCU",
        fare: "Approximately NT$113",
        steps: [
          { icon: Footprints, title: "Walk to Stop", desc: "Walk 300m back to Central Fountain Stop." },
          { icon: Bus, title: "Head to CCU", desc: "Take Bus 7309 toward Nanhua University, get off at CCU Station. Fare: ~$40-60." }
        ]
      }
    ]
  },
  kaohsiung_airport: {
    id: "kaohsiung_airport",
    name: "Kaohsiung Airport",
     images: [
      { 
        url: "/route/chiayi_hsr_1.jpg", 
        source: "https://vechiayi.quorange.com/..." 
      },
      { 
        url: "/route/chiayi_hsr_2.jpg", 
        source: "https://another-source.com/..." 
      }
    ],
    imageColor: "bg-cyan-100",
    directions: [
      {
        label: "CCU to Airport",
        fare: "Approximately NT$113",
        steps: [
          { icon: Bus, title: "Step 1 & 2", desc: "Bus 106 to HSR Chiayi Station (~$113)." },
          { icon: Train, title: "Step 3", desc: "HSR to HSR Zuoying Station (~$395-410)." },
          { icon: Plane, title: "Step 4", desc: "Transfer to Kaohsiung MRT to Airport Station (R4) (~$50)." }
        ]
      },
      {
        label: "Airport to CCU",
        fare: "Approximately NT$113",
        steps: [
          { icon: Plane, title: "Step 1 & 2", desc: "Take MRT from Airport (R4) to Zuoying (R16) (~$50)." },
          { icon: Train, title: "Step 3", desc: "HSR to HSR Chiayi Station (~$395-410)." },
          { icon: Bus, title: "Step 4", desc: "Bus 106 to CCU Station (~$113)." }
        ]
      }
    ]
  }
};