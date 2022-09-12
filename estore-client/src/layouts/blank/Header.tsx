import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import frontendRoutes from "../../shared/routes/FrontendRoute";

const MuiNavLink = styled(NavLink)({
  color: "#fff",
  textDecoration: "none",
  marginRight: 8,
  fontSize: 18,
});
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar
            alt="Topper Skills"
            src="images/estore.jpg"
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Topper Skills
          </Typography>
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
                        color: isActive ? "yellow" : "#fff",
                      };
                    }}
                  >
                    {label}
                  </MuiNavLink>
                );
              })}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
