import { create } from 'zustand';
import { ServiceDetails } from '../types/service';
import { serviceService } from '../services/serviceService';

interface ServiceState {
  services: ServiceDetails[];
  loading: boolean;
  error: string | null;
  selectedService: ServiceDetails | null;
  fetchServices: () => Promise<void>;
  searchServices: (query: string, category?: string) => Promise<void>;
  selectService: (service: ServiceDetails | null) => void;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  loading: false,
  error: null,
  selectedService: null,

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const services = await serviceService.getServices();
      set({ services, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch services', loading: false });
    }
  },

  searchServices: async (query: string, category?: string) => {
    set({ loading: true, error: null });
    try {
      const services = await serviceService.searchServices(query, category);
      set({ services, loading: false });
    } catch (error) {
      set({ error: 'Failed to search services', loading: false });
    }
  },

  selectService: (service) => set({ selectedService: service }),
}));