```typescript
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Check, X, MessageSquare } from 'lucide-react';
import { useBookingStore } from '../../../stores/bookingStore';
import { useAuthStore } from '../../../stores/authStore';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorAlert } from '../../common/ErrorAlert';
import { ManualBooking } from './ManualBooking';
import { formatDate, formatTime } from '../../../utils/dateTime';

export function ProviderBookingManagement() {
  const { user } = useAuthStore();
  const { bookings, loading, error, fetchBookings, updateBookingStatus } = useBookingStore();
  const [showManualBooking, setShowManualBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (user?.providerId) {
      fetchBookings(undefined, user.providerId);
    }
  }, [user?.providerId]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Booking Management</h2>
        <button
          onClick={() => setShowManualBooking(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Manual Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">#{booking.id}</span>
              </div>
              <h3 className="font-semibold">{booking.service.name}</h3>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <div>
                  <p className="text-sm font-medium">{booking.customerName}</p>
                  <p className="text-xs">{booking.customerEmail}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{formatDate(booking.date)}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{formatTime(booking.time)}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm">{booking.seats} seat(s) reserved</span>
              </div>

              {booking.notes && (
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <p className="font-medium">Notes:</p>
                  <p>{booking.notes}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(booking.id, 'confirmed')}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Check className="w-4 h-4" />
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'cancelled')}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                      Decline
                    </button>
                  </div>
                )}
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleStatusChange(booking.id, 'completed')}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Check className="w-4 h-4" />
                    Mark as Completed
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowDetailsModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message Customer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showManualBooking && (
        <ManualBooking
          onClose={() => setShowManualBooking(false)}
          onConfirm={(booking) => {
            // Handle manual booking creation
            setShowManualBooking(false);
          }}
        />
      )}

      {/* Add message modal and booking details modal components */}
    </div>
  );
}
```