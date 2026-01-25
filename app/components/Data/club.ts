interface Club {
  id: string;
  name: string;
  desc: string;
  links: {
    fb?: string;
    ig?: string;
    web?: string;
  };
}

interface ClubCategory {
  id: string;
  name: string;
  clubs: Club[];
}

const CLUB_DATA: ClubCategory[] = [
  {
    id: "Academic",
    name: "Academic",
    clubs: [
      {
        id: "ac1",
        name: "Light & Salt Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "https://www.facebook.com/CCULightSalt", ig: "#" },
      },
      {
        id: "ac2",
        name: "Debate Club",
        desc: "Learn about stock markets, crypto, and financial planning.",
        links: { fb: "#" },
      },
      {
        id: "ac3",
        name: "Astronomy Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac4",
        name: "Calligraphy Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac5",
        name: "Falundafa Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac6",
        name: "Leader Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac7",
        name: "LivingFountain Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac8",
        name: "Xixinshe Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac9",
        name: "Go Game Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac10",
        name: "Bliss & Wisdom Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac11",
        name: "Tea Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac12",
        name: "CCU Securities Research Society Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac13",
        name: "Innovation Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac14",
        name: "AIESEC Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac15",
        name: "Humanity Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac16",
        name: "Public Affairs Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac17",
        name: "CCU Bridge Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac18",
        name: "Interdisciplinary Talent Cultivation Club ",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac19",
        name: "Public Affairs Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac20",
        name: "Love Money Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac21",
        name: "Meridian Massage Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
      {
        id: "ac22",
        name: "Buddhist Studies Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
    ],
  },
  {
    id: "Sports",
    name: "Sports",
    clubs: [
      {
        id: "sp1",
        name: "Mountaineering Club",
        desc: "From acoustic to electric, join us to jam and learn.",
        links: { fb: "#", ig: "#" },
      },
      {
        id: "sp2",
        name: "CCU Capbaseball Club",
        desc: "Express yourself through street dance and choreography.",
        links: { ig: "#" },
      },
      {
        id: "sp3",
        name: "Swimming Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp4",
        name: "Swimming Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp5",
        name: "Karate Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp6",
        name: "Freecombat Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp7",
        name: "Tennis Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp8",
        name: "Yoga Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp9",
        name: "Skateboard Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp10",
        name: "Baseball Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp11",
        name: "Cricket Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
      {
        id: "sp12",
        name: "Cycling Club",
        desc: "Form a band and perform at campus festivals.",
        links: { fb: "#" },
      },
    ],
  },
  {
    id: "Recreational",
    name: "Recreational",
    clubs: [
      {
        id: "re1",
        name: "Pop Dance Club",
        desc: "Volunteer to teach children in rural elementary schools.",
        links: { fb: "#", web: "#" },
      },
            {
        id: "re2",
        name: "Magic Club",
        desc: "Volunteer to teach children in rural elementary schools.",
        links: { fb: "#", web: "#" },
      },
            {
        id: "re3",
        name: "HipHop Club",
        desc: "Volunteer to teach children in rural elementary schools.",
        links: { fb: "#", web: "#" },
      },
            {
        id: "re4",
        name: "CCU Comeoy",
        desc: "Volunteer to teach children in rural elementary schools.",
        links: { fb: "#", web: "#" },
      },
            {
        id: "re5",
        name: "K-POP Club",
        desc: "Volunteer to teach children in rural elementary schools.",
        links: { fb: "#", web: "#" },
      },
            {
        id: "re6",
        name: "Japanese Mahjong Club",
        desc: "Volunteer to teach children in rural elementary schools.",
        links: { fb: "#", web: "#" },
      },
            {
        id: "re7",
        name: "Aboriginal cultural heritage Club",
        desc: "Volunteer to teach children in rural elementary schools.",
        links: { fb: "#", web: "#" },
      },
            {
        id: "re8",
        name: "CCUYGO Club",
        desc: "Volunteer to teach children in rural elementary schools.",
        links: { fb: "#", web: "#" },
      },
    ],
  },
  {
    id: "Social",
    name: "Social",
    clubs: [
      {
        id: "so1",
        name: "Indian Students Association",
        desc: "Hiking and camping trips to Taiwan's beautiful mountains.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "so2",
        name: "Tainan Students Association",
        desc: "Hiking and camping trips to Taiwan's beautiful mountains.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "so3",
        name: "Hualien Students Association",
        desc: "Hiking and camping trips to Taiwan's beautiful mountains.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "so4",
        name: "Transfer Students Association",
        desc: "Hiking and camping trips to Taiwan's beautiful mountains.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "so5",
        name: "Overseas Chinese Students Association",
        desc: "Hiking and camping trips to Taiwan's beautiful mountains.",
        links: { fb: "#", ig: "#" },
      },
    ],
  },
  {
    id: "Service",
    name: "Service",
    clubs: [
      {
        id: "se1",
        name: "Firstaid Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
           {
        id: "se2",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
           {
        id: "se3",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
           {
        id: "se4",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
           {
        id: "se5",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
           {
        id: "se6",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
           {
        id: "se7",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
           {
        id: "se8",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
    ]
  },
  {
    id: "Arts",
    name: "Arts",
    clubs: [
      {
        id: "c1",
        name: "Debate Society",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
      {
        id: "c2",
        name: "Investment Club",
        desc: "Learn about stock markets, crypto, and financial planning.",
        links: { fb: "#" },
      },
      {
        id: "c3",
        name: "Coding Club",
        desc: "Work on software projects and learn new programming languages together.",
        links: { ig: "#", web: "#" },
      },
    ],
  },
  {
    id: "Music",
    name: "Music",
    clubs: [
      {
        id: "mu1",
        name: " Chorus Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu2",
        name: "Feelings Guitar Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu3",
        name: "Dongli Traditional Musical Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu4",
        name: "Zheng Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu5",
        name: "CCU Orchestra Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu6",
        name: "Percussion Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu7",
        name: "Hot Music Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu8",
        name: "Piano Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu9",
        name: "Jazz Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
            {
        id: "mu10",
        name: "CCU Wuyueh A Capella Club",
        desc: "Practice critical thinking and public speaking skills through weekly debates.",
        links: { fb: "#", ig: "#" },
      },
    ],
  },
];
