import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PriceOfferProvider } from './PriceOfferProvider';

const queryClient = new QueryClient();

const PriceOfferProviders = ({ children }) => {

  return (
    <QueryClientProvider client={queryClient}>
        <PriceOfferProvider>
            {children}
        </PriceOfferProvider>
    </QueryClientProvider>
  );
};

export default PriceOfferProviders;
