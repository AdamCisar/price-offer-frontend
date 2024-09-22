import { useState } from "react";

export const useUniversalDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (apiRoute, payload) => {
    setIsLoading(true);
  
    try {
        let data = {};
        for (let key in payload) {
            const response = await fetch(apiRoute + "/" + payload[key] , {
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
