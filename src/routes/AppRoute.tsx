import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Components
import Main from "../pages/dashboard/main";
import PageNotFound from "../pages/PageNotFound";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Main />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoute;
