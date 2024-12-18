import { LoginCredentials } from '../../types/auth';
import apiClient from '../api/apiClient';
import { storeToken, storeUser, removeStoredToken } from './tokenStorage';
import { hashPassword } from '../../utils/crypto';

export class AuthService {
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await hashPassword(userData.password);
    
    try {
      const response = await apiClient.post('/auth/register', {
        ...userData,
        password: hashedPassword,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error('Email already exists');
      }
      throw new Error('Registration failed');
    }
  }

  async login(credentials: LoginCredentials) {
    try {
      const hashedPassword = await hashPassword(credentials.password);
      const response = await apiClient.post('/auth/login', {
        email: credentials.email,
        password: hashedPassword,
      });

      const { user, token } = response.data;
      storeToken(token);
      storeUser(user);

      return { user, token };
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials');
      }
      throw new Error('Login failed');
    }
  }

  logout() {
    removeStoredToken();
    window.location.href = '/login';
  }

  async requestPasswordReset(email: string) {
    try {
      await apiClient.post('/auth/password-reset/request', { email });
      return true;
    } catch (error) {
      throw new Error('Failed to request password reset');
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const hashedPassword = await hashPassword(newPassword);
      await apiClient.post('/auth/password-reset/confirm', {
        token,
        password: hashedPassword,
      });
      return true;
    } catch (error) {
      throw new Error('Failed to reset password');
    }
  }

  async verifyEmail(token: string) {
    try {
      await apiClient.post('/auth/verify-email', { token });
      return true;
    } catch (error) {
      throw new Error('Failed to verify email');
    }
  }
}

export const authService = new AuthService();