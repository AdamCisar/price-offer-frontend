import {
    useQuery,
  } from '@tanstack/react-query'
  import ApiRoutes from '../configuration/api_routes/ApiRoutes';
  
  const fetchData = async (endpoint) => {
    const response = await fetch(ApiRoutes[endpoint], {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    return response.json();
  };

  /**
   * 
   * @param {string} endpoint
   *  endpoint constant suffix
   * @returns 
   */
  export const useUniversalGet = (endpoint) => {
    const { data, isLoading, error } = useQuery({
      queryKey: [endpoint],    
      queryFn: () => fetchData(endpoint),   
    });
  
    return [data, isLoading, error];
  };
  