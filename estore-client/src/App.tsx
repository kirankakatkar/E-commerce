import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import BlankLayout from "./layouts/blank/BlankLayout";
import FullLayout from "./layouts/full/FullLayout";
import "./css/App.css";

import { useSelector } from "react-redux";
import { selectLoggedUser } from "./app/slices/AuthSlice";
import AuthService from "./services/AuthService";
import { useAppDispatch } from "./app/hooks";
import { loadSingleUser } from "./features/admin/users/thunkactions";

interface IProtectedRoute {
  children: any;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const navigate = useNavigate();
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useAppDispatch();
  const token = sessionStorage.getItem("token");

  let content;
  if (loggedUser?._id) {
    content = children;
  } else if (token) {
    // validate the token
    AuthService.validateToken(token)
      .then((response) => {
        console.log(response);
        if(response?.data?.data?.id)
        dispatch(loadSingleUser(response?.data?.data?.id));
      })
      .catch((e) => {
        sessionStorage.clear();
        navigate("/login");
      });
      content = children;
    } else {
    sessionStorage.clear();
    content = <Navigate to="/login" />;
  }
  return <>{content}</>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<BlankLayout />} />
        <Route
          path="secured/*"
          element={
            <ProtectedRoute>
              <FullLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
