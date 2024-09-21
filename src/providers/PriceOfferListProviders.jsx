import React from 'react';
import { PencilEditProvider } from './PencilEditProvider';
import { PriceOfferListProvider } from './PriceOfferListProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const PriceOfferListProviders = ({ children }) => {

  return (
    <PencilEditProvider>
      <QueryClientProvider client={queryClient}>
        <PriceOfferListProvider>
          {children}
        </PriceOfferListProvider>
      </QueryClientProvider>
    </PencilEditProvider>
  );
};

export default PriceOfferListProviders;
