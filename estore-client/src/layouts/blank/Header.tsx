import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";
import frontendRoutes from "../../shared/routes/FrontendRoute";
import SearchField from "../../features/frontend/catalog/SearchField";
import CartIcon from "../../features/frontend/checkout/CartIcon";

const MuiNavLink = styled(NavLink)({
  color: "#fff",
  textDecoration: "none",
  marginRight: 5,
});

const Header = () => {
  const { pathname } = useLocation();

  console.log("Pathname ", pathname);

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar
            alt="Topper Skills"
            src="images/logo.png"
            sx={{ width: 56, height: 56, marginRight: 3 }}
          />
          <Typography variant="h6" component="div">
            Topper Skills
          </Typography>

          {(pathname == "/" || pathname == "/catalog") && (
            <Box sx={{ flexGrow: 1, maxWidth: 400, margin: "auto" }}>
              <SearchField />
            </Box>
          )}
          <Box sx={{ marginLeft: "auto" }}>
            {Array.isArray(frontendRoutes) &&
              frontendRoutes
                .filter((route) => route.showInMenu)
                ?.map(({ path, label }, i) => {
                  return (
                    <MuiNavLink
                      key={path + i}
                      to={path}
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "#aaa" : "#fff",
                          fontWeight: isActive ? "bold" : "normal",
                        };
                      }}
                    >
                      {label}
                    </MuiNavLink>
                  );
                })}
          </Box>
          <Box>
            <CartIcon />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
