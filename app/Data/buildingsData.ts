// export interface Building {
//   id: string;
//   name: string;
//   nameZh: string;
//   category: 'academic' | 'administration' | 'facility';
//   importance: 'high' | 'medium' | 'low';
//   position: { x: number; y: number };
//   size: { width: number; height: number };
// }

// export const buildings: Building[] = [
//   // 從 SVG 分析得出的座標（我會逐一對照紅線）
//   {
//     id: 'engineering-1-2',
//     name: 'College of Engineering I & II',
//     nameZh: '工學院一館 & 二館',
//     category: 'academic',
//     importance: 'medium',
//     position: { x: 442, y: 213 },
//     size: { width: 80, height: 28 }
//   },
//   {
//     id: 'science-1',
//     name: 'College of Science I',
//     nameZh: '理學院一館',
//     category: 'academic',
//     importance: 'medium',
//     position: { x: 544, y: 227 },
//     size: { width: 45, height: 54 }
//   },
//   {
//     id: 'education',
//     name: 'College of Education',
//     nameZh: '教育學院',
//     category: 'academic',
//     importance: 'medium',
//     position: { x: 597, y: 227 },
//     size: { width: 22, height: 27 }
//   },
//   {
//     id: 'management',
//     name: 'College of Management',
//     nameZh: '管理學院',
//     category: 'academic',
//     importance: 'medium',
//     position: { x: 442, y: 365 },
//     size: { width: 42, height: 27 }
//   },
//   {
//     id: 'auditorium',
//     name: 'Auditorium',
//     nameZh: '大禮堂',
//     category: 'facility',
//     importance: 'medium',
//     position: { x: 442, y: 303 },
//     size: { width: 42, height: 21 }
//   },
//   {
//     id: 'innovation',
//     name: 'Innovation Building',
//     nameZh: '創新大樓',
//     category: 'facility',
//     importance: 'medium',
//     position: { x: 497, y: 200 },
//     size: { width: 45, height: 20 }
//   },
//   {
//     id: 'library',
//     name: 'Library and Information Building',
//     nameZh: '圖書與資訊館',
//     category: 'facility',
//     importance: 'high',
//     position: { x: 252, y: 212 },
//     size: { width: 44, height: 27 }
//   },
//   {
//     id: 'administration',
//     name: 'Administration Building',
//     nameZh: '行政大樓',
//     category: 'administration',
//     importance: 'high',
//     position: { x: 355, y: 272 },
//     size: { width: 45, height: 37 }
//   },
//   {
//     id: 'common-classroom',
//     name: 'Common Classroom Building',
//     nameZh: '共同教室大樓',
//     category: 'facility',
//     importance: 'medium',
//     position: { x: 266, y: 190 },
//     size: { width: 30, height: 50 }
//   },
//   {
//     id: 'humanities',
//     name: 'College of Humanities',
//     nameZh: '人文學院',
//     category: 'academic',
//     importance: 'medium',
//     position: { x: 374, y: 347 },
//     size: { width: 22, height: 46 }
//   },
//   {
//     id: 'social-sciences-1',
//     name: 'College of Social Sciences I',
//     nameZh: '社會科學學院一館',
//     category: 'academic',
//     importance: 'medium',
//     position: { x: 480, y: 267 },
//     size: { width: 37, height: 32 }
//   },
//   {
//     id: 'law-social-2',
//     name: 'College of Law / Social Sciences II',
//     nameZh: '法學院 / 社會科學學院二館',
//     category: 'academic',
//     importance: 'medium',
//     position: { x: 570, y: 200 },
//     size: { width: 32, height: 54 }
//   },
//   {
//     id: 'international-affairs',
//     name: 'Office of International Affairs',
//     nameZh: '國際事務處',
//     category: 'administration',
//     importance: 'low',
//     position: { x: 331, y: 186 },
//     size: { width: 25, height: 23 }
//   }
// ];

export interface Building {
  id: string;
  name: string;
  category: 'academic' | 'administration' | 'facility';
  importance: 'high' | 'medium' | 'low';
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export const buildings: Building[] = [
  {
    id: 'engineering-1',
    name: 'College of Engineering I',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 }, // 你自己填
    size: { width: 0, height: 0 } // 你自己填
  },
  {
    id: 'engineering-2',
    name: 'College of Engineering II',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'science-1',
    name: 'College of Science I',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'science-2',
    name: 'College of Science II',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'education',
    name: 'College of Education',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'management',
    name: 'College of Management',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    category: 'facility',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'innovation',
    name: 'Innovation Building',
    category: 'facility',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'library',
    name: 'Library and Information Building',
    category: 'facility',
    importance: 'high',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'administration',
    name: 'Administration Building',
    category: 'administration',
    importance: 'high',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'common-classroom',
    name: 'Common Classroom Building',
    category: 'facility',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'humanities',
    name: 'College of Humanities',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'social-sciences-1',
    name: 'College of Social Sciences I',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'law',
    name: 'College of Law',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'social-sciences-2',
    name: 'College of Social Sciences II',
    category: 'academic',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'gymnasium',
    name: 'Gymnasium',
    category: 'facility',
    importance: 'medium',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  },
  {
    id: 'international-affairs',
    name: 'Office of International Affairs',
    category: 'administration',
    importance: 'low',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  }
];