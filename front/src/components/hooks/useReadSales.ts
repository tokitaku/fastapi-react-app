import axios from "axios";
import { useCallback } from "react";

export interface ReadSalesParams {
  year: string | number;
}

export const useReadSales = () => {
  const baseEndpoint = "http://localhost:8000/sales/";
  const onClickReadSales = useCallback(async (year: ReadSalesParams["year"]) => {
    const endpoint = baseEndpoint + year;
    const res = await axios.get(endpoint);
    return res.data;
  }, []);

  return { onClickReadSales };
};
