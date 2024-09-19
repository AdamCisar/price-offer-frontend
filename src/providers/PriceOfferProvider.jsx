import React from "react";
import { useUniversalFetch } from '../api/UniversalFetch';

export const PriceOfferContext = React.createContext(null);

export function PriceOfferProvider({ children }) {
    const [priceOffer, isLoading, error] = useUniversalFetch('PRICE_OFFER');

  return (
    <PriceOfferContext.Provider value={{ priceOffer, isLoading, error }}>
      {children}
    </PriceOfferContext.Provider>
  );
}