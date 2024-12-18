import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { ServiceDetailsModal } from './ServiceDetailsModal';
import { ServiceDetails } from '../../types/service';

interface ServiceListProps {
  services: ServiceDetails[];
}

// Mock provider data - In a real app, this would come from your API
const mockProvider = {
  id: 'p1',
  name: 'Adventure Sports Center',
  rating: 4.8,
  totalReviews: 156,
  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
};

export function ServiceList({ services }: ServiceListProps) {
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => setSelectedService(service)}
          />
        ))}
      </div>

      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          provider={mockProvider}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}