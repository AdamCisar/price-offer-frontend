import React from "react";
import { useUniversalGet } from '../api/UniversalGet';

export const ItemsContext = React.createContext(null);

export function ItemsProvider({ children }) {
  const [items, isLoading, error] = useUniversalGet('ITEM');

  return (
    <ItemsContext.Provider value={{ items, isLoading, error }}>
      {children}
    </ItemsContext.Provider>
  );
}