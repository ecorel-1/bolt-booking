import { Service, Location } from '../types';

export function searchServices(
  query: string,
  services: Service[],
  locations: Location[]
): Service[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return services;

  return services.filter((service) => {
    const location = locations.find((loc) => loc.id === service.locationId);
    
    return (
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm) ||
      location?.name.toLowerCase().includes(searchTerm) ||
      location?.address.toLowerCase().includes(searchTerm)
    );
  });
}