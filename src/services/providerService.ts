import { Provider } from '../types/provider';
import { mockProviders } from '../data/providers';
import apiClient from './api/apiClient';

class ProviderService {
  private providers: Provider[] = mockProviders;

  async getProviders() {
    return this.providers;
  }

  async getProviderById(id: string) {
    return this.providers.find(provider => provider.id === id);
  }

  async updateProvider(id: string, data: Partial<Provider>) {
    const index = this.providers.findIndex(provider => provider.id === id);
    if (index === -1) throw new Error('Provider not found');

    this.providers[index] = {
      ...this.providers[index],
      ...data,
    };

    return this.providers[index];
  }

  async getProviderStats(id: string) {
    const provider = await this.getProviderById(id);
    if (!provider) throw new Error('Provider not found');

    return {
      totalBookings: provider.totalReviews,
      rating: provider.rating,
      totalCustomers: provider.totalCustomers,
      revenue: 0, // In a real app, calculate from bookings
    };
  }
}

export const providerService = new ProviderService();