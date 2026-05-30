import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useStore } from '../../store/useStore';
import { getProvinceById, Province, City } from '../../data/provincesData';

interface ProvinceEChartsMapProps {
  provinceId: string;
  onBack?: () => void;
}

export function ProvinceEChartsMap({ provinceId, onBack }: ProvinceEChartsMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { footprints, openModal, removeFootprint, setCurrentView, setCurrentProvince } = useStore();
  const province = getProvinceById(provinceId);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setCurrentView('china');
      setCurrentProvince(null);
    }
  };

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

  const updateMapData = () => {
    if (!chartInstanceRef.current || !province) return;

    const cities = province.cities;
    const visitedCityIds = new Set(
      footprints.filter(f => f.provinceId === provinceId).map(f => f.cityId)
    );

    const cityData = cities.map(city => ({
      name: city.name,
      id: city.id,
      visited: visitedCityIds.has(city.id),
      coords: city.coordinates
    }));

    const visitedCities = cityData.filter(d => d.visited).map(d => ({
      name: d.name,
      value: d.coords ? [...d.coords, 1] : null
    })).filter(d => d.value !== null);

    const option = {
      backgroundColor: '#FFFFFF',
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.name) {
            const city = province.cities.find(c => c.name === params.name);
            const isVisited = city ? visitedCityIds.has(city.id) : false;
            return `<div style="font-weight: bold;">${params.name}</div>
                    <div style="color: ${isVisited ? '#0D9488' : '#64748B'};">
                      ${isVisited ? '✓ 已访问' : '未访问'}
                    </div>
                    <div style="color: #94A3B8; font-size: 12px;">
                      ${isVisited ? '点击取消标记' : '点击添加足迹'}
                    </div>`;
          }
          return '';
        }
      },
      geo: {
        map: provinceId,
        roam: true,
        zoom: 1.5,
        center: province.center,
        scaleLimit: {
          min: 0.5,
          max: 10
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
          symbolSize: 25,
          data: visitedCities as any,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            color: '#1E293B',
            fontSize: 12,
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
      let provinceGeoJson;
      
      try {
        try {
          const response = await fetch(`/provinces/${adcode}.json`);
          if (response.ok) {
            provinceGeoJson = await response.json();
          } else {
            throw new Error('本地地图加载失败');
          }
        } catch (localErr) {
          console.warn('本地地图加载失败，尝试远程:', localErr);
          const response = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`);
          if (!response.ok) throw new Error('远程地图加载失败');
          provinceGeoJson = await response.json();
        }

        echarts.registerMap(provinceId, provinceGeoJson);
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

      } catch (err) {
        console.error('地图加载错误:', err);
        setError('地图数据加载失败');
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
  }, [provinceId, province]);

  useEffect(() => {
    if (!isLoading) {
      updateMapData();
    }
  }, [footprints, isLoading]);

  if (!province) return null;

  return (
    <div className="relative w-full h-full bg-white">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-10 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl border border-slate-300 shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <span>←</span>
        <span>返回全国</span>
      </button>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
          <div className="text-slate-700 text-lg">加载{province.name}地图中...</div>
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
            if (chartInstanceRef.current && province) {
              chartInstanceRef.current.setOption({
                geo: {
                  zoom: 1.5,
                  center: province.center
                }
              });
            }
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
