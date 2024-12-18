import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useBookingStore } from '../../stores/bookingStore';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface CancelBookingModalProps {
  booking: any;
  onClose: () => void;
}

export function CancelBookingModal({ booking, onClose }: CancelBookingModalProps) {
  const { cancelBooking } = useBookingStore();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await cancelBooking(booking.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Cancel Booking</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Are you sure you want to cancel this booking?
          </p>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium">{booking.service.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(booking.date).toLocaleDateString()} at {booking.time}
            </p>
            <p className="text-sm text-gray-500">
              {booking.seats} seat(s) reserved
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cancellation Reason (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please let us know why you're cancelling..."
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Keep Booking
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <LoadingSpinner size="small" />}
              Cancel Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}