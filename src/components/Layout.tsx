import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Layout: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
};

export default Layout;
