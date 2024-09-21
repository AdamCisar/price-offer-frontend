import React from "react";
import { useUniversalGet } from '../api/UniversalGet';

export const ProductsContext = React.createContext(null);

export function ProductsProvider({ children }) {
    const [products, isLoading, error] = useUniversalGet('PRODUCTS');

  return (
    <ProductsContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}