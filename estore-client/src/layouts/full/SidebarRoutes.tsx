import React, { Suspense } from "react";
import AdminRoutes from "../../shared/routes/AdminRoute";
import { Routes, Route } from "react-router-dom";

interface ISidebarRoutesProps {}

const SidebarRoutes: React.FunctionComponent<ISidebarRoutesProps> = (props) => {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Routes>
        {Array.isArray(AdminRoutes) &&
          AdminRoutes.map((route, i) => (
            <Route
              key={route.path + i}
              path={`${route.hasNested ? route.path + "/*" : route.path}`}
              element={route.component}
            />
          ))}
      </Routes>
    </Suspense>
  );
};

export default SidebarRoutes;
