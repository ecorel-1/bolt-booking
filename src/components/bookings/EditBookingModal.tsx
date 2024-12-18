import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X, Users } from 'lucide-react';
import { useBookingStore } from '../../stores/bookingStore';
import { bookingService } from '../../services/bookingService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { TimeSlot } from '../../types/booking';

interface EditBookingModalProps {
  booking: any;
  onClose: () => void;
}

export function EditBookingModal({ booking, onClose }: EditBookingModalProps) {
  const { updateBooking } = useBookingStore();
  const [formData, setFormData] = useState({
    date: booking.date,
    time: booking.time,
    seats: booking.seats,
    notes: booking.notes || '',
  });
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots();
    }
  }, [formData.date]);

  const fetchAvailableSlots = async () => {
    setLoading(true);
    try {
      const slots = await bookingService.getAvailableSlots(booking.service.id, formData.date);
      setAvailableSlots(slots);
    } catch (err) {
      setError('Failed to fetch available slots');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedBooking = await updateBooking(booking.id, formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Booking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + booking.service.maxBookingAdvance * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.date}
                onChange={(e) => {
                  setFormData({ ...formData, date: e.target.value, time: '' });
                  setError(null);
                }}
              />
            </div>
          </div>

          {loading && <LoadingSpinner />}

          {formData.date && !loading && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time
              </label>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setFormData({ ...formData, time: slot.time })}
                      disabled={slot.availableSeats === 0 && slot.time !== formData.time}
                      className={`p-2 text-sm rounded-md flex flex-col items-center ${
                        formData.time === slot.time
                          ? 'bg-blue-600 text-white'
                          : slot.availableSeats === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{slot.time}</span>
                      <span className="text-xs mt-1">
                        {slot.availableSeats} seats left
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No available slots for this date
                </p>
              )}
            </div>
          )}

          {formData.time && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Seats
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max={availableSlots.find(slot => slot.time === formData.time)?.availableSeats || 1}
                    required
                    className="pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requirements
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requirements or notes..."
                />
              </div>
            </>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.date || !formData.time}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}