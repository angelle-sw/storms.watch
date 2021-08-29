import React from "react";
import { Navigate, Route } from "react-router-dom";
import useAdmin from "./hooks/useAdmin";

const PrivateRoute = ({
  element,
  path,
}: {
  element: JSX.Element;
  path: string;
}) => {
  const { data: adminData, isLoading: adminIsLoading } = useAdmin();

  if (adminIsLoading) {
    return <div>Loading</div>;
  }

  if (adminData) {
    return <Route path={path} element={element} />;
  }

  return <Navigate to="/" />;
};

export default PrivateRoute;
