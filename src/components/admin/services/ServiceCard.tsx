import React from 'react';
import { Package, Edit, Trash2, Star, Calendar } from 'lucide-react';
import { ServiceDetails } from '../../../types/service';

interface ServiceCardProps {
  service: ServiceDetails;
  onEdit: (service: ServiceDetails) => void;
  onDelete: (id: string) => void;
  onBook?: (service: ServiceDetails) => void;
  showBooking?: boolean;
}

export function ServiceCard({ 
  service, 
  onEdit, 
  onDelete, 
  onBook,
  showBooking = false 
}: ServiceCardProps) {
  const mainImage = service.media && service.media.length > 0 
    ? service.media.find(m => m.type === 'image')?.url 
    : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={mainImage}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        {service.media && service.media.length > 1 && (
          <span className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-50 text-white text-sm rounded">
            +{service.media.length - 1} more
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">{service.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{service.rating?.toFixed(1) || '0.0'}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">{service.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">
              {service.pricing.type === 'free' ? 'Free' : `$${service.pricing.price}`}
            </span>
            <span className="text-sm text-gray-500 ml-2">{service.duration}</span>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            service.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {service.status}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{service.bookingsCount || 0} bookings</span>
          <span>{service.rewardPoints} points</span>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          {showBooking && onBook && (
            <button
              onClick={() => onBook(service)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Calendar className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onEdit(service)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}