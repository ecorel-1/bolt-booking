```typescript
import React from 'react';

export function PopularServices() {
  return (
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
  );
}
```