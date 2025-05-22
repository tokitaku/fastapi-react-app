import {useState} from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";


export const BasicMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickHome = () => {
    navigate("/");
  };
  const handleClickLogin = () => {
    navigate("/login");
  };
    

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
      >
        menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClickHome}>ホーム</MenuItem>
        <MenuItem onClick={handleClickLogin}>ログアウト</MenuItem>
      </Menu>
    </div>
  );
}
