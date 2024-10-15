import React, { useCallback, useEffect, useState } from "react";
import { useUniversalGet } from '../../api/UniversalGet';
import { useParams } from "react-router-dom";

export const PriceOfferContext = React.createContext(null);

export function PriceOfferProvider({ children }) {
  const { id } = useParams();
  const [priceOffer, isLoading, error] = useUniversalGet('PRICE_OFFER', id);
  const [priceOfferDetails, setPriceOfferDetails] = useState({});
    
  const calculateTotal = useCallback((items) => {
      let total = items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      return total.round();
  }, []);

  useEffect(() => {
    setPriceOfferDetails(priceOffer);
  }, [priceOffer]);

  useEffect(() => {
    if (!priceOfferDetails || !priceOfferDetails.items) {
      return;
    }

    const totalPrice = calculateTotal(priceOfferDetails.items);

    setPriceOfferDetails(prevData => ({
      ...prevData,
      total: totalPrice,
    }));
  }, [priceOfferDetails]);

  return (
    <PriceOfferContext.Provider value={{ priceOfferDetails, isLoading, error, setPriceOfferDetails }}>
        {children}
    </PriceOfferContext.Provider>
  );
}