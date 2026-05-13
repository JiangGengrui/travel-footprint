
// 简化版中国省份GeoJSON数据（用于演示）
// 实际项目中可使用完整的GeoJSON数据
export interface ProvinceGeometry {
  id: string;
  name: string;
  paths: string[]; // SVG路径数据
  center: [number, number]; // 省份中心坐标 [经度, 纬度]
  bounds: [number, number, number, number]; // 边界 [minX, minY, maxX, maxY]
}

// 省份位置映射（基于Web Mercator投影的大致坐标）
export const PROVINCE_GEOMETRIES: ProvinceGeometry[] = [
  { id: 'beijing', name: '北京市', paths: ['M39.9,116.4 L39.9,116.6 L40.1,116.6 L40.1,116.4 Z'], center: [116.4, 39.9], bounds: [115.5, 39.0, 117.5, 40.5] },
  { id: 'tianjin', name: '天津市', paths: ['M39.1,117.1 L39.1,117.8 L39.4,117.8 L39.4,117.1 Z'], center: [117.2, 39.1], bounds: [116.7, 38.7, 118.0, 39.6] },
  { id: 'hebei', name: '河北省', paths: ['M36.0,113.5 L36.0,119.8 L42.6,119.8 L42.6,113.5 Z'], center: [114.5, 38.0], bounds: [113.0, 36.0, 119.8, 42.6] },
  { id: 'shanghai', name: '上海市', paths: ['M31.1,121.3 L31.1,121.9 L31.4,121.9 L31.4,121.3 Z'], center: [121.5, 31.2], bounds: [121.0, 31.0, 122.0, 31.5] },
  { id: 'jiangsu', name: '江苏省', paths: ['M30.8,116.5 L30.8,121.9 L35.1,121.9 L35.1,116.5 Z'], center: [118.8, 32.0], bounds: [116.5, 30.8, 121.9, 35.1] },
  { id: 'zhejiang', name: '浙江省', paths: ['M27.1,118.0 L27.1,122.9 L31.3,122.9 L31.3,118.0 Z'], center: [120.1, 29.1], bounds: [118.0, 27.1, 122.9, 31.3] },
  { id: 'shandong', name: '山东省', paths: ['M34.4,114.5 L34.4,122.7 L38.4,122.7 L38.4,114.5 Z'], center: [117.1, 36.0], bounds: [114.5, 34.4, 122.7, 38.4] },
  { id: 'henan', name: '河南省', paths: ['M31.4,110.4 L31.4,116.6 L36.4,116.6 L36.4,110.4 Z'], center: [113.6, 34.5], bounds: [110.4, 31.4, 116.6, 36.4] },
  { id: 'hubei', name: '湖北省', paths: ['M29.0,108.3 L29.0,116.1 L33.3,116.1 L33.3,108.3 Z'], center: [112.2, 30.5], bounds: [108.3, 29.0, 116.1, 33.3] },
  { id: 'hunan', name: '湖南省', paths: ['M24.6,109.5 L24.6,114.2 L30.1,114.2 L30.1,109.5 Z'], center: [112.0, 27.6], bounds: [109.5, 24.6, 114.2, 30.1] },
  { id: 'guangdong', name: '广东省', paths: ['M20.1,109.7 L20.1,117.5 L25.5,117.5 L25.5,109.7 Z'], center: [113.2, 23.1], bounds: [109.7, 20.1, 117.5, 25.5] },
  { id: 'guangxi', name: '广西壮族自治区', paths: ['M20.5,104.4 L20.5,112.0 L26.4,112.0 L26.4,104.4 Z'], center: [108.3, 22.8], bounds: [104.4, 20.5, 112.0, 26.4] },
  { id: 'hainan', name: '海南省', paths: ['M18.1,108.6 L18.1,111.0 L20.4,111.0 L20.4,108.6 Z'], center: [109.8, 19.0], bounds: [108.6, 18.1, 111.0, 20.4] },
  { id: 'sichuan', name: '四川省', paths: ['M26.0,97.4 L26.0,108.5 L34.3,108.5 L34.3,97.4 Z'], center: [103.9, 30.6], bounds: [97.4, 26.0, 108.5, 34.3] },
  { id: 'guizhou', name: '贵州省', paths: ['M24.1,103.6 L24.1,109.6 L29.2,109.6 L29.2,103.6 Z'], center: [106.6, 26.5], bounds: [103.6, 24.1, 109.6, 29.2] },
  { id: 'yunnan', name: '云南省', paths: ['M21.1,97.4 L21.1,106.1 L29.2,106.1 L29.2,97.4 Z'], center: [102.7, 25.0], bounds: [97.4, 21.1, 106.1, 29.2] },
  { id: 'xizang', name: '西藏自治区', paths: ['M26.5,78.2 L26.5,99.1 L36.5,99.1 L36.5,78.2 Z'], center: [91.1, 31.0], bounds: [78.2, 26.5, 99.1, 36.5] },
  { id: 'shaanxi', name: '陕西省', paths: ['M31.0,105.5 L31.0,111.5 L39.6,111.5 L39.6,105.5 Z'], center: [108.9, 34.3], bounds: [105.5, 31.0, 111.5, 39.6] },
  { id: 'gansu', name: '甘肃省', paths: ['M32.5,92.2 L32.5,108.6 L42.8,108.6 L42.8,92.2 Z'], center: [103.8, 36.0], bounds: [92.2, 32.5, 108.6, 42.8] },
  { id: 'qinghai', name: '青海省', paths: ['M31.5,89.5 L31.5,103.1 L39.6,103.1 L39.6,89.5 Z'], center: [96.2, 36.5], bounds: [89.5, 31.5, 103.1, 39.6] },
  { id: 'ningxia', name: '宁夏回族自治区', paths: ['M35.2,104.2 L35.2,106.8 L39.3,106.8 L39.3,104.2 Z'], center: [106.3, 38.5], bounds: [104.2, 35.2, 106.8, 39.3] },
  { id: 'xinjiang', name: '新疆维吾尔自治区', paths: ['M34.1,73.5 L34.1,96.4 L49.2,96.4 L49.2,73.5 Z'], center: [87.6, 43.8], bounds: [73.5, 34.1, 96.4, 49.2] },
  { id: 'neimenggu', name: '内蒙古自治区', paths: ['M37.4,97.2 L37.4,126.0 L53.3,126.0 L53.3,97.2 Z'], center: [111.7, 40.8], bounds: [97.2, 37.4, 126.0, 53.3] },
  { id: 'liaoning', name: '辽宁省', paths: ['M38.7,118.7 L38.7,125.7 L43.5,125.7 L43.5,118.7 Z'], center: [123.4, 41.8], bounds: [118.7, 38.7, 125.7, 43.5] },
  { id: 'jilin', name: '吉林省', paths: ['M41.0,121.1 L41.0,131.2 L46.3,131.2 L46.3,121.1 Z'], center: [125.3, 43.9], bounds: [121.1, 41.0, 131.2, 46.3] },
  { id: 'heilongjiang', name: '黑龙江省', paths: ['M43.3,121.2 L43.3,135.1 L53.6,135.1 L53.6,121.2 Z'], center: [126.6, 45.7], bounds: [121.2, 43.3, 135.1, 53.6] },
  { id: 'anhui', name: '安徽省', paths: ['M29.4,114.9 L29.4,119.7 L34.7,119.7 L34.7,114.9 Z'], center: [117.3, 31.8], bounds: [114.9, 29.4, 119.7, 34.7] },
  { id: 'fujian', name: '福建省', paths: ['M23.5,115.7 L23.5,120.7 L28.3,120.7 L28.3,115.7 Z'], center: [119.3, 26.1], bounds: [115.7, 23.5, 120.7, 28.3] },
  { id: 'jiangxi', name: '江西省', paths: ['M24.5,113.5 L24.5,118.6 L30.1,118.6 L30.1,113.5 Z'], center: [115.9, 27.6], bounds: [113.5, 24.5, 118.6, 30.1] },
  { id: 'shanxi', name: '山西省', paths: ['M34.5,110.2 L34.5,114.8 L40.8,114.8 L40.8,110.2 Z'], center: [112.5, 37.8], bounds: [110.2, 34.5, 114.8, 40.8] },
  { id: 'chongqing', name: '重庆市', paths: ['M28.2,105.7 L28.2,110.2 L32.2,110.2 L32.2,105.7 Z'], center: [106.5, 29.5], bounds: [105.7, 28.2, 110.2, 32.2] },
  { id: 'taiwan', name: '台湾省', paths: ['M21.9,119.3 L21.9,122.0 L25.3,122.0 L25.3,119.3 Z'], center: [121.0, 23.7], bounds: [119.3, 21.9, 122.0, 25.3] },
  { id: 'xianggang', name: '香港特别行政区', paths: ['M22.2,114.1 L22.2,114.4 L22.4,114.4 L22.4,114.1 Z'], center: [114.2, 22.3], bounds: [114.1, 22.2, 114.4, 22.4] },
  { id: 'aomen', name: '澳门特别行政区', paths: ['M22.1,113.5 L22.1,113.6 L22.2,113.6 L22.2,113.5 Z'], center: [113.5, 22.2], bounds: [113.5, 22.1, 113.6, 22.2] },
];

// 地图视图配置
export const MAP_CONFIG = {
  initialCenter: [103.5, 35.0], // 中国中心点
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

