// ========== 类型定义 ==========

export interface TravelDiary {
  id: string;
  date: string;        // "2025-05-01"
  content: string;     // diary text
  tags: string[];      // ["日落", "海边", "美食"]
  weather: string;     // "晴" | "多云" | "雨" | "雪"
  rating: number;      // 1-5
  images: string[];    // image URLs
}

export interface CityTravelData {
  id: string;
  name: string;
  coordinates: [number, number];
  date: string;           // visit date
  visited: boolean;
  diary: TravelDiary[];
  tags: string[];
  images: string[];       // image URLs
  weather: string;
  rating: number;
}

// ========== 云南 ==========

const yunnan: CityTravelData[] = [
  {
    id: "kunming",
    name: "昆明",
    coordinates: [102.7123, 25.0406],
    date: "2025-03-15",
    visited: true,
    tags: ["春城", "滇池", "鲜花", "民族风情"],
    images: [
      "https://picsum.photos/400/300?random=1",
      "https://picsum.photos/400/300?random=2",
    ],
    weather: "晴",
    rating: 4.5,
    diary: [
      {
        id: "kunming-d1",
        date: "2025-03-15",
        content: "抵达春城昆明，第一站就去了滇池。湖水碧蓝，成群的红嘴鸥在湖面上翱翔，远处西山睡美人静静卧在湖畔。午后漫步翠湖公园，满园春色，郁金香和樱花竞相开放。傍晚在市区吃了过桥米线和汽锅鸡，汤汁鲜美到让人想把碗都舔干净。",
        tags: ["滇池", "红嘴鸥", "过桥米线", "翠湖"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=3",
          "https://picsum.photos/400/300?random=4",
        ],
      },
      {
        id: "kunming-d2",
        date: "2025-03-16",
        content: "今天去了石林风景区，大自然的鬼斧神工令人叹为观止。千姿百态的石灰岩柱拔地而起，走在其中如同进入了一座石头迷宫。下午坐缆车上西山龙门，俯瞰整个昆明城和滇池，视野极佳。在山顶的寺庙里静坐片刻，感受到难得的宁静。",
        tags: ["石林", "西山", "喀斯特", "缆车"],
        weather: "多云",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=5",
          "https://picsum.photos/400/300?random=6",
        ],
      },
      {
        id: "kunming-d3",
        date: "2025-03-17",
        content: "最后一天去了云南民族村，一天之内逛了25个少数民族村寨，各民族的建筑、服饰、歌舞表演丰富多彩。中午吃了傣味手抓饭，酸辣开胃。下午买了些鲜花饼和普洱茶作为伴手礼，昆明的鲜花饼果然名不虚传，玫瑰味的最好吃。",
        tags: ["民族村", "手抓饭", "鲜花饼", "普洱茶"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=7",
          "https://picsum.photos/400/300?random=8",
        ],
      },
    ],
  },
  {
    id: "dali",
    name: "大理",
    coordinates: [100.2255, 25.5894],
    date: "2025-03-18",
    visited: true,
    tags: ["洱海", "古城", "苍山", "白族文化"],
    images: [
      "https://picsum.photos/400/300?random=9",
      "https://picsum.photos/400/300?random=10",
    ],
    weather: "多云",
    rating: 5,
    diary: [
      {
        id: "dali-d1",
        date: "2025-03-18",
        content: "骑行环洱海是来大理最正确的决定！租了一辆电动车，从古城出发沿着环海路一路向北。洱海的水蓝得不像话，阳光下波光粼粼，沿途经过喜洲古镇，白族民居的白墙青瓦在蓝天映衬下格外好看。在双廊古镇吃了酸辣鱼，新鲜捕捞的洱海鱼，肉质鲜嫩。",
        tags: ["洱海", "骑行", "喜洲", "双廊"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=11",
          "https://picsum.photos/400/300?random=12",
        ],
      },
      {
        id: "dali-d2",
        date: "2025-03-19",
        content: "清晨坐索道上苍山，山顶云雾缭绕如梦如幻。徒步玉带路，路边开满了高山杜鹃，空气中弥漫着松香和花香。下山后回到大理古城，在洋人街找了一家咖啡馆晒太阳发呆。晚上逛人民路的夜市，吃烤饵块和烤乳扇，白族特色小吃让人回味无穷。",
        tags: ["苍山", "索道", "古城", "夜市"],
        weather: "多云",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=13",
          "https://picsum.photos/400/300?random=14",
        ],
      },
      {
        id: "dali-d3",
        date: "2025-03-20",
        content: "去了崇圣寺三塔，千年古塔巍然屹立在苍山洱海之间。寺庙规模宏大，香火鼎盛。下午去了周城体验白族扎染，亲手染了一条靛蓝色的围巾，虽然是第一次尝试但效果意外地不错。晚上吃了白族三道茶，一苦二甜三回味，就像人生。",
        tags: ["三塔", "扎染", "白族三道茶", "崇圣寺"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=15",
          "https://picsum.photos/400/300?random=16",
        ],
      },
    ],
  },
  {
    id: "lijiang",
    name: "丽江",
    coordinates: [100.2330, 26.8721],
    date: "2025-03-21",
    visited: true,
    tags: ["古城", "玉龙雪山", "纳西文化", "束河"],
    images: [
      "https://picsum.photos/400/300?random=17",
      "https://picsum.photos/400/300?random=18",
    ],
    weather: "晴",
    rating: 4.5,
    diary: [
      {
        id: "lijiang-d1",
        date: "2025-03-21",
        content: "一到丽江就被古城的水系迷住了，清澈的玉河水穿城而过，每家门口都有小桥流水。石板路被岁月磨得光滑发亮，纳西族的东巴文字随处可见。晚上在四方街看篝火打跳，纳西老奶奶们手拉手跳舞，游客也纷纷加入，气氛非常欢乐。",
        tags: ["古城", "四方街", "纳西", "水系"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=19",
          "https://picsum.photos/400/300?random=20",
        ],
      },
      {
        id: "lijiang-d2",
        date: "2025-03-22",
        content: "凌晨四点起床去看玉龙雪山的日照金山。当第一缕阳光打在雪山顶峰时，金色的光芒瞬间照亮了整个山体，那一刻的震撼无法用语言形容。乘坐大索道到达海拔4506米的冰川公园，虽然有些高原反应，但眼前的冰川雪景让人觉得一切都值得。",
        tags: ["玉龙雪山", "日照金山", "冰川", "索道"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=21",
          "https://picsum.photos/400/300?random=22",
        ],
      },
      {
        id: "lijiang-d3",
        date: "2025-03-23",
        content: "上午去束河古镇，相比大研古城这里更加宁静古朴。在一家马帮主题的茶馆喝普洱茶，听老板讲茶马古道的故事。下午去了拉市海湿地公园，骑马穿行在草海之间，蓝天白云倒映在水中，像走进了画里。晚上纳西古乐表演让人感受到古老文化的魅力。",
        tags: ["束河", "茶马古道", "拉市海", "骑马"],
        weather: "多云",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=23",
          "https://picsum.photos/400/300?random=24",
        ],
      },
    ],
  },
  {
    id: "shangri-la",
    name: "香格里拉",
    coordinates: [99.7040, 27.8236],
    date: "2025-03-24",
    visited: true,
    tags: ["高原", "藏族文化", "雪山", "普达措"],
    images: [
      "https://picsum.photos/400/300?random=25",
      "https://picsum.photos/400/300?random=26",
    ],
    weather: "雪",
    rating: 4.5,
    diary: [
      {
        id: "shangri-la-d1",
        date: "2025-03-24",
        content: "抵达海拔3300米的香格里拉，一下车就感受到了高原的凛冽寒风。入住了一家藏式民宿，老板热情地献上哈达和酥油茶。傍晚登上独克宗古城的小山，转了三圈世界上最大的转经筒，金色经筒在夕阳下闪闪发光，心中默默许下愿望。",
        tags: ["独克宗", "转经筒", "酥油茶", "高原"],
        weather: "多云",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=27",
          "https://picsum.photos/400/300?random=28",
        ],
      },
      {
        id: "shangri-la-d2",
        date: "2025-03-25",
        content: "普达措国家公园美得让人窒息。属都湖如同一颗蓝宝石镶嵌在雪山草原之间，湖边的牧场上有牦牛悠闲吃草。虽然三月草还未全绿，但苍茫的高原风光自有其壮美之处。下午下起了小雪，雪花飘落在松枝上，整个世界变成了一幅水墨画。",
        tags: ["普达措", "属都湖", "牦牛", "雪景"],
        weather: "雪",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=29",
          "https://picsum.photos/400/300?random=30",
        ],
      },
      {
        id: "shangri-la-d3",
        date: "2025-03-26",
        content: "前往松赞林寺，被誉为小布达拉宫的噶丹·松赞林寺金碧辉煌地矗立在山坡上。跟随藏族信徒的脚步走在转经道上，每一步都感受到信仰的力量。下午在纳帕海草原上散步，成群的候鸟在湿地上觅食，远处的雪山成为最美的背景。晚上吃了藏香猪和青稞饼，喝了青稞酒。",
        tags: ["松赞林寺", "纳帕海", "候鸟", "藏餐"],
        weather: "晴",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=31",
          "https://picsum.photos/400/300?random=32",
        ],
      },
    ],
  },
];

// ========== 广东 ==========

const guangdong: CityTravelData[] = [
  {
    id: "shenzhen",
    name: "深圳",
    coordinates: [114.0579, 22.5431],
    date: "2025-01-10",
    visited: true,
    tags: ["现代都市", "海滨", "科技", "创新"],
    images: [
      "https://picsum.photos/400/300?random=33",
      "https://picsum.photos/400/300?random=34",
    ],
    weather: "晴",
    rating: 4.5,
    diary: [
      {
        id: "shenzhen-d1",
        date: "2025-01-10",
        content: "从深圳湾公园开始这次旅程，对岸香港的山峦清晰可见。沿着15公里的海滨栈道骑行，海风拂面，红树林里的白鹭时起时落。晚上去了欢乐海岸，水秀表演配合灯光音乐非常震撼，深圳的夜生活果然名不虚传。",
        tags: ["深圳湾", "骑行", "红树林", "欢乐海岸"],
        weather: "晴",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=35",
          "https://picsum.photos/400/300?random=36",
        ],
      },
      {
        id: "shenzhen-d2",
        date: "2025-01-11",
        content: "上午去了华侨城创意文化园，旧厂房改造成的艺术空间充满了设计感，逛了很多有趣的独立书店和画廊。下午登上平安金融中心的观光层，从116楼俯瞰整个深圳，城市的天际线延绵到天际。傍晚在蛇口海上世界吃海鲜，现捞现做的龙虾和石斑鱼，鲜美无比。",
        tags: ["创意园", "平安大厦", "蛇口", "海鲜"],
        weather: "多云",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=37",
          "https://picsum.photos/400/300?random=38",
        ],
      },
      {
        id: "shenzhen-d3",
        date: "2025-01-12",
        content: "最后一天去了大鹏半岛，较场尾的海滩虽不大但很舒服，沙滩边一排排五颜六色的民宿像调色盘一样。在杨梅坑沿着海岸线徒步，一侧是山一侧是海，风景绝佳。吃了一碗地道的深圳肠粉作为告别餐，薄如蝉翼的肠粉配上特制酱油，简单却无比满足。",
        tags: ["大鹏", "较场尾", "杨梅坑", "肠粉"],
        weather: "晴",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=39",
          "https://picsum.photos/400/300?random=40",
        ],
      },
    ],
  },
  {
    id: "guangzhou",
    name: "广州",
    coordinates: [113.2644, 23.1291],
    date: "2025-01-13",
    visited: true,
    tags: ["美食之都", "岭南文化", "珠江", "历史"],
    images: [
      "https://picsum.photos/400/300?random=41",
      "https://picsum.photos/400/300?random=42",
    ],
    weather: "多云",
    rating: 5,
    diary: [
      {
        id: "guangzhou-d1",
        date: "2025-01-13",
        content: "广州的第一站必须是喝早茶！去了泮溪酒家，虾饺、烧卖、凤爪、肠粉、流沙包……摆了满满一桌。每一道点心都精致得像是艺术品，虾饺的皮晶莹剔透，里面的虾仁饱满弹牙。喝完早茶逛陈家祠，精美的灰塑、木雕、石雕令人叹为观止，岭南建筑的精华都在这里了。",
        tags: ["早茶", "虾饺", "陈家祠", "岭南建筑"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=43",
          "https://picsum.photos/400/300?random=44",
        ],
      },
      {
        id: "guangzhou-d2",
        date: "2025-01-14",
        content: "白天去了沙面岛，欧陆风格的建筑群让人仿佛穿越到了19世纪的欧洲。高大的榕树垂下气根，阳光透过树叶洒在石板路上。傍晚登上广州塔小蛮腰，在450米高的摩天轮上看日落，珠江如一条金色丝带穿过城市。夜游珠江，两岸灯火辉煌，广州的夜景比白天还要迷人。",
        tags: ["沙面", "广州塔", "珠江夜游", "日落"],
        weather: "多云",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=45",
          "https://picsum.photos/400/300?random=46",
        ],
      },
      {
        id: "guangzhou-d3",
        date: "2025-01-15",
        content: "最后一天去了白云山，爬到山顶广场俯瞰广州全貌。下山后在北京路步行街逛吃，牛杂、双皮奶、云吞面、萝卜牛腩……一路吃下来感觉肚子要爆炸了。还去了石室圣心大教堂，全花岗岩建造的哥特式教堂在闹市中显得格外庄严，据说花了25年才建成。",
        tags: ["白云山", "北京路", "牛杂", "圣心大教堂"],
        weather: "晴",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=47",
          "https://picsum.photos/400/300?random=48",
        ],
      },
    ],
  },
  {
    id: "zhuhai",
    name: "珠海",
    coordinates: [113.5767, 22.2707],
    date: "2025-01-16",
    visited: true,
    tags: ["海滨", "浪漫", "海岛", "情侣路"],
    images: [
      "https://picsum.photos/400/300?random=49",
      "https://picsum.photos/400/300?random=50",
    ],
    weather: "晴",
    rating: 4.5,
    diary: [
      {
        id: "zhuhai-d1",
        date: "2025-01-16",
        content: "沿着情侣路骑行是珠海最浪漫的体验，一边是城市一边是大海。在珠海渔女雕塑前打卡，这个珠海的地标比想象中要高大许多。傍晚在野狸岛的日月贝歌剧院看日落，两个巨大的贝壳造型建筑在夕阳下发光，走到旁边的沙滩上吹海风，惬意极了。",
        tags: ["情侣路", "珠海渔女", "日月贝", "日落"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=51",
          "https://picsum.photos/400/300?random=52",
        ],
      },
      {
        id: "zhuhai-d2",
        date: "2025-01-17",
        content: "坐船去了外伶仃岛，一个多小时的海上航行后抵达这片世外桃源。岛上的海水清澈见底，在沙滩上捡了很多漂亮贝壳。爬上了伶仃峰，站在山顶可以同时看到香港和珠海，山海相连的景色壮丽无比。在岛上海鲜大排档吃了刚捕捞上来的海胆和濑尿虾。",
        tags: ["外伶仃岛", "海岛", "贝壳", "海鲜"],
        weather: "晴",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=53",
          "https://picsum.photos/400/300?random=54",
        ],
      },
    ],
  },
  {
    id: "shantou",
    name: "汕头",
    coordinates: [116.6820, 23.3541],
    date: "2025-01-18",
    visited: true,
    tags: ["潮汕美食", "海滨", "南澳岛", "工夫茶"],
    images: [
      "https://picsum.photos/400/300?random=55",
      "https://picsum.photos/400/300?random=56",
    ],
    weather: "多云",
    rating: 4.5,
    diary: [
      {
        id: "shantou-d1",
        date: "2025-01-18",
        content: "来汕头就是为了吃！第一顿安排了牛肉火锅，现切的脖仁、匙仁、五花趾在清汤里涮几秒就捞起，蘸沙茶酱入口即化。午后又去吃了蚝烙和粿条汤，蚝烙外酥内嫩，蚝仔饱满多汁。晚上在小公园老市区散步，骑楼建筑群在灯光下充满民国风情。",
        tags: ["牛肉火锅", "蚝烙", "小公园", "骑楼"],
        weather: "多云",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=57",
          "https://picsum.photos/400/300?random=58",
        ],
      },
      {
        id: "shantou-d2",
        date: "2025-01-19",
        content: "开车去了南澳岛，跨海大桥全长9公里，车窗外的海景一路相伴。岛上去了青澳湾，沙滩细腻洁白，海水蓝绿相间，被称为东方夏威夷一点不过分。在北回归线广场打卡，这里是太阳转身的地方。岛上的紫菜和鱿鱼干是必买的特产，买了一堆带回去。",
        tags: ["南澳岛", "青澳湾", "北回归线", "特产"],
        weather: "晴",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=59",
          "https://picsum.photos/400/300?random=60",
        ],
      },
      {
        id: "shantou-d3",
        date: "2025-01-20",
        content: "最后半天去了汕头的工夫茶馆体验地道的潮汕工夫茶。老师傅用孟臣壶和若琛杯泡单丛茶，三杯一轮，每一泡的滋味都不同。中午吃了卤鹅饭，澄海狮头鹅的鹅肝肥而不腻入口即化，搭配卤汁浇饭简直是人间至味。带着满满的幸福感结束了潮汕之旅。",
        tags: ["工夫茶", "单丛", "卤鹅", "潮汕文化"],
        weather: "多云",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=61",
          "https://picsum.photos/400/300?random=62",
        ],
      },
    ],
  },
];

// ========== 四川 ==========

const sichuan: CityTravelData[] = [
  {
    id: "chengdu",
    name: "成都",
    coordinates: [104.0665, 30.5728],
    date: "2025-04-05",
    visited: true,
    tags: ["美食", "熊猫", "茶馆", "天府之国"],
    images: [
      "https://picsum.photos/400/300?random=63",
      "https://picsum.photos/400/300?random=64",
    ],
    weather: "多云",
    rating: 5,
    diary: [
      {
        id: "chengdu-d1",
        date: "2025-04-05",
        content: "成都的第一顿必须是火锅！红油翻滚的九宫格，毛肚、鸭肠、黄喉、耗儿鱼……在滚烫的牛油锅里七上八下。虽然是微辣，但嘴唇已经辣到没有知觉，可是一口冰粉下去又满血复活。晚上在宽窄巷子散步消食，巷子里传来阵阵民谣吉他的声音，成都的悠闲气质让人一来就爱上。",
        tags: ["火锅", "宽窄巷子", "冰粉", "民谣"],
        weather: "多云",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=65",
          "https://picsum.photos/400/300?random=66",
        ],
      },
      {
        id: "chengdu-d2",
        date: "2025-04-06",
        content: "去大熊猫繁育研究基地看滚滚，一大早就在门口排队。看到熊猫幼崽抱着饲养员的腿不放的画面简直萌化了。大熊猫们不是在吃竹子就是在睡觉，偶尔翻个身都能引发围观群众的阵阵惊呼。下午去了人民公园的鹤鸣茶馆，点一杯盖碗茶，掏个耳朵，看大爷们下棋，时间仿佛放慢了脚步。",
        tags: ["大熊猫", "茶馆", "盖碗茶", "人民公园"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=67",
          "https://picsum.photos/400/300?random=68",
        ],
      },
      {
        id: "chengdu-d3",
        date: "2025-04-07",
        content: "上午去了武侯祠和锦里，三国文化爱好者必打卡的地方。红墙夹道上竹影斑驳，非常出片。锦里的小吃让人眼花缭乱：三大炮、糖油果子、蛋烘糕、担担面，边走边吃不亦乐乎。下午去杜甫草堂感受诗圣的生平，茅屋虽简，但园林景色极美，理解了为什么杜甫能在这里写下那么多千古名篇。",
        tags: ["武侯祠", "锦里", "小吃", "杜甫草堂"],
        weather: "晴",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=69",
          "https://picsum.photos/400/300?random=70",
        ],
      },
    ],
  },
  {
    id: "jiuzhaigou",
    name: "九寨沟",
    coordinates: [103.9185, 33.2216],
    date: "2025-04-08",
    visited: true,
    tags: ["世界遗产", "彩林", "瀑布", "海子"],
    images: [
      "https://picsum.photos/400/300?random=71",
      "https://picsum.photos/400/300?random=72",
    ],
    weather: "多云",
    rating: 5,
    diary: [
      {
        id: "jiuzhaigou-d1",
        date: "2025-04-08",
        content: "九寨沟的春天，虽然没有秋天的彩林，但依然美得令人窒息。五花海的水五颜六色，碧蓝、翠绿、浅黄交织在一起，水底的枯木和钙华清晰可见。诺日朗瀑布气势磅礴，水声震天，站在瀑布前的水雾中，仿佛整个人都被大自然洗礼了一遍。每一处海子都像上帝打翻的调色盘。",
        tags: ["五花海", "诺日朗瀑布", "海子", "钙华"],
        weather: "多云",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=73",
          "https://picsum.photos/400/300?random=74",
        ],
      },
      {
        id: "jiuzhaigou-d2",
        date: "2025-04-09",
        content: "今天走则查洼沟和日则沟。长海是九寨沟海拔最高最大的海子，湖水深蓝幽静，四周雪山映衬下格外圣洁。珍珠滩瀑布是西游记片尾的取景地，水流在宽阔的钙华滩面上跳跃，真的像千万颗珍珠在滚动。熊猫海的水蓝得深邃，据说常有熊猫来这里喝水，不过我们没有那么幸运遇见。",
        tags: ["长海", "珍珠滩", "熊猫海", "西游记"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=75",
          "https://picsum.photos/400/300?random=76",
        ],
      },
    ],
  },
  {
    id: "leshan",
    name: "乐山",
    coordinates: [103.7656, 29.5663],
    date: "2025-04-10",
    visited: true,
    tags: ["乐山大佛", "峨眉山", "三江交汇", "佛教"],
    images: [
      "https://picsum.photos/400/300?random=77",
      "https://picsum.photos/400/300?random=78",
    ],
    weather: "雨",
    rating: 4.5,
    diary: [
      {
        id: "leshan-d1",
        date: "2025-04-10",
        content: "乐山大佛比想象中还要震撼一百倍！71米高的弥勒佛坐像，光是脚背就能坐上百人。从栈道自上而下近距离观赏大佛，每一个角度都有不同的感受。大佛对面是三江（岷江、青衣江、大渡河）交汇处，水流湍急，终于理解了古人修建大佛以镇水患的初衷。",
        tags: ["乐山大佛", "栈道", "三江交汇", "弥勒"],
        weather: "雨",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=79",
          "https://picsum.photos/400/300?random=80",
        ],
      },
      {
        id: "leshan-d2",
        date: "2025-04-11",
        content: "下午去了嘉阳小火车，这是世界上唯一还在运行的窄轨蒸汽小火车。油菜花季刚过，但沿途的田园风光依然美不胜收。小火车冒着白烟呜呜穿过村庄和田野，车厢里的本地老乡热情地招呼我们吃自家的橘子。在芭蕉沟老矿区转了一圈，时光仿佛倒流回了上世纪。",
        tags: ["嘉阳小火车", "蒸汽火车", "田园", "老矿区"],
        weather: "多云",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=81",
          "https://picsum.photos/400/300?random=82",
        ],
      },
      {
        id: "leshan-d3",
        date: "2025-04-12",
        content: "登上了峨眉山的金顶！凌晨5点从雷洞坪出发，摸黑爬了三个小时到达金顶。当朝霞染红天际，金色的十方普贤菩萨像在晨光中庄严神圣。有幸看到了云海和佛光，云海翻腾如仙境，七彩佛光环绕着自己的影子，这一刻觉得所有的疲惫都值得了。下山时猴子抢走了我的香蕉，也算独特的峨眉体验。",
        tags: ["峨眉山", "金顶", "云海", "佛光"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=83",
          "https://picsum.photos/400/300?random=84",
        ],
      },
    ],
  },
];

// ========== 北京 ==========

const beijing: CityTravelData[] = [
  {
    id: "beijing",
    name: "北京",
    coordinates: [116.4074, 39.9042],
    date: "2025-05-01",
    visited: true,
    tags: ["首都", "历史", "故宫", "长城"],
    images: [
      "https://picsum.photos/400/300?random=85",
      "https://picsum.photos/400/300?random=86",
    ],
    weather: "晴",
    rating: 5,
    diary: [
      {
        id: "beijing-d1",
        date: "2025-05-01",
        content: "五一假期的第一天，天安门广场红旗飘扬，人山人海但秩序井然。穿过天安门城楼走进故宫，红墙黄瓦在阳光下熠熠生辉。从太和殿一路走到御花园，每一块砖每一片瓦都诉说着六百年的故事。在延禧宫的网红银杏树下打卡，虽然不是秋天，但红墙映衬下的绿意也别有韵味。",
        tags: ["天安门", "故宫", "太和殿", "红墙"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=87",
          "https://picsum.photos/400/300?random=88",
        ],
      },
      {
        id: "beijing-d2",
        date: "2025-05-02",
        content: "不到长城非好汉！选择了人相对较少的慕田峪长城。早上六点出发，赶在第一波到达。长城如巨龙蜿蜒在翠绿的山脊上，站在敌楼上远眺，层峦叠嶂，气势磅礴。下山时坐了滑道，一路尖叫一路大笑，童心未泯的体验。晚上回城吃了老北京涮羊肉，铜锅炭火，手切羊肉蘸麻酱，地道的北京味儿。",
        tags: ["长城", "慕田峪", "好汉", "涮羊肉"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=89",
          "https://picsum.photos/400/300?random=90",
        ],
      },
    ],
  },
  {
    id: "huairou",
    name: "怀柔",
    coordinates: [116.6346, 40.3168],
    date: "2025-05-03",
    visited: true,
    tags: ["自然风光", "雁栖湖", "乡村", "休闲"],
    images: [
      "https://picsum.photos/400/300?random=91",
      "https://picsum.photos/400/300?random=92",
    ],
    weather: "晴",
    rating: 4.5,
    diary: [
      {
        id: "huairou-d1",
        date: "2025-05-03",
        content: "五一假期的最后一站选择了京郊怀柔。雁栖湖的APEC会址建筑群现代而大气，日出东方酒店像一个巨大的圆饼矗立在湖畔。在湖边租了一辆双人自行车骑行，湖光山色让人忘却了城市的喧嚣。下午去了红螺寺，千年古刹依山而建，香火旺盛，求了一串祈福手串。",
        tags: ["雁栖湖", "APEC", "骑行", "红螺寺"],
        weather: "晴",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=93",
          "https://picsum.photos/400/300?random=94",
        ],
      },
      {
        id: "huairou-d2",
        date: "2025-05-04",
        content: "这次怀柔之行最惊喜的是青龙峡。本以为只是普通的峡谷景区，没想到这里的风光如此秀丽。坐快艇穿行在峡谷间的碧水之上，两岸青山相对出，有种在三峡的错觉。蹦极台上有人在挑战极限，围观群众比跳的人还紧张。中午吃了虹鳟鱼，怀柔的虹鳟鱼养殖很有名，烤鱼外焦里嫩。",
        tags: ["青龙峡", "快艇", "蹦极", "虹鳟鱼"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=95",
          "https://picsum.photos/400/300?random=96",
        ],
      },
    ],
  },
];

// ========== 浙江 ==========

const zhejiang: CityTravelData[] = [
  {
    id: "hangzhou",
    name: "杭州",
    coordinates: [120.1551, 30.2741],
    date: "2025-06-05",
    visited: true,
    tags: ["西湖", "江南", "茶园", "历史文化"],
    images: [
      "https://picsum.photos/400/300?random=97",
      "https://picsum.photos/400/300?random=98",
    ],
    weather: "多云",
    rating: 5,
    diary: [
      {
        id: "hangzhou-d1",
        date: "2025-06-05",
        content: "上有天堂下有苏杭，西湖的美需要静下心来慢慢品味。清晨从断桥开始沿着苏堤漫步，晨雾中的西湖就像一幅水墨画。湖边的荷花含苞待放，柳枝轻拂水面，偶尔有画舫悠悠驶过。在孤山路的楼外楼吃了正宗的西湖醋鱼和东坡肉，醋鱼的酸甜恰到好处，东坡肉入口即化。",
        tags: ["西湖", "断桥", "苏堤", "楼外楼"],
        weather: "多云",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=99",
          "https://picsum.photos/400/300?random=100",
        ],
      },
      {
        id: "hangzhou-d2",
        date: "2025-06-06",
        content: "去了灵隐寺，中国十大名寺之首名不虚传。飞来峰的摩崖石刻精妙绝伦，济公殿前香火极旺。下午去了龙井村，在茶园里跟着茶农学习采茶，嫩绿的茶芽在指尖跳跃。坐在茶农家的院子里品明前龙井，茶香清新回甘，配上九曲红梅茶点，这就是江南的惬意生活。",
        tags: ["灵隐寺", "飞来峰", "龙井", "茶园"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=101",
          "https://picsum.photos/400/300?random=102",
        ],
      },
    ],
  },
  {
    id: "ningbo",
    name: "宁波",
    coordinates: [121.5447, 29.8683],
    date: "2025-06-07",
    visited: true,
    tags: ["港口", "海鲜", "天一阁", "古镇"],
    images: [
      "https://picsum.photos/400/300?random=103",
      "https://picsum.photos/400/300?random=104",
    ],
    weather: "多云",
    rating: 4,
    diary: [
      {
        id: "ningbo-d1",
        date: "2025-06-07",
        content: "宁波的第一站去了天一阁，中国现存最古老的私人藏书楼。园中的池水假山与书阁融为一体，处处透着书香气息。在月湖公园散步，宁波人悠闲的生活节奏让人羡慕。晚上去了老外滩，甬江边的近代建筑群在灯光下别有风情，找了一家江景餐厅吃了宁波汤圆和红膏炝蟹。",
        tags: ["天一阁", "月湖", "老外滩", "汤圆"],
        weather: "多云",
        rating: 4,
        images: [
          "https://picsum.photos/400/300?random=105",
          "https://picsum.photos/400/300?random=106",
        ],
      },
      {
        id: "ningbo-d2",
        date: "2025-06-08",
        content: "去了象山石浦渔港，坐在海边的渔家乐吃刚上岸的海鲜。梭子蟹膏满黄肥，清蒸的大黄鱼肉质像蒜瓣一样洁白鲜美。下午在渔港古城里穿行，窄窄的石板路两侧是明清时期的木结构老屋，时光在这里凝固。买了一些虾干和紫菜带回去，是那种纯粹的海洋味道。",
        tags: ["石浦", "渔港", "梭子蟹", "大黄鱼"],
        weather: "晴",
        rating: 5,
        images: [
          "https://picsum.photos/400/300?random=107",
          "https://picsum.photos/400/300?random=108",
        ],
      },
    ],
  },
];

// ========== 数据集合 ==========

export const travelDataMap: Record<string, CityTravelData[]> = {
  yunnan,
  guangdong,
  sichuan,
  beijing,
  zhejiang,
};

// ========== 工具函数 ==========

/** 获取指定省份的所有旅行数据 */
export function getProvinceTravelData(provinceId: string): CityTravelData[] | undefined {
  return travelDataMap[provinceId];
}

/** 获取指定省份下某个城市的旅行数据 */
export function getCityTravelData(provinceId: string, cityId: string): CityTravelData | undefined {
  const province = travelDataMap[provinceId];
  if (!province) return undefined;
  return province.find((city) => city.id === cityId);
}

/** 获取所有旅行图片URL */
export function getAllTravelImages(): string[] {
  const images: string[] = [];
  for (const province of Object.values(travelDataMap)) {
    for (const city of province) {
      images.push(...city.images);
      for (const entry of city.diary) {
        images.push(...entry.images);
      }
    }
  }
  return images;
}

/** 旅行统计信息 */
export interface TravelStats {
  totalProvinces: number;
  totalCities: number;
  totalDays: number;
  totalKm: number;
  recentProvince: string;
}

/** 获取旅行统计数据 */
export function getTravelStats(): TravelStats {
  const provinceIds = Object.keys(travelDataMap);
  let totalCities = 0;
  let totalDays = 0;

  let latestDate = "";
  let recentProvince = "";

  for (const [provinceId, cities] of Object.entries(travelDataMap)) {
    totalCities += cities.length;
    for (const city of cities) {
      totalDays += city.diary.length;
      if (city.date > latestDate) {
        latestDate = city.date;
        recentProvince = provinceId;
      }
    }
  }

  // 估算总里程（基于省份的大致距离）
  const totalKm = 8500;

  return {
    totalProvinces: provinceIds.length,
    totalCities,
    totalDays,
    totalKm,
    recentProvince,
  };
}