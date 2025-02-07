import React, { useCallback, useEffect, useState } from "react";
import { useUniversalGet } from '../../api/UniversalGet';
import { useParams } from "react-router-dom";
import useUpdatePriceOfferDetails from "../../hooks/useUpdatePriceOfferDetails";

export const PriceOfferContext = React.createContext({
  priceOfferDetails: {},
  setPriceOfferDetails: () => {},
});

export function PriceOfferProvider({ children }) {
  const {
    handleSavePriceOfferDetails, 
  } = useUpdatePriceOfferDetails();
  const { id } = useParams();
  const [priceOffer, isLoading, error] = useUniversalGet('PRICE_OFFER', id);
  const [priceOfferDetails, setPriceOfferDetails] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  const calculateTotal = useCallback((items) => {
      let total = 0;
      let vatBase = 0;
      let vat = 0;

      for (let item of items) {
        const itemVat = item.vat ? item.vat : 23; 

        vatBase += item.price * item.quantity;
        vat += (item.price * item.quantity) * (itemVat / 100);

        total += (item.price * item.quantity) * (itemVat / 100 + 1);
      }

      return {total: total.round(), vatBase: vatBase.round(), vat: vat.round()};
  }, []);

  useEffect(() => {
    setPriceOfferDetails(priceOffer);
  }, [priceOffer]);

  useEffect(() => {
    if (!priceOfferDetails?.items) {
      return;
    }

    const totalPrice = calculateTotal(priceOfferDetails.items);

    if (priceOfferDetails.total == totalPrice.total) {
      return;
    }

    setPriceOfferDetails(prevData => ({
      ...prevData,
      total: totalPrice.total,
      vatBase: totalPrice.vatBase,
      vat: totalPrice.vat
    }));
  }, [priceOfferDetails, calculateTotal]); 

  useEffect(() => {
    if (isInitialized) {
      handleSavePriceOfferDetails(priceOfferDetails);
    }

    if (!isInitialized && priceOfferDetails?.vat) {
      setIsInitialized(true);
    }

  }, [priceOfferDetails]);

  return (
    <PriceOfferContext.Provider value={{ priceOfferDetails, isLoading, error, setPriceOfferDetails }}>
        {children}
    </PriceOfferContext.Provider>
  );
}