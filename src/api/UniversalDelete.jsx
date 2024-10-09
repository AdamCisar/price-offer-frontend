import { useState } from "react";
import ApiRoutes from '../configuration/api_routes/ApiRoutes';

export const useUniversalDelete = (endpoint) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (payload) => {
    setIsLoading(true);
  
    try {
        const response = await fetch(ApiRoutes[endpoint] , {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }

      setIsLoading(false);

      return await response.json();

    } catch (err) {

      setIsLoading(false);
      setError(err.message);
      throw err;

    }
  };

  return [deleteData, isLoading, error];
};
