
import { createContext, useState } from "react"

export const LoginUserProviderContext = createContext({});

export const LoginUserProvider = (props) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState("");
  const [isLogined, setIsLoggedIn] = useState(false);

  return (
    <LoginUserProviderContext.Provider value={{ loginUser, setLoginUser, isLogined, setIsLoggedIn }}>
      {children}
    </LoginUserProviderContext.Provider>
  )
}
