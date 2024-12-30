import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

// Layout component that wraps the Outlet component
const Layout: React.FC = () => {
  return (
    // Suspense is used to wrap the Outlet component to show a loading spinner while the content is loading
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
};

export default Layout;
