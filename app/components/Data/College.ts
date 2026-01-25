// 定義資料的形狀 (Interface)，這樣 TS 才會幫你檢查
export interface Department {
  name: string;
  url: string;
}

export interface College {
  id: string;
  name: string;
  description: string;
  departments: Department[];
}

const HUMANITIES_DESC = `Established in 1991, the College of Humanities offers comprehensive undergraduate and graduate education through four departments: Chinese Literature, Foreign Languages and Literature, History, and Philosophy, along with two graduate institutes in Linguistics and Taiwanese Literature. All four departments provide Bachelor’s, Master’s, and Ph.D. programs, forming a total of seven graduate programs that emphasize language, literature, history, philosophy, and cultural studies.

The core curriculum of the College of Humanities is designed around three main objectives: developing students’ proficiency in Chinese, English, and other foreign languages; cultivating independent, analytical, and systematic thinking; and fostering an understanding of diversity, human complexity, and cultural expression across historical contexts. Through these goals, students learn to draw insight from human experiences and develop a broader perspective on the world. Combined with the core curriculum of the College of Sciences, the program supports a well-rounded general education beyond purely technical knowledge.

Literature and history courses emphasize human expression, cultural development, and critical interpretation across Eastern and Western traditions. Philosophy courses strengthen logical and analytical reasoning, supporting deeper engagement with language, literature, and history. Overall, the College of Humanities equips students with intellectual skills, cultural awareness, and ethical judgment necessary to adapt to a rapidly changing, interconnected global society in the 21st century.`;

const SCIENCE_DESC = `Established in August 1991, the College of Science at National Chung Cheng University offers comprehensive education in the natural sciences through five departments: Mathematics, Physics, Chemistry and Biochemistry, Earth and Environmental Sciences, and Life Science. These departments provide full Bachelor’s, Master’s, and Ph.D. degree programs. In addition, the College oversees several graduate institutes, including six that offer both Master’s and Ph.D. programs and three that offer Master’s-only programs, covering fields such as applied mathematics, seismology, molecular biology, and medical sciences.

The College also manages the Center for the Management of Special Instruments, which supports advanced scientific research by providing state-of-the-art analytical equipment and technical expertise to both the university and the broader scientific community. At its founding, the College focused on establishing strong foundations in mathematics and natural sciences to ensure global competitiveness. Special emphasis was placed on earth sciences to address Taiwan’s seismic environment, leading to recognized excellence in this field.

Building on these foundations, the College is now expanding interdisciplinary research, particularly in biological sciences related to materials and medicine. With approximately 95 full-time faculty members, the College emphasizes the integration of theory and experimentation and encourages undergraduate participation in independent research, preparing students to meet the challenges of rapidly evolving scientific technology and society.`;

const LAW_DESC = `The College of Law was established as the sixth college of CCU in October, 1998. It’ s primary goals to serve as a model of legal education as well as to promote legal knowledge in southern Taiwan. The College consists of two departments: the Department of General Law and the Department of Financial and Economic Law. The former comprises of the Legal Science Division and Legal Administration Division, including graduate programs (Master’s and PhD degrees) and a graduate certificate of law program; the latter comprises of graduate programs toward a master’s degree. The College has 32 full-time faculty members : 13 professors, 7 associate professors and 12 assistant professors, each with a doctoral degree in specialized fields such as constitutional laws, administrative laws, civil laws, criminal laws, financial & economic laws, social laws, international laws, etc. 867 students are currently studying in the College - with 571 in the Department of General Law and the rest in the Department of Financial and Economic Law.

In order to keep pace with the national as well as international trends, the College takes the following steps : maintaining traditional legal studies, developing multiple departments / institutions, integrating law and other academic fields, promoting international academic intercourse and cooperation, strengthening students’ foreign language capacity. In addition, the College is engaged in cultivating legal experts in the field of financial & economic laws, technology laws, social security laws and other special fields to meet the needs of the academia, government as well as an industrialized society.`;

const ENGINEERING_DESC = `Established in 1989, the College of Engineering offers comprehensive education and research through five departments—Computer Science and Information Engineering, Electrical Engineering, Mechanical Engineering, Chemical Engineering, and Communications Engineering—along with the Institute of Opto-Mechatronics. As of the 2012 academic year, the College included over 100 faculty members holding Ph.D. degrees and enrolled more than 2,500 students across Bachelor’s, Master’s, and Doctoral programs.

Faculty members are highly active in research and have gained significant recognition both domestically and internationally. Their achievements include publications in leading journals, conference proceedings, patents, and numerous prestigious awards, such as National Science Council research honors and fellowships in international engineering societies including IEEE and IEE. These accomplishments reflect the College’s strong research culture and global academic engagement.

Over more than two decades, the College of Engineering has built a solid foundation to address the technological challenges of the 21st century. With a broad curriculum, advanced laboratory facilities, and a supportive academic environment, the College aims to attract outstanding faculty and talented students. Emphasizing innovation, interdisciplinary collaboration, and strong team spirit, the College is well positioned to become a leading center for research and education in key technology areas such as precision machinery, telecommunications, and biotechnology. Undergraduate students are encouraged to participate in independent research, integrating theoretical knowledge with experimental practice to prepare for rapidly evolving scientific and industrial fields.`;

const SOCIAL_SCIENCES_DESC = `Founded in 1991, the College of Social Sciences comprises five departments—Social Welfare, Psychology, Labor Relations, Political Science, and Communications—along with the Graduate Institute of Strategic and International Affairs Studies. All departments offer undergraduate and master’s programs, while the Departments of Social Welfare, Psychology, and Political Science also provide Ph.D. programs. In addition, the Department of Psychology includes a Graduate Institute of Clinical Psychology offering master’s degrees. As of the 2012 academic year, the College enrolled over 1,400 students across bachelor’s, master’s, and doctoral programs.

Despite its relatively young history, the College has gained national recognition, with several departments ranked among the top tier in Taiwan. It continues to strengthen its teaching quality and research environment. The curriculum covers a broad range of social science disciplines, including social welfare, cognitive and clinical psychology, political theory and public policy, labor relations and human resource management, and modern communications and media regulation. While diverse in content, all programs emphasize creative thinking, rigorous reasoning, and strong methodological training.

With 78 full-time faculty members, the College is committed to excellence in teaching and research. Faculty achievements include prestigious national research and teaching awards, reflecting the College’s dedication to cultivating scientifically grounded, socially responsible, and globally aware graduates.`;

const MANAGEMENT_DESC = `The College of Management is one of the five original Colleges established by National Chung Cheng University. When it was established in 1989, the College consisted of only three graduate institutes, namely the Graduate Institute of International Economics, the Graduate Institute of Finance, and the Graduate Institute of Business Administration.

Today there are five departments within the College of Management - Department of Economics, Department of Finance, Department of Business Administration, Department of Accounting, and Department of Information Management-each with distinguished professors and experienced scholars. All the departments have comprehensive academic programs, ranging from BA, MBA, PhD to EMBA. Presently there are nine MBA programs, five Ph.D. programs, and five research centers.

As the University in general and the College in particular are aiming to become a top-tier international institution, cooperation with foreign universities has been an important endeavor. We have now entered into faculty and student exchange agreements with several well-known universities. These agreements offer our faculty and students additional exposure to the outside world and help broaden their perspectives, while at the same time enhancing the College’s international profile.`;

const EDUCATION_DESC = `Established in August, 1999 by the Ministry of Education, the College of Education was the first of its kind in a comprehensive universty in Taiwan. It is currently composed of seven academic units: the Department of Adult and Continuing Education (Undergraduate, Master, and Ph.D. programs), Graduate Institute of Elder Education (Master), Department of Criminology (Undergraduate, Master, and Ph.D. programs), Graduate Institute of Education (Master and Ph.D. programs), Center for Teacher education (Pre-service training program for primary and secondary school teachers), Graduate Institute of Curriculum Research, and Graduate Institute of Sport and Leisure Education (with the newly established Undergraduate program of the Department of Athletic Sports).

This college has existed For more than ten year, all faculty members have engaged in various researches in the fields of educational theories and practices, teaching, and popularization services. The College provides excellent proficiency, and now claims leadership in the realm of domestic education studies. Moreover, the College is the most important unit of educational research in both Central and Southern Taiwan.`;

const OTHERS_DESC = `This section introduces academic units at National Chung Cheng University that support students beyond traditional college and department structures. These units play an important role in helping international students adapt to the academic environment, strengthen essential skills, and explore flexible learning opportunities during their studies at CCU.

The Center for General Education is responsible for university-wide general education courses that emphasize critical thinking, interdisciplinary learning, and an understanding of social, cultural, and global issues. These courses are designed to help students build a solid academic foundation regardless of their major. The Center for Language Studies provides language-related courses and learning resources, including English and other foreign languages, to support students’ academic studies and daily communication in an international context. The Bachelor Program in Interdisciplinary Studies offers a flexible degree program that allows students to integrate knowledge from multiple disciplines and design a personalized study plan that aligns with their academic interests and future goals.

Together, these units offer international students additional academic support, language development opportunities, and flexible learning pathways, helping them better navigate and enrich their study experience at CCU.`;

// 匯出主資料陣列
export const ACADEMIC_UNITS: College[] = [
  {
    id: "humanities",
    name: "College of Humanities",
    description: HUMANITIES_DESC, // 引用上面的變數
    departments: [
      {
        name: "Department and Institute of Chinese Literature",
        url: "https://litera.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department and Institute of Foreign Languages and Literature",
        url: "https://fllcccu.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department and Institute of History",
        url: "https://depthis.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department and Institute of Philosophy",
        url: "https://deptphi.ccu.edu.tw/p/403-1062-1776.php",
      },
      {
        name: "Institute of Linguistics",
        url: "https://linguist.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Institute of Taiwanese Literature",
        url: "https://gitlci.ccu.edu.tw/?Lang=en",
      },
    ],
  },
  {
    id: "science",
    name: "College of Science",
    description: SCIENCE_DESC,
    departments: [
      {
        name: "Department of Mathematics",
        url: "https://math.ccu.edu.tw//?Lang=en",
      },
      {
        name: "Department of Earth and Environmental Sciences",
        url: "https://eq.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Physics",
        url: "https://physics.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Chemistry and Biochemistry",
        url: "https://deptche.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Biomedical Sciences",
        url: "https://admbio.ccu.edu.tw/?Lang=en",
      },
    ],
  },
  {
    id: "law",
    name: "College of Law",
    description: LAW_DESC,
    departments: [
      {
        name: "Department of General Law",
        url: "https://deptlaw.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Financial and Economic Law",
        url: "https://deptflaw.ccu.edu.tw/index.php?temp=intro&lang=en",
      },
    ],
  },
  {
    id: "engineering",
    name: "College of Engineering",
    description: ENGINEERING_DESC,
    departments: [
      {
        name: "Department of Computer Science and Information Engineering",
        url: "https://cs.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Electrical Engineering",
        url: "https://ee.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Mechanical Engineering",
        url: "https://deptime.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Chemical Engineering",
        url: "https://che.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Graduate Institute of Communicational Engineering",
        url: "https://comm.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Master of Science in Advanced Manufacturing Systems",
        url: "https://aimhi.ccu.edu.tw/index.php?Lang=en",
      },
      {
        name: "International Bachelor Degree Program in Mechanical Engineering",
        url: "https://ibpme.ccu.edu.tw/",
      },
    ],
  },
  {
    id: "social sciences",
    name: "College of Social Sciences",
    description: SOCIAL_SCIENCES_DESC,
    departments: [
      {
        name: "Department of Social Welfare",
        url: "https://math.ccu.edu.tw//?Lang=en",
      },
      {
        name: "Department of Psychology",
        url: "https://eq.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Labor Relations",
        url: "https://physics.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department and Graduate Institute of Political Science",
        url: "https://deptche.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Communication",
        url: "https://admbio.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Graduate Institute of Strategic and International Affairs",
        url: "https://isia.ccu.edu.tw/?Lang=en",
      },
    ],
  },
  {
    id: "management",
    name: "College of Management",
    description: MANAGEMENT_DESC,
    departments: [
      {
        name: "Department of Economics",
        url: "https://econ.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Finance",
        url: "https://fin.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Business Administration",
        url: "https://ba.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Accounting and Information Technology",
        url: "https://acct.ccu.edu.tw/?Lang=en",
      },
      {
        name: "International Master Program in Global Finance",
        url: "https://imgf.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Information Management",
        url: "https://mis.ccu.edu.tw/?Lang=en",
      },
    ],
  },

  {
    id: "education",
    name: "College of Education",
    description: EDUCATION_DESC,
    departments: [
      {
        name: "Department of Adult and Continuing Education",
        url: "https://dace.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Graduate Institute of Education",
        url: "https://gie.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department and Graduate Institute of Criminology",
        url: "https://criminology.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Center for Teacher Education",
        url: "https://cte.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Department of Athletic Sports",
        url: "https://das.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Master in Educational Leadership and Management Development",
        url: "https://elmd.ccu.edu.tw/?Lang=en",
      },
    ],
  },
  {
    id: "others",
    name: "others",
    description: OTHERS_DESC,
    departments: [
      {
        name: "Center for General Education",
        url: "https://deptcge.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Center for Language Studies",
        url: "https://cls.ccu.edu.tw/?Lang=en",
      },
      {
        name: "Bachelor Program in Interdisciplinary Studies",
        url: "https://deptids.ccu.edu.tw/?Lang=en",
      },
    ],
  },
];
