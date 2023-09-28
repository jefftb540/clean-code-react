import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@nimbus-ds/styles";
import { ToastProvider } from "@nimbus-ds/components";

import { AccountModel } from "@/domain/models";
import { currentAccountState } from "@/presentation/store";
import { ProxyRoute } from "@/main/proxies";
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from "@/main/adapters";

const state = {
  setCurrentAccount: setCurrentAccountAdapter,
  getCurrentAccount: getCurrentAccountAdapter,
  auth: {} as AccountModel,
};

const Router: React.FC = () => (
  <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
    <ThemeProvider theme="base">
      <ToastProvider>
        <BrowserRouter>
          <ProxyRoute />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  </RecoilRoot>
);

export default Router;
