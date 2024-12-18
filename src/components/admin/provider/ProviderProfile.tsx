import React, { useState } from 'react';
import { Camera, MapPin, Globe, Phone, Mail, Star, Calendar, Users } from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore';

interface ProviderProfileData {
  name: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  specialties: string[];
  businessHours: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  rating: number;
  totalReviews: number;
  totalCustomers: number;
  coverImage?: string;
  logo?: string;
}

const mockProfile: ProviderProfileData = {
  name: 'Adventure Sports Center',
  description: 'Leading provider of outdoor adventure activities and sports training. We specialize in creating unforgettable experiences for all skill levels.',
  email: 'contact@adventuresports.com',
  phone: '+1 (555) 123-4567',
  website: 'www.adventuresports.com',
  address: '123 Adventure Lane, Mountain View, CA 94043',
  specialties: ['Rock Climbing', 'Mountain Biking', 'Kayaking', 'Hiking Tours'],
  businessHours: [
    { dayOfWeek: 1, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 5, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 6, startTime: '10:00', endTime: '16:00' },
  ],
  rating: 4.8,
  totalReviews: 156,
  totalCustomers: 1200,
  coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
  logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
};

export function ProviderProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProviderProfileData>(mockProfile);
  const [newSpecialty, setNewSpecialty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    setIsEditing(false);
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      setProfile({
        ...profile,
        specialties: [...profile.specialties, newSpecialty.trim()],
      });
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    setProfile({
      ...profile,
      specialties: profile.specialties.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your server
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          [type === 'cover' ? 'coverImage' : 'logo']: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-64">
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-50 rounded-lg cursor-pointer hover:bg-opacity-70 text-white">
              <Camera className="h-5 w-5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, 'cover')}
              />
            </label>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-6">
              {/* Logo */}
              <div className="relative -mt-16">
                <div className="h-24 w-24 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={profile.logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                    />
                  </label>
                )}
              </div>

              {/* Basic Info */}
              <div className="pt-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-2xl font-bold mb-2 px-2 py-1 border rounded"
                  />
                ) : (
                  <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{profile.rating} ({profile.totalReviews} reviews)</span>
                </div>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About
              </label>
              {isEditing ? (
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600">{profile.description}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className={`pl-10 w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? 'focus:outline-none focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-50'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className={`pl-10 w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? 'focus:outline-none focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-50'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    disabled={!isEditing}
                    className={`pl-10 w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? 'focus:outline-none focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-50'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                    className={`pl-10 w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? 'focus:outline-none focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-50'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialties
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                  >
                    {specialty}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialty(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      placeholder="Add specialty"
                      className="px-3 py-1 border rounded-md text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddSpecialty}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Hours
              </label>
              <div className="space-y-2">
                {profile.businessHours.map((hours, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-24 text-gray-600">
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][hours.dayOfWeek]}
                    </span>
                    {isEditing ? (
                      <>
                        <input
                          type="time"
                          value={hours.startTime}
                          onChange={(e) => {
                            const newHours = [...profile.businessHours];
                            newHours[index].startTime = e.target.value;
                            setProfile({ ...profile, businessHours: newHours });
                          }}
                          className="px-2 py-1 border rounded"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={hours.endTime}
                          onChange={(e) => {
                            const newHours = [...profile.businessHours];
                            newHours[index].endTime = e.target.value;
                            setProfile({ ...profile, businessHours: newHours });
                          }}
                          className="px-2 py-1 border rounded"
                        />
                      </>
                    ) : (
                      <span className="text-gray-600">
                        {hours.startTime} - {hours.endTime}
                      </span>
                    )}
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
                <p className="text-2xl font-semibold">{profile.rating}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Reviews</span>
                </div>
                <p className="text-2xl font-semibold">{profile.totalReviews}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Customers</span>
                </div>
                <p className="text-2xl font-semibold">{profile.totalCustomers}</p>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}