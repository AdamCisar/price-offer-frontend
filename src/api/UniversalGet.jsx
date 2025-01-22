import {
    useQuery,
  } from '@tanstack/react-query'
  import ApiRoutes from '../configuration/api_routes/ApiRoutes';
  
  const fetchData = async (endpoint, signal) => {
    const token = localStorage.getItem("token");
    const response = await fetch(ApiRoutes[endpoint], {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      signal,
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
   * @returns [data, isLoading, error] 
   */
  export const useUniversalGet = (endpoint) => {
    const { data, isLoading, error } = useQuery({
      queryKey: [endpoint],    
      queryFn: ({ signal }) => fetchData(endpoint, signal),
    });
  
    return [data, isLoading, error];
  };
  