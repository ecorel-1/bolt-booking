```typescript
import React, { useState } from 'react';
import { Calendar, DollarSign, Users, Package, Grid, User, Award } from 'lucide-react';
import { ProviderServices } from './provider/ProviderServices';
import { ProviderBookings } from './provider/ProviderBookings';
import { ProviderAnalytics } from './provider/ProviderAnalytics';
import { ProviderCustomers } from './provider/ProviderCustomers';
import { ProviderProfile } from './provider/ProviderProfile';
import { ProviderRewardsManagement } from './provider/ProviderRewardsManagement';

type Tab = 'overview' | 'services' | 'bookings' | 'customers' | 'analytics' | 'profile' | 'rewards';

export function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview' as Tab, name: 'Overview', icon: Grid },
    { id: 'services' as Tab, name: 'Services', icon: Package },
    { id: 'bookings' as Tab, name: 'Bookings', icon: Calendar },
    { id: 'customers' as Tab, name: 'Customers', icon: Users },
    { id: 'analytics' as Tab, name: 'Analytics', icon: DollarSign },
    { id: 'rewards' as Tab, name: 'Rewards', icon: Award },
    { id: 'profile' as Tab, name: 'Profile', icon: User },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Provider Dashboard</h1>
        <p className="text-gray-600">Manage your services and monitor performance</p>
      </div>

      <div className="mb-6">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'overview' && <ProviderOverview />}
        {activeTab === 'services' && <ProviderServices />}
        {activeTab === 'bookings' && <ProviderBookings />}
        {activeTab === 'customers' && <ProviderCustomers />}
        {activeTab === 'analytics' && <ProviderAnalytics />}
        {activeTab === 'rewards' && <ProviderRewardsManagement />}
        {activeTab === 'profile' && <ProviderProfile />}
      </div>
    </div>
  );
}

function ProviderOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Calendar className="w-8 h-8 text-blue-500" />}
          title="Today's Bookings"
          value="12"
        />
        <StatCard
          icon={<DollarSign className="w-8 h-8 text-green-500" />}
          title="Monthly Revenue"
          value="$3,456"
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-purple-500" />}
          title="Total Customers"
          value="89"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Booking #{i}</p>
                  <p className="text-sm text-gray-500">Customer {i}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">2:00 PM</p>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Services</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Service {i}</p>
                  <p className="text-sm text-gray-500">${99 * i}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{50 * i} bookings</span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    i === 1 ? 'text-green-700 bg-green-100' : 'text-gray-700 bg-gray-200'
                  }`}>
                    {i === 1 ? 'Trending' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
```