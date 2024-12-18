const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function storeToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function storeUser(user: any): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getStoredUser(): any {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}