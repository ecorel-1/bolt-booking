export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: 'fitness' | 'wellness' | 'adventure' | 'sports';
  image: string;
  availableSlots: number;
  rewardPoints: number;
  locationId: string;
}

export interface User {
  points: number;
  bookings: Booking[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed';
  earnedPoints: number;
}

export type Language = 'en' | 'it' | 'de' | 'fr' | 'es';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}