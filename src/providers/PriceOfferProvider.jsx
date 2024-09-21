import React, { useEffect, useState } from "react";
import { useUniversalGet } from '../api/UniversalGet';
import useDeletePriceOffer from '../hooks/useDeletePriceOffer';

export const PriceOfferContext = React.createContext(null);

export function PriceOfferProvider({ children }) {
    const [priceOffer, isLoading, error] = useUniversalGet('PRICE_OFFER');
    const [priceOfferList, setPriceOfferList] = useState(priceOffer);
    const { deletePriceOffer } = useDeletePriceOffer();

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
    }

  return (
    <PriceOfferContext.Provider value={{ priceOffer: priceOfferList, isLoading, error, addToPriceOfferList, deleteFromPriceOfferList }}>
      {children}
    </PriceOfferContext.Provider>
  );
}