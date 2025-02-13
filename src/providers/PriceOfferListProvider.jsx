import React, { useContext, useEffect, useState, useCallback } from "react";
import { useUniversalGet } from '../api/UniversalGet';
import useDeletePriceOffer from '../hooks/useDeletePriceOffer';
import { PencilEditContext } from "./PencilEditProvider";

export const PriceOfferListContext = React.createContext(null);

export function PriceOfferListProvider({ children }) {
  const [priceOffer, isLoading, isFetching, error, setCachedData] = useUniversalGet('PRICE_OFFER');
  const [priceOfferList, setPriceOfferListState] = useState({});
  const { deletePriceOffer } = useDeletePriceOffer();
  const { setIsEditing } = useContext(PencilEditContext);

  const setPriceOfferList = useCallback((updater) => {
    setPriceOfferListState((prevData) => {
      const newData = typeof updater === 'function' ? updater(prevData) : updater;
  
      setCachedData(newData);
      return newData;
    });
  }, [setCachedData]);

  useEffect(() => {
    if (!priceOffer) {
      return;
    }
      setPriceOfferList(priceOffer); 
  }, [priceOffer]);

  const deleteFromContext = async (idList) => {
    const deletedIds = await deletePriceOffer(idList);

    if (!deletedIds || deletedIds.length === 0) {
      return;
    }

    for (let id of deletedIds) {
      setPriceOfferList(priceOfferList => 
          priceOfferList.filter((priceOffer) => priceOffer.id !== id)
      );
    }

    setIsEditing(false);
  }

  return (
    <PriceOfferListContext.Provider value={{ priceOffer: priceOfferList, isLoading, isFetching, error, setPriceOfferList, deleteFromContext }}>
      {children}
    </PriceOfferListContext.Provider>
  );
}