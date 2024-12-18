export interface TimeSlot {
  time: string;
  availableSeats: number;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  seats: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}