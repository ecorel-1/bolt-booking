import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, MessageSquare, X, Edit2 } from 'lucide-react';
import { ServiceDetails } from '../../../types/service';

interface Booking {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  service: ServiceDetails;
  customerName: string;
  customerEmail: string;
  notes?: string;
}

interface MessageModalProps {
  booking: Booking;
  onClose: () => void;
  onSend: (message: string) => void;
}

function MessageModal({ booking, onClose, onSend }: MessageModalProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(message);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Message Customer</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To: {booking.customerName}
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface RescheduleModalProps {
  booking: Booking;
  onClose: () => void;
  onReschedule: (date: string, time: string) => void;
}

function RescheduleModal({ booking, onClose, onReschedule }: RescheduleModalProps) {
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReschedule(date, time);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Reschedule Booking</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Time
            </label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mockBookings: Booking[] = [
  {
    id: '1',
    serviceId: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    date: '2024-03-20',
    time: '10:00',
    status: 'upcoming',
    service: {
      id: '1',
      name: 'Yoga Class',
      description: 'Relaxing yoga session',
      location: {
        address: '123 Wellness St',
        latitude: 40.7128,
        longitude: -74.006,
      },
      pricing: {
        type: 'paid',
        price: 25,
      },
      duration: '1 hour',
      categoryId: '2',
      providerId: 'p1',
      maxCapacity: 15,
      status: 'active',
      media: [],
      rewardPoints: 50,
      schedule: [],
      minBookingNotice: 24,
      maxBookingAdvance: 30,
      slug: 'yoga-class',
      bookingsCount: 0,
      rating: 0,
      createdAt: '',
      updatedAt: '',
    },
  },
];

export function ProviderBookings() {
  const [bookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const handleCancel = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // Here you would typically make an API call to cancel the booking
      console.log('Cancelling booking:', bookingId);
    }
  };

  const handleMessage = (message: string) => {
    // Here you would typically make an API call to send the message
    console.log('Sending message:', message);
  };

  const handleReschedule = (date: string, time: string) => {
    // Here you would typically make an API call to reschedule the booking
    console.log('Rescheduling booking:', { date, time });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Upcoming Bookings</h2>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">{booking.customerName}</h3>
                    <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{booking.service.location.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{booking.service.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowMessageModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowRescheduleModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded-md"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Reschedule</span>
                </button>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showMessageModal && selectedBooking && (
        <MessageModal
          booking={selectedBooking}
          onClose={() => {
            setShowMessageModal(false);
            setSelectedBooking(null);
          }}
          onSend={handleMessage}
        />
      )}

      {showRescheduleModal && selectedBooking && (
        <RescheduleModal
          booking={selectedBooking}
          onClose={() => {
            setShowRescheduleModal(false);
            setSelectedBooking(null);
          }}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  );
}