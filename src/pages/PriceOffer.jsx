import React from 'react';
import PriceOfferCards from '../components/PriceOfferCards';
import { PriceOfferProvider } from '../providers/PriceOfferProvider';
import {
    QueryClient,
    QueryClientProvider
  } from '@tanstack/react-query'

const PriceOffer = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <PriceOfferProvider>
                <PriceOfferCards />
            </PriceOfferProvider>
        </QueryClientProvider>
    );
};

export default PriceOffer;