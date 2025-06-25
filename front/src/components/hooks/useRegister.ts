import axios from "axios";

export const useRegister = () => {
  const register = async ({
    name,
    password,
    navigate,
  }) => {
    const endpoint = "http://127.0.0.1:8000/users/";
    
    try {
      // リクエスト送信
      const response = await axios.post(endpoint, {
        name,
        password,
      });
      
      // レスポンスの検証（バックエンドの応答にidが含まれているか確認）
      if (response.data && response.data.id) {
        console.log("登録リクエスト成功:", response.data);
        // ユーザー名をstate経由で渡す
        navigate("/register-succeeded", { state: name });
      } else {
        // レスポンスはあるが期待する形式ではない場合
        console.error("登録レスポンスの形式が不正:", response.data);
        navigate("/register-failed");
      }
    } catch (error) {
      // エラー種別による分岐
      if (error.response) {
        // サーバーからのエラーレスポンスがある場合 (400, 500など)
        console.error(`エラー ${error.response.status}:`, error.response.data);
      } else if (error.request) {
        // サーバーからの応答がない場合 (ネットワークエラーなど)
        console.error("サーバーからの応答がありません");
      } else {
        // その他のエラー
        console.error("登録エラー:", error.message);
      }
      navigate("/register-failed");
    }
  };
  
  return { register };
};
