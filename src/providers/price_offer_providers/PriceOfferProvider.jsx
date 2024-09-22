import React, { useEffect, useState } from "react";
import { useUniversalGet } from '../../api/UniversalGet';
import { useParams } from "react-router-dom";

export const PriceOfferContext = React.createContext(null);

export function PriceOfferProvider({ children }) {
    const { id } = useParams();
    const [priceOffer, isLoading, error] = useUniversalGet('PRICE_OFFER', id);
    const [priceOfferDetails, setPriceOfferDetails] = useState({});

    useEffect(() => {
      setPriceOfferDetails(priceOffer);
    }, [priceOffer]);

  return (
    <PriceOfferContext.Provider value={{ priceOfferDetails, isLoading, error, setPriceOfferDetails }}>
        {children}
    </PriceOfferContext.Provider>
  );
}