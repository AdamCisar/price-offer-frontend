import {
    useQuery,
    useQueryClient,
  } from '@tanstack/react-query'
  import ApiRoutes from '../configuration/api_routes/ApiRoutes';
  
  const fetchData = async (endpoint, id, params, signal) => {
    const token = localStorage.getItem("token");
    let urlId = id ? `/${id}` : '';

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = queryString
      ? ApiRoutes[endpoint] + urlId + '?' + queryString
      : ApiRoutes[endpoint] + urlId;

    const response = await fetch(urlWithParams, {
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
  export const useUniversalGet = (endpoint, id = undefined, refetchOnMount = false, params = {}) => {
    const Id = id ? id : '';
    const queryClient = useQueryClient();
    const { data, isLoading, isFetching, error } = useQuery({
      queryKey: [endpoint+Id, params],    
      queryFn: ({ signal }) => fetchData(endpoint, Id, params, signal),
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      staleTime: 0,
      cacheTime: 0, 
    });

    return [data, isLoading, isFetching, error];
  };
  