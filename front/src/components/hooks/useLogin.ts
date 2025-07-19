import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { NavigateFunction } from "react-router-dom";

export interface LoginParams {
  username: string;
  password: string;
  setLoginUser: Dispatch<SetStateAction<string>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

export const useUserLogin = () => {
  const login = useCallback(async ({
    username,
    password,
    setLoginUser,
    setIsLoggedIn,
    navigate,
  }: LoginParams): Promise<void> => {
    const endpoint = "http://localhost:8000/user";
    try {
      const response = await axios.get(endpoint, {
        params: { name: username, password: password },
      });
      console.log("ログインリクエスト成功:", response.data);
      if (Object.keys(response.data).length > 0) {
        // ユーザーが存在する場合、ログイン状態を更新
        setLoginUser(username);
        setIsLoggedIn(true);
        navigate("/");

      } else {
        console.log("ログイン失敗: ユーザーが存在しません");
        navigate("/login-failed");
      }
    } catch (error) {
      console.error("ログインリクエスト失敗:", error);
      setLoginUser("");
      setIsLoggedIn(false);
      navigate("/login-failed");
    }
  }, []);
  return { login };
};
