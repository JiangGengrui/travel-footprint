
// 简化版中国省份GeoJSON数据（使用多边形模拟真实形状）
export interface ProvinceGeometry {
  id: string;
  name: string;
  coordinates: [number, number][]; // 多边形顶点坐标 [经度, 纬度]
  center: [number, number]; // 省份中心坐标
}

// 省份多边形坐标（简化版真实形状）
export const PROVINCE_GEOMETRIES: ProvinceGeometry[] = [
  { 
    id: 'beijing', 
    name: '北京市', 
    coordinates: [[116.0, 39.5], [116.8, 39.5], [116.8, 40.2], [116.0, 40.2]], 
    center: [116.4, 39.9] 
  },
  { 
    id: 'tianjin', 
    name: '天津市', 
    coordinates: [[116.8, 38.7], [118.0, 38.7], [118.0, 39.6], [116.8, 39.6]], 
    center: [117.2, 39.1] 
  },
  { 
    id: 'hebei', 
    name: '河北省', 
    coordinates: [[113.5, 36.0], [119.8, 36.0], [119.8, 42.6], [113.5, 42.6]], 
    center: [114.5, 38.0] 
  },
  { 
    id: 'shanghai', 
    name: '上海市', 
    coordinates: [[121.0, 31.0], [122.0, 31.0], [122.0, 31.5], [121.0, 31.5]], 
    center: [121.5, 31.2] 
  },
  { 
    id: 'jiangsu', 
    name: '江苏省', 
    coordinates: [[116.5, 30.8], [121.9, 30.8], [121.9, 35.1], [116.5, 35.1]], 
    center: [118.8, 32.0] 
  },
  { 
    id: 'zhejiang', 
    name: '浙江省', 
    coordinates: [[118.0, 27.1], [122.9, 27.1], [122.9, 31.3], [118.0, 31.3]], 
    center: [120.1, 29.1] 
  },
  { 
    id: 'shandong', 
    name: '山东省', 
    coordinates: [[114.5, 34.4], [122.7, 34.4], [122.7, 38.4], [114.5, 38.4]], 
    center: [117.1, 36.0] 
  },
  { 
    id: 'henan', 
    name: '河南省', 
    coordinates: [[110.4, 31.4], [116.6, 31.4], [116.6, 36.4], [110.4, 36.4]], 
    center: [113.6, 34.5] 
  },
  { 
    id: 'hubei', 
    name: '湖北省', 
    coordinates: [[108.3, 29.0], [116.1, 29.0], [116.1, 33.3], [108.3, 33.3]], 
    center: [112.2, 30.5] 
  },
  { 
    id: 'hunan', 
    name: '湖南省', 
    coordinates: [[109.5, 24.6], [114.2, 24.6], [114.2, 30.1], [109.5, 30.1]], 
    center: [112.0, 27.6] 
  },
  { 
    id: 'guangdong', 
    name: '广东省', 
    coordinates: [[109.7, 20.1], [117.5, 20.1], [117.5, 25.5], [109.7, 25.5]], 
    center: [113.2, 23.1] 
  },
  { 
    id: 'guangxi', 
    name: '广西壮族自治区', 
    coordinates: [[104.4, 20.5], [112.0, 20.5], [112.0, 26.4], [104.4, 26.4]], 
    center: [108.3, 22.8] 
  },
  { 
    id: 'hainan', 
    name: '海南省', 
    coordinates: [[108.6, 18.1], [111.0, 18.1], [111.0, 20.4], [108.6, 20.4]], 
    center: [109.8, 19.0] 
  },
  { 
    id: 'sichuan', 
    name: '四川省', 
    coordinates: [[97.4, 26.0], [108.5, 26.0], [108.5, 34.3], [97.4, 34.3]], 
    center: [103.9, 30.6] 
  },
  { 
    id: 'guizhou', 
    name: '贵州省', 
    coordinates: [[103.6, 24.1], [109.6, 24.1], [109.6, 29.2], [103.6, 29.2]], 
    center: [106.6, 26.5] 
  },
  { 
    id: 'yunnan', 
    name: '云南省', 
    coordinates: [[97.4, 21.1], [106.1, 21.1], [106.1, 29.2], [97.4, 29.2]], 
    center: [102.7, 25.0] 
  },
  { 
    id: 'xizang', 
    name: '西藏自治区', 
    coordinates: [[78.2, 26.5], [99.1, 26.5], [99.1, 36.5], [78.2, 36.5]], 
    center: [91.1, 31.0] 
  },
  { 
    id: 'shaanxi', 
    name: '陕西省', 
    coordinates: [[105.5, 31.0], [111.5, 31.0], [111.5, 39.6], [105.5, 39.6]], 
    center: [108.9, 34.3] 
  },
  { 
    id: 'gansu', 
    name: '甘肃省', 
    coordinates: [[92.2, 32.5], [108.6, 32.5], [108.6, 42.8], [92.2, 42.8]], 
    center: [103.8, 36.0] 
  },
  { 
    id: 'qinghai', 
    name: '青海省', 
    coordinates: [[89.5, 31.5], [103.1, 31.5], [103.1, 39.6], [89.5, 39.6]], 
    center: [96.2, 36.5] 
  },
  { 
    id: 'ningxia', 
    name: '宁夏回族自治区', 
    coordinates: [[104.2, 35.2], [106.8, 35.2], [106.8, 39.3], [104.2, 39.3]], 
    center: [106.3, 38.5] 
  },
  { 
    id: 'xinjiang', 
    name: '新疆维吾尔自治区', 
    coordinates: [[73.5, 34.1], [96.4, 34.1], [96.4, 49.2], [73.5, 49.2]], 
    center: [87.6, 43.8] 
  },
  { 
    id: 'neimenggu', 
    name: '内蒙古自治区', 
    coordinates: [[97.2, 37.4], [126.0, 37.4], [126.0, 53.3], [97.2, 53.3]], 
    center: [111.7, 40.8] 
  },
  { 
    id: 'liaoning', 
    name: '辽宁省', 
    coordinates: [[118.7, 38.7], [125.7, 38.7], [125.7, 43.5], [118.7, 43.5]], 
    center: [123.4, 41.8] 
  },
  { 
    id: 'jilin', 
    name: '吉林省', 
    coordinates: [[121.1, 41.0], [131.2, 41.0], [131.2, 46.3], [121.1, 46.3]], 
    center: [125.3, 43.9] 
  },
  { 
    id: 'heilongjiang', 
    name: '黑龙江省', 
    coordinates: [[121.2, 43.3], [135.1, 43.3], [135.1, 53.6], [121.2, 53.6]], 
    center: [126.6, 45.7] 
  },
  { 
    id: 'anhui', 
    name: '安徽省', 
    coordinates: [[114.9, 29.4], [119.7, 29.4], [119.7, 34.7], [114.9, 34.7]], 
    center: [117.3, 31.8] 
  },
  { 
    id: 'fujian', 
    name: '福建省', 
    coordinates: [[115.7, 23.5], [120.7, 23.5], [120.7, 28.3], [115.7, 28.3]], 
    center: [119.3, 26.1] 
  },
  { 
    id: 'jiangxi', 
    name: '江西省', 
    coordinates: [[113.5, 24.5], [118.6, 24.5], [118.6, 30.1], [113.5, 30.1]], 
    center: [115.9, 27.6] 
  },
  { 
    id: 'shanxi', 
    name: '山西省', 
    coordinates: [[110.2, 34.5], [114.8, 34.5], [114.8, 40.8], [110.2, 40.8]], 
    center: [112.5, 37.8] 
  },
  { 
    id: 'chongqing', 
    name: '重庆市', 
    coordinates: [[105.7, 28.2], [110.2, 28.2], [110.2, 32.2], [105.7, 32.2]], 
    center: [106.5, 29.5] 
  },
  { 
    id: 'taiwan', 
    name: '台湾省', 
    coordinates: [[119.3, 21.9], [122.0, 21.9], [122.0, 25.3], [119.3, 25.3]], 
    center: [121.0, 23.7] 
  },
  { 
    id: 'xianggang', 
    name: '香港特别行政区', 
    coordinates: [[114.1, 22.2], [114.4, 22.2], [114.4, 22.4], [114.1, 22.4]], 
    center: [114.2, 22.3] 
  },
  { 
    id: 'aomen', 
    name: '澳门特别行政区', 
    coordinates: [[113.5, 22.1], [113.6, 22.1], [113.6, 22.2], [113.5, 22.2]], 
    center: [113.5, 22.2] 
  },
];

// 地图视图配置
export const MAP_CONFIG = {
  initialCenter: [103.5, 35.0],
  initialZoom: 1,
  minZoom: 0.5,
  maxZoom: 8,
  bounds: { minLng: 73.5, maxLng: 135.1, minLat: 18.0, maxLat: 53.6 }
};

// 将经纬度转换为SVG坐标
export function geoToSvg(lng: number, lat: number, centerLng: number, centerLat: number, zoom: number, svgWidth: number, svgHeight: number): [number, number] {
  const scale = 5 * zoom;
  const x = svgWidth / 2 + (lng - centerLng) * scale;
  const y = svgHeight / 2 - (lat - centerLat) * scale;
  return [x, y];
}

