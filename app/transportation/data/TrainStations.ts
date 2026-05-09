// // 這裡包含了台鐵所有營運中的車站，依照縣市分類
// export const TAIWAN_STATIONS: Record<string, string[]> = {
//   "Keelung City": ["Keelung", "Sankeng", "Badu", "Qidu", "Baifu", "Nuanuan"],
//   "New Taipei City": ["Wudu", "Xizhi", "Xike", "Banqiao", "Fuzhou", "Shulin", "South Shulin", "Shanjia", "Yingge", "Ruifang", "Houtong", "Sandiaoling", "Dahua", "Shifen", "Wanggu", "Lingjiao", "Pingxi", "Jingtong", "Fulong", "Gongliao", "Shuangxi", "Mudan"],
//   "Taipei City": ["Nangang", "Songshan", "Taipei", "Wanhua"],
//   "Taoyuan City": ["Taoyuan", "Neili", "Zhongli", "Puxin", "Yangmei", "Fugang", "Xinpu"],
//   "Hsinchu County": ["Beihu", "Hukou", "Xinfeng", "Zhubei", "Zhuzhong", "Liujia", "Shangyuan", "Zhudong", "Hengshan", "Jiuzantou", "Hexing", "Fugui", "Neiwan"],
//   "Hsinchu City": ["Sanxingqiao", "Hsinchu", "North Hsinchu", "Qianjia", "Xinzhuang"],
//   "Miaoli County": ["Zhunan", "Tanwen", "Dashan", "Houlong", "Longgang", "Baishatun", "Xinpu", "Tongxiao", "Yuanli", "Zaoqiao", "Fengfu", "Miaoli", "Nanshi", "Tongluo", "Sanyi"],
//   "Taichung City": ["Tai'an", "Houli", "Fengyuan", "Lizilin", "Tanzi", "Toujiacuo", "Songzhu", "Taiyuan", "Jingwu", "Taichung", "Wuquan", "Daqing", "Xinwuri", "Chenggong", "Rinan", "Dajia", "Taichung Port", "Qingshui", "Shalu", "Longjing", "Dadu", "Zhuifen"],
//   "Changhua County": ["Changhua", "Huatan", "Dacun", "Yuanlin", "Yongjing", "Shetou", "Tianzhong", "Ershui", "Yuanquan"],
//   "Nantou County": ["Yuanquan", "Zhuoshui", "Longquan", "Jiji", "Shuili", "Checheng"],
//   "Yunlin County": ["Linnei", "Shiliu", "Douliu", "Dounan", "Shigui"],
//   "Chiayi County": ["Dalin", "Minxiong", "Shuishang", "Nanjing"],
//   "Chiayi City": ["Jiabei", "Chiayi"],
//   "Tainan City": ["Houbi", "Xinying", "Liuying", "Linfengying", "Longtian", "Baelin", "Shanhua", "Nanke", "Xinshi", "Yongkang", "Daqiao", "Tainan", "Linsen", "South Tainan", "Bao'an", "Rende", "Zhongzhou", "Chang Jung Christian Univ.", "Shalun"],
//   "Kaohsiung City": ["Dahu", "Luzhu", "Gangshan", "Qiaotou", "Nanzi", "Xinzuoying", "Zuoying", "Neiwei", "Museum of Fine Arts", "Gushan", "Sankuaicuo", "Kaohsiung", "Minzu", "Science and Technology Museum", "Zhengyi", "Fengshan", "Houzhuang", "Jiuqutang"],
//   "Pingtung County": ["Liukuaicuo", "Pingtung", "Guilai", "Linluo", "Xishi", "Zhutian", "Chaozhou", "Kanding", "Nanzhou", "Zhen'an", "Linbian", "Jiadong", "Donghai", "Fangliao", "Jialu", "Neishi", "Fangshan"],
//   "Taitung County": ["Dawu", "Longxi", "Jinlun", "Taimali", "Zhiben", "Kangle", "Taitung", "Shanli", "Luye", "Ruiban", "Ruihe", "Guanshan", "Haiduan", "Chishang"],
//   "Hualien County": ["Fuli", "Dongzhu", "Dongli", "Yuli", "Sanmin", "Ruiyuan", "Ruisui", "Fuyuan", "Dafufu", "Guangfu", "Wanrong", "Fenglin", "Nanping", "Linrong Shin Kong", "Fengtian", "Shoufeng", "Pinghe", "Zhixue", "Ji'an", "Hualien", "Beipu", "Xincheng", "Chongde", "Herren", "Heping"],
//   "Yilan County": ["Hanben", "Wuta", "Nan'ao", "Dong'ao", "Yongle", "Su'ao", "Su'ao Xin", "Xinma", "Dongshan", "Luodong", "Zhongli", "Erjie", "Yilan", "Sicheng", "Jiaoxi", "Dingpu", "Toucheng", "Wai'ao", "Guishan", "Daxi", "Dali", "Shicheng"]
// };

// app/transportation/data/TrainStations.ts

export const TAIWAN_STATIONS: Record<string, string[]> = {
  "Keelung City": ["Keelung", "Sankeng", "Badu", "Qidu", "Baifu", "Nuanuan"],
  "New Taipei City": ["Wudu", "Xizhi", "Xike", "Banqiao", "Fuzhou", "Shulin", "South Shulin", "Shanjia", "Yingge", "Ruifang", "Houtong", "Sandiaoling", "Dahua", "Shifen", "Wanggu", "Lingjiao", "Pingxi", "Jingtong", "Fulong", "Gongliao", "Shuangxi", "Mudan"],
  "Taipei City": ["Nangang", "Songshan", "Taipei", "Wanhua"],
  "Taoyuan City": ["Taoyuan", "Neili", "Zhongli", "Puxin", "Yangmei", "Fugang", "Xinfu"], // 💡 修正：把桃園的 Xinpu 改為正確拼音 Xinfu
  "Hsinchu County": ["Beihu", "Hukou", "Xinfeng", "Zhubei", "Zhuzhong", "Liujia", "Shangyuan", "Zhudong", "Hengshan", "Jiuzantou", "Hexing", "Fugui", "Neiwan"],
  "Hsinchu City": ["Sanxingqiao", "Hsinchu", "North Hsinchu", "Qianjia", "Xinzhuang"],
  "Miaoli County": ["Zhunan", "Tanwen", "Dashan", "Houlong", "Longgang", "Baishatun", "Xinpu", "Tongxiao", "Yuanli", "Zaoqiao", "Fengfu", "Miaoli", "Nanshi", "Tongluo", "Sanyi"],
  "Taichung City": ["Tai'an", "Houli", "Fengyuan", "Lizilin", "Tanzi", "Toujiacuo", "Songzhu", "Taiyuan", "Jingwu", "Taichung", "Wuquan", "Daqing", "Xinwuri", "Chenggong", "Rinan", "Dajia", "Taichung Port", "Qingshui", "Shalu", "Longjing", "Dadu", "Zhuifen"],
  "Changhua County": ["Changhua", "Huatan", "Dacun", "Yuanlin", "Yongjing", "Shetou", "Tianzhong", "Ershui", "Yuanquan"],
  "Nantou County": ["Yuanquan", "Zhuoshui", "Longquan", "Jiji", "Shuili", "Checheng"],
  "Yunlin County": ["Linnei", "Shiliu", "Douliu", "Dounan", "Shigui"],
  "Chiayi County": ["Dalin", "Minxiong", "Shuishang", "Nanjing"],
  "Chiayi City": ["Jiabei", "Chiayi"],
  "Tainan City": ["Houbi", "Xinying", "Liuying", "Linfengying", "Longtian", "Baelin", "Shanhua", "Nanke", "Xinshi", "Yongkang", "Daqiao", "Tainan", "Linsen", "South Tainan", "Bao'an", "Rende", "Zhongzhou", "Chang Jung Christian Univ.", "Shalun"],
  "Kaohsiung City": ["Dahu", "Luzhu", "Gangshan", "Qiaotou", "Nanzi", "Xinzuoying", "Zuoying", "Neiwei", "Museum of Fine Arts", "Gushan", "Sankuaicuo", "Kaohsiung", "Minzu", "Science and Technology Museum", "Zhengyi", "Fengshan", "Houzhuang", "Jiuqutang"],
  "Pingtung County": ["Liukuaicuo", "Pingtung", "Guilai", "Linluo", "Xishi", "Zhutian", "Chaozhou", "Kanding", "Nanzhou", "Zhen'an", "Linbian", "Jiadong", "Donghai", "Fangliao", "Jialu", "Neishi", "Fangshan"],
  "Taitung County": ["Dawu", "Longxi", "Jinlun", "Taimali", "Zhiben", "Kangle", "Taitung", "Shanli", "Luye", "Ruiban", "Ruihe", "Guanshan", "Haiduan", "Chishang"],
  "Hualien County": ["Fuli", "Dongzhu", "Dongli", "Yuli", "Sanmin", "Ruiyuan", "Ruisui", "Fuyuan", "Dafufu", "Guangfu", "Wanrong", "Fenglin", "Nanping", "Linrong Shin Kong", "Fengtian", "Shoufeng", "Pinghe", "Zhixue", "Ji'an", "Hualien", "Beipu", "Xincheng", "Chongde", "Herren", "Heping"],
  "Yilan County": ["Hanben", "Wuta", "Nan'ao", "Dong'ao", "Yongle", "Su'ao", "Su'ao Xin", "Xinma", "Dongshan", "Luodong", "Zhongli (Yilan)", "Erjie", "Yilan", "Sicheng", "Jiaoxi", "Dingpu", "Toucheng", "Wai'ao", "Guishan", "Daxi", "Dali", "Shicheng"] // 💡 修正：把宜蘭的中里改為 Zhongli (Yilan)
};

// 🌟 給 API 專用的中英文對照表 (完整版)
export const STATION_MAP: Record<string, string> = {
  // 基隆市
  "Keelung": "基隆", "Sankeng": "三坑", "Badu": "八堵", "Qidu": "七堵", "Baifu": "百福", "Nuanuan": "暖暖",
  // 新北市
  "Wudu": "五堵", "Xizhi": "汐止", "Xike": "汐科", "Banqiao": "板橋", "Fuzhou": "浮洲", "Shulin": "樹林", "South Shulin": "南樹林", "Shanjia": "山佳", "Yingge": "鶯歌", "Ruifang": "瑞芳", "Houtong": "猴硐", "Sandiaoling": "三貂嶺", "Dahua": "大華", "Shifen": "十分", "Wanggu": "望古", "Lingjiao": "嶺腳", "Pingxi": "平溪", "Jingtong": "菁桐", "Fulong": "福隆", "Gongliao": "貢寮", "Shuangxi": "雙溪", "Mudan": "牡丹",
  // 臺北市
  "Nangang": "南港", "Songshan": "松山", "Taipei": "台北", "Wanhua": "萬華",
  // 桃園市
  "Taoyuan": "桃園", "Neili": "內壢", "Zhongli": "中壢", "Puxin": "埔心", "Yangmei": "楊梅", "Fugang": "富岡", "Xinfu": "新富",
  // 新竹縣市
  "Beihu": "北湖", "Hukou": "湖口", "Xinfeng": "新豐", "Zhubei": "竹北", "Zhuzhong": "竹中", "Liujia": "六家", "Shangyuan": "上員", "Zhudong": "竹東", "Hengshan": "橫山", "Jiuzantou": "九讚頭", "Hexing": "合興", "Fugui": "富貴", "Neiwan": "內灣",
  "Sanxingqiao": "三姓橋", "Hsinchu": "新竹", "North Hsinchu": "北新竹", "Qianjia": "千甲", "Xinzhuang": "新莊",
  // 苗栗縣
  "Zhunan": "竹南", "Tanwen": "談文", "Dashan": "大山", "Houlong": "後龍", "Longgang": "龍港", "Baishatun": "白沙屯", "Xinpu": "新埔", "Tongxiao": "通霄", "Yuanli": "苑裡", "Zaoqiao": "造橋", "Fengfu": "豐富", "Miaoli": "苗栗", "Nanshi": "南勢", "Tongluo": "銅鑼", "Sanyi": "三義",
  // 臺中市
  "Tai'an": "泰安", "Houli": "后里", "Fengyuan": "豐原", "Lizilin": "栗林", "Tanzi": "潭子", "Toujiacuo": "頭家厝", "Songzhu": "松竹", "Taiyuan": "太原", "Jingwu": "精武", "Taichung": "臺中", "Wuquan": "五權", "Daqing": "大慶", "Xinwuri": "新烏日", "Chenggong": "成功", "Rinan": "日南", "Dajia": "大甲", "Taichung Port": "臺中港", "Qingshui": "清水", "Shalu": "沙鹿", "Longjing": "龍井", "Dadu": "大肚", "Zhuifen": "追分",
  // 彰化縣 & 南投縣
  "Changhua": "彰化", "Huatan": "花壇", "Dacun": "大村", "Yuanlin": "員林", "Yongjing": "永靖", "Shetou": "社頭", "Tianzhong": "田中", "Ershui": "二水", "Yuanquan": "源泉",
  "Zhuoshui": "濁水", "Longquan": "龍泉", "Jiji": "集集", "Shuili": "水里", "Checheng": "車埕",
  // 雲林縣 & 嘉義縣市
  "Linnei": "林內", "Shiliu": "石榴", "Douliu": "斗六", "Dounan": "斗南", "Shigui": "石龜",
  "Dalin": "大林", "Minxiong": "民雄", "Shuishang": "水上", "Nanjing": "南靖",
  "Jiabei": "嘉北", "Chiayi": "嘉義",
  // 臺南市
  "Houbi": "後壁", "Xinying": "新營", "Liuying": "柳營", "Linfengying": "林鳳營", "Longtian": "隆田", "Baelin": "拔林", "Shanhua": "善化", "Nanke": "南科", "Xinshi": "新市", "Yongkang": "永康", "Daqiao": "大橋", "Tainan": "臺南", "Linsen": "林森", "South Tainan": "南臺南", "Bao'an": "保安", "Rende": "仁德", "Zhongzhou": "中洲", "Chang Jung Christian Univ.": "長榮大學", "Shalun": "沙崙",
  // 高雄市
  "Dahu": "大湖", "Luzhu": "路竹", "Gangshan": "岡山", "Qiaotou": "橋頭", "Nanzi": "楠梓", "Xinzuoying": "新左營", "Zuoying": "左營", "Neiwei": "內惟", "Museum of Fine Arts": "美術館", "Gushan": "鼓山", "Sankuaicuo": "三塊厝", "Kaohsiung": "高雄", "Minzu": "民族", "Science and Technology Museum": "科工館", "Zhengyi": "正義", "Fengshan": "鳳山", "Houzhuang": "後庄", "Jiuqutang": "九曲堂",
  // 屏東縣
  "Liukuaicuo": "六塊厝", "Pingtung": "屏東", "Guilai": "歸來", "Linluo": "麟洛", "Xishi": "西勢", "Zhutian": "竹田", "Chaozhou": "潮州", "Kanding": "崁頂", "Nanzhou": "南州", "Zhen'an": "鎮安", "Linbian": "林邊", "Jiadong": "佳冬", "Donghai": "東海", "Fangliao": "枋寮", "Jialu": "加祿", "Neishi": "內獅", "Fangshan": "枋山",
  // 臺東縣
  "Dawu": "大武", "Longxi": "瀧溪", "Jinlun": "金崙", "Taimali": "太麻里", "Zhiben": "知本", "Kangle": "康樂", "Taitung": "臺東", "Shanli": "山里", "Luye": "鹿野", "Ruiban": "瑞源", "Ruihe": "瑞和", "Guanshan": "關山", "Haiduan": "海端", "Chishang": "池上",
  // 花蓮縣
  "Fuli": "富里", "Dongzhu": "東竹", "Dongli": "東里", "Yuli": "玉里", "Sanmin": "三民", "Ruiyuan": "瑞源", "Ruisui": "瑞穗", "Fuyuan": "富源", "Dafufu": "大富", "Guangfu": "光復", "Wanrong": "萬榮", "Fenglin": "鳳林", "Nanping": "南平", "Linrong Shin Kong": "林榮新光", "Fengtian": "豐田", "Shoufeng": "壽豐", "Pinghe": "平和", "Zhixue": "志學", "Ji'an": "吉安", "Hualien": "花蓮", "Beipu": "北埔", "Xincheng": "新城", "Chongde": "崇德", "Herren": "和仁", "Heping": "和平",
  // 宜蘭縣
  "Hanben": "漢本", "Wuta": "武塔", "Nan'ao": "南澳", "Dong'ao": "東澳", "Yongle": "永樂", "Su'ao": "蘇澳", "Su'ao Xin": "蘇澳新", "Xinma": "新馬", "Dongshan": "冬山", "Luodong": "羅東", "Zhongli (Yilan)": "中里", "Erjie": "二結", "Yilan": "宜蘭", "Sicheng": "四城", "Jiaoxi": "礁溪", "Dingpu": "頂埔", "Toucheng": "頭城", "Wai'ao": "外澳", "Guishan": "龜山", "Daxi": "大溪", "Dali": "大里", "Shicheng": "石城"
};