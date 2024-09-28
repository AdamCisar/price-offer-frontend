import { useState } from 'react';
import ApiRoutes from '../configuration/api_routes/ApiRoutes';

export const useSearchItem = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchItems = async (searchTerm, signal) => {
    let data = [];
    
    if (!searchTerm) {
        return data;
    }

    setIsLoading(true);

    try {
      const response = await fetch(ApiRoutes[endpoint] + '/' + searchTerm, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        signal,
      });

      data = await response.json();

    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    return data;
  };
  
  return [searchItems, isLoading, error];
}

  