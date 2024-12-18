```typescript
import React from 'react';

export function RecentBookings() {
  return (
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
  );
}
```