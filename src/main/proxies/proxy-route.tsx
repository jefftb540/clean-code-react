import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { currentAccountState } from "@/presentation/store";
import PublicRoutes from "./public-route";
import PrivateRoute from "./private-route";

const ProxyRoute: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const [state] = useRecoilState(currentAccountState);

  return getCurrentAccount()?.accessToken || state.auth.accessToken ? (
    <PrivateRoute />
  ) : (
    <PublicRoutes />
  );
};

export default ProxyRoute;
