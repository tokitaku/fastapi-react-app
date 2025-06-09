
import { createContext, useState } from "react"

export const LoginUserProviderContext = createContext({});

export const LoginUserProvider = (props) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginUserProviderContext.Provider value={{ loginUser, setLoginUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginUserProviderContext.Provider>
  )
}
