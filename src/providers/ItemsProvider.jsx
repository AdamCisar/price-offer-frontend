import React, { useContext, useEffect, useState } from "react";
import { useUniversalGet } from '../api/UniversalGet';
import { PencilEditContext } from "./PencilEditProvider";

export const ItemsContext = React.createContext(null);

export function ItemsProvider({ children }) {
  const [data, isLoading, error] = useUniversalGet('ITEM');
  const [items, setItems] = useState([]);
    const { setIsEditing } = useContext(PencilEditContext);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const deleteFromContext = async (idList) => {
    // const deletedIds = await deleteItems(idList); // TODO implement deleteItems
var deletedIds = [];
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