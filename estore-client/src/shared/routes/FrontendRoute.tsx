import Catalog from "../../features/frontend/catalog/Catalog";
import Contact from "../../features/frontend/contact/Contact";
import Home from "../../features/frontend/home/Home";
import Login from "../../features/frontend/login/Login";
import Register from "../../features/frontend/register/Register";
import TC from "../../features/frontend/terms-conditions/TC";

export default [
  {
    label: "Home",
    path: "",
    component: <Home />,
    showInMenu: true,
  },
  {
    label: "Catalog",
    path: "catalog",
    component: <Catalog />,
    showInMenu: true,
  },
  {
    label: "Contact",
    path: "contact",
    component: <Contact />,
    showInMenu: true,
  },
  {
    label: "Login",
    path: "login",
    component: <Login userType="customer" />,
    showInMenu: true,
  },
  {
    label: "Login",
    path: "admin",
    component: <Login userType="admin" />,
    showInMenu: false,
  },
  {
    label: "Register",
    path: "register",
    component: <Register />,
    showInMenu: true,
  },
  {
    label: "Terms",
    path: "tc",
    component: <TC />,
    showInMenu: false,
  },
];
