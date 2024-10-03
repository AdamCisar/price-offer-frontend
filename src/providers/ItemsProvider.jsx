import React, { useEffect, useState } from "react";
import { useUniversalGet } from '../api/UniversalGet';

export const ItemsContext = React.createContext(null);

export function ItemsProvider({ children }) {
  const [data, isLoading, error] = useUniversalGet('ITEM');
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <ItemsContext.Provider value={{ items, setItems, isLoading, error }}>
      {children}
    </ItemsContext.Provider>
  );
}