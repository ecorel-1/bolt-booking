import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$12,345"
          change="+12%"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="Active Users"
          value="1,234"
          change="+8%"
          icon={<Users className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="Total Bookings"
          value="3,456"
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
              { name: 'Yoga Classes', bookings: 245, growth: 12 },
              { name: 'Gym Access', bookings: 189, growth: 8 },
              { name: 'Swimming', bookings: 156, growth: 15 },
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
          <h3 className="text-lg font-semibold mb-4">Top Providers</h3>
          <div className="space-y-4">
            {[
              { name: 'Downtown Fitness', revenue: 12500, customers: 450 },
              { name: 'Zen Studio', revenue: 9800, customers: 320 },
              { name: 'Adventure Sports', revenue: 8900, customers: 280 },
            ].map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-sm text-gray-500">{provider.customers} customers</p>
                </div>
                <span className="font-semibold text-gray-900">
                  ${provider.revenue.toLocaleString()}
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