export type UserRole = 'admin' | 'provider' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  providerId?: string; // Only for service providers
}

export interface LoginCredentials {
  email: string;
  password: string;
}