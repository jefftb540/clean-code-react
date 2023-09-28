import React from "react";
import { makeLoginValidation } from "@/main/factories/validation";
import { makeRemoteAuthentication } from "@/main/factories/usecases";
import { Login } from "@/presentation/pages";

export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};
