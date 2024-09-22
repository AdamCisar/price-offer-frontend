import { useState } from "react";
import ApiRoutes from '../configuration/api_routes/ApiRoutes';

export const useUniversalPost = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (payload, id) => {
    const urlId = id ? `/${id}` : "";
    setIsLoading(true);

    try {
      const response = await fetch(ApiRoutes[endpoint] + urlId, {
        method: urlId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  };

  return [sendData, isLoading, error];
};
