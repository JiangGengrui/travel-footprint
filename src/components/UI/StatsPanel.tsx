import { useStore } from '../../store/useStore';
import { provincesData } from '../../data/provincesData';
import { useState, useEffect } from 'react';

/** 数字滚动动画子组件 */
function ScrollNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = displayValue;
    const diff = value - startValue;

    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + diff * eased));

      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
}

/** 统计卡片子组件 */
function StatCard({
  label,
  value,
  suffix = '',
  colorClass,
}: {
  label: string;
  value: number;
  suffix?: string;
  colorClass: string;
}) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 shadow-sm">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-serif font-bold ${colorClass}`}>
        <ScrollNumber value={value} />
        {suffix && <span className="text-base font-normal ml-0.5">{suffix}</span>}
      </p>
    </div>
  );
}

export function StatsPanel() {
  const { footprints, achievements, currentView, currentProvince } = useStore();
  const [showAchievements, setShowAchievements] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(false);

  const provincesVisited = new Set(footprints.map((f) => f.provinceId));
  const totalProvinces = provincesData.length;
  const totalCities = footprints.length;
  const unlockedAchievements = achievements.filter((a) => a.unlockedAt).length;

  const totalKm = totalCities * 200;
  const travelDays = totalCities * 3;

  const sortedFootprints = [...footprints].sort((a, b) => b.createdAt - a.createdAt);
  const recentProvinceId = sortedFootprints[0]?.provinceId;
  const recentProvinceName = recentProvinceId
    ? provincesData.find((p) => p.id === recentProvinceId)?.name ?? ''
    : '';

  const currentProvinceData = currentProvince
    ? provincesData.find((p) => p.id === currentProvince)
    : null;

  const currentProvinceCities = currentProvinceData
    ? footprints.filter((f) => f.provinceId === currentProvince).length
    : 0;

  const coveragePercent = provincesVisited.size > 0
    ? (provincesVisited.size / totalProvinces) * 100
    : 0;

  return (
    <>
      {/* 移动端折叠按钮 */}
      <button
        onClick={() => setMobileCollapsed(!mobileCollapsed)}
        className="md:hidden fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${mobileCollapsed ? '' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 主面板 */}
      <div
        className={`
          absolute top-4 right-4 z-30
          bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl
          rounded-2xl p-6
          transition-all duration-300
          w-72
          md:opacity-100 md:pointer-events-auto md:static
          ${mobileCollapsed
            ? 'opacity-0 pointer-events-none translate-y-4'
            : 'opacity-100 pointer-events-auto translate-y-0'
          }
        `}
      >
        {/* 标题栏 */}
        <h3 className="text-amber-600 font-serif text-lg mb-4">
          {currentView === 'china' ? '📍 足迹统计' : `📍 ${currentProvinceData?.name || ''}`}
        </h3>

        {/* 中国视图 */}
        {currentView === 'china' ? (
          <div className="space-y-3">
            {/* 统计卡片网格 */}
            <div className="grid grid-cols-2 gap-2">
              <StatCard
                label="已到达省份"
                value={provincesVisited.size}
                colorClass="text-cyan-500"
              />
              <StatCard
                label="旅行城市"
                value={totalCities}
                colorClass="text-amber-500"
              />
              <StatCard
                label="累计里程"
                value={totalKm}
                suffix="km"
                colorClass="text-orange-500"
              />
              <StatCard
                label="旅行天数"
                value={travelDays}
                colorClass="text-purple-500"
              />
            </div>

            {/* 最近旅行 */}
            {recentProvinceName && (
              <div className="flex items-center gap-2 text-sm text-slate-500 bg-white/40 rounded-lg px-3 py-2">
                <span className="text-xs">🕐 最近旅行</span>
                <span className="text-slate-700 font-medium">{recentProvinceName}</span>
              </div>
            )}

            {/* 覆盖率进度条 */}
            <div className="pt-1">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>覆盖率</span>
                <span className="font-mono">{coveragePercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200/50 rounded-full h-2.5 overflow-hidden relative shimmer-bar">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${coveragePercent}%` }}
                />
                {/* 闪光动画覆盖层 */}
                {coveragePercent > 0 && (
                  <div
                    className="absolute inset-0 overflow-hidden rounded-full"
                    style={{ width: `${coveragePercent}%` }}
                  >
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                        transform: 'translateX(-100%)',
                        animation: 'shimmer 2.5s infinite',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 成就按钮 */}
            {unlockedAchievements > 0 && (
              <button
                onClick={() => setShowAchievements(true)}
                className="w-full mt-1 py-2.5 px-4 bg-purple-500/90 hover:bg-purple-600/90 backdrop-blur-sm text-white rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                🏆 查看成就 ({unlockedAchievements})
              </button>
            )}
          </div>
        ) : (
          /* 省份视图 */
          <div className="space-y-3 text-slate-700">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">已访问地点</p>
              <p className="text-2xl font-serif font-bold text-amber-500">
                <ScrollNumber value={currentProvinceCities} />
                <span className="text-base font-normal text-slate-400 ml-1">
                  / {currentProvinceData?.cities.length || 0}
                </span>
              </p>
            </div>

            {currentProvinceData && (
              <div>
                <div className="text-xs text-slate-400 mb-2 font-medium">已访问城市</div>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {footprints
                    .filter((f) => f.provinceId === currentProvince)
                    .map((fp) => (
                      <div
                        key={fp.id}
                        className="text-sm text-slate-600 flex items-center gap-2 bg-white/50 rounded-lg px-3 py-1.5 border border-white/30"
                      >
                        <span className="text-base">🏔️</span>
                        <span className="font-medium">{fp.cityName}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 成就弹窗 */}
      {showAchievements && (
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowAchievements(false)}
        >
          <div
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full mx-4 border border-white/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-purple-700 font-serif">🏆 成就列表</h3>
              <button
                onClick={() => setShowAchievements(false)}
                className="w-8 h-8 rounded-full bg-white/60 hover:bg-white/90 border border-white/40 flex items-center justify-center text-slate-400 hover:text-slate-700 text-xl transition-all"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    achievement.unlockedAt
                      ? 'bg-purple-50/80 border-purple-300/60 shadow-sm'
                      : 'bg-slate-100/60 border-slate-200/60 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-2xl ${
                        achievement.unlockedAt ? 'animate-scale-pulse' : 'grayscale'
                      }`}
                    >
                      {achievement.icon}
                    </span>
                    <div className="flex-1">
                      <h4
                        className={`font-bold text-sm ${
                          achievement.unlockedAt ? 'text-purple-700' : 'text-slate-500'
                        }`}
                      >
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{achievement.description}</p>
                    </div>
                    {achievement.unlockedAt && (
                      <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">
                        ✓ 已解锁
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* shimmer 关键帧动画 */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  );
}