import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Footprint {
  id: string;
  provinceId: string;
  cityId: string;
  cityName: string;
  createdAt: number;
}

interface AppState {
  footprints: Footprint[];
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
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      footprints: [],
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
    }),
    {
      name: 'travel-footprints-storage',
    }
  )
);
