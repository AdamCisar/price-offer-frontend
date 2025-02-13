import React, { useContext, useEffect, useState } from "react";
import { useUniversalGet } from '../api/UniversalGet';
import { PencilEditContext } from "./PencilEditProvider";
import useDeleteItem from "../hooks/useDeleteItem";

export const ItemsContext = React.createContext(null);

export function ItemsProvider({ children }) {
  const [data, isLoading, error, invalidateQuery] = useUniversalGet('ITEM');
  const { deleteItem } = useDeleteItem('ITEM');
  const [items, setItems] = useState([]);
  const { setIsEditing } = useContext(PencilEditContext);

  useEffect(() => {
    if (!data) {
      return;
    }

    setItems(data);
    invalidateQuery();
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
    <ItemsContext.Provider value={{ items, setItems, isLoading, error, deleteFromContext }}>
      {children}
    </ItemsContext.Provider>
  );
}