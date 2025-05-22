import { Header } from "../templates/Header";
import { useContext } from "react";
import { LoginUserProviderContext } from "../providers/LoginUserProvider";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { isLogined } = useContext(LoginUserProviderContext);

  if (!isLogined) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <Header />
      </>
    );
  }
};
