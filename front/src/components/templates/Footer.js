
import { Typography } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      ABC corp.
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Footer = () => {
  return (
    <>
      <Copyright />
    </>
  )
}
