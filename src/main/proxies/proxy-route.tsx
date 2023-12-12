import React from "react";

import { useCurrentAccountStore } from "@/presentation/store";
import PublicRoutes from "./public-route";
import PrivateRoute from "./private-route";

const ProxyRoute: React.FC = () => {
  const { auth } = useCurrentAccountStore();
  return auth?.accessToken ? <PrivateRoute /> : <PublicRoutes />;
};

export default ProxyRoute;
