import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ProvinceEChartsMap } from '../components/Map/ProvinceEChartsMap';
import { ImageGallery } from '../components/UI/ImageGallery';
import { DiaryCard } from '../components/UI/DiaryCard';
import { getProvinceById } from '../data/provincesData';
import { getCityTravelData } from '../data/travelData';
import { useStore } from '../store/useStore';

export default function ProvinceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedCity, setSelectedCity } = useStore();

  const province = getProvinceById(id || '');
  const selectedCityData = selectedCity && id ? getCityTravelData(id, selectedCity) : undefined;

  useEffect(() => {
    setSelectedCity(null);
  }, [id, setSelectedCity]);

  const handleCityClick = (cityId: string) => {
    setSelectedCity(cityId);
  };

  const handleBack = () => {
    navigate('/map');
  };

  if (!province) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <p className="text-slate-500">省份信息未找到</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-screen relative overflow-hidden"
    >
      {/* Back button - absolute positioned pill */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-50 bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg text-slate-700 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/90 transition-all duration-300"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">返回全国</span>
      </button>

      {/* Two-panel layout */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Left panel - Province Map */}
        <div className="w-full md:w-[60%] h-[50vh] md:h-full flex-shrink-0">
          <ProvinceEChartsMap
            provinceId={id!}
            hideBackButton
            onCityClick={handleCityClick}
          />
        </div>

        {/* Right panel - Travel Records */}
        <div className="w-full md:w-[40%] h-[50vh] md:h-full bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-xl border-l border-white/40 overflow-y-auto">
          {/* Header section */}
          <div className="px-6 py-6 border-b border-slate-200/50">
            <h1 className="text-3xl font-serif text-slate-800 tracking-wide">
              {province.name}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <span>省会：{province.capital}</span>
              {selectedCityData && (
                <span>到访日期：{selectedCityData.date}</span>
              )}
            </div>
          </div>

          {/* Content */}
          {selectedCityData ? (
            <>
              {/* Image Gallery section */}
              {selectedCityData.images && selectedCityData.images.length > 0 && (
                <div className="border-b border-slate-200/50">
                  <div className="px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">
                      📷 旅行照片
                    </h2>
                    <ImageGallery images={selectedCityData.images} />
                  </div>
                </div>
              )}

              {/* Diary section */}
              {selectedCityData.diary && selectedCityData.diary.length > 0 && (
                <div className="px-6 py-4 space-y-4">
                  <h2 className="text-lg font-semibold text-slate-700">
                    📝 旅行手账
                  </h2>
                  {selectedCityData.diary.map((entry) => (
                    <DiaryCard key={entry.id} diary={entry} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 h-64 text-slate-400">
              <p className="text-sm">点击地图上的城市查看旅行记录</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}