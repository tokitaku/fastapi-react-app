import { useEffect } from "react";
import { useReadSales } from "../hooks/useReadSales";

// データを変換する関数
const transformSalesData = (data) => {
  const departments = ["department", ...data.map(item => item.department)];
  const years = ["year", ...data.map(item => item.year)];
  const sales = ["sales", ...data.map(item => item.sales)];
  
  return [departments, years, sales];
};

export const ReadDatabase = ({ year, handleDataChange }) => {
  const { onClickReadSales } = useReadSales();
  useEffect(() => {
    if (year) {
      const promise = onClickReadSales(year);

      promise.then((data) => {
        if (data.length > 0) {
          const transformedData = transformSalesData(data);
          handleDataChange(transformedData);
        } else {
          console.log("データがありません");
          handleDataChange([]);
        }
      });
    }
  }, [year, handleDataChange, onClickReadSales]);

  return (
    <div>
      <button>データを取得</button>
    </div>
  );
};
