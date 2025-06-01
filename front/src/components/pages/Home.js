import { Header } from "../templates/Header";
import { useContext, useState } from "react";
import { LoginUserProviderContext } from "../providers/LoginUserProvider";
import { ReadCsv } from "../elements/ReadCsv";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { isLogined } = useContext(LoginUserProviderContext);
  const [data, setData] = useState([]);

  const handleDataChange = (newData) => {
    setData(newData);
  };

  if (!isLogined) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <Header />
        <h3>CSVをデータベースへ格納</h3>
        <ReadCsv handleDataChange={handleDataChange} />
      </>
    );
  }
};
