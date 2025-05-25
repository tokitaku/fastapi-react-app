import axios from "axios";

export const useRegister = () => {
  const register = async ({
    username,
    password,
    navigate,
  }) => {
    const endpoint = "http://127.0.0.1:8000/users/";
    try {
      const response = await axios.post(endpoint, {
        name: username,
        password: password,
      });
      console.log("ユーザー登録成功:", response.data);
      
      // 登録成功後、ホームページへ遷移
      navigate("/");
    } catch (error) {
      console.error("ユーザー登録失敗:", error);
      
      // エラーメッセージの確認
      if (error.response && error.response.status === 400) {
        console.log("ユーザー登録失敗: ユーザーが既に存在します");
        // ここでユーザー登録失敗画面へリダイレクト
        navigate("/login-failed");
      } else {
        console.error("ユーザー登録失敗:", error);
        navigate("/login-failed");
      }
    }
  };
  return { register };
};
