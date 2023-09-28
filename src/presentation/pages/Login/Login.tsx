import React from "react";
import { Logo } from "@/presentation/components";
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
          <Logo />
          <Box marginY="8">
            <Title>Acesse sua conta</Title>
          </Box>
          <Box flex="1">
            <Form onSubmit={onSubmit} />
          </Box>
        </Box>
        <Box
          flex="1"
          backgroundImage="url(https://d2r9epyceweg5n.cloudfront.net/assets/partners/img/sign-in-bg.png)"
          backgroundPosition="bottom left"
          backgroundRepeat="no-repeat"
          backgroundSize="auto"
          // @ts-ignore
          backgroundColor="#f7f7f7"
        />
      </Box>
    )}
  </DataProvider>
);

export default Login;
