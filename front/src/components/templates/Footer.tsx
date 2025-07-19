
import { Typography } from "@mui/material";

function Copyright(props: React.HTMLAttributes<HTMLElement>) {
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

export const Footer: React.FC = () => {
  return (
    <>
      <Copyright />
    </>
  )
}
