import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Footprint {
  id: string;
  provinceId: string;
  cityId: string;
  cityName: string;
  createdAt: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

interface AppState {
  footprints: Footprint[];
  achievements: Achievement[];
  currentView: 'china' | 'province';
  currentProvince: string | null;
  isModalOpen: boolean;
  modalCityId: string | null;
  
  addFootprint: (footprint: Omit<Footprint, 'id' | 'createdAt'>) => void;
  removeFootprint: (id: string) => void;
  setCurrentView: (view: 'china' | 'province') => void;
  setCurrentProvince: (provinceId: string | null) => void;
  openModal: (cityId?: string) => void;
  closeModal: () => void;
  getProvincesVisited: () => string[];
  hasVisitedProvince: (provinceId: string) => boolean;
  checkAchievements: () => void;
}

const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first-step',
    name: '迈出第一步',
    description: '添加你的第一个足迹',
    icon: '👣',
  },
  {
    id: 'traveler-5',
    name: '小旅行家',
    description: '访问5个城市',
    icon: '✈️',
  },
  {
    id: 'traveler-10',
    name: '资深旅者',
    description: '访问10个城市',
    icon: '🌏',
  },
  {
    id: 'provinces-3',
    name: '三省通衢',
    description: '访问3个省份',
    icon: '🗺️',
  },
  {
    id: 'explorer',
    name: '探索者',
    description: '访问5个省份',
    icon: '🧭',
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      footprints: [],
      achievements: ACHIEVEMENTS,
      currentView: 'china',
      currentProvince: null,
      isModalOpen: false,
      modalCityId: null,

      addFootprint: (footprint) => {
        const newFootprint: Footprint = {
          ...footprint,
          id: `${footprint.provinceId}-${footprint.cityId}-${Date.now()}`,
          createdAt: Date.now(),
        };
        set((state) => ({
          footprints: [...state.footprints, newFootprint],
          isModalOpen: false,
          modalCityId: null,
        }));
        get().checkAchievements();
      },

      removeFootprint: (id) => {
        set((state) => ({
          footprints: state.footprints.filter((f) => f.id !== id),
        }));
      },

      setCurrentView: (view) => {
        set({ currentView: view });
      },

      setCurrentProvince: (provinceId) => {
        set({ 
          currentProvince: provinceId,
          currentView: provinceId ? 'province' : 'china'
        });
      },

      openModal: (cityId = null) => {
        set({ isModalOpen: true, modalCityId: cityId });
      },

      closeModal: () => {
        set({ isModalOpen: false, modalCityId: null });
      },

      getProvincesVisited: () => {
        const { footprints } = get();
        return [...new Set(footprints.map(f => f.provinceId))];
      },

      hasVisitedProvince: (provinceId) => {
        const { footprints } = get();
        return footprints.some(f => f.provinceId === provinceId);
      },

      checkAchievements: () => {
        const { footprints, achievements } = get();
        const provincesVisited = [...new Set(footprints.map(f => f.provinceId))];
        const citiesVisited = footprints.length;
        
        let newAchievements = [...achievements];
        let hasNewUnlock = false;

        // 检查成就条件
        if (citiesVisited >= 1 && !achievements.find(a => a.id === 'first-step')?.unlockedAt) {
          newAchievements = newAchievements.map(a => 
            a.id === 'first-step' ? { ...a, unlockedAt: Date.now() } : a
          );
          hasNewUnlock = true;
        }

        if (citiesVisited >= 5 && !achievements.find(a => a.id === 'traveler-5')?.unlockedAt) {
          newAchievements = newAchievements.map(a => 
            a.id === 'traveler-5' ? { ...a, unlockedAt: Date.now() } : a
          );
          hasNewUnlock = true;
        }

        if (citiesVisited >= 10 && !achievements.find(a => a.id === 'traveler-10')?.unlockedAt) {
          newAchievements = newAchievements.map(a => 
            a.id === 'traveler-10' ? { ...a, unlockedAt: Date.now() } : a
          );
          hasNewUnlock = true;
        }

        if (provincesVisited.length >= 3 && !achievements.find(a => a.id === 'provinces-3')?.unlockedAt) {
          newAchievements = newAchievements.map(a => 
            a.id === 'provinces-3' ? { ...a, unlockedAt: Date.now() } : a
          );
          hasNewUnlock = true;
        }

        if (provincesVisited.length >= 5 && !achievements.find(a => a.id === 'explorer')?.unlockedAt) {
          newAchievements = newAchievements.map(a => 
            a.id === 'explorer' ? { ...a, unlockedAt: Date.now() } : a
          );
          hasNewUnlock = true;
        }

        if (hasNewUnlock) {
          set({ achievements: newAchievements });
        }
      },
    }),
    {
      name: 'travel-footprints-storage',
    }
  )
);
