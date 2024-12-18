import React, { useState } from 'react';
import { 
  MapPin, Clock, Award, Calendar, Star, Users, Info, 
  ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import { ServiceDetails } from '../../types/service';
import { ServiceBooking } from '../booking/ServiceBooking';
import { PublicProviderProfile } from '../provider/PublicProviderProfile';
import { mockProviders } from '../../data/providers';

interface ServiceDetailsModalProps {
  service: ServiceDetails;
  onClose: () => void;
}

export function ServiceDetailsModal({ service, onClose }: ServiceDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showProviderProfile, setShowProviderProfile] = useState(false);

  const provider = mockProviders.find(p => p.id === service.providerId);

  if (!provider) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? service.media.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === service.media.length - 1 ? 0 : prev + 1
    );
  };

  const handleBookingConfirm = (booking: any) => {
    // Here you would typically make an API call to create the booking
    console.log('Booking confirmed:', booking);
    onClose();
  };

  if (showProviderProfile) {
    return (
      <PublicProviderProfile 
        providerId={service.providerId} 
        onClose={() => setShowProviderProfile(false)} 
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Image Gallery */}
          <div className="relative h-96">
            <img
              src={service.media[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            
            {service.media.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {service.media.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-1 font-medium">{service.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500">{service.bookingsCount} bookings</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {service.pricing.type === 'free' ? 'Free' : `$${service.pricing.price}`}
                </div>
                {service.pricing.bookingFee > 0 && (
                  <span className="text-sm text-gray-500">
                    +${service.pricing.bookingFee} booking fee
                  </span>
                )}
              </div>
            </div>

            {/* Provider Info */}
            <div
              onClick={() => setShowProviderProfile(true)}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{provider.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{provider.rating} ({provider.totalReviews} reviews)</span>
                </div>
              </div>
              <span className="ml-auto text-blue-600">View Profile →</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About this service</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Service Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{service.location.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2" />
                      <span>Maximum {service.maxCapacity} participants</span>
                    </div>
                    <div className="flex items-center text-purple-600">
                      <Award className="w-5 h-5 mr-2" />
                      <span>Earn {service.rewardPoints} points</span>
                    </div>
                  </div>
                </div>

                {(service.requirements?.length > 0 || service.equipment?.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <div className="space-y-2">
                      {service.requirements?.map((req, index) => (
                        <div key={index} className="flex items-start">
                          <Info className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{req}</span>
                        </div>
                      ))}
                      {service.equipment?.map((eq, index) => (
                        <div key={index} className="flex items-start">
                          <Info className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Schedule</h3>
                  <div className="space-y-2">
                    {service.schedule.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                          <span className="font-medium">
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][slot.dayOfWeek]}
                          </span>
                        </div>
                        <div className="text-gray-600">
                          {slot.startTime} - {slot.endTime}
                        </div>
                        <div className="text-sm text-gray-500">
                          {slot.slots} slots available
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Booking Information</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>• Book at least {service.minBookingNotice} hours in advance</p>
                    <p>• Can book up to {service.maxBookingAdvance} days ahead</p>
                    {service.cancellationPolicy && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900">Cancellation Policy</h4>
                        <p className="mt-1">{service.cancellationPolicy}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t pt-6">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => setShowBooking(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <ServiceBooking
          service={service}
          onClose={() => setShowBooking(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
}