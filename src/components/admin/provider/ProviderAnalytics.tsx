import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';

export function ProviderAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Revenue"
          value="$12,345"
          change="+12%"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="Total Customers"
          value="234"
          change="+8%"
          icon={<Users className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="Total Bookings"
          value="456"
          change="+15%"
          icon={<Calendar className="w-6 h-6 text-purple-600" />}
        />
        <StatCard
          title="Growth Rate"
          value="23%"
          change="+5%"
          icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
          <div className="space-y-4">
            {[
              { name: 'Service 1', bookings: 145, growth: 12 },
              { name: 'Service 2', bookings: 89, growth: 8 },
              { name: 'Service 3', bookings: 56, growth: 15 },
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.bookings} bookings</p>
                </div>
                <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                  +{service.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="space-y-4">
            {[
              { month: 'March', revenue: 12500, bookings: 150 },
              { month: 'February', revenue: 9800, bookings: 120 },
              { month: 'January', revenue: 8900, bookings: 110 },
            ].map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{data.month}</p>
                  <p className="text-sm text-gray-500">{data.bookings} bookings</p>
                </div>
                <span className="font-semibold text-gray-900">
                  ${data.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  change, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode; 
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
        <span className="text-sm text-green-600 font-medium">{change}</span>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}