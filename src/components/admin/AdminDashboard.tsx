import React, { useState } from 'react';
import { LayoutGrid, Users, Package, BarChart, Grid } from 'lucide-react';
import { Analytics } from './Analytics';
import { UserManagement } from './UserManagement';
import { ServiceManagement } from './ServiceManagement';
import { CategoryManagement } from './CategoryManagement';

type Tab = 'overview' | 'users' | 'services' | 'categories' | 'analytics';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview' as Tab, name: 'Overview', icon: LayoutGrid },
    { id: 'users' as Tab, name: 'Users', icon: Users },
    { id: 'services' as Tab, name: 'Services', icon: Package },
    { id: 'categories' as Tab, name: 'Categories', icon: Grid },
    { id: 'analytics' as Tab, name: 'Analytics', icon: BarChart },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your platform and monitor performance</p>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
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

      <div className="space-y-6">
        {activeTab === 'overview' && <Analytics />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'services' && <ServiceManagement />}
        {activeTab === 'categories' && <CategoryManagement />}
        {activeTab === 'analytics' && <Analytics />}
      </div>
    </div>
  );
}