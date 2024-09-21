import React, { useContext, useEffect, useState } from "react";
import { useUniversalGet } from '../api/UniversalGet';
import useDeletePriceOffer from '../hooks/useDeletePriceOffer';
import { PencilEditContext } from "./PencilEditProvider";

export const PriceOfferListContext = React.createContext(null);

export function PriceOfferListProvider({ children }) {
    const [priceOffer, isLoading, error] = useUniversalGet('PRICE_OFFER');
    const [priceOfferList, setPriceOfferList] = useState(priceOffer);
    const { deletePriceOffer } = useDeletePriceOffer();
    const { setIsEditing } = useContext(PencilEditContext);

    useEffect(() => {
      if (priceOffer) {
          setPriceOfferList(priceOffer); 
      }
  }, [priceOffer]);

    const addToPriceOfferList = (priceOffer) => {
      setPriceOfferList([...priceOfferList, priceOffer]);
    }

    const deleteFromPriceOfferList = async (idList) => {
      const deletedIds = await deletePriceOffer(idList);

      for (let id of deletedIds) {
        setPriceOfferList(priceOfferList => 
            priceOfferList.filter((priceOffer) => priceOffer.id !== id)
        );
      }

      setIsEditing(false);
    }

  return (
    <PriceOfferListContext.Provider value={{ priceOffer: priceOfferList, isLoading, error, addToPriceOfferList, deleteFromPriceOfferList }}>
      {children}
    </PriceOfferListContext.Provider>
  );
}