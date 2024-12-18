import { Booking, TimeSlot } from '../types/booking';
import { serviceService } from './serviceService';

class BookingService {
  private bookings: Booking[] = [];

  async getAvailableSlots(serviceId: string, date: string): Promise<TimeSlot[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const service = await serviceService.getServiceById(serviceId);
    if (!service) throw new Error('Service not found');

    const selectedDay = new Date(date).getDay();
    const schedule = service.schedule.find(s => s.dayOfWeek === selectedDay);
    
    if (!schedule) return [];

    // Generate time slots
    const slots: TimeSlot[] = [];
    const [startHour] = schedule.startTime.split(':').map(Number);
    const [endHour] = schedule.endTime.split(':').map(Number);

    for (let hour = startHour; hour < endHour; hour++) {
      const times = [`${hour.toString().padStart(2, '0')}:00`, `${hour.toString().padStart(2, '0')}:30`];
      
      for (const time of times) {
        // Get existing bookings for this slot
        const existingBookings = this.bookings.filter(
          b => b.serviceId === serviceId && 
              b.date === date && 
              b.time === time &&
              b.status !== 'cancelled'
        );

        const totalBookedSeats = existingBookings.reduce((sum, b) => sum + b.seats, 0);
        const availableSeats = service.maxCapacity - totalBookedSeats;

        slots.push({
          time,
          availableSeats: Math.max(0, availableSeats),
        });
      }
    }

    return slots;
  }

  async getBookings(userId?: string, serviceId?: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return this.bookings.filter(booking => 
      (!userId || booking.userId === userId) &&
      (!serviceId || booking.serviceId === serviceId)
    );
  }

  async createBooking(data: {
    userId: string;
    serviceId: string;
    date: string;
    time: string;
    seats: number;
    notes?: string;
  }) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate seats availability
    const slots = await this.getAvailableSlots(data.serviceId, data.date);
    const selectedSlot = slots.find(slot => slot.time === data.time);

    if (!selectedSlot) {
      throw new Error('Selected time slot is not available');
    }

    if (data.seats > selectedSlot.availableSeats) {
      throw new Error(`Only ${selectedSlot.availableSeats} seats available for this time slot`);
    }

    const newBooking: Booking = {
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...data,
    };

    this.bookings.push(newBooking);
    return newBooking;
  }

  async updateBookingStatus(id: string, status: Booking['status']) {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');

    booking.status = status;
    return booking;
  }

  async cancelBooking(id: string) {
    return this.updateBookingStatus(id, 'cancelled');
  }
}

export const bookingService = new BookingService();