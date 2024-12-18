import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';
import { ServiceStats as ServiceStatsType } from '../../../types/service';

interface ServiceStatsProps {
  stats: ServiceStatsType;
}

export function ServiceMetrics({ stats }: ServiceStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Bookings"
        value={stats.totalBookings.toString()}
        icon={<Calendar className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="Total Revenue"
        value={`$${stats.revenue.toLocaleString()}`}
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
      />
      <StatCard
        title="Average Rating"
        value={stats.averageRating.toFixed(1)}
        icon={<TrendingUp className="w-6 h-6 text-yellow-600" />}
      />
      <StatCard
        title="Completion Rate"
        value={`${stats.completionRate}%`}
        icon={<Users className="w-6 h-6 text-purple-600" />}
      />
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}