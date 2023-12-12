import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@nimbus-ds/styles";
import { ToastProvider } from "@nimbus-ds/components";

import { ProxyRoute } from "@/main/proxies";

const Router: React.FC = () => (
  <ThemeProvider theme="base">
    <ToastProvider>
      <BrowserRouter>
        <ProxyRoute />
      </BrowserRouter>
    </ToastProvider>
  </ThemeProvider>
);

export default Router;
