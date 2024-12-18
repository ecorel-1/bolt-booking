import React from 'react';
import { Calendar, Clock, Award } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={service.image} 
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{service.availableSlots} slots</span>
          </div>
          <div className="flex items-center text-purple-600">
            <Award className="w-4 h-4 mr-1" />
            <span>{service.rewardPoints} points</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${service.price}</span>
          <button
            onClick={() => onBook(service)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}