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
  const [priceOffer, isLoading, isFetching, error, setCachedData] = useUniversalGet('PRICE_OFFER', id);
  const [priceOfferDetails, setPriceOfferDetailsState] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  const calculateTotal = useCallback((items) => {
      let total = 0;
      let vatBase = 0;
      let vat = 0;
      let discount = 0;

      for (let item of items) {
        const itemVat = item.vat ? item.vat : 23; 

        vatBase += item.price * item.quantity;
        vat += (item.price * item.quantity) * (itemVat / 100);
        total += (item.price * item.quantity) * (itemVat / 100 + 1);
        discount += item.price < 0 ? Number(item.price) : 0;
      }

      return {total: total, vatBase: vatBase, vat: vat, discount: discount};
  }, []);

  const setPriceOfferDetails = useCallback((updater) => {
    setPriceOfferDetailsState((prevData) => {
      const newData = typeof updater === 'function' ? updater(prevData) : updater;
  
      setCachedData(newData);
      return newData;
    });

  }, [setCachedData]);
  
  useEffect(() => {
    if (!priceOffer) {
      return;
    }
    setPriceOfferDetails(priceOffer);
  }, [priceOffer]);

  useEffect(() => {
    if (!priceOfferDetails?.items) {
      return;
    }

    const totalPrice = calculateTotal(priceOfferDetails.items);

    if (priceOfferDetails.total === totalPrice.total && priceOfferDetails.vatBase === totalPrice.vatBase && priceOfferDetails.vat === totalPrice.vat && priceOfferDetails.discount === totalPrice.discount) {
      return;
    }

    setPriceOfferDetails(prevData => ({
      ...prevData,
      total: totalPrice.total,
      vatBase: totalPrice.vatBase,
      vat: totalPrice.vat,
      discount: totalPrice.discount,
    }));
  }, [priceOfferDetails, calculateTotal]); 

  useEffect(() => {
    if (!isLoading && !isFetching && !isInitialized && priceOfferDetails?.vat !== undefined) {
      setIsInitialized(true);
      return;
    }
    
    handleSavePriceOfferDetails(priceOfferDetails);
  }, [priceOfferDetails]);

  return (
    <PriceOfferContext.Provider value={{ priceOfferDetails, isLoading, isFetching, error, setPriceOfferDetails }}>
        {children}
    </PriceOfferContext.Provider>
  );
}