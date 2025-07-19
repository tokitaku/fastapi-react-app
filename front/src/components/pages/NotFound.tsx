import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: 'warning.main', width: 56, height: 56 }}>
          <SearchOffIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          お探しのページが見つかりませんでした。
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          size="large"
          sx={{ mt: 2 }}
        >
          ホームに戻る
        </Button>
      </Box>
    </Container>
  );
};
