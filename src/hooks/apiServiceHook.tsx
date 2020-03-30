import { useState } from "react";

// call the discounts api
export const useDiscountsApi = () => {
  const url =
    "https://hv1fhulak1.execute-api.us-east-2.amazonaws.com/prod/discount-mappers";
  const [isLoading, setIsLoading] = useState(false);

  // allow components to chain requests if needed, this just uses the basic fetch
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(url, { method: "GET" });
      return resp.json();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async (deal: any) => {
    try {
      setIsLoading(true);
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deal)
      });
      return resp.json();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData, postData };
};
