import { useMemo, useState } from 'react';
import ApiRoutes from '../configuration/api_routes/ApiRoutes';
import { debounce } from 'lodash';
import { useEffect } from 'react';

export const useSearch = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchedResults, setSearchedResults] = useState([]);

  const search = async (searchTerm, signal) => {
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

  const handleSearch = async (e) => {
    const searchedResults = await search(e.target.value);
    setSearchedResults(searchedResults);
  };

  const debouncedSearch = useMemo(() => {
    return debounce(handleSearch, 400);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  
  return [searchedResults, setSearchedResults, debouncedSearch, isLoading, error];
}

  