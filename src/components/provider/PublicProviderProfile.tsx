import React from 'react';
import { X, MapPin, Globe, Phone, Mail, Star, Calendar, Users } from 'lucide-react';
import { mockProviders } from '../../data/providers';

interface PublicProviderProfileProps {
  providerId: string;
  onClose: () => void;
}

export function PublicProviderProfile({ providerId, onClose }: PublicProviderProfileProps) {
  const provider = mockProviders.find(p => p.id === providerId);

  if (!provider) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Provider Not Found</h2>
          <p className="mt-2 text-gray-600">The provider you're looking for doesn't exist.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Cover Image */}
        <div className="relative h-64">
          <img
            src={provider.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex gap-6">
            {/* Logo */}
            <div className="relative -mt-16">
              <div className="h-24 w-24 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={provider.logo}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="pt-2">
              <h1 className="text-2xl font-bold mb-2">{provider.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>{provider.rating} ({provider.totalReviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Description */}
            <p className="text-gray-600">{provider.description}</p>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{provider.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{provider.phone}</span>
              </div>
              {provider.website && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="h-5 w-5" />
                  <a href={`https://${provider.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {provider.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{provider.address}</span>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {provider.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Business Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {provider.businessHours.map((hours, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-24 text-gray-600">
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][hours.dayOfWeek]}
                    </span>
                    <span className="text-gray-600">
                      {hours.startTime} - {hours.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Star className="h-5 w-5" />
                  <span className="text-sm">Rating</span>
                </div>
                <p className="text-2xl font-semibold">{provider.rating}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Reviews</span>
                </div>
                <p className="text-2xl font-semibold">{provider.totalReviews}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Customers</span>
                </div>
                <p className="text-2xl font-semibold">{provider.totalCustomers}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}