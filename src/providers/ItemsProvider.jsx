import React, { useContext, useEffect, useState, useCallback } from "react";
import { useUniversalGet } from '../api/UniversalGet';
import { PencilEditContext } from "./PencilEditProvider";
import useDeleteItem from "../hooks/useDeleteItem";

export const ItemsContext = React.createContext(null);

export function ItemsProvider({ children }) {
  const [data, isLoading, isFetching, error] = useUniversalGet('ITEM', undefined, true);
  const { deleteItem } = useDeleteItem('ITEM');
  const [items, setItemsState] = useState([]);
  const { setIsEditing } = useContext(PencilEditContext);

  const setItems = useCallback((updater) => {
    setItemsState((prevData) => {
      const newData = typeof updater === 'function' ? updater(prevData) : updater;
  
      return newData;
    });
  }, []);


  useEffect(() => {
    if (!data) {
      return;
    }

    setItems(data);
  }, [data]);

  const deleteFromContext = async (idList) => {
    const deletedIds = await deleteItem(idList);

    if (!deletedIds || deletedIds.length === 0) {
      return;
    }

    for (let id of deletedIds) {
      setItems(items => 
        items.filter((item) => item.id !== id)
      );
    }

    setIsEditing(false);
  }

  return (
    <ItemsContext.Provider value={{ items, setItems, isLoading, isFetching, error, deleteFromContext }}>
      {children}
    </ItemsContext.Provider>
  );
}