import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@nimbus-ds/components";

import { useLoginStore } from "@/presentation/pages/Login/login.store";
import { Props } from "./dataProvider.types";
import { useCurrentAccountStore } from "@/presentation/store";

const DataProvider: React.FC<Props> = ({
  authentication,
  validation,
  children,
}) => {
  const navigate = useNavigate();
  const loginStore = useLoginStore();
  const { addToast } = useToast();
  const { setCurrentAccount } = useCurrentAccountStore();

  useEffect(() => loginStore.resetState(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const validate = async (): Promise<boolean> => {
    const errors = {
      email: await validation.validate("email", loginStore.values),
      password: await validation.validate("password", loginStore.values),
    };

    const isFormInvalid = !!errors.email || !!errors.password;
    loginStore.setErrors(errors);
    return !isFormInvalid;
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (!loginStore.isLoading && (await validate())) {
        loginStore.setIsLoading(true);
        const account = await authentication.auth({
          email: loginStore.values.email,
          password: loginStore.values.password,
        });
        setCurrentAccount(account);
        navigate("/");
      }
    } catch (error: unknown) {
      const err = error as { message: { description: string } };
      loginStore.setIsLoading(false);
      addToast({
        type: "danger",
        text: err.message?.description ?? err.message,
        duration: 4000,
        id: "login-error",
      });
    }
  };

  return children({ onSubmit });
};

export default DataProvider;
