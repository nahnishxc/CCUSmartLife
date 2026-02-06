export interface Club {
  id: string;
  name: string;
  desc: string;
  image?: string;
  links: {
    fb?: string;
    ig?: string;
  };
}

export interface ClubCategory {
  id: string;
  name: string;
  clubs: Club[];
}

export const CLUB_DATA: ClubCategory[] = [
  {
    id: "Academic",
    name: "Academic",
    clubs: [
      {
        id: "ac1",
        name: "CCU Light & Salt Club",
        desc: "A Christian-based student group where members share life experiences and reflect on topics related to faith. The club offers a welcoming space for discussion, support, and spiritual growth.",
        image: "/clubs/ac1.png",
        links: {
          fb: "https://www.facebook.com/CCULightSalt/?locale=en",
          ig: "https://www.instagram.com/_light_and_salt_club/",
        },
      },
      {
        id: "ac2",
        name: "CCU Debate Club",
        desc: "Focused on developing debate skills, this club provides structured training as well as regular practice sessions. Members often represent CCU in intercollegiate debate tournaments.",
        image: "/clubs/ac2.jpg",
        links: {
          fb: "https://www.facebook.com/ccudebate/?locale=en",
          ig: "https://www.instagram.com/ccu_debate/",
        },
      },
      {
        id: "ac3",
        name: "CCU Astronomy Club",
        desc: "The club brings together students interested in astronomy through stargazing activities and astrophotography workshops. Members also enjoy social gatherings centered around exploring the night sky.",
        image: "/clubs/ac3.png",
        links: {
          fb: "https://www.facebook.com/CCUAstro/?locale=en",
          ig: "https://www.instagram.com/ccu_astronomy/",
        },
      },
      {
        id: "ac4",
        name: "CCU Calligraphy Research Club",
        desc: "A club for students who enjoy practicing calligraphy and learning traditional techniques together. Each semester usually concludes with an exhibition showcasing members’ works.",
        image: "/clubs/ac4.png",
        links: {
          fb: "https://www.facebook.com/ccucalligraphy/?locale=en",
          ig: "https://www.instagram.com/ccu_calligraphy/",
        },
      },
      {
        id: "ac5",
        name: "Falundafa Club",
        desc: "This club centers on the practice of Falun Dafa, emphasizing self-reflection and personal cultivation. Members gather to improve both mental well-being and inner balance.",
        image: "/clubs/ac5.jpg",
        links: {
          fb: "https://www.facebook.com/ccufalundafa/?locale=en",
          ig: "https://www.instagram.com/ccu.falundafa",
        },
      },
      {
        id: "ac6",
        name: "Leadership Club",
        desc: "Through planning and hosting various activities, members develop leadership and communication skills. The club encourages students to explore their potential and broaden their perspectives.",
       image: "/clubs/ac6.jpg",
        links: {
          fb: "https://www.facebook.com/chanAtCCU/",
          ig: "https://www.instagram.com/ccu_leadershipclub?igshid=YmMyMTA2M2Y%3D",
        },
      },
      {
        id: "ac7",
        name: "Living Spring of Life Club",
        desc: "A Christian fellowship where members explore Biblical stories together. Weekly gatherings often include shared meals, Bible reading, and casual conversations that strengthen community bonds.",
        image: "/clubs/ac7.jpg",
        links: {
          ig: "https://www.instagram.com/cculivingwater/",
        },
      },
      {
        id: "ac8",
        name: "Shi Xin Club",
        desc: "A Christian group that shares the Gospel through hymns, Bible study, and group activities. The club aims to create opportunities for connection, reflection, and spiritual growth.",
        image: "/clubs/ac8.jpg",
        links: {
          fb: "https://www.facebook.com/groups/400138946723944/",
          ig: "https://www.instagram.com/ccujoy/",
        },
      },
      {
        id: "ac9",
        name: "Bauhinia Go Club",
        desc: "Dedicated to the board game Go (Weiqi), this club offers teaching sessions and friendly matches. It welcomes players of all levels who want to improve their skills and strategies.",
        image: "/clubs/ac9.jpg",
        links: {
          fb: "https://www.facebook.com/nccugogame/?locale=en",
        },
      },
      {
        id: "ac10",
        name: "CCU Bliss & Wisdom Youth Club",
        desc: "The club focuses on personal growth and environmental awareness through volunteer work and lectures. Members engage in activities that encourage reflection and meaningful social contribution.",
        image: "/clubs/ac10.jpg",
        links: {
          fb: "https://www.facebook.com/ccubwy/?locale=en",
          ig: "https://www.instagram.com/ccu._.bwyouth/",
        },
      },
      {
        id: "ac11",
        name: "Tea Club",
        desc: "A space for students interested in tea culture to learn and exchange knowledge. Members explore tea appreciation, brewing techniques, and traditions from different regions.",
        image: "/clubs/ac11.png",
        links: {
          fb: "https://www.facebook.com/people/%E4%B8%AD%E6%AD%A3%E7%B4%AB%E8%8D%8A%E8%8C%B6%E8%97%9D%E7%A4%BE/100071260705512/",
          ig: "https://www.instagram.com/tea.art_ccu",
        },
      },
      {
        id: "ac12",
        name: "CCU Buddhism Club",
        desc: "This club studies Buddhist philosophy and teachings, with activities focused on life reflection and spiritual development. Members learn how to apply these ideas in daily life.",
        image: "/clubs/ac12.jpg",
        links: {
          fb: "https://www.facebook.com/ccuccbc/?locale=en",
          ig: "https://www.instagram.com/ccu.buddhism_club/",
        },
      },
      {
        id: "ac13",
        name: "Innovation and Entrepreneurship Club",
        desc: "A platform for students interested in innovation and startups to share ideas and resources. The club encourages discussion, collaboration, and networking among like-minded peers.",
        image: "/clubs/ac13.png",
        links: {
          fb: "https://www.facebook.com/cciue/",
          ig: "https://www.instagram.com/ccuie_2022/",
        },
      },
      {
        id: "ac14",
        name: "AIESEC in CCU",
        desc: "AIESEC provides hands-on team experiences in an international environment. Members develop leadership and problem-solving skills while working with students from diverse cultures.",
        image: "/clubs/ac14.jpg",
        links: {
          fb: "https://www.facebook.com/AIESEC.CCU.Be.My.Friend/?locale=en",
          ig: "https://www.instagram.com/aiesec.in.ccu/",
        },
      },
      {
        id: "ac15",
        name: "Humanity Club",
        desc: "This club promotes Confucian philosophy through lectures and charitable activities. It encourages members to reflect on traditional values and apply them in modern life.",
        image: "/clubs/ac15.jpg",
        links: {
          fb: "https://www.facebook.com/p/Chiayi%E4%BB%81%E9%A2%A8%E7%A4%BE-100066602829309/",
          ig: "https://www.instagram.com/ccuhumanityclub/",
        },
      },
      {
        id: "ac16",
        name: "Public Affairs Club",
        desc: "Focused on public issues and social innovation, the club encourages discussion of current events and civic participation. Members develop critical thinking through hands-on activities.",
        image: "/clubs/ac16.jpg",
        links: {
          fb: "https://www.facebook.com/CCUPublicAffairsClub/?locale=en",
          ig: "https://www.instagram.com/ccupac2019/",
        },
      },
      {
        id: "ac17",
        name: "CCU Bridge Club",
        desc: "A club dedicated to promoting Contract Bridge on campus. Activities include teaching the game, practice sessions, and交流 among players of different skill levels.",
        image: "/clubs/ac17.jpg",
        links: {
          fb: "https://www.facebook.com/p/%E4%B8%AD%E6%AD%A3%E5%A4%A7%E5%AD%B8%E9%B3%B3%E6%A2%A8%E7%94%B0%E6%A9%8B%E7%89%8C%E7%A4%BE-CCU-Bridge-100064086193030/",
          ig: "https://www.instagram.com/ccu_bridge/",
        },
      },
      {
        id: "ac18",
        name: "Interdisciplinary Talent Cultivation Club",
        desc: "The club hosts talks and sharing sessions on interdisciplinary learning and career exploration. It helps students think about how to shape their future paths.",
        image: "/clubs/ac18.jpg",
        links: {
          fb: "https://www.facebook.com/ccuitcc?mibextid=wwXIfr&rdid=SnKZfVDOPzfWb24C&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EjZimMZu6%2F%3Fmibextid%3DwwXIfr#",
        },
      },
      {
        id: "ac19",
        name: "National Chung Cheng University Love Money Club",
        desc: "Through workshops and activities, the club helps members explore their interests and strengths. It aims to cultivate practical skills and broader professional awareness.",
        image: "/clubs/ac19.jpg",
        links: {
          fb: "https://www.facebook.com/p/%E4%B8%AD%E6%AD%A3%E6%88%80%E8%B2%A1%E7%A0%94%E8%A8%8E%E6%9C%83-100086783348142/",
          ig: "https://www.instagram.com/ccu_lm_club?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
        },
      },
      {
        id: "ac20",
        name: "CCU iGEM Club",
        desc: "An interdisciplinary team working in the field of synthetic biology. Members design and develop projects that aim to solve real-world environmental or health-related problems.",
        image: "/clubs/ac20.jpg",
        links: {
          fb: "https://www.facebook.com/ccuigemteam/",
          ig: "https://www.instagram.com/ccuigem/",
        },
      },
      {
        id: "ac21",
        name: "Fintech Club",
        desc: "The club explores financial technology topics such as blockchain and digital platforms. Members discuss emerging trends and collaborate on FinTech-related ideas.",
        image: "/clubs/ac21.jpg",
        links: {
          fb: "https://www.facebook.com/ccuftc/",
          ig: "https://www.instagram.com/ccu_ftc/",
        },
      },
      {
        id: "ac22",
        name: "CCU Securities Research Society",
        desc: "Focused on securities investment fundamentals, members analyze financial markets, research investment targets, and take part in finance-related competitions.",
        image: "/clubs/ac22.jpg",
        links: {
          fb: "https://www.facebook.com/ccusrs/",
          ig: "https://www.instagram.com/ccu_srs/",
        },
      },
      {
        id: "ac23",
        name: "CCU Cybersecurity Research Club",
        desc: "The main cybersecurity community on campus, focusing on CTF competitions and information security topics. The club regularly hosts training sessions and related events.",
        image: "/clubs/ac23.jpg",
        links: {
          fb: "https://www.facebook.com/p/%E4%B8%AD%E6%AD%A3%E8%B3%87%E5%AE%89%E7%A0%94%E7%A9%B6%E7%A4%BE-100089957277279/",
        },
      },
      {
        id: "ac24",
        name: "National Chung Cheng University Meridian Massage Club",
        desc: "This club teaches easy-to-learn meridian massage techniques. Its activities focus on relieving stress and helping members relax both physically and mentally.",
        image: "/clubs/ac24.jpg",
        links: {
          ig: "https://www.instagram.com/ccu.meridian_massage.club?igsh=eno0YnUyejUzcHJn",
        },
      },
    ],
  },
  {
    id: "Sports",
    name: "Sports",
    clubs: [
      {
        id: "sp1",
        name: "CCU Mountaineering Club",
        desc: "A club for students who enjoy hiking and outdoor adventures, with activities centered around trekking and mountaineering.",
        image: "/clubs/sp1.jpg",
        links: {
          fb: "https://www.facebook.com/CCUMount/?locale=zh_en",
          ig: "https://www.instagram.com/ccumount/",
        },
      },
      {
        id: "sp2",
        name: "CCU Swimming Team",
        desc: "As CCU’s Division II swim team, the club focuses on swimming training and related activities. Most practices and events take place at the campus swimming pool.",
        image: "/clubs/sp2.jpg",
        links: {
          fb: "https://www.facebook.com/CCUSWIMMING/?locale=en",
          ig: "https://www.instagram.com/ccu_swim/",
        },
      },
      {
        id: "sp3",
        name: "CCU Kungfu",
        desc: "This club practices traditional Chinese martial arts, including weapons training. Members train to build strength and coordination while also developing discipline and focus.",
        image: "/clubs/sp3.png",
        links: {
          fb: "https://www.facebook.com/CCUkungfu/?locale=en",
          ig: "https://www.instagram.com/ccu_kungfu/",
        },
      },
      {
        id: "sp4",
        name: "CCU Karate",
        desc: "Representing the university in Karate, the club trains regularly to improve technique and physical ability. Members also take part in exchanges and related events to deepen their practice.",
        image: "/clubs/sp4.jpg",
        links: {
          fb: "https://www.facebook.com/CCUKC",
          ig: "https://www.instagram.com/ccu.karate/",
        },
      },
      {
        id: "sp5",
        name: "CCU Fight Club",
        desc: "A kickboxing-focused club where students can learn and train in a supportive setting. Beginners are welcome, and you don’t need to bring your own equipment to get started.",
        image: "/clubs/sp5.jpg",
        links: {
          fb: "https://www.facebook.com/CCUfreecombat/",
          ig: "https://www.instagram.com/ccufightclub/",
        },
      },
      {
        id: "sp6",
        name: "Tennis Club",
        desc: "Bringing together students who enjoy tennis, the club offers a place to learn, practice, and rally with others. Members train on campus and work on improving skills over time.",
        image: "/clubs/sp6.jpg",
        links: {
          fb: "https://www.facebook.com/tennis.in.ccu/?locale=en",
          ig: "https://www.instagram.com/ccu_tennis_club/",
        },
      },
      {
        id: "sp7",
        name: "CCU Yoga",
        desc: "The campus yoga club offers regular instructor-led sessions in a calm, friendly atmosphere. It’s a relaxing way to practice yoga while meeting people with similar interests.",
        image: "/clubs/sp7.jpg",
        links: {
          fb: "https://www.facebook.com/p/%E4%B8%AD%E6%AD%A3%E5%A4%A7%E5%AD%B8%E7%91%9C%E7%8F%88%E7%A4%BE-CCU-YOGA-100079309244980/?locale=zh_TW",
        },
      },
      {
        id: "sp8",
        name: "CCU Skateboard",
        desc: "A community for students who want to learn or keep practicing skateboarding. Members often meet near the Student Activity Center to skate together and share tips.",
        image: "/clubs/sp8.jpg",
        links: {
          fb: "https://www.facebook.com/p/%E4%B8%AD%E6%AD%A3%E5%A4%A7%E5%AD%B8%E6%BB%91%E6%9D%BF%E7%A4%BE-CCU-skateboard-100068211324822/",
          ig: "https://www.instagram.com/ccu_skateboard/",
        },
      },
      {
        id: "sp9",
        name: "National Chung Cheng Pineapple Devil Rubber Baseball Club",
        desc: "CCU’s rubber baseball team trains regularly and keeps an active practice schedule. They also often join friendly games and matches with teams from other universities.",
        image: "/clubs/sp9.jpg",
        links: {
          fb: "https://www.facebook.com/ccurbb#",
          ig: "https://www.instagram.com/ccurubberbaseball/",
        },
      },
      {
        id: "sp10",
        name: "Cricket Club",
        desc: "A club for students who love cricket and want to train and play together. Members practice consistently and may travel off campus to take part in tournaments.",
        image: "/clubs/sp10.jpg",
        links: {
          fb: "https://www.facebook.com/people/CCU-Cricket-club/100072022847571/",
        },
      },
      {
        id: "sp11",
        name: "Cap Baseball Club",
        desc: "A newer club promoting bottle cap baseball, with training sessions and regular play. Members also join external tournaments and have built a strong competitive record.",
        image: "/clubs/sp11.jpg",
        links: {
          ig: "https://www.instagram.com/ccu_capbaseball_club/",
        },
      },
      {
        id: "sp12",
        name: "CCU Cycling Club",
        desc: "The cycling club promotes riding as both a sport and a lifestyle. Members often organize group rides to explore areas beyond campus and enjoy cycling together.",
        image: "/clubs/sp12.jpg",
        links: {
          fb: "https://www.facebook.com/ccubike/?locale=en",
          ig: "https://www.instagram.com/ccu_cycling_club/",
        },
      },
      {
        id: "sp13",
        name: "National Chung Cheng Sports Game Research Club",
        desc: "A club centered on discussing and analyzing sports competitions, including strategies and how games are managed. Members share observations and explore what influences performance and outcomes.",
        links: {},
      },
      {
        id: "sp14",
        name: "National Chung Cheng University Force Cheerleading Club",
        desc: "A competitive cheerleading team combining stunts, gymnastics, and dance. The club trains seriously and has a strong history of performing well in national-level competitions.",
       image: "/clubs/sp14.jpg",
        links: {
          fb: "https://www.facebook.com/CCUForceCheerleading/?locale=en",
          ig: "https://www.instagram.com/ccu_force_cheerleading/",
        },
      },
    ],
  },

  {
    id: "Recreational",
    name: "Recreational",
    clubs: [
      {
        id: "re1",
        name: "CCU POPDANCE",
        desc: "A dance club focused on training and performing popular styles. They’re very active and usually host multiple showcases and stage performances each semester.",
        image: "/clubs/re1.jpg",
        links: {
          fb: "https://www.facebook.com/CCUPOPDANCE",
          ig: "https://www.instagram.com/ccu_popdance/",
        },
      },
      {
        id: "re2",
        name: "CCU Magic Club",
        desc: "A club for students interested in magic performance, with sessions that cover both basics and advanced techniques. Members learn, practice, and polish routines together.",
        image: "/clubs/re2.jpg",
        links: {
          fb: "https://www.facebook.com/CCUMagic",
        },
      },
      {
        id: "re3",
        name: "CCU hiphop",
        desc: "Dedicated to Hip-Hop culture, the club works on rap writing, beat-making, and related creative projects. They occasionally hold performances to share their work with others.",
        image: "/clubs/re3.jpg",
        links: {
          fb: "https://www.facebook.com/CCUHipHop/",
          ig: "https://www.instagram.com/ccuhiphop_official/",
        },
      },
      {
        id: "re4",
        name: "CCU Comedy Club",
        desc: "A theater-focused club where students share ideas, rehearse, and build performances together. It provides a space for creative exchange and opportunities to go on stage.",
        image: "/clubs/re4.jpg",
        links: {
          fb: "https://www.facebook.com/profile.php?id=61554775675995",
          ig: "",
        },
      },
      {
        id: "re5",
        name: "CCUKPOP",
        desc: "A lively club that blends K-Pop dance covers with Korean language and cultural exchange. It’s a great place for students who enjoy Korean pop culture and community activities.",
        image: "/clubs/re5.jpg",
        links: {
          fb: "https://www.facebook.com/CCUKPOP/",
          ig: "https://www.instagram.com/ccu_kpop/",
        },
      },
      {
        id: "re6",
        name: "japanese mah jong club",
        desc: "A strategy-oriented club for Japanese Mahjong, focused on learning rules and improving play. They emphasize Mahjong as a healthy hobby and strictly avoid money-based gambling.",
        image: "/clubs/re6.png",
        links: {
          fb: "https://www.facebook.com/CCUJMC",
        },
      },
      {
        id: "re7",
        name: "Trading Card Game Club",
        desc: "A club for trading card game fans, including Yu-Gi-Oh! and other titles. Members meet regularly and sometimes host tournaments both on campus and with outside communities.",
        image: "/clubs/re7.jpg",
        links: {
          fb: "https://www.facebook.com/profile.php?id=100066480497474",
        },
      },
      {
        id: "re8",
        name: "National Chung Cheng University Indigenous club",
        desc: "Dedicated to promoting indigenous cultures and creating spaces for exchange on campus. The club also offers community support and a sense of belonging for indigenous students.",
        image: "/clubs/re8.jpg",
        links: {
          ig: "https://www.instagram.com/ccuindigenousclub?igsh=ZDNlZDc0MzIxNw%3D%3D&utm_source=ig_web_button_share_sheet",
        },
      },
      {
        id: "re9",
        name: "Texas Hold’em Research Club",
        desc: "A club that treats Texas Hold’em as a strategy-based, competitive mind sport. Members focus on learning concepts, improving decision-making, and practicing in a social setting.",
        links: {},
      },
    ],
  },

  {
    id: "social",
    name: "Social",
    clubs: [
      {
        id: "so1",
        name: "CCUTainanclub",
        desc: "A hometown-based student association for CCU students from Tainan. Through welcome events, orientation camps, and hometown service activities during winter and summer breaks, the club helps members build a strong sense of belonging.",
        image: "/clubs/so1.jpg",
        links: {
          fb: "https://www.facebook.com/ccutainan/",
          ig: "https://www.instagram.com/ccu_tainan_club/",
        },
      },
      {
        id: "so2",
        name: "Overseas Chinese Student Association",
        desc: "Dedicated to supporting overseas Chinese students at CCU, the association promotes mutual connection and cultural exchange. It also works closely with the Office of Student Affairs to assist students with daily life and academic matters in Taiwan.",
        image: "/clubs/so2.jpg",
        links: {
          fb: "https://www.facebook.com/groups/ccu.ocs/",
          ig: "https://www.instagram.com/ccuocsa_official/",
        },
      },
      {
        id: "so3",
        name: "National Chung Cheng University High School Association of Taoyuan",
        desc: "TA club that brings together CCU students from Taoyuan. It offers opportunities for students from different departments to connect and builds cross-department friendships through camps and group activities.",
        image: "/clubs/so3.jpg",
        links: {
          fb: "https://www.facebook.com/CCUtaoyuan/?locale=en",
          ig: "https://www.instagram.com/ccu_peach/",
        },
      },
      {
        id: "so4",
        name: "Hualien Students Association",
        desc: "The club regularly organizes exchange activities for students from Hualien. It serves as an important community for sharing experiences, building belonging, and strengthening connections on campus.",
        image: "/clubs/so4.jpg",
        links: {
          fb: "https://www.facebook.com/ccuhua/?locale=zh_TW",
        },
      },
      {
        id: "so5",
        name: "Chung Cheng University Indian Students Association",
        desc: "A social club for Indian students at CCU, providing a platform to share experiences, organize activities, and support one another while studying in Taiwan.",
        image: "/clubs/so5.jpg",
        links: {
          fb: "https://www.facebook.com/CCUIA111/mentions/",
        },
      },
    ],
  },

  {
    id: "Service",
    name: "Service",
    clubs: [
      {
        id: "se1",
        name: "CCU First Aid Club",
        desc: "A service-oriented club focused on campus safety and first aid education. Members learn essential emergency response skills and provide on-site support during school events.",
        image: "/clubs/se1.jpg",
        links: {
          fb: "https://www.facebook.com/100069787994339", // 十字軍急救服務社 Firstaid Club 官方粉專 :contentReference[oaicite:0]{index=0}
          ig: "https://www.instagram.com/ccufirstaid1993/",
        },
      },
      {
        id: "se2",
        name: "Zero Club",
        desc: "An organization dedicated to supporting children in rural areas and underprivileged families. The club organizes various activities aimed at providing care, resources, and companionship for children in need.",
        image: "/clubs/se2.jpg",
        links: {
          fb: "https://www.facebook.com/ccuzero/?locale=en",
          ig: "https://www.instagram.com/ccu_zeroclub/",
        },
      },
      {
        id: "se3",
        name: "CCU-LoveLife",
        desc: "Focused on humane animal welfare, the club works to reduce the number of stray animals around campus and assists with medical care and rescue efforts.",
        image: "/clubs/se3.jpg",
        links: {
          fb: "https://www.facebook.com/groups/422046154563892/?locale=en",
          ig: "https://www.instagram.com/ccu_treasure/",
        },
      },
      {
        id: "se4",
        name: "Chong De Volunteer Club",
        desc: "A service club that promotes environmental protection, charitable actions, and social responsibility. Members spread related values through activities and community engagement.",
        image: "/clubs/se4.jpg",
        links: {
          ig: "https://www.instagram.com/ccuveganclub/",
        },
      },
      {
        id: "se5",
        name: "Legal Aid Society",
        desc: "Formed by faculty and students from the Department of Law, this service-oriented club applies legal knowledge to public welfare and social service initiatives.",
        image: "/clubs/se5.jpg",
        links: {
          fb: "https://www.facebook.com/cculawclub/?locale=en",
          ig: "https://www.instagram.com/cculegalaid/",
        },
      },
      {
        id: "se6",
        name: "Huomiyaya Alishan Community Work Cooperative",
        desc: "A service club dedicated to working with Tsou indigenous communities in the Alishan area. The club focuses on cultural preservation, promotion, and passing down Tsou traditions both on and off campus.",
        image: "/clubs/se6.jpg",
        links: {
          fb: "https://www.facebook.com/CCU.Homeyaya/?locale=en",
        },
      },
      {
        id: "se7",
        name: "4Q Volunteer Club",
        desc: "A service-oriented club centered on personal growth and inner exploration. Through various activities, it helps students reflect, relax, and find balance amid busy academic life.",
        image: "/clubs/se7.jpg",
        links: {
          fb: "https://www.facebook.com/ccufycd347/?locale=en",
          ig: "https://www.instagram.com/ccu_4q/",
        },
      },
      {
        id: "se8",
        name: "Chung Cheng University International Volunteers",
        desc: "Committed to both domestic and international service, the club engages in rural education, community development, and cross-cultural exchange programs.",
        image: "/clubs/se8.jpg",
        links: {
          fb: "https://www.facebook.com/p/%E4%B8%AD%E6%AD%A3%E5%A4%A7%E5%AD%B8%E5%9C%8B%E9%9A%9B%E5%BF%97%E5%B7%A5%E9%9A%8A-61564956697930/",
          ig: "https://www.instagram.com/ccu.international.volunteers/",
        },
      },
    ],
  },

  {
    id: "Arts",
    name: "Arts",
    clubs: [
      {
        id: "ar1",
        name: "CCU Photography Club",
        desc: "A club Focuses on photography skills, practice, and visual creation and regularly organizes exhibitions to showcase members’ work and creative achievements.",
        image: "/clubs/ar1.jpg",
        links: {
          fb: "https://www.facebook.com/CCUPhotoClub/",
          ig: "https://www.instagram.com/ccuphoto/",
        },
      },
      {
        id: "ar2",
        name: "National Chung Cheng University Art Club",
        desc: "Focused on oil painting and visual art exchange, the club encourages artistic creation and typically holds end-of-semester exhibitions on campus.",
        image: "/clubs/ar2.jpg",
        links: {
          fb: "https://www.facebook.com/CCUArtClub/",
          ig: "https://www.instagram.com/ccuartclub/",
        },
      },
      {
        id: "ar3",
        name: "CCUACGN",
        desc: "A student club focused on the study and exchange of ACG culture, including animation, comics, games, and light novels. The club regularly organizes activities for members to share interests and discuss related works.",
        image: "/clubs/ar3.jpg",
        links: {
          fb: "https://www.facebook.com/CCUACGN?locale=en",
          ig: "https://www.instagram.com/ccu._.acgn/",
        },
      },
      {
        id: "ar4",
        name: "Game Club",
        desc: "A club dedicated to board games, party games, and role-based games. It aims to create a relaxed, low-pressure environment where members can enjoy games together.",
        image: "/clubs/ar4.jpg",
        links: {
          fb: "https://www.facebook.com/CCUGAMECLUB/?locale=en",
        },
      },
      {
        id: "ar5",
        name: "Beauty Maker Club",
        desc: "A warm and friendly club focused on sharing makeup and beauty tips, improving personal styling skills, and occasionally providing makeup services.",
        image: "/clubs/ar5.jpg",
        links: {
          fb: "https://www.facebook.com/ccubeautymaker/?locale=en",
        },
      },
      {
        id: "ar6",
        name: "Ya Cat Troupe",
        desc: "An independent performance group formed by students passionate about performing arts. The group focuses on theater production and frequently stages performances at the Zijin Theater on campus.",
        image: "/clubs/ar6.jpg",
        links: {
          fb: "https://www.facebook.com/ccuyacat/?locale=en",
          ig: "https://www.instagram.com/yacat_troupe/",
        },
      },
      {
        id: "ar7",
        name: "Fire Dance Club",
        desc: "Specializing in fire props and fire dance techniques, the club combines performance with music and lighting to create visually striking shows.",
        image: "/clubs/ar7.jpg",
        links: {
          fb: "https://www.facebook.com/CCUFD/",
          ig: "https://www.instagram.com/ccu_fire/",
        },
      },
      {
        id: "ar8",
        name: "National Chung Cheng University 2-0-1-9 Film Club",
        desc: "Dedicated to film appreciation and discussion, the club organizes movie screenings followed by group discussions to build a shared film culture on campus.",
        image: "/clubs/ar8.png",
        links: {
          fb: "https://www.facebook.com/CCUFILM/",
          ig: "https://www.instagram.com/2019filmclub_ccu/",
        },
      },
    ],
  },

  {
    id: "Music",
    name: "Music",
    clubs: [
      {
        id: "mu1",
        name: "	National Chung Cheng University Chorus",
        desc: "A music club focused on choral performance across various genres, including classical, symphonic, and pop music, showcasing the diversity of vocal expression.",
        image: "/clubs/mu1.jpg",
        links: {
          fb: "https://www.facebook.com/CHORUS.CCU/?locale=en",
          ig: "https://www.instagram.com/ccuchoruszy/",
        },
      },
      {
        id: "mu2",
        name: "Feelings Guitar Club",
        desc: "Offers structured guitar lessons through regular club classes and frequently holds public performances and showcases.",
        image: "/clubs/mu2.jpg",
        links: {
          fb: "https://www.facebook.com/feelingsguitar/?locale=en",
          ig: "https://www.instagram.com/feelingsguitarclub/",
        },
      },
      {
        id: "mu3",
        name: "Dongli Traditional Musical Club",
        desc: "Dedicated to promoting traditional Chinese music, the club regularly practices and holds performances to showcase traditional instruments and repertoire.",
        image: "/clubs/mu3.jpg",
        links: {
          fb: "https://www.facebook.com/p/%E4%B8%AD%E6%AD%A3%E5%A4%A7%E5%AD%B8%E6%9D%B1%E7%B1%AC%E5%9C%8B%E6%A8%82%E7%A4%BE-100063489743854/?locale=zh_TW",
          ig: "https://www.instagram.com/ccu_dongli_cmc/",
        },
      },
      {
        id: "mu4",
        name: "Zheng Club",
        desc: "A music club focused on traditional music and guzheng performance, with professional instructors invited to provide formal training.",
        image: "/clubs/mu4.jpg",
        links: {
          fb: "https://www.facebook.com/ccuzheng/?locale=en",
          ig: "https://www.instagram.com/guzheng.ccu/",
        },
      },
      {
        id: "mu5",
        name: "CCU Orchestra Club",
        desc: "Composed of wind and string ensembles, the club combines winds, strings, and percussion to rehearse and perform Western orchestral music.",
        image: "/clubs/mu5.jpg",
        links: {
          fb: "https://www.facebook.com/ccu.windsband/",
          ig: "https://www.instagram.com/ccu_orchestra/",
        },
      },
      {
        id: "mu6",
        name: "Percussion Club",
        desc: "Dedicated to promoting percussion music, the club provides diverse instrument experiences and performance opportunities. It regularly participates in club exhibitions and end-of-semester concerts.",
        image: "/clubs/mu6.jpg",
        links: {
          fb: "https://www.facebook.com/ccu.percussion/?locale=en",
          ig: "https://www.instagram.com/per.ccu.ssion/",
        },
      },
      {
        id: "mu7",
        name: "Hot Music Club",
        desc: "Focused on promoting rock music and band culture, the club regularly hosts live performances and end-of-semester showcases.",
        image: "/clubs/mu7.jpg",
        links: {
          fb: "https://www.facebook.com/ccuhotmusicclub/?locale=en",
          ig: "https://www.instagram.com/ccuhmclub/",
        },
      },
      {
        id: "mu8",
        name: "Piano Club",
        desc: "A music club for students and faculty who enjoy piano performance and musical exchange, offering a space to share and develop piano skills.",
        image: "/clubs/mu8.jpg",
        links: {
          fb: "https://www.facebook.com/ccupiano/?locale=en",
          ig: "https://www.instagram.com/ccupiano/",
        },
      },
      {
        id: "mu9",
        name: "CCU JAZZ CLUB",
        desc: "A music club for those who love improvisation and swing rhythms. The club also provides access to professional instruction and ensemble practice.",
        image: "/clubs/mu9.jpg",
        links: {
          fb: "https://www.facebook.com/ccujazzclub/?locale=en",
          ig: "https://www.instagram.com/ccujazz_1798/",
        },
      },
      {
        id: "mu10",
        name: "CCU Wuyueh A Capella Club",
        desc: "Dedicated to pure vocal performance without instrumental accompaniment. Members create rich harmonies through voice parts and vocal imitation, showcasing the expressive power of human voices.",
        image: "/clubs/mu10.png",
        links: {
          fb: "https://www.facebook.com/p/%E4%B8%AD%E6%AD%A3%E7%84%A1%E6%A8%82%E9%98%BF%E5%8D%A1%E8%B2%9D%E6%8B%89%E7%A4%BE-100063574886026/?locale=zh_TW",
          ig: "https://www.instagram.com/wuyueh827/",
        },
      },
    ],
  },
];
