import React from 'react';
import { PencilEditProvider } from './PencilEditProvider';
import { PriceOfferListProvider } from './PriceOfferListProvider';

const PriceOfferListProviders = ({ children }) => {

  return (
    <PencilEditProvider>
        <PriceOfferListProvider>
          {children}
        </PriceOfferListProvider>
    </PencilEditProvider>
  );
};

export default PriceOfferListProviders;
