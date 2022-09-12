import * as React from "react";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import frontendRoutes from "../../shared/routes/FrontendRoute";

interface IBlankLayoutProps {}

const BlankLayout: React.FunctionComponent<IBlankLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Routes>
        {Array.isArray(frontendRoutes) &&
          frontendRoutes.map(({ path, component }, i) => (
            <Route path={path} element={component} key={path + i} />
          ))}
      </Routes>
    </>
  );
};

export default BlankLayout;
