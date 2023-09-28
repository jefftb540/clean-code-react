import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import { MakeLogin } from "@/main/factories/pages";

const PublicRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<MakeLogin />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default PublicRoutes;
