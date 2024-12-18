import { create } from 'zustand';
import { Booking } from '../types/booking';
import { ServiceDetails } from '../types/service';
import { bookingService } from '../services/bookingService';
import { serviceService } from '../services/serviceService';

interface BookingWithService extends Booking {
  service: ServiceDetails;
}

interface BookingState {
  bookings: BookingWithService[];
  loading: boolean;
  error: string | null;
  fetchBookings: (userId: string) => Promise<void>;
  createBooking: (data: {
    userId: string;
    serviceId: string;
    date: string;
    time: string;
    notes?: string;
  }) => Promise<Booking>;
  cancelBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchBookings: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const bookings = await bookingService.getBookings(userId);
      const bookingsWithServices = await Promise.all(
        bookings.map(async (booking) => {
          const service = await serviceService.getServiceById(booking.serviceId);
          return {
            ...booking,
            service: service!,
          };
        })
      );
      set({ bookings: bookingsWithServices, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch bookings', loading: false });
    }
  },

  createBooking: async (data) => {
    set({ loading: true, error: null });
    try {
      const booking = await bookingService.createBooking(data);
      const service = await serviceService.getServiceById(data.serviceId);
      const bookingWithService = { ...booking, service: service! };
      
      set(state => ({
        bookings: [...state.bookings, bookingWithService],
        loading: false,
      }));
      
      return booking;
    } catch (error) {
      set({ error: 'Failed to create booking', loading: false });
      throw error;
    }
  },

  cancelBooking: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await bookingService.cancelBooking(id);
      set(state => ({
        bookings: state.bookings.map(booking =>
          booking.id === id
            ? { ...booking, status: 'cancelled' }
            : booking
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to cancel booking', loading: false });
      throw error;
    }
  },
}));