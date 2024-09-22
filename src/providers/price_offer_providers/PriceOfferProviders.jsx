import React from 'react';
import { PriceOfferProvider } from './PriceOfferProvider';

const PriceOfferProviders = ({ children }) => {

  return (
      <PriceOfferProvider>
          {children}
      </PriceOfferProvider>
  );
};

export default PriceOfferProviders;
