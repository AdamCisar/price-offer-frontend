import React from 'react';
import { ProductsProvider } from '../providers/ProductsProvider';
import {
    QueryClient,
    QueryClientProvider
  } from '@tanstack/react-query'

const Home = () => {
    const queryClient = new QueryClient();

    return (
        <div className="home">
            <QueryClientProvider client={queryClient}>
                <ProductsProvider>
                    
                </ProductsProvider>
            </QueryClientProvider>
        </div>  
    )
}    
export default Home