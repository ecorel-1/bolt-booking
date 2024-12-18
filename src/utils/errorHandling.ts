import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  
  return 'An unexpected error occurred';
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleApiError(error: unknown): never {
  if (isAxiosError(error)) {
    const statusCode = error.response?.status;
    const message = error.response?.data?.message || error.message;
    
    throw new AppError(message, error.code, statusCode);
  }
  
  if (error instanceof Error) {
    throw new AppError(error.message);
  }
  
  throw new AppError('An unexpected error occurred');
}