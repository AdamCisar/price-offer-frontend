import {
    useQuery,
    useQueryClient,
  } from '@tanstack/react-query'
  import ApiRoutes from '../configuration/api_routes/ApiRoutes';
  
  const fetchData = async (endpoint, id, signal) => {
    const token = localStorage.getItem("token");
    let urlId = id ? `/${id}` : '';
    const response = await fetch(ApiRoutes[endpoint] + urlId, {
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
  export const useUniversalGet = (endpoint, id) => {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
      queryKey: [endpoint+id],    
      queryFn: ({ signal }) => fetchData(endpoint, id, signal),
    });
    console.log(isLoading)

    const invalidateQuery = () => queryClient.setQueryData([endpoint + id], null);
  
    return [data, isLoading, error, invalidateQuery];
  };
  