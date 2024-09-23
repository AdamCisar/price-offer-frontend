import React from 'react';
import { UserInfoProvider } from './UserInfoProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from '../error/ErrorBoundary';
import { SnackBarProvider } from './SnackBarProvider';

const queryClient = new QueryClient();

const GeneralAppProviders = ({ children }) => {

  return (
    <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
            <SnackBarProvider>
                <UserInfoProvider>
                    {children}
                </UserInfoProvider>
            </SnackBarProvider>
        </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default GeneralAppProviders;
