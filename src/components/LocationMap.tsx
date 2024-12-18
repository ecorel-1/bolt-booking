import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Location } from '../types';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface LocationMapProps {
  locations: Location[];
  selectedLocation?: Location;
  onLocationSelect: (location: Location) => void;
  userLocation?: { latitude: number; longitude: number };
}

export function LocationMap({
  locations,
  selectedLocation,
  onLocationSelect,
  userLocation,
}: LocationMapProps) {
  const center = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [40.7128, -74.0060];

  const markerIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={center as [number, number]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={markerIcon}
            eventHandlers={{
              click: () => onLocationSelect(location),
            }}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-sm">{location.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={markerIcon}
          >
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}