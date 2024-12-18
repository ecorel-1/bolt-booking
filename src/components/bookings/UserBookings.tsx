import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, MessageSquare, X, Edit2, AlertTriangle } from 'lucide-react';
import { useBookingStore } from '../../stores/bookingStore';
import { useAuthStore } from '../../stores/authStore';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorAlert } from '../common/ErrorAlert';
import { formatDate, formatTime } from '../../utils/dateTime';
import { BookingDetails } from './BookingDetails';
import { EditBookingModal } from './EditBookingModal';
import { MessageProviderModal } from './MessageProviderModal';
import { CancelBookingModal } from './CancelBookingModal';

export function UserBookings() {
  const { user } = useAuthStore();
  const { bookings, loading, error, fetchBookings } = useBookingStore();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchBookings(user.id);
    }
  }, [user?.id, fetchBookings]);

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

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleEdit = (booking: any) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };

  const handleMessage = (booking: any) => {
    setSelectedBooking(booking);
    setShowMessageModal(true);
  };

  const handleCancel = (booking: any) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!bookings.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="mb-4">
          <Calendar className="w-12 h-12 mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Yet</h3>
        <p className="text-gray-600">
          You haven't made any bookings yet. Start exploring our services and book your next adventure!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">My Bookings</h2>
          
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Booking #{booking.id}
                      </span>
                    </div>
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{booking.service.name}</h3>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {formatDate(booking.date)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {formatTime(booking.time)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {booking.service.location.address}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleEdit(booking)}
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleCancel(booking)}
                            className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleMessage(booking)}
                        className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-md"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="mt-4 flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-md">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-sm">
                        Awaiting confirmation from provider
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedBooking && showDetailsModal && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => {
            setSelectedBooking(null);
            setShowDetailsModal(false);
          }}
        />
      )}

      {selectedBooking && showEditModal && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={() => {
            setSelectedBooking(null);
            setShowEditModal(false);
          }}
        />
      )}

      {selectedBooking && showMessageModal && (
        <MessageProviderModal
          booking={selectedBooking}
          onClose={() => {
            setSelectedBooking(null);
            setShowMessageModal(false);
          }}
        />
      )}

      {selectedBooking && showCancelModal && (
        <CancelBookingModal
          booking={selectedBooking}
          onClose={() => {
            setSelectedBooking(null);
            setShowCancelModal(false);
          }}
        />
      )}
    </div>
  );
}