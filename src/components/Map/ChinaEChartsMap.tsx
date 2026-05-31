import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useStore } from '../../store/useStore';

interface ChinaEChartsMapProps {
  onProvinceClick: (provinceId: string) => void;
}

export function ChinaEChartsMap({ onProvinceClick }: ChinaEChartsMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { footprints, hasVisitedProvince } = useStore();

  const updateMapData = () => {
    if (!chartInstanceRef.current) return;

    const mapData = [
      { name: '北京市', id: 'beijing' },
      { name: '天津市', id: 'tianjin' },
      { name: '河北省', id: 'hebei' },
      { name: '山西省', id: 'shanxi' },
      { name: '内蒙古自治区', id: 'neimenggu' },
      { name: '辽宁省', id: 'liaoning' },
      { name: '吉林省', id: 'jilin' },
      { name: '黑龙江省', id: 'heilongjiang' },
      { name: '上海市', id: 'shanghai' },
      { name: '江苏省', id: 'jiangsu' },
      { name: '浙江省', id: 'zhejiang' },
      { name: '安徽省', id: 'anhui' },
      { name: '福建省', id: 'fujian' },
      { name: '江西省', id: 'jiangxi' },
      { name: '山东省', id: 'shandong' },
      { name: '河南省', id: 'henan' },
      { name: '湖北省', id: 'hubei' },
      { name: '湖南省', id: 'hunan' },
      { name: '广东省', id: 'guangdong' },
      { name: '广西壮族自治区', id: 'guangxi' },
      { name: '海南省', id: 'hainan' },
      { name: '重庆市', id: 'chongqing' },
      { name: '四川省', id: 'sichuan' },
      { name: '贵州省', id: 'guizhou' },
      { name: '云南省', id: 'yunnan' },
      { name: '西藏自治区', id: 'xizang' },
      { name: '陕西省', id: 'shaanxi' },
      { name: '甘肃省', id: 'gansu' },
      { name: '青海省', id: 'qinghai' },
      { name: '宁夏回族自治区', id: 'ningxia' },
      { name: '新疆维吾尔自治区', id: 'xinjiang' },
      { name: '台湾省', id: 'taiwan' },
      { name: '香港特别行政区', id: 'xianggang' },
      { name: '澳门特别行政区', id: 'aomen' },
    ];

    const visitedData = mapData.map(item => ({
      ...item,
      visited: hasVisitedProvince(item.id),
    }));

    const option = {
      backgroundColor: '#FFFFFF',
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.name) {
            const provinceId = getProvinceId(params.name);
            const visited = provinceId ? hasVisitedProvince(provinceId) : false;
            return `<div style="font-weight: bold;">${params.name}</div>
                    <div style="color: ${visited ? '#0D9488' : '#64748B'};">
                      ${visited ? '✓ 已访问' : '未访问'}
                    </div>`;
          }
          return '';
        }
      },
      geo: {
        map: 'china',
        roam: true,
        zoom: 1.2,
        center: [105, 36],
        scaleLimit: {
          min: 0.8,
          max: 6
        },
        label: {
          show: true,
          color: '#475569',
          fontSize: 10,
        },
        emphasis: {
          label: {
            show: true,
            color: '#1E293B',
            fontSize: 12,
            fontWeight: 'bold'
          },
          itemStyle: {
            areaColor: '#0891B2',
            borderColor: '#0D9488',
            borderWidth: 2
          }
        },
        itemStyle: {
          areaColor: '#E2E8F0',
          borderColor: '#94A3B8',
          borderWidth: 1
        },
      },
      series: [
        {
          name: '足迹',
          type: 'map',
          geoIndex: 0,
          data: visitedData.filter(d => d.visited).map(d => ({
            name: d.name,
            value: 1
          }))
        },
        {
          name: '旗帜标记',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'path://M-10,0 L0,-10 L10,0 L0,5 Z',
          symbolSize: 20,
          data: visitedData
            .filter(d => d.visited)
            .map(d => {
              const geoCoord = getProvinceGeoCoord(d.name);
              return {
                name: d.name,
                value: geoCoord ? [...geoCoord, 1] : [0, 0, 1],
                itemStyle: {
                  color: '#EF4444'
                }
              };
            }),
          label: {
            show: false
          },
          emphasis: {
            scale: 1.5
          }
        }
      ]
    };

    chartInstanceRef.current.setOption(option);
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const initChart = async () => {
      const chart = echarts.init(chartRef.current!);
      chartInstanceRef.current = chart;
      setIsLoading(true);
      setError(null);

      try {
        let chinaGeoJson;
        try {
          const response = await fetch('/china.json');
          if (response.ok) {
            chinaGeoJson = await response.json();
          } else {
            throw new Error('本地数据加载失败');
          }
        } catch (localErr) {
          console.warn('本地地图加载失败，尝试远程:', localErr);
          const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
          if (!response.ok) throw new Error('远程地图加载失败');
          chinaGeoJson = await response.json();
        }

        echarts.registerMap('china', chinaGeoJson);
        updateMapData();

        chart.on('click', (params: any) => {
          if (params.name) {
            const provinceId = getProvinceId(params.name);
            if (provinceId) {
              onProvinceClick(provinceId);
            }
          }
        });

      } catch (err) {
        console.error('地图加载错误:', err);
        setError('地图加载失败，请刷新重试');
      } finally {
        setIsLoading(false);
      }
    };

    initChart();

    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstanceRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      updateMapData();
    }
  }, [footprints, isLoading]);

  return (
    <div className="relative w-full h-full bg-white">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
          <div className="text-slate-700 text-lg">加载地图中...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      )}
      
      <div ref={chartRef} className="w-full h-full" />
      
      <div className="absolute bottom-24 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => {
            chartInstanceRef.current?.dispatchAction({ type: 'geoRoam', zoom: 1.2 });
          }}
          className="w-12 h-12 bg-white hover:bg-slate-100 text-slate-700 rounded-xl shadow-lg flex items-center justify-center text-lg border border-slate-300"
          title="重置视图"
        >
          ⟲
        </button>
      </div>
    </div>
  );
}

function getProvinceGeoCoord(name: string): [number, number] | null {
  const coords: Record<string, [number, number]> = {
    '北京市': [116.4, 39.9],
    '天津市': [117.2, 39.1],
    '河北省': [114.5, 38.0],
    '山西省': [112.5, 37.9],
    '内蒙古自治区': [111.7, 40.8],
    '辽宁省': [123.4, 41.8],
    '吉林省': [125.3, 43.9],
    '黑龙江省': [126.6, 45.8],
    '上海市': [121.5, 31.2],
    '江苏省': [118.8, 32.1],
    '浙江省': [120.2, 30.3],
    '安徽省': [117.3, 31.9],
    '福建省': [118.3, 26.1],
    '江西省': [115.9, 28.7],
    '山东省': [118.0, 36.7],
    '河南省': [113.6, 34.8],
    '湖北省': [114.3, 30.6],
    '湖南省': [112.9, 28.2],
    '广东省': [113.3, 23.1],
    '广西壮族自治区': [108.3, 23.3],
    '海南省': [110.3, 20.0],
    '重庆市': [106.5, 29.5],
    '四川省': [104.1, 30.7],
    '贵州省': [106.7, 26.6],
    '云南省': [101.9, 25.0],
    '西藏自治区': [91.1, 29.7],
    '陕西省': [108.9, 34.3],
    '甘肃省': [103.8, 36.1],
    '青海省': [101.8, 36.6],
    '宁夏回族自治区': [106.3, 36.0],
    '新疆维吾尔自治区': [87.6, 43.8],
    '台湾省': [121.5, 25.0],
    '香港特别行政区': [114.1, 22.3],
    '澳门特别行政区': [113.5, 22.2],
  };
  return coords[name] || null;
}

function getProvinceId(name: string): string | null {
  const idMap: Record<string, string> = {
    '北京市': 'beijing',
    '天津市': 'tianjin',
    '河北省': 'hebei',
    '山西省': 'shanxi',
    '内蒙古自治区': 'neimenggu',
    '辽宁省': 'liaoning',
    '吉林省': 'jilin',
    '黑龙江省': 'heilongjiang',
    '上海市': 'shanghai',
    '江苏省': 'jiangsu',
    '浙江省': 'zhejiang',
    '安徽省': 'anhui',
    '福建省': 'fujian',
    '江西省': 'jiangxi',
    '山东省': 'shandong',
    '河南省': 'henan',
    '湖北省': 'hubei',
    '湖南省': 'hunan',
    '广东省': 'guangdong',
    '广西壮族自治区': 'guangxi',
    '海南省': 'hainan',
    '重庆市': 'chongqing',
    '四川省': 'sichuan',
    '贵州省': 'guizhou',
    '云南省': 'yunnan',
    '西藏自治区': 'xizang',
    '陕西省': 'shaanxi',
    '甘肃省': 'gansu',
    '青海省': 'qinghai',
    '宁夏回族自治区': 'ningxia',
    '新疆维吾尔自治区': 'xinjiang',
    '台湾省': 'taiwan',
    '香港特别行政区': 'xianggang',
    '澳门特别行政区': 'aomen',
  };
  return idMap[name] || null;
}
