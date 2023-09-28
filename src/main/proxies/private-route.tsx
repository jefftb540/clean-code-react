import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { Box, Title, Text, Button } from "@nimbus-ds/components";

const PrivateRoute: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Box
          flexDirection="column"
          padding="6"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="2"
        >
          <Title>Bem vindo!</Title>
          <Text>Você está na área logada do aplicativo.</Text>
          <Button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Encerrar sessão!
          </Button>
        </Box>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default PrivateRoute;
