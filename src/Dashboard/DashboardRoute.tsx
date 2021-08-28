import React from "react";
import { Navigate, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

const DashboardRoute = ({ path }: { path: string }) => {
  const { REACT_APP_DASHBOARD_PASSPHRASE } = process.env;

  const storedPassphrase = localStorage.getItem("dashboard-passphrase");

  if (storedPassphrase === REACT_APP_DASHBOARD_PASSPHRASE) {
    return <Route path={path} element={<Dashboard />} />;
  }

  return <Navigate to="/" />;
};

export default DashboardRoute;
