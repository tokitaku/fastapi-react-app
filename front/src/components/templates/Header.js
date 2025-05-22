import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BasicMenu } from "../elements/BasicMenu";

export const Header = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <BasicMenu />
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </Box>
);
