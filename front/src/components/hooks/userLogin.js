import axios from "axios";


export const useUserLogin = () => {
  const login = async ({
    username,
    password,
    setLoginUser,
    setIsLoggedIn,
    navigate,
  }) => {
    const endpoint = "http://127.0.0.1:8000/user";
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

        // setLoginUser({ username: "", password: "" });
      } else {
        console.log("ログイン失敗: ユーザーが存在しません");
        navigate("/login-failed");
        // alert("メールアドレスまたはパスワードが間違っています。");
      }
    } catch (error) {
      console.error("ログインリクエスト失敗:", error);
      setLoginUser({ username: "", password: "" });
      setIsLoggedIn(false);
      navigate("/login-failed");
    }
  };
  return { login };
};
