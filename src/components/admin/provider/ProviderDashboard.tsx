```typescript
import React, { useState } from 'react';
import { Calendar, DollarSign, Users, Package, Grid, User, Award } from 'lucide-react';
import { ProviderServices } from './services/ProviderServices';
import { ProviderBookings } from './bookings/ProviderBookings';
import { ProviderAnalytics } from './analytics/ProviderAnalytics';
import { ProviderCustomers } from './customers/ProviderCustomers';
import { ProviderProfile } from './profile/ProviderProfile';
import { ProviderRewardsManagement } from './rewards/ProviderRewardsManagement';
import { DashboardTabs } from './DashboardTabs';
import { ProviderOverview } from './overview/ProviderOverview';

type Tab = 'overview' | 'services' | 'bookings' | 'customers' | 'analytics' | 'profile' | 'rewards';

interface DashboardTab {
  id: Tab;
  name: string;
  icon: typeof Grid;
}

export function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: DashboardTab[] = [
    { id: 'overview', name: 'Overview', icon: Grid },
    { id: 'services', name: 'Services', icon: Package },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: DollarSign },
    { id: 'rewards', name: 'Rewards', icon: Award },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProviderOverview />;
      case 'services':
        return <ProviderServices />;
      case 'bookings':
        return <ProviderBookings />;
      case 'customers':
        return <ProviderCustomers />;
      case 'analytics':
        return <ProviderAnalytics />;
      case 'rewards':
        return <ProviderRewardsManagement />;
      case 'profile':
        return <ProviderProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Provider Dashboard</h1>
        <p className="text-gray-600">Manage your services and monitor performance</p>
      </div>

      <DashboardTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={(id) => setActiveTab(id as Tab)} 
      />

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}
```