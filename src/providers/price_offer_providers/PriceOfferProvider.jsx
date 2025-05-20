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
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        const itemVat = Number(item.price) < 0 ? 0 : 23;
        item.vat = itemVat;

        total += (price * quantity) * (itemVat / 100 + 1);
        discount += price < 0 ? price : 0;
        
        if (price > 0) {
          vatBase += price * quantity
          vat += (price * quantity) * (itemVat / 100);
        }
      }

      return {total: total, vatBase: vatBase, vat: vat, discount: discount};
  }, []);

  const setPriceOfferDetails = (updater) => {
    setPriceOfferDetailsState((prevData) => {
      let newData = typeof updater === 'function' ? updater(prevData) : updater;
      newData = { ...newData, ...calculateTotal(newData.items) };
  
      isInitialized && handleSavePriceOfferDetails(newData);
      setCachedData(newData);
      return newData;
    });
  };
  
  useEffect(() => {
    if (!priceOffer || isInitialized) {
      return;
    }

    setPriceOfferDetails(priceOffer);
    setIsInitialized(true);
  }, [priceOffer]);

  return (
    <PriceOfferContext.Provider value={{ priceOfferDetails, isLoading, isFetching, error, setPriceOfferDetails }}>
        {children}
    </PriceOfferContext.Provider>
  );
}