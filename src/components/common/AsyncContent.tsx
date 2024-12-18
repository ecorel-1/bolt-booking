import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorAlert } from './ErrorAlert';

interface AsyncContentProps<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
  children: (data: T) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

export function AsyncContent<T>({
  loading,
  error,
  data,
  children,
  loadingComponent,
  errorComponent,
}: AsyncContentProps<T>) {
  if (loading) {
    return loadingComponent || <LoadingSpinner fullScreen />;
  }

  if (error) {
    return errorComponent || <ErrorAlert message={error.message} />;
  }

  if (!data) {
    return null;
  }

  return <>{children(data)}</>;
}