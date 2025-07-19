import { Box, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";


export interface SelectYearProps {
  handleYearChange: (year: string) => void;
}

export const SelectYear: React.FC<SelectYearProps> = ({ handleYearChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedYear = event.target.value as string;
    handleYearChange(selectedYear);
  };
  return (
    <Box sx={{ minWidth: 120, mb: 2 }}>
      <InputLabel id="sales-year">年度</InputLabel>
      <Select labelId="sales-year" onChange={handleChange} fullWidth name="year" placeholder="年度を選択" defaultValue={""}>
        <MenuItem value={2020}>2020</MenuItem>
        <MenuItem value={2021}>2021</MenuItem>
        <MenuItem value={2022}>2022</MenuItem>
      </Select>
    </Box>
  )
}
