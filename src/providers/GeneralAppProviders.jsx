import React from 'react';
import { UserInfoProvider } from './UserInfoProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from '../error/ErrorBoundary';
import { SnackBarWrapper } from './SnackBarProvider';

const queryClient = new QueryClient();

const GeneralAppProviders = ({ children }) => {

  return (
    <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
            <SnackBarWrapper>
                <UserInfoProvider>
                    {children}
                </UserInfoProvider>
            </SnackBarWrapper>
        </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default GeneralAppProviders;
