import React, { useContext, useEffect, useState, useCallback } from "react";
import { useUniversalGet } from '../api/UniversalGet';
import useDeletePriceOffer from '../hooks/useDeletePriceOffer';
import { PencilEditContext } from "./PencilEditProvider";

export const PriceOfferListContext = React.createContext(null);

const pageSize = 21;

export function PriceOfferListProvider({ children }) {
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const [data, isLoading, isFetching, error] = useUniversalGet('PRICE_OFFER', undefined, true, { offset });
  const [priceOfferList, setPriceOfferListState] = useState({});
  const { deletePriceOffer } = useDeletePriceOffer();
  const { setIsEditing } = useContext(PencilEditContext);

  const setPriceOfferList = useCallback((updater) => {
    setPriceOfferListState((prevData) => {
      const newData = typeof updater === 'function' ? updater(prevData) : updater;

      if (newData.length > pageSize) {
        delete newData[newData.length - 1];
      }
  
      return newData;
    });
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    
    setPageCount(Math.ceil(data.count / pageSize));
    setPriceOfferList(data.priceOffers);
  }, [data]);

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

    setOffset(0);
    setPage(1);
    setIsEditing(false);
  }

  return (
    <PriceOfferListContext.Provider value={{ 
        priceOffer: priceOfferList, 
        isLoading, 
        isFetching, 
        error, 
        setPriceOfferList, 
        deleteFromContext, 
        setOffset, 
        pageCount, 
        page, 
        setPage 
      }}>
      {children}
    </PriceOfferListContext.Provider>
  );
}