import React, { useContext, useEffect, useState } from "react";
import { useUniversalGet } from '../api/UniversalGet';
import useDeletePriceOffer from '../hooks/useDeletePriceOffer';
import { PencilEditContext } from "./PencilEditProvider";

export const PriceOfferListContext = React.createContext(null);

export function PriceOfferListProvider({ children }) {
  const [priceOffer, isLoading, error] = useUniversalGet('PRICE_OFFER');
  const [priceOfferList, setPriceOfferList] = useState({});
  const { deletePriceOffer } = useDeletePriceOffer();
  const { setIsEditing } = useContext(PencilEditContext);

  useEffect(() => {
      setPriceOfferList(priceOffer); 
  }, [priceOffer]);

  const addToPriceOfferList = (priceOffer) => {
    setPriceOfferList([...priceOfferList, priceOffer]);
  }

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
    <PriceOfferListContext.Provider value={{ priceOffer: priceOfferList, isLoading, error, addToPriceOfferList, deleteFromContext }}>
      {children}
    </PriceOfferListContext.Provider>
  );
}