import { AppBar, Toolbar, Typography } from "@mui/material";
import { BasicMenu } from "../elements/BasicMenu";
import { useContext } from "react";
import { LoginUserProviderContext } from "../providers/LoginUserProvider";

export const Header: React.FC = () => {
  const { loginUser } = useContext(LoginUserProviderContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <BasicMenu />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ログインユーザー: {loginUser}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
