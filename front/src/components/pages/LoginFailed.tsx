import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const LoginFailed: React.FC = () => {
  const navigate = useNavigate();

  const handleRetryLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "error.main", width: 56, height: 56 }}>
          <ErrorOutlineIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h4" gutterBottom>
          ログインエラー
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 2,
            width: "100%",
            borderRadius: 2,
            backgroundColor: "error.light",
            color: "error.contrastText",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            ログインに失敗しました
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            以下の理由が考えられます：
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body2" paragraph>
              • ユーザー名またはパスワードが間違っています
            </Typography>
            <Typography variant="body2" paragraph>
              • アカウントが存在しません
            </Typography>
            <Typography variant="body2" paragraph>
              • サーバーとの通信に問題が発生しました
            </Typography>
          </Box>
        </Paper>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRetryLogin}
            size="large"
          >
            再度ログインする
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleGoHome}
            size="large"
          >
            ホームに戻る
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

