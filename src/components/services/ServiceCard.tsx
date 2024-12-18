import React from 'react';
import { Calendar, MapPin, Award, Clock, Star } from 'lucide-react';
import { ServiceDetails } from '../../types/service';

interface ServiceCardProps {
  service: ServiceDetails;
  onClick: (service: ServiceDetails) => void;
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  const mainImage = service.media && service.media.length > 0 
    ? service.media.find(m => m.type === 'image')?.url 
    : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000';

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(service)}
    >
      <div className="relative h-48">
        <img
          src={mainImage}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        {service.pricing.type === 'paid' && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="font-semibold">${service.pricing.price}</span>
          </div>
        )}
        {service.media.length > 1 && (
          <span className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-50 text-white text-sm rounded">
            +{service.media.length - 1} more
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{service.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="truncate">{service.location.address}</span>
          </div>
          <div className="flex items-center text-purple-600 text-sm">
            <Award className="w-4 h-4 mr-2" />
            <span>{service.rewardPoints} points</span>
          </div>
        </div>

        <button
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 
                   transition-colors flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
}