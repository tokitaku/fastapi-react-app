import { useState } from "react";
import { Box, Container, Typography, TextField, Button, FormControlLabel, Checkbox, Link, Avatar, CssBaseline, Grid } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    setEmailError("");
    setPasswordError("");
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("有効なメールアドレスを入力してください。");
      valid = false;
    }
    if (!password || password.length < 6) {
      setPasswordError("パスワードは6文字以上で入力してください。");
      valid = false;
    }
    if (valid) {
      // 認証処理をここに実装
      console.log({ email, password, remember });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
            label="ログイン状態を保持する"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                新規登録はこちら
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
