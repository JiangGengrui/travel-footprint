import { Router, Request, Response } from 'express';

const router = Router();

const provincesData = [
  {
    id: "beijing",
    name: "北京市",
    capital: "北京",
    center: [116.4, 39.9],
    cities: [
      { id: "beijing-downtown", name: "北京市区", coordinates: [116.4, 39.9] },
      { id: "huairou", name: "怀柔区", coordinates: [116.6, 40.3] },
      { id: "miyun", name: "密云区", coordinates: [116.8, 40.4] },
      { id: "yanqing", name: "延庆区", coordinates: [115.9, 40.5] }
    ]
  },
  {
    id: "tianjin",
    name: "天津市",
    capital: "天津",
    center: [117.2, 39.1],
    cities: [
      { id: "tianjin-downtown", name: "天津市区", coordinates: [117.2, 39.1] },
      { id: "binhai", name: "滨海新区", coordinates: [117.7, 38.9] }
    ]
  },
  {
    id: "hebei",
    name: "河北省",
    capital: "石家庄",
    center: [114.5, 38.0],
    cities: [
      { id: "shijiazhuang", name: "石家庄", coordinates: [114.5, 38.0] },
      { id: "baoding", name: "保定", coordinates: [115.5, 38.9] },
      { id: "tangshan", name: "唐山", coordinates: [118.2, 39.6] },
      { id: "qinhuangdao", name: "秦皇岛", coordinates: [119.6, 39.9] },
      { id: "chengde", name: "承德", coordinates: [117.9, 40.9] },
      { id: "zhangjiakou", name: "张家口", coordinates: [114.9, 40.8] }
    ]
  },
  {
    id: "shanxi",
    name: "山西省",
    capital: "太原",
    center: [112.5, 37.9],
    cities: [
      { id: "taiyuan", name: "太原", coordinates: [112.5, 37.9] },
      { id: "datong", name: "大同", coordinates: [113.3, 40.1] },
      { id: "pingyao", name: "平遥", coordinates: [112.1, 37.2] }
    ]
  },
  {
    id: "neimenggu",
    name: "内蒙古",
    capital: "呼和浩特",
    center: [111.7, 40.8],
    cities: [
      { id: "huhehaote", name: "呼和浩特", coordinates: [111.7, 40.8] },
      { id: "baotou", name: "包头", coordinates: [109.8, 40.7] },
      { id: "chifeng", name: "赤峰", coordinates: [118.9, 42.3] },
      { id: "hulunbuir", name: "呼伦贝尔", coordinates: [119.8, 49.2] }
    ]
  },
  {
    id: "liaoning",
    name: "辽宁省",
    capital: "沈阳",
    center: [123.4, 41.8],
    cities: [
      { id: "shenyang", name: "沈阳", coordinates: [123.4, 41.8] },
      { id: "dalian", name: "大连", coordinates: [121.6, 38.9] },
      { id: "anshan", name: "鞍山", coordinates: [123.0, 41.1] },
      { id: "yingkou", name: "营口", coordinates: [122.2, 40.7] }
    ]
  },
  {
    id: "jilin",
    name: "吉林省",
    capital: "长春",
    center: [125.3, 43.9],
    cities: [
      { id: "changchun", name: "长春", coordinates: [125.3, 43.9] },
      { id: "jilin", name: "吉林", coordinates: [126.5, 43.8] },
      { id: "songyuan", name: "松原", coordinates: [124.8, 45.1] }
    ]
  },
  {
    id: "heilongjiang",
    name: "黑龙江省",
    capital: "哈尔滨",
    center: [126.6, 45.8],
    cities: [
      { id: "harbin", name: "哈尔滨", coordinates: [126.6, 45.8] },
      { id: "daqing", name: "大庆", coordinates: [125.0, 46.6] },
      { id: "mudanjiang", name: "牡丹江", coordinates: [129.6, 44.6] },
      { id: "jixi", name: "鸡西", coordinates: [130.9, 45.3] }
    ]
  },
  {
    id: "shanghai",
    name: "上海市",
    capital: "上海",
    center: [121.5, 31.2],
    cities: [
      { id: "shanghai-downtown", name: "上海市区", coordinates: [121.5, 31.2] },
      { id: "pudong", name: "浦东新区", coordinates: [121.5, 31.2] }
    ]
  },
  {
    id: "jiangsu",
    name: "江苏省",
    capital: "南京",
    center: [118.8, 32.1],
    cities: [
      { id: "nanjing", name: "南京", coordinates: [118.8, 32.1] },
      { id: "suzhou", name: "苏州", coordinates: [120.6, 31.3] },
      { id: "wuxi", name: "无锡", coordinates: [120.3, 31.5] },
      { id: "yangzhou", name: "扬州", coordinates: [119.4, 32.4] }
    ]
  },
  {
    id: "zhejiang",
    name: "浙江省",
    capital: "杭州",
    center: [120.2, 30.3],
    cities: [
      { id: "hangzhou", name: "杭州", coordinates: [120.2, 30.3] },
      { id: "xihu", name: "西湖", coordinates: [120.1, 30.2] },
      { id: "ningbo", name: "宁波", coordinates: [121.5, 29.9] },
      { id: "wenzhou", name: "温州", coordinates: [120.7, 28.0] }
    ]
  },
  {
    id: "anhui",
    name: "安徽省",
    capital: "合肥",
    center: [117.3, 31.9],
    cities: [
      { id: "hefei", name: "合肥", coordinates: [117.3, 31.9] },
      { id: "huangshan", name: "黄山", coordinates: [118.2, 29.7] }
    ]
  },
  {
    id: "fujian",
    name: "福建省",
    capital: "福州",
    center: [118.3, 26.1],
    cities: [
      { id: "fuzhou", name: "福州", coordinates: [119.3, 26.1] },
      { id: "xiamen", name: "厦门", coordinates: [118.1, 24.5] },
      { id: "wuyishan", name: "武夷山", coordinates: [117.9, 27.7] }
    ]
  },
  {
    id: "jiangxi",
    name: "江西省",
    capital: "南昌",
    center: [115.9, 28.7],
    cities: [
      { id: "nanchang", name: "南昌", coordinates: [115.9, 28.7] },
      { id: "jiujiang", name: "九江", coordinates: [116.0, 29.7] },
      { id: "lushan", name: "庐山", coordinates: [115.9, 29.5] }
    ]
  },
  {
    id: "shandong",
    name: "山东省",
    capital: "济南",
    center: [118.0, 36.7],
    cities: [
      { id: "jinan", name: "济南", coordinates: [118.0, 36.7] },
      { id: "qingdao", name: "青岛", coordinates: [120.4, 36.1] },
      { id: "yantai", name: "烟台", coordinates: [121.4, 37.5] },
      { id: "taishan", name: "泰山", coordinates: [117.1, 36.2] }
    ]
  },
  {
    id: "henan",
    name: "河南省",
    capital: "郑州",
    center: [113.6, 34.8],
    cities: [
      { id: "zhengzhou", name: "郑州", coordinates: [113.6, 34.8] },
      { id: "luoyang", name: "洛阳", coordinates: [112.4, 34.6] },
      { id: "kaifeng", name: "开封", coordinates: [114.3, 34.8] },
      { id: "shaolin", name: "少林寺", coordinates: [112.9, 34.5] }
    ]
  },
  {
    id: "hubei",
    name: "湖北省",
    capital: "武汉",
    center: [114.3, 30.6],
    cities: [
      { id: "wuhan", name: "武汉", coordinates: [114.3, 30.6] },
      { id: "yichang", name: "宜昌", coordinates: [111.3, 30.7] },
      { id: "shennongjia", name: "神农架", coordinates: [110.7, 31.7] }
    ]
  },
  {
    id: "hunan",
    name: "湖南省",
    capital: "长沙",
    center: [112.9, 28.2],
    cities: [
      { id: "changsha", name: "长沙", coordinates: [112.9, 28.2] },
      { id: "zhangjiajie", name: "张家界", coordinates: [110.5, 29.1] },
      { id: "fenghuang", name: "凤凰古城", coordinates: [109.6, 27.9] }
    ]
  },
  {
    id: "guangdong",
    name: "广东省",
    capital: "广州",
    center: [113.3, 23.4],
    cities: [
      { id: "guangzhou", name: "广州", coordinates: [113.3, 23.4] },
      { id: "shenzhen", name: "深圳", coordinates: [114.1, 22.5] },
      { id: "zhuhai", name: "珠海", coordinates: [113.6, 22.3] },
      { id: "chaozhou", name: "潮州", coordinates: [116.6, 23.7] }
    ]
  },
  {
    id: "guangxi",
    name: "广西",
    capital: "南宁",
    center: [108.3, 22.8],
    cities: [
      { id: "nanning", name: "南宁", coordinates: [108.3, 22.8] },
      { id: "guilin", name: "桂林", coordinates: [110.3, 25.3] },
      { id: "yangshuo", name: "阳朔", coordinates: [110.5, 24.8] },
      { id: "beihai", name: "北海", coordinates: [109.1, 21.5] }
    ]
  },
  {
    id: "hainan",
    name: "海南省",
    capital: "海口",
    center: [110.3, 20.0],
    cities: [
      { id: "haikou", name: "海口", coordinates: [110.3, 20.0] },
      { id: "sanya", name: "三亚", coordinates: [109.5, 18.2] }
    ]
  },
  {
    id: "chongqing",
    name: "重庆市",
    capital: "重庆",
    center: [106.5, 29.5],
    cities: [
      { id: "chongqing-downtown", name: "重庆市区", coordinates: [106.5, 29.5] },
      { id: "wulong", name: "武隆", coordinates: [107.9, 29.3] }
    ]
  },
  {
    id: "sichuan",
    name: "四川省",
    capital: "成都",
    center: [104.0, 30.7],
    cities: [
      { id: "chengdu", name: "成都", coordinates: [104.0, 30.7] },
      { id: "jiuzhaigou", name: "九寨沟", coordinates: [103.9, 33.3] },
      { id: "leshan", name: "乐山大佛", coordinates: [103.8, 29.5] },
      { id: "emeishan", name: "峨眉山", coordinates: [103.3, 29.5] }
    ]
  },
  {
    id: "guizhou",
    name: "贵州省",
    capital: "贵阳",
    center: [106.7, 26.6],
    cities: [
      { id: "guiyang", name: "贵阳", coordinates: [106.7, 26.6] },
      { id: "zunyi", name: "遵义", coordinates: [106.9, 27.7] },
      { id: "xijiang", name: "西江千户苗寨", coordinates: [108.2, 26.5] }
    ]
  },
  {
    id: "yunnan",
    name: "云南省",
    capital: "昆明",
    center: [102.7, 25.0],
    cities: [
      { id: "kunming", name: "昆明", coordinates: [102.7, 25.0] },
      { id: "dali", name: "大理", coordinates: [100.2, 25.6] },
      { id: "lijiang", name: "丽江", coordinates: [100.2, 26.9] },
      { id: "shangrila", name: "香格里拉", coordinates: [99.7, 27.8] }
    ]
  },
  {
    id: "xizang",
    name: "西藏",
    capital: "拉萨",
    center: [91.1, 29.7],
    cities: [
      { id: "lhasa", name: "拉萨", coordinates: [91.1, 29.7] },
      { id: "shigatse", name: "日喀则", coordinates: [88.9, 29.3] },
      { id: "linzhi", name: "林芝", coordinates: [94.4, 29.6] }
    ]
  },
  {
    id: "shaanxi",
    name: "陕西省",
    capital: "西安",
    center: [108.9, 34.3],
    cities: [
      { id: "xian", name: "西安", coordinates: [108.9, 34.3] },
      { id: "yanan", name: "延安", coordinates: [109.5, 36.6] },
      { id: "hukou", name: "壶口瀑布", coordinates: [110.4, 36.1] }
    ]
  },
  {
    id: "gansu",
    name: "甘肃省",
    capital: "兰州",
    center: [103.8, 36.1],
    cities: [
      { id: "lanzhou", name: "兰州", coordinates: [103.8, 36.1] },
      { id: "dunhuang", name: "敦煌", coordinates: [94.7, 40.1] },
      { id: "zhangye", name: "张掖", coordinates: [100.5, 38.9] }
    ]
  },
  {
    id: "qinghai",
    name: "青海省",
    capital: "西宁",
    center: [101.8, 36.6],
    cities: [
      { id: "xining", name: "西宁", coordinates: [101.8, 36.6] },
      { id: "qarhan", name: "察尔汗盐湖", coordinates: [95.9, 36.8] },
      { id: "qinghaihu", name: "青海湖", coordinates: [99.9, 36.6] }
    ]
  },
  {
    id: "ningxia",
    name: "宁夏",
    capital: "银川",
    center: [106.3, 38.5],
    cities: [
      { id: "yinchuan", name: "银川", coordinates: [106.3, 38.5] },
      { id: "zhongwei", name: "中卫", coordinates: [105.2, 37.5] }
    ]
  },
  {
    id: "xinjiang",
    name: "新疆",
    capital: "乌鲁木齐",
    center: [87.6, 43.8],
    cities: [
      { id: "wulumuqi", name: "乌鲁木齐", coordinates: [87.6, 43.8] },
      { id: "turpan", name: "吐鲁番", coordinates: [89.2, 42.9] },
      { id: "kashgar", name: "喀什", coordinates: [75.9, 39.5] },
      { id: "tianshan", name: "天山", coordinates: [85.6, 43.1] }
    ]
  },
  {
    id: "taiwan",
    name: "台湾省",
    capital: "台北",
    center: [121.5, 25.0],
    cities: [
      { id: "taipei", name: "台北", coordinates: [121.5, 25.0] },
      { id: "gaoxiong", name: "高雄", coordinates: [120.3, 22.6] },
      { id: "taizhong", name: "台中", coordinates: [120.6, 24.1] }
    ]
  },
  {
    id: "xianggang",
    name: "香港",
    capital: "香港",
    center: [114.1, 22.4],
    cities: [
      { id: "hongkong-downtown", name: "香港岛", coordinates: [114.1, 22.4] }
    ]
  },
  {
    id: "aomen",
    name: "澳门",
    capital: "澳门",
    center: [113.5, 22.2],
    cities: [
      { id: "macau-downtown", name: "澳门半岛", coordinates: [113.5, 22.2] }
    ]
  }
];

router.get('/', (_req: Request, res: Response) => {
  try {
    res.json({ success: true, data: provincesData });
  } catch (err) {
    console.error('Get provinces error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

export default router;