import ApiRoutes from '../configuration/api_routes/ApiRoutes';
import { useState, useEffect } from 'react';

export const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const controller = new AbortController();
  
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
            ApiRoutes.PRODUCTS,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          },
        );
        const data = await response.json();
        setIsLoading(false);
        if (!data) return;
        setProducts(data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(true);
      }
    };
  
    useEffect(() => {
        getProducts();
      return () => {
        controller.abort();
      };
    }, []);
  
    return [products, isLoading, error];
  };