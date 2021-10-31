import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../slices/expenses";

export function NavBar() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { user, logout } = useContext(AuthContext);
  const handleLogin = () => {
    history.push({
      pathname: "/",
    });
  };
  const handleRegister = () => {
    history.push({
      pathname: "/register",
    });
  };
  const handleLogout = () => {
    logout();
    dispatch(reset());
    history.push({
      pathname: "/",
    });
  };
  const menuBar = user ? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expenses
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expenses
          </Typography>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={handleRegister}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
  return menuBar;
}
