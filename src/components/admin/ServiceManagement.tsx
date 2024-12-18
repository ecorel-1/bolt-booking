import React, { useState } from 'react';
import { Package, Plus } from 'lucide-react';
import { ServiceDetails, ServiceFormData, ServiceStats } from '../../types/service';
import { Category } from '../../types/category';
import { ServiceForm } from './services/ServiceForm';
import { ServiceCard } from './services/ServiceCard';
import { ServiceMetrics } from './services/ServiceStats';

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Fitness',
    slug: 'fitness',
    description: 'Gym and fitness activities',
    status: 'active',
    servicesCount: 5,
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    name: 'Wellness',
    slug: 'wellness',
    description: 'Wellness and spa services',
    status: 'active',
    servicesCount: 3,
    createdAt: '2024-03-01',
  },
];

const mockServices: ServiceDetails[] = [
  {
    id: '1',
    name: 'Yoga Class',
    description: 'Relaxing yoga session with experienced instructor',
    slug: 'yoga-class',
    pricing: {
      type: 'paid',
      price: 25,
      bookingFee: 2,
    },
    duration: '1 hour',
    categoryId: '1',
    providerId: 'p1',
    maxCapacity: 15,
    status: 'active',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6',
      },
    ],
    rewardPoints: 50,
    schedule: [],
    location: {
      address: '123 Main St',
      latitude: 40.7128,
      longitude: -74.006,
    },
    bookingsCount: 150,
    rating: 4.8,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    minBookingNotice: 24,
    maxBookingAdvance: 30,
  },
];

const mockStats: ServiceStats = {
  totalBookings: 450,
  revenue: 12500,
  averageRating: 4.7,
  completionRate: 95,
};

const initialFormData: ServiceFormData = {
  name: '',
  description: '',
  pricing: {
    type: 'paid',
    price: 0,
    bookingFee: 0,
  },
  duration: '',
  categoryId: '',
  providerId: 'p1',
  maxCapacity: 1,
  status: 'active',
  media: [],
  rewardPoints: 0,
  schedule: [],
  requirements: [],
  equipment: [],
  location: {
    address: '',
    latitude: 0,
    longitude: 0,
  },
  minBookingNotice: 24,
  maxBookingAdvance: 30,
};

export function ServiceManagement() {
  const [services, setServices] = useState<ServiceDetails[]>(mockServices);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ServiceDetails | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);

  const handleOpenForm = (service?: ServiceDetails) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData(initialFormData);
    }
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const timestamp = new Date().toISOString();
    const slug = formData.name.toLowerCase().replace(/\s+/g, '-');

    if (editingService) {
      setServices(services.map(service =>
        service.id === editingService.id
          ? {
              ...service,
              ...formData,
              slug,
              updatedAt: timestamp,
            }
          : service
      ));
    } else {
      const newService: ServiceDetails = {
        id: Math.random().toString(),
        slug,
        bookingsCount: 0,
        rating: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
        ...formData,
      };
      setServices([...services, newService]);
    }

    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Service Management</h2>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      <ServiceMetrics stats={mockStats} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={() => handleOpenForm(service)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showForm && (
        <ServiceForm
          formData={formData}
          categories={mockCategories}
          onSubmit={handleSubmit}
          onChange={(data) => setFormData({ ...formData, ...data })}
          onClose={() => setShowForm(false)}
          isEditing={!!editingService}
        />
      )}
    </div>
  );
}