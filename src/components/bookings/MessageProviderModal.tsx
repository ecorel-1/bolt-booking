import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface MessageProviderModalProps {
  booking: any;
  onClose: () => void;
}

export function MessageProviderModal({ booking, onClose }: MessageProviderModalProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Here you would typically make an API call to send the message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onClose();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Message Provider</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-700">Regarding:</h4>
          <p className="text-gray-600">
            Booking #{booking.id} - {booking.service.name}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(booking.date).toLocaleDateString()} at {booking.time}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <LoadingSpinner size="small" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}