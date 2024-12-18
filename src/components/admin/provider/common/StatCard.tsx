```typescript
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export function StatCard({ icon, title, value }: StatCardProps) {
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