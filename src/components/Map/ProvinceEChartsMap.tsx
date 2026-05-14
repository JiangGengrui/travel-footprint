import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useStore } from '../../store/useStore';
import { getProvinceById } from '../../data/provincesData';

interface ProvinceEChartsMapProps {
  provinceId: string;
  onBack: () => void;
}

export function ProvinceEChartsMap({ provinceId, onBack }: ProvinceEChartsMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { footprints, openModal, removeFootprint } = useStore();
  const province = getProvinceById(provinceId);

  const getProvinceAdcode = (provinceId: string): string => {
    const adcodeMap: Record<string, string> = {
      'beijing': '110000',
      'tianjin': '120000',
      'hebei': '130000',
      'shanxi': '140000',
      'neimenggu': '150000',
      'liaoning': '210000',
      'jilin': '220000',
      'heilongjiang': '230000',
      'shanghai': '310000',
      'jiangsu': '320000',
      'zhejiang': '330000',
      'anhui': '340000',
      'fujian': '350000',
      'jiangxi': '360000',
      'shandong': '370000',
      'henan': '410000',
      'hubei': '420000',
      'hunan': '430000',
      'guangdong': '440000',
      'guangxi': '450000',
      'hainan': '460000',
      'chongqing': '500000',
      'sichuan': '510000',
      'guizhou': '520000',
      'yunnan': '530000',
      'xizang': '540000',
      'shaanxi': '610000',
      'gansu': '620000',
      'qinghai': '630000',
      'ningxia': '640000',
      'xinjiang': '650000',
      'taiwan': '710000',
      'xianggang': '810000',
      'aomen': '820000',
    };
    return adcodeMap[provinceId] || '';
  };

  const getCityGeoCoord = (cityName: string): [number, number] | null => {
    if (!province) return null;
    const city = province.cities.find(c => c.name === cityName);
    return city ? [Math.random() * 2 + 110, Math.random() * 2 + 30] : null;
  };

  const updateMapData = () => {
    if (!chartInstanceRef.current || !province) return;

    const cities = province.cities;
    const visitedCityIds = new Set(
      footprints.filter(f => f.provinceId === provinceId).map(f => f.cityId)
    );

    const cityData = cities.map(city => ({
      name: city.name,
      id: city.id,
      visited: visitedCityIds.has(city.id)
    }));

    const option = {
      backgroundColor: '#1e293b',
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.name) {
            const city = province.cities.find(c => c.name === params.name);
            const isVisited = city ? visitedCityIds.has(city.id) : false;
            return `<div style="font-weight: bold;">${params.name}</div>
                    <div style="color: ${isVisited ? '#22d3ee' : '#94a3b8'};">
                      ${isVisited ? '✓ 已访问' : '未访问'}
                    </div>
                    <div style="color: #64748b; font-size: 12px;">
                      ${isVisited ? '点击取消标记' : '点击添加足迹'}
                    </div>`;
          }
          return '';
        }
      },
      geo: {
        map: provinceId,
        roam: true,
        zoom: 1.2,
        scaleLimit: {
          min: 0.8,
          max: 6
        },
        label: {
          show: true,
          color: '#e2e8f0',
          fontSize: 10,
        },
        emphasis: {
          label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold'
          },
          itemStyle: {
            areaColor: '#0891b2',
            borderColor: '#22d3ee',
            borderWidth: 2
          }
        },
        itemStyle: {
          areaColor: '#334155',
          borderColor: '#64748b',
          borderWidth: 1
        },
      },
      series: [
        {
          name: '城市',
          type: 'map',
          geoIndex: 0,
          data: cityData.filter(d => d.visited).map(d => ({
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
          data: cityData
            .filter(d => d.visited)
            .map(d => {
              const geoCoord = getCityGeoCoord(d.name);
              return {
                name: d.name,
                value: geoCoord ? [...geoCoord, 1] : [0, 0, 1],
                itemStyle: {
                  color: '#ef4444'
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
    if (!chartRef.current || !province) return;

    const initChart = async () => {
      const chart = echarts.init(chartRef.current!);
      chartInstanceRef.current = chart;
      setIsLoading(true);
      setError(null);

      const adcode = getProvinceAdcode(provinceId);
      let response: Response | null = null;

      try {
        response = await fetch(`/provinces/${adcode}.json`);
        if (!response.ok) {
          throw new Error('本地数据加载失败');
        }
        const provinceGeoJson = await response.json();
        echarts.registerMap(provinceId, provinceGeoJson);
      } catch (localErr) {
        console.warn('本地数据加载失败，尝试远程:', localErr);
        try {
          response = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`);
          if (!response.ok) throw new Error('远程数据也加载失败');
          const provinceGeoJson = await response.json();
          echarts.registerMap(provinceId, provinceGeoJson);
        } catch (remoteErr) {
          console.error('所有数据源都失败:', remoteErr);
          setError('该省份地图数据暂不可用');
          setIsLoading(false);
          return;
        }
      }

      updateMapData();

      chart.on('click', (params: any) => {
        if (params.name) {
          const city = province.cities.find(c => c.name === params.name);
          if (city) {
            const isVisited = footprints.some(f => f.provinceId === provinceId && f.cityId === city.id);
            if (isVisited) {
              const fp = footprints.find(f => f.provinceId === provinceId && f.cityId === city.id);
              if (fp) removeFootprint(fp.id);
            } else {
              openModal(city.id);
            }
          }
        }
      });

      setIsLoading(false);
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
  }, [provinceId, province]);

  useEffect(() => {
    if (!isLoading) {
      updateMapData();
    }
  }, [footprints, isLoading]);

  if (!province) return null;

  return (
    <div className="relative w-full h-full">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg shadow-lg flex items-center gap-2"
      >
        ← 返回全国
      </button>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-20">
          <div className="text-white text-lg">加载地图中...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-20">
          <div className="text-red-400 text-lg">{error}</div>
        </div>
      )}
      
      <div ref={chartRef} className="w-full h-full" />
      
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => {
            chartInstanceRef.current?.dispatchAction({ type: 'geoRoam', zoom: 1.2 });
          }}
          className="w-12 h-12 bg-slate-800/90 hover:bg-slate-700 text-white rounded-xl shadow-lg flex items-center justify-center text-lg border border-slate-600"
          title="重置视图"
        >
          ⟲
        </button>
      </div>
    </div>
  );
}
