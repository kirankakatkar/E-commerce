import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { styled } from "@mui/material/styles";

import { NavLink } from "react-router-dom";
import adminRoutes from "../../shared/routes/AdminRoute";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../app/slices/AuthSlice";

const MuiNavLink = styled(NavLink)({
  color: "#fff",
  textDecoration: "none",
  marginRight: 5,
});

interface ISidebarMenuProps {}

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = (props) => {
  const { role } = useSelector(selectLoggedUser);
  console.log("Role", role);

  return (
    <List>
      {Array.isArray(adminRoutes) &&
        adminRoutes
          .filter((route) => route.role.includes(role as string))
          .map(({ path, label, icon }, index) => (
            <ListItem
              key={path + index}
              disablePadding
              sx={{ display: "block" }}
            >
              <MuiNavLink
                end
                to={path}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#000" : "#999",
                    fontWeight: isActive ? "bold" : "normal",
                  };
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,

                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </MuiNavLink>
            </ListItem>
          ))}
    </List>
  );
};

export default SidebarMenu;
