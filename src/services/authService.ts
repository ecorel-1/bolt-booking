import { LoginCredentials } from '../types/auth';

// In-memory storage for registered users
const registeredUsers = new Map();

export const authService = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    if (registeredUsers.has(userData.email)) {
      throw new Error('Email already exists');
    }

    // Store the user
    registeredUsers.set(userData.email, {
      id: crypto.randomUUID(),
      email: userData.email,
      name: userData.name,
      password: userData.password, // In a real app, this should be hashed
      role: 'user',
    });

    return { success: true };
  },

  login: async (credentials: LoginCredentials) => {
    const user = registeredUsers.get(credentials.email);

    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }

    // Create a session token (in a real app, use JWT)
    const token = crypto.randomUUID();

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  },

  // For development/testing
  addMockUsers: () => {
    const mockUsers = [
      {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        password: 'password',
        role: 'admin',
      },
      {
        id: '2',
        email: 'provider@example.com',
        name: 'Service Provider',
        password: 'password',
        role: 'provider',
        providerId: 'p1',
      },
      {
        id: '3',
        email: 'user@example.com',
        name: 'Regular User',
        password: 'password',
        role: 'user',
      },
    ];

    mockUsers.forEach(user => {
      registeredUsers.set(user.email, user);
    });
  },
};

// Add mock users for testing
authService.addMockUsers();