import { useState } from "react";
import ApiRoutes from '../configuration/api_routes/ApiRoutes';

export const useUniversalDelete = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (payload) => {
    setIsLoading(true);
  
    try {
        let data = {};
        for (let key in payload) {
            const response = await fetch(ApiRoutes[endpoint]+ "/" + payload[key] , {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong!");
            }

            data = await response.json();
        }
    setIsLoading(false);
    return data;
    } catch (err) {
    setIsLoading(false);
    setError(err.message);
    throw err;
    }
  };

  return [deleteData, isLoading, error];
};
