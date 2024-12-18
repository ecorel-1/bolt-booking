import React from 'react';
import { MapPin } from 'lucide-react';
import { Location } from '../types';
import { calculateDistance, formatDistance } from '../utils/location';

interface LocationFilterProps {
  locations: Location[];
  selectedLocation?: Location;
  onLocationSelect: (location: Location) => void;
  userLocation?: { latitude: number; longitude: number };
}

export function LocationFilter({
  locations,
  selectedLocation,
  onLocationSelect,
  userLocation,
}: LocationFilterProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Filter by Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((location) => {
          const distance = userLocation
            ? calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                location.latitude,
                location.longitude
              )
            : null;

          return (
            <button
              key={location.id}
              onClick={() => onLocationSelect(location)}
              className={`p-4 rounded-lg border transition-colors ${
                selectedLocation?.id === location.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.address}</p>
                  {distance && (
                    <span className="text-sm text-blue-600">
                      {formatDistance(distance)} away
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}