import React, { useEffect, useState } from "react";
import { useUniversalGet } from '../../api/UniversalGet';
import { useParams } from "react-router-dom";

export const PriceOfferContext = React.createContext(null);

export function PriceOfferProvider({ children }) {
    const { id } = useParams();
    const [priceOffer, isLoading, error] = useUniversalGet('PRICE_OFFER', id);
    const [priceOfferDetails, setPriceOfferDetails] = useState({});

    const calculateTotalPriceForItem = (priceOffer) => {
      const updatedItems = priceOffer?.items?.map(item => ({
          ...item,
          total: item.quantity * item.price,
      }));
  
      return {
          ...priceOffer,
          items: updatedItems,
      };
  }

    useEffect(() => {
      setPriceOfferDetails(priceOffer);
    }, [priceOffer]);

    useEffect(() => {
      const calculatedPriceOfferData = calculateTotalPriceForItem(priceOfferDetails);
      setPriceOfferDetails(calculatedPriceOfferData);
    }, [priceOfferDetails]);

  return (
    <PriceOfferContext.Provider value={{ priceOfferDetails, isLoading, error, setPriceOfferDetails }}>
        {children}
    </PriceOfferContext.Provider>
  );
}