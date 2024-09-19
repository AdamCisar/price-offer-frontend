import React from "react";
import { useUniversalFetch } from '../api/UniversalFetch';

export const ProductsContext = React.createContext(null);

export function ProductsProvider({ children }) {
    const [products, isLoading, error] = useUniversalFetch('PRODUCTS');

  return (
    <ProductsContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}