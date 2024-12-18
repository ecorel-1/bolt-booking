import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { AdminDashboard } from './AdminDashboard';
import { ProviderDashboard } from './ProviderDashboard';
import { UserDashboard } from './UserDashboard';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'provider':
      return <ProviderDashboard />;
    case 'user':
      return <UserDashboard />;
    default:
      return null;
  }
}