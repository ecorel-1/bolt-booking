import React from 'react';
import { X, Calendar, Clock, MapPin, User, Award, AlertTriangle } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/dateTime';

interface BookingDetailsProps {
  booking: any;
  onClose: () => void;
}

export function BookingDetails({ booking, onClose }: BookingDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{booking.service.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-gray-600">{formatDate(booking.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-gray-600">{formatTime(booking.time)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-gray-600">{booking.service.location.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Number of Seats</p>
                  <p className="text-gray-600">{booking.seats} seat(s)</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Reward Points</p>
                  <p className="text-gray-600">{booking.service.rewardPoints} points</p>
                </div>
              </div>

              {booking.notes && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Special Requirements</p>
                  <p className="text-gray-600 text-sm">{booking.notes}</p>
                </div>
              )}

              {booking.status === 'pending' && (
                <div className="flex items-center gap-2 bg-yellow-50 p-4 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <p className="text-sm text-yellow-700">
                    Your booking is awaiting confirmation from the provider
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <p className="text-sm text-gray-500">
              Booking Reference: #{booking.id}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Booked on {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}