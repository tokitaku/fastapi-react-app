import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
  CssBaseline,
  Stack,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const RegisterFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/register");
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
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
          登録エラー
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
            ユーザー登録に失敗しました
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            以下の理由が考えられます：
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body2" paragraph>
              • 同じユーザー名がすでに登録されている
            </Typography>
            <Typography variant="body2" paragraph>
              • サーバーとの通信に問題が発生した
            </Typography>
            <Typography variant="body2" paragraph>
              • サーバーでエラーが発生した
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
            onClick={handleRetry}
            size="large"
          >
            登録画面に戻る
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/")}
            size="large"
          >
            ホームに戻る
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
