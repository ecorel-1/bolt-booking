import React, { useState } from 'react';
import { X, Plus, Trash2, Clock, MapPin } from 'lucide-react';
import { ServiceFormData, ServiceSchedule, ServiceMedia } from '../../../types/service';
import { Category } from '../../../types/category';

interface ServiceFormProps {
  formData: ServiceFormData;
  categories: Category[];
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: Partial<ServiceFormData>) => void;
  onClose: () => void;
  isEditing: boolean;
}

export function ServiceForm({
  formData,
  categories,
  onSubmit,
  onChange,
  onClose,
  isEditing,
}: ServiceFormProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'schedule' | 'media' | 'policies'>('basic');

  const handleScheduleChange = (index: number, field: keyof ServiceSchedule, value: any) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    onChange({ schedule: newSchedule });
  };

  const addSchedule = () => {
    onChange({
      schedule: [
        ...formData.schedule,
        { dayOfWeek: 0, startTime: '09:00', endTime: '17:00', slots: 1 },
      ],
    });
  };

  const removeSchedule = (index: number) => {
    const newSchedule = formData.schedule.filter((_, i) => i !== index);
    onChange({ schedule: newSchedule });
  };

  const addMedia = () => {
    onChange({
      media: [
        ...formData.media,
        { type: 'image', url: '', description: '' },
      ],
    });
  };

  const removeMedia = (index: number) => {
    const newMedia = formData.media.filter((_, i) => i !== index);
    onChange({ media: newMedia });
  };

  const handleMediaChange = (index: number, field: keyof ServiceMedia, value: string) => {
    const newMedia = [...formData.media];
    newMedia[index] = { ...newMedia[index], [field]: value };
    onChange({ media: newMedia });
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'media', label: 'Media' },
    { id: 'policies', label: 'Policies' },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isEditing ? 'Edit Service' : 'Add New Service'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.categoryId}
                    onChange={(e) => onChange({ categoryId: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pricing Type
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.pricing.type}
                    onChange={(e) => onChange({
                      pricing: { ...formData.pricing, type: e.target.value as 'free' | 'paid' }
                    })}
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                {formData.pricing.type === 'paid' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.pricing.price}
                        onChange={(e) => onChange({
                          pricing: { ...formData.pricing, price: parseFloat(e.target.value) }
                        })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Booking Fee ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.pricing.bookingFee}
                        onChange={(e) => onChange({
                          pricing: { ...formData.pricing, bookingFee: parseFloat(e.target.value) }
                        })}
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 1 hour"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.duration}
                    onChange={(e) => onChange({ duration: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.maxCapacity}
                    onChange={(e) => onChange({ maxCapacity: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reward Points
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.rewardPoints}
                    onChange={(e) => onChange({ rewardPoints: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.status}
                    onChange={(e) => onChange({ status: e.target.value as 'active' | 'inactive' })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => onChange({ description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.location.address}
                    onChange={(e) => onChange({
                      location: { ...formData.location, address: e.target.value }
                    })}
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Latitude"
                      step="any"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.location.latitude}
                      onChange={(e) => onChange({
                        location: { ...formData.location, latitude: parseFloat(e.target.value) }
                      })}
                    />
                    <input
                      type="number"
                      placeholder="Longitude"
                      step="any"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.location.longitude}
                      onChange={(e) => onChange({
                        location: { ...formData.location, longitude: parseFloat(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Service Schedule</h4>
                <button
                  type="button"
                  onClick={addSchedule}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Schedule
                </button>
              </div>

              {formData.schedule.map((schedule, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <select
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={schedule.dayOfWeek}
                    onChange={(e) => handleScheduleChange(index, 'dayOfWeek', parseInt(e.target.value))}
                  >
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                      .map((day, i) => (
                        <option key={i} value={i}>{day}</option>
                      ))}
                  </select>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <input
                      type="time"
                      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={schedule.startTime}
                      onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                    />
                    <span>to</span>
                    <input
                      type="time"
                      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={schedule.endTime}
                      onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                    />
                  </div>

                  <input
                    type="number"
                    min="1"
                    placeholder="Slots"
                    className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={schedule.slots}
                    onChange={(e) => handleScheduleChange(index, 'slots', parseInt(e.target.value))}
                  />

                  <button
                    type="button"
                    onClick={() => removeSchedule(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Media Gallery</h4>
                <button
                  type="button"
                  onClick={addMedia}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Media
                </button>
              </div>

              {formData.media.map((media, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <select
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={media.type}
                    onChange={(e) => handleMediaChange(index, 'type', e.target.value as 'image' | 'video')}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>

                  <input
                    type="url"
                    placeholder="Media URL"
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={media.url}
                    onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Description"
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={media.description || ''}
                    onChange={(e) => handleMediaChange(index, 'description', e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Booking Notice (hours)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.minBookingNotice}
                    onChange={(e) => onChange({ minBookingNotice: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Booking Advance (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.maxBookingAdvance}
                    onChange={(e) => onChange({ maxBookingAdvance: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cancellation Policy
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.cancellationPolicy || ''}
                  onChange={(e) => onChange({ cancellationPolicy: e.target.value })}
                  placeholder="Describe your cancellation policy..."
                />
              </div>

              {formData.pricing.type === 'paid' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refund Policy
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.pricing.refundPolicy || ''}
                    onChange={(e) => onChange({
                      pricing: { ...formData.pricing, refundPolicy: e.target.value }
                    })}
                    placeholder="Describe your refund policy..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.requirements?.join('\n') || ''}
                  onChange={(e) => onChange({
                    requirements: e.target.value.split('\n').filter(Boolean)
                  })}
                  placeholder="Enter requirements (one per line)..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.equipment?.join('\n') || ''}
                  onChange={(e) => onChange({
                    equipment: e.target.value.split('\n').filter(Boolean)
                  })}
                  placeholder="Enter required equipment (one per line)..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isEditing ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}