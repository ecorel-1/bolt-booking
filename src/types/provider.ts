export interface Provider {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  specialties: string[];
  businessHours: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  rating: number;
  totalReviews: number;
  totalCustomers: number;
  coverImage?: string;
  logo?: string;
}