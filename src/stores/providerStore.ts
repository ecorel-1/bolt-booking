import { create } from 'zustand';
import { Provider } from '../types/provider';
import { providerService } from '../services/providerService';

interface ProviderState {
  providers: Provider[];
  selectedProvider: Provider | null;
  loading: boolean;
  error: string | null;
  fetchProviders: () => Promise<void>;
  selectProvider: (provider: Provider | null) => void;
  fetchProviderById: (id: string) => Promise<void>;
}

export const useProviderStore = create<ProviderState>((set) => ({
  providers: [],
  selectedProvider: null,
  loading: false,
  error: null,

  fetchProviders: async () => {
    set({ loading: true, error: null });
    try {
      const providers = await providerService.getProviders();
      set({ providers, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch providers', loading: false });
    }
  },

  selectProvider: (provider) => set({ selectedProvider: provider }),

  fetchProviderById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const provider = await providerService.getProviderById(id);
      if (provider) {
        set({ selectedProvider: provider, loading: false });
      } else {
        set({ error: 'Provider not found', loading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch provider', loading: false });
    }
  },
}));