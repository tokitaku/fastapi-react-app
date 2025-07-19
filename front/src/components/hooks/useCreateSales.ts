import axios from "axios";

export interface CreateSalesParams {
  data: (string | number)[][];
}

export const useCreateSales = () => {
  const onClickCreateSales = async (data: CreateSalesParams["data"]): Promise<void> => {
    const endpoint = "http://localhost:8000/sales";
    try {
      // 1列目から最後の列まで処理（0列目はヘッダーなのでスキップ）
      for (let i = 1; i < data[0].length; i++) {
        const queries = {
          year: Number(data[1][i]),
          department: data[0][i],
          sales: Number(data[2][i]),
        };
        await axios.post(endpoint, queries);
      }
    }
    catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return {
    onClickCreateSales
  };
}
