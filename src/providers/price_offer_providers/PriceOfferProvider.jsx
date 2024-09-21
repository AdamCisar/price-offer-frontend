import React from "react";
import { useUniversalGet } from '../../api/UniversalGet';
import { useParams } from "react-router-dom";

export const PriceOfferContext = React.createContext(null);

export function PriceOfferProvider({ children }) {
    const { id } = useParams();
    const [priceOffer, isLoading, error] = useUniversalGet('PRICE_OFFER', id);

  return (
    <PriceOfferContext.Provider value={{ priceOffer, isLoading, error }}>
        {children}
    </PriceOfferContext.Provider>
  );
}