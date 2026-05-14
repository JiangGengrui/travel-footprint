// 简化版中国省份GeoJSON数据（使用多边形模拟真实形状）
export interface ProvinceGeometry {
  id: string;
  name: string;
  coordinates: [number, number][]; // 多边形顶点坐标 [经度, 纬度]
  center: [number, number]; // 省份中心坐标
}

// 省份多边形坐标（简化版真实形状）- 优化后的布局
export const PROVINCE_GEOMETRIES: ProvinceGeometry[] = [
  { 
    id: 'beijing', 
    name: '北京市', 
    coordinates: [[115.5, 39.5], [116.8, 39.5], [116.8, 40.2], [115.5, 40.2]], 
    center: [116.1, 39.85] 
  },
  { 
    id: 'tianjin', 
    name: '天津市', 
    coordinates: [[116.8, 38.7], [118.0, 38.7], [118.0, 39.6], [116.8, 39.6]], 
    center: [117.4, 39.15] 
  },
  { 
    id: 'hebei', 
    name: '河北省', 
    coordinates: [[114.0, 36.0], [119.5, 36.0], [119.5, 42.0], [114.0, 42.0]], 
    center: [116.75, 39.0] 
  },
  { 
    id: 'shanxi', 
    name: '山西省', 
    coordinates: [[110.5, 34.5], [114.0, 34.5], [114.0, 40.5], [110.5, 40.5]], 
    center: [112.25, 37.5] 
  },
  { 
    id: 'neimenggu', 
    name: '内蒙古', 
    coordinates: [[97.0, 37.0], [126.0, 37.0], [126.0, 53.0], [97.0, 53.0]], 
    center: [111.5, 45.0] 
  },
  { 
    id: 'liaoning', 
    name: '辽宁省', 
    coordinates: [[118.5, 38.5], [125.5, 38.5], [125.5, 43.5], [118.5, 43.5]], 
    center: [122.0, 41.0] 
  },
  { 
    id: 'jilin', 
    name: '吉林省', 
    coordinates: [[121.0, 41.0], [131.0, 41.0], [131.0, 46.0], [121.0, 46.0]], 
    center: [126.0, 43.5] 
  },
  { 
    id: 'heilongjiang', 
    name: '黑龙江', 
    coordinates: [[121.0, 43.0], [135.0, 43.0], [135.0, 53.5], [121.0, 53.5]], 
    center: [128.0, 48.25] 
  },
  { 
    id: 'shanghai', 
    name: '上海市', 
    coordinates: [[121.0, 31.0], [122.0, 31.0], [122.0, 31.8], [121.0, 31.8]], 
    center: [121.5, 31.4] 
  },
  { 
    id: 'jiangsu', 
    name: '江苏省', 
    coordinates: [[116.5, 30.8], [121.8, 30.8], [121.8, 35.0], [116.5, 35.0]], 
    center: [119.15, 32.9] 
  },
  { 
    id: 'zhejiang', 
    name: '浙江省', 
    coordinates: [[118.0, 27.0], [123.0, 27.0], [123.0, 31.0], [118.0, 31.0]], 
    center: [120.5, 29.0] 
  },
  { 
    id: 'anhui', 
    name: '安徽省', 
    coordinates: [[114.5, 29.5], [119.5, 29.5], [119.5, 34.5], [114.5, 34.5]], 
    center: [117.0, 32.0] 
  },
  { 
    id: 'fujian', 
    name: '福建省', 
    coordinates: [[115.5, 23.5], [121.0, 23.5], [121.0, 28.5], [115.5, 28.5]], 
    center: [118.25, 26.0] 
  },
  { 
    id: 'jiangxi', 
    name: '江西省', 
    coordinates: [[113.5, 24.5], [118.5, 24.5], [118.5, 30.0], [113.5, 30.0]], 
    center: [116.0, 27.25] 
  },
  { 
    id: 'shandong', 
    name: '山东省', 
    coordinates: [[114.5, 34.5], [123.0, 34.5], [123.0, 38.5], [114.5, 38.5]], 
    center: [118.75, 36.5] 
  },
  { 
    id: 'henan', 
    name: '河南省', 
    coordinates: [[110.5, 31.5], [116.5, 31.5], [116.5, 36.5], [110.5, 36.5]], 
    center: [113.5, 34.0] 
  },
  { 
    id: 'hubei', 
    name: '湖北省', 
    coordinates: [[108.5, 29.0], [116.0, 29.0], [116.0, 33.5], [108.5, 33.5]], 
    center: [112.25, 31.25] 
  },
  { 
    id: 'hunan', 
    name: '湖南省', 
    coordinates: [[109.5, 24.5], [114.5, 24.5], [114.5, 30.0], [109.5, 30.0]], 
    center: [112.0, 27.25] 
  },
  { 
    id: 'guangdong', 
    name: '广东省', 
    coordinates: [[109.5, 20.0], [117.5, 20.0], [117.5, 25.5], [109.5, 25.5]], 
    center: [113.5, 22.75] 
  },
  { 
    id: 'guangxi', 
    name: '广西', 
    coordinates: [[104.5, 20.5], [112.0, 20.5], [112.0, 26.5], [104.5, 26.5]], 
    center: [108.25, 23.5] 
  },
  { 
    id: 'hainan', 
    name: '海南省', 
    coordinates: [[108.5, 18.0], [111.5, 18.0], [111.5, 20.5], [108.5, 20.5]], 
    center: [110.0, 19.25] 
  },
  { 
    id: 'sichuan', 
    name: '四川省', 
    coordinates: [[97.5, 26.0], [108.5, 26.0], [108.5, 34.5], [97.5, 34.5]], 
    center: [103.0, 30.25] 
  },
  { 
    id: 'guizhou', 
    name: '贵州省', 
    coordinates: [[103.5, 24.0], [109.5, 24.0], [109.5, 29.0], [103.5, 29.0]], 
    center: [106.5, 26.5] 
  },
  { 
    id: 'yunnan', 
    name: '云南省', 
    coordinates: [[97.0, 21.0], [106.0, 21.0], [106.0, 29.0], [97.0, 29.0]], 
    center: [101.5, 25.0] 
  },
  { 
    id: 'xizang', 
    name: '西藏', 
    coordinates: [[78.0, 26.5], [99.0, 26.5], [99.0, 36.5], [78.0, 36.5]], 
    center: [88.5, 31.5] 
  },
  { 
    id: 'shaanxi', 
    name: '陕西省', 
    coordinates: [[105.5, 31.0], [111.5, 31.0], [111.5, 39.5], [105.5, 39.5]], 
    center: [108.5, 35.25] 
  },
  { 
    id: 'gansu', 
    name: '甘肃省', 
    coordinates: [[92.0, 32.5], [109.0, 32.5], [109.0, 43.0], [92.0, 43.0]], 
    center: [100.5, 37.75] 
  },
  { 
    id: 'qinghai', 
    name: '青海省', 
    coordinates: [[89.0, 31.5], [103.0, 31.5], [103.0, 39.5], [89.0, 39.5]], 
    center: [96.0, 35.5] 
  },
  { 
    id: 'ningxia', 
    name: '宁夏', 
    coordinates: [[104.0, 35.0], [107.0, 35.0], [107.0, 39.5], [104.0, 39.5]], 
    center: [105.5, 37.25] 
  },
  { 
    id: 'xinjiang', 
    name: '新疆', 
    coordinates: [[73.5, 34.0], [96.5, 34.0], [96.5, 49.5], [73.5, 49.5]], 
    center: [85.0, 41.75] 
  },
  { 
    id: 'chongqing', 
    name: '重庆市', 
    coordinates: [[105.5, 28.0], [110.5, 28.0], [110.5, 32.5], [105.5, 32.5]], 
    center: [108.0, 30.25] 
  },
  { 
    id: 'taiwan', 
    name: '台湾省', 
    coordinates: [[119.0, 21.5], [122.5, 21.5], [122.5, 25.5], [119.0, 25.5]], 
    center: [120.75, 23.5] 
  },
  { 
    id: 'xianggang', 
    name: '香港', 
    coordinates: [[114.0, 22.0], [114.5, 22.0], [114.5, 22.5], [114.0, 22.5]], 
    center: [114.25, 22.25] 
  },
  { 
    id: 'aomen', 
    name: '澳门', 
    coordinates: [[113.4, 22.0], [113.7, 22.0], [113.7, 22.4], [113.4, 22.4]], 
    center: [113.55, 22.2] 
  },
];

// 地图视图配置
export const MAP_CONFIG = {
  initialCenter: [105.0, 35.0], // 中国中心点
  initialZoom: 0.7,
  minZoom: 0.3,
  maxZoom: 6,
  bounds: { minLng: 73.5, maxLng: 135.1, minLat: 18.0, maxLat: 53.6 }
};

// 将经纬度转换为SVG坐标
export function geoToSvg(lng: number, lat: number, centerLng: number, centerLat: number, zoom: number, svgWidth: number, svgHeight: number): [number, number] {
  const scale = 6 * zoom;
  const x = svgWidth / 2 + (lng - centerLng) * scale;
  const y = svgHeight / 2 - (lat - centerLat) * scale;
  return [x, y];
}
