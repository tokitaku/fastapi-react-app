
import React from "react";
import { Typography } from "@mui/material";

const Copyright: React.FC<React.HTMLAttributes<HTMLElement>> = React.memo((props) => {
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
});

Copyright.displayName = 'Copyright';

export const Footer: React.FC = React.memo(() => (
  <footer>
    <Copyright />
  </footer>
));

Footer.displayName = 'Footer';
