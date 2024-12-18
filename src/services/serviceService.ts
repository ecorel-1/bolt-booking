import { ServiceDetails, ServiceFormData } from '../types/service';
import apiClient from './api/apiClient';
import { mockServices } from '../data/services';

class ServiceService {
  private services: ServiceDetails[] = mockServices;

  async getServices() {
    // In a real app, this would be an API call
    return this.services;
  }

  async getServiceById(id: string) {
    return this.services.find(service => service.id === id);
  }

  async createService(data: ServiceFormData) {
    const newService: ServiceDetails = {
      id: crypto.randomUUID(),
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      bookingsCount: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };

    this.services.push(newService);
    return newService;
  }

  async updateService(id: string, data: Partial<ServiceFormData>) {
    const index = this.services.findIndex(service => service.id === id);
    if (index === -1) throw new Error('Service not found');

    this.services[index] = {
      ...this.services[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.services[index];
  }

  async deleteService(id: string) {
    const index = this.services.findIndex(service => service.id === id);
    if (index === -1) throw new Error('Service not found');

    this.services.splice(index, 1);
    return true;
  }

  async searchServices(query: string, category?: string) {
    return this.services.filter(service => {
      const matchesQuery = service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !category || category === 'all' || service.category === category;
      
      return matchesQuery && matchesCategory;
    });
  }
}

export const serviceService = new ServiceService();