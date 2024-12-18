import { create } from 'zustand';
import { AuthUser } from '../types/auth';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  hasRole: (role: AuthUser['role']) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
  isAuthenticated: () => !!get().token,
  hasRole: (role) => get().user?.role === role,
}));