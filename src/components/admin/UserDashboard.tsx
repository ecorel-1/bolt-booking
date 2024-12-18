import React, { useState } from 'react';
import { Home, Calendar, Award, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PointsDashboard } from '../points/PointsDashboard';
import { UserBookings } from '../bookings/UserBookings';
import { UserProfile } from '../profile/UserProfile';

type Tab = 'bookings' | 'points' | 'profile';

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('bookings');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <Link 
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-5 h-5 mr-2" />
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'points'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Award className="w-5 h-5 mr-2" />
            My Points
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5 mr-2" />
            My Profile
          </button>
        </nav>
      </div>
      
      {activeTab === 'points' && <PointsDashboard />}
      {activeTab === 'bookings' && <UserBookings />}
      {activeTab === 'profile' && <UserProfile />}
    </div>
  );
}