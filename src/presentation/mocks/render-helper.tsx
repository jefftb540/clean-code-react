import React from "react";
import { ToastProvider } from "@nimbus-ds/components";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { render } from "@testing-library/react";

type Params = {
  Page: React.FC;
  history: MemoryRouterProps;
};

export const renderWithHistory = ({ Page, history }: Params) => {
  render(
    <ToastProvider>
      <MemoryRouter {...history}>
        <Page />
      </MemoryRouter>
    </ToastProvider>,
  );
};
