import { Header } from "../templates/Header";
import { useContext, useState, useCallback } from "react";
import { LoginUserProviderContext } from "../providers/LoginUserProvider";
import { ReadCsv } from "../elements/ReadCsv";
import { Navigate } from "react-router-dom";
import { BarChart } from "../elements/BarChart";
import { SelectYear } from "../elements/SelectYear";
import { ReadDatabase } from "../elements/ReadDatabase";

export const Home = () => {
  const { isLoggedIn } = useContext(LoginUserProviderContext);
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);

  const handleYearChange = useCallback(
    (selectedYear) => {
      setYear(selectedYear);
      console.log(`選択された年度: ${selectedYear}`);
    },
    [setYear]
  );

  const handleDataChange = useCallback((newData) => {
    setData(newData);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <Header />
        <h3>CSVをデータベースへ格納</h3>
        <ReadCsv handleDataChange={handleDataChange} />
        <SelectYear handleYearChange={handleYearChange} />
        <ReadDatabase year={year} handleDataChange={handleDataChange} />
        <h3>グラフ表示</h3>
        <BarChart data={data} />
      </>
    );
  }
};
