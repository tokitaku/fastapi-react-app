import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    comment: "",
  });
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();

  const goToResult = (formData) => {
    navigate("/result", { state: formData });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name && formData.age && formData.gender && formData.comment) {
      goToResult(formData);
    }
  };

  const formItems = [
    {
      id: "name",
      input: (
        <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
          <TextField
            type="text"
            id="name"
            name="name"
            label="名前"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </FormControl>
      ),
    },
    {
      id: "age",
      input: (
        <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
          <InputLabel id="age-label">年齢</InputLabel>
          <Select
            labelId="age-label"
            label="年齢"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            variant="outlined"
            renderValue={(selected) =>
              selected ? `${selected}歳` : "選択してください"
            }
          >
            <MenuItem value="" disabled>
              <em>選択してください</em>
            </MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="30">30</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      id: "gender",
      input: (
        <RadioGroup
          row
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        >
          <FormControlLabel value="male" control={<Radio />} label="男性" />
          <FormControlLabel value="female" control={<Radio />} label="女性" />
        </RadioGroup>
      ),
    },
    {
      id: "comment",
      input: (
        <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
          <TextField
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
            label="コメント"
          />
        </FormControl>
      ),
    },
  ];

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: { xs: 4, sm: 8 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 1, sm: 3 },
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
        >
          アンケート提出
        </Typography>
        <Box sx={{ width: "100%", mb: 2 }}>
          {formItems.map((item) => (
            <Box key={item.id} sx={{ width: "100%", mb: { xs: 1, sm: 2 } }}>
              <InputLabel
                htmlFor={item.id}
                sx={{
                  alignSelf: "flex-start",
                  ml: 0.5,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                {item.label}
              </InputLabel>
              {item.input}
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: { xs: 2, sm: 3 } }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: { xs: "8px 16px", sm: "10px 30px" },
              fontSize: { xs: "0.9rem", sm: "1rem" },
              borderRadius: 4,
            }}
            endIcon={<SendIcon />}
          >
            送信
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
