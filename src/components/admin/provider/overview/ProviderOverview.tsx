```typescript
import React from 'react';
import { Calendar, DollarSign, Users } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { RecentBookings } from './RecentBookings';
import { PopularServices } from './PopularServices';

export function ProviderOverview() {
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
        <RecentBookings />
        <PopularServices />
      </div>
    </div>
  );
}
```