import { lazy } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import UsersIcon from "@mui/icons-material/People";
import ProductIcon from "@mui/icons-material/Launch";
import OrderIcon from "@mui/icons-material/Book";
import CustomerIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/List";

const Dashboard = lazy(
  () => import("../../features/admin/dashboard/Dashboard")
);
const Category = lazy(() => import("../../features/admin/category/Category"));
const Customer = lazy(() => import("../../features/admin/customer/Customer"));
const Order = lazy(() => import("../../features/admin/order/Order"));
const Product = lazy(() => import("../../features/admin/product/Product"));
const Users = lazy(() => import("../../features/admin/users/Users"));

export default [
  {
    label: "Dashboard",
    path: "",
    component: <Dashboard />,
    showInMenu: true,
    icon: <DashboardIcon />,
    role: ["superadmin", "admin"],
    hasNested: false,
  },
  {
    label: "Users",
    path: "users",
    component: <Users />,
    showInMenu: true,
    icon: <UsersIcon />,
    role: ["superadmin"],
    hasNested: false,
  },
  {
    label: "Categories",
    path: "categories",
    component: <Category />,
    showInMenu: true,
    icon: <CategoryIcon />,
    role: ["superadmin", "admin"],
    hasNested: false,
  },
  {
    label: "Products",
    path: "products",
    component: <Product />,
    showInMenu: true,
    icon: <ProductIcon />,
    role: ["superadmin", "admin"],
    hasNested: true,
  },
  {
    label: "Customers",
    path: "customers",
    component: <Customer />,
    showInMenu: true,
    icon: <CustomerIcon />,
    role: ["superadmin", "admin"],
    hasNested: true,
  },
  {
    label: "Orders",
    path: "orders",
    component: <Order />,
    showInMenu: true,
    icon: <OrderIcon />,
    role: ["superadmin", "admin"],
    hasNested: false,
  },
];
