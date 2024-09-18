import React from "react";
import { useFetchProducts } from '../fetch/Products';

export const ProductsContext = React.createContext(null);

export function ProductsProvider({ children }) {
    const [products, isLoading, error] = useFetchProducts();

  return (
    <ProductsContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}