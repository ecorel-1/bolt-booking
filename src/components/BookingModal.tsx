import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Service } from '../types';

interface BookingModalProps {
  service: Service;
  onClose: () => void;
  onConfirm: (date: string) => void;
}

export function BookingModal({ service, onClose, onConfirm }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(selectedDate);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Book {service.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Date and Time</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-lg"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}