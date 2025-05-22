import axios from "axios";


export const useUserLogin = () => {
  const login = async ({ email, password, setLoginUser, setIsLoggedIn, navigate }) => {
    const endpoint = "https://jsonplaceholder.typicode.com/users";
    try {
      const response = await axios.get(endpoint, {
        params: { email, id: password },
      });
      if (response.data.length > 0) {
        setLoginUser(response.data[0].username);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert("メールアドレスまたはパスワードが間違っています。");
      }
    } catch (error) {
      console.error("ログインリクエスト失敗:", error);
      alert("ログインに失敗しました。");
    }
  };
  return { login };
};
