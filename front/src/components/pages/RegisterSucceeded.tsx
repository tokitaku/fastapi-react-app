import React from "react";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Avatar,
  CssBaseline,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const RegisterSucceeded: React.FC = () => {
  const location = useLocation();
  const { state } = location;

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
        <Avatar sx={{ m: 2, bgcolor: "success.main", width: 56, height: 56 }}>
          <CheckCircleOutlineIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h4" gutterBottom>
          登録完了
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 2,
            width: "100%",
            borderRadius: 2,
            backgroundColor: "success.light",
            color: "success.contrastText",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            ユーザー登録が完了しました！
          </Typography>
          {state && (
            <Typography variant="body1" align="center">
              ユーザー名: <strong>{state}</strong>
            </Typography>
          )}
        </Paper>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/login"
            size="large"
          >
            ログインする
          </Button>
          <Button variant="outlined" component={RouterLink} to="/" size="large">
            ホームに戻る
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
