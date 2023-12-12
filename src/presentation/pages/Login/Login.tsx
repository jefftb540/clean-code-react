import React from "react";
import { Box, Title } from "@nimbus-ds/components";

import { DataProvider, Form } from "./components";
import { Props } from "./login.types";

const Login: React.FC<Props> = (props) => (
  <DataProvider {...props}>
    {({ onSubmit }) => (
      <Box height="100%" minHeight="100vh" display="flex" alignItems="stretch">
        <Box
          width={{
            md: "100%",
            xs: "100%",
            xl: "400px",
            lg: "400px",
          }}
          padding="8"
          position="relative"
          display="flex"
          flexDirection="column"
        >
          <Box marginY="8">
            <Title>Acesse sua conta</Title>
          </Box>
          <Box flex="1">
            <Form onSubmit={onSubmit} />
          </Box>
        </Box>
        <Box
          flex="1"
          backgroundPosition="bottom left"
          backgroundRepeat="no-repeat"
          backgroundSize="auto"
          backgroundColor="neutral-surfaceDisabled"
        />
      </Box>
    )}
  </DataProvider>
);

export default Login;
