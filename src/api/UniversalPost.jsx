import { useState } from "react";
import ApiRoutes from '../configuration/api_routes/ApiRoutes';

export const useUniversalPost = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const sendData = async (payload) => {
    setIsLoading(true);

    try {
      const response = await fetch(ApiRoutes[endpoint], {
        method: "POST",
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
