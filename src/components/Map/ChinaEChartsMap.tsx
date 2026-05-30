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
      { name: '北京', id: 'beijing' },
      { name: '天津', id: 'tianjin' },
      { name: '河北', id: 'hebei' },
      { name: '山西', id: 'shanxi' },
      { name: '内蒙古', id: 'neimenggu' },
      { name: '辽宁', id: 'liaoning' },
      { name: '吉林', id: 'jilin' },
      { name: '黑龙江', id: 'heilongjiang' },
      { name: '上海', id: 'shanghai' },
      { name: '江苏', id: 'jiangsu' },
      { name: '浙江', id: 'zhejiang' },
      { name: '安徽', id: 'anhui' },
      { name: '福建', id: 'fujian' },
      { name: '江西', id: 'jiangxi' },
      { name: '山东', id: 'shandong' },
      { name: '河南', id: 'henan' },
      { name: '湖北', id: 'hubei' },
      { name: '湖南', id: 'hunan' },
      { name: '广东', id: 'guangdong' },
      { name: '广西', id: 'guangxi' },
      { name: '海南', id: 'hainan' },
      { name: '重庆', id: 'chongqing' },
      { name: '四川', id: 'sichuan' },
      { name: '贵州', id: 'guizhou' },
      { name: '云南', id: 'yunnan' },
      { name: '西藏', id: 'xizang' },
      { name: '陕西', id: 'shaanxi' },
      { name: '甘肃', id: 'gansu' },
      { name: '青海', id: 'qinghai' },
      { name: '宁夏', id: 'ningxia' },
      { name: '新疆', id: 'xinjiang' },
      { name: '台湾', id: 'taiwan' },
      { name: '香港', id: 'xianggang' },
      { name: '澳门', id: 'aomen' },
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
                    <div style="color: ${visited ? '#0D9488' : '#64748b'};">
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
        const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        if (!response.ok) throw new Error('地图数据加载失败');
        
        const chinaGeoJson = await response.json();
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
      
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
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
    '北京': [116.4, 39.9],
    '天津': [117.2, 39.1],
    '河北': [114.5, 38.0],
    '山西': [112.5, 37.9],
    '内蒙古': [111.7, 40.8],
    '辽宁': [123.4, 41.8],
    '吉林': [125.3, 43.9],
    '黑龙江': [126.6, 45.8],
    '上海': [121.5, 31.2],
    '江苏': [118.8, 32.1],
    '浙江': [120.2, 30.3],
    '安徽': [117.3, 31.9],
    '福建': [118.3, 26.1],
    '江西': [115.9, 28.7],
    '山东': [118.0, 36.7],
    '河南': [113.6, 34.8],
    '湖北': [114.3, 30.6],
    '湖南': [112.9, 28.2],
    '广东': [113.3, 23.1],
    '广西': [108.3, 23.3],
    '海南': [110.3, 20.0],
    '重庆': [106.5, 29.5],
    '四川': [104.1, 30.7],
    '贵州': [106.7, 26.6],
    '云南': [101.9, 25.0],
    '西藏': [91.1, 29.7],
    '陕西': [108.9, 34.3],
    '甘肃': [103.8, 36.1],
    '青海': [101.8, 36.6],
    '宁夏': [106.3, 36.0],
    '新疆': [87.6, 43.8],
    '台湾': [121.5, 25.0],
    '香港': [114.1, 22.3],
    '澳门': [113.5, 22.2],
  };
  return coords[name] || null;
}

function getProvinceId(name: string): string | null {
  const idMap: Record<string, string> = {
    '北京': 'beijing',
    '天津': 'tianjin',
    '河北': 'hebei',
    '山西': 'shanxi',
    '内蒙古': 'neimenggu',
    '辽宁': 'liaoning',
    '吉林': 'jilin',
    '黑龙江': 'heilongjiang',
    '上海': 'shanghai',
    '江苏': 'jiangsu',
    '浙江': 'zhejiang',
    '安徽': 'anhui',
    '福建': 'fujian',
    '江西': 'jiangxi',
    '山东': 'shandong',
    '河南': 'henan',
    '湖北': 'hubei',
    '湖南': 'hunan',
    '广东': 'guangdong',
    '广西': 'guangxi',
    '海南': 'hainan',
    '重庆': 'chongqing',
    '四川': 'sichuan',
    '贵州': 'guizhou',
    '云南': 'yunnan',
    '西藏': 'xizang',
    '陕西': 'shaanxi',
    '甘肃': 'gansu',
    '青海': 'qinghai',
    '宁夏': 'ningxia',
    '新疆': 'xinjiang',
    '台湾': 'taiwan',
    '香港': 'xianggang',
    '澳门': 'aomen',
  };
  return idMap[name] || null;
}
