import React, { useEffect, useState } from "react";
import { useUniversalFetch } from '../api/UniversalFetch';

export const PriceOfferContext = React.createContext(null);

export function PriceOfferProvider({ children }) {
    const [priceOffer, isLoading, error] = useUniversalFetch('PRICE_OFFER');
    const [priceOfferList, setPriceOfferList] = useState(priceOffer);

    useEffect(() => {
      if (priceOffer) {
          setPriceOfferList(priceOffer); 
      }
  }, [priceOffer]);

    const updatePriceOffer = (priceOffer) => {
      setPriceOfferList([...priceOfferList, priceOffer]);
    }

  return (
    <PriceOfferContext.Provider value={{ priceOffer: priceOfferList, isLoading, error, updatePriceOffer }}>
      {children}
    </PriceOfferContext.Provider>
  );
}