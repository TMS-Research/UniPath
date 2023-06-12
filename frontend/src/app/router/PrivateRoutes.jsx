import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
// import ClusterRoutes from "../modules/Clusters/routes";

const PrivateRoutes = () => {
  const ClusterRoutes = lazy(() => import("../modules/Clusters/routes"));
  return (
    <Routes>
      <Route
        path="cluster/*"
        element={
          <SuspensedView>
            <ClusterRoutes />
          </SuspensedView>
        }
      />
    </Routes>
  );
};

const SuspensedView = ({ children }) => {
  TopBarProgress.config({
    barColors: {
      0: "#023047",
    },
    barThickness: 1.8,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
