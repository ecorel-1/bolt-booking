export interface ServiceSchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  slots: number;
}

export interface ServicePricing {
  type: 'free' | 'paid';
  price: number;
  bookingFee?: number;
  cancellationFee?: number;
  refundPolicy?: string;
}

export interface ServiceMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  description?: string;
}

export interface ServiceLocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface ServiceBase {
  name: string;
  description: string;
  pricing: ServicePricing;
  duration: string;
  categoryId: string;
  providerId: string;
  maxCapacity: number;
  status: 'active' | 'inactive';
  media: ServiceMedia[];
  rewardPoints: number;
  schedule: ServiceSchedule[];
  requirements?: string[];
  equipment?: string[];
  location: ServiceLocation;
  cancellationPolicy?: string;
  minBookingNotice: number; // hours
  maxBookingAdvance: number; // days
}

export interface ServiceDetails extends ServiceBase {
  id: string;
  slug: string;
  bookingsCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type ServiceFormData = ServiceBase;

export interface ServiceStats {
  totalBookings: number;
  revenue: number;
  averageRating: number;
  completionRate: number;
}