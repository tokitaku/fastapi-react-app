import axios from "axios";
import { useCallback } from "react";

export const useReadSales = () => {
  const baseEndpoint = "http://localhost:8001/sales/";
  const onClickReadSales = useCallback(async (year) => {
    const endpoint = baseEndpoint + year;
    const res = await axios.get(endpoint);
    return res.data;
  }, []);

  return { onClickReadSales };
};
