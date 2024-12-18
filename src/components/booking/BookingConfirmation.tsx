import React from 'react';
import { Check, Calendar, Clock, MapPin, Award } from 'lucide-react';
import { ServiceDetails } from '../../types/service';
import { formatDate, formatTime } from '../../utils/dateTime';

interface BookingConfirmationProps {
  booking: {
    id: string;
    date: string;
    time: string;
    notes?: string;
  };
  service: ServiceDetails;
  onClose: () => void;
}

export function BookingConfirmation({ booking, service, onClose }: BookingConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
          <p className="text-gray-600 mt-2">
            Your booking has been successfully confirmed. A confirmation email has been sent to your registered email address.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <span>{formatDate(booking.date)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-3" />
              <span>{formatTime(booking.time)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{service.location.address}</span>
            </div>

            {service.rewardPoints > 0 && (
              <div className="flex items-center text-purple-600">
                <Award className="w-5 h-5 mr-3" />
                <span>You'll earn {service.rewardPoints} points</span>
              </div>
            )}
          </div>

          {booking.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-2">Special Requirements</h4>
              <p className="text-gray-600">{booking.notes}</p>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500 mb-6">
          <p>Booking Reference: #{booking.id}</p>
          <p className="mt-1">
            Need to make changes? You can manage your booking from your dashboard.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}