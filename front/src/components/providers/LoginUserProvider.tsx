
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

export interface LoginUserProviderContextType {
  loginUser: string;
  setLoginUser: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const LoginUserProviderContext = createContext<LoginUserProviderContextType | undefined>(undefined);

interface LoginUserProviderProps {
  children: ReactNode;
}

export const LoginUserProvider: React.FC<LoginUserProviderProps> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <LoginUserProviderContext.Provider value={{ loginUser, setLoginUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginUserProviderContext.Provider>
  )
}
