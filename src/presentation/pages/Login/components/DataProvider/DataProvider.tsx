import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useToast } from "@nimbus-ds/components";

import { useLogin } from "@/presentation/pages/Login/hooks";
import { Props } from "./dataProvider.types";
import { currentAccountState } from "@/presentation/store";

const DataProvider: React.FC<Props> = ({
  authentication,
  validation,
  children,
}) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { resetState, setState, setCurrentAccount, state } = useLogin();
  const [_, setAuth] = useRecoilState(currentAccountState);

  useEffect(() => resetState(), []);

  const validate = async (): Promise<boolean> => {
    const { email, password } = state.values;
    const formData = { email, password };

    console.log(await validation.validate("email", formData));

    const errors = {
      email: await validation.validate("email", formData),
      password: await validation.validate("password", formData),
    } as typeof state.errors;

    const isFormInvalid = !!errors.email || !!errors.password;
    setState((prevState) => ({
      ...prevState,
      errors: { ...prevState.errors, ...errors },
    }));

    return !isFormInvalid;
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (!state.isLoading && await validate()) {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const account = await authentication.auth(state.values);
        setCurrentAccount(account);
        setAuth((prevState) => ({ ...prevState, auth: account }));
        navigate("/");
      }
    } catch (error: any) {
      setState((prevState) => ({ ...prevState, isLoading: false }));
      addToast({
        type: "danger",
        text: error.message?.description ?? error.message,
        duration: 4000,
        id: "login-error",
      });
    }
  };

  return children({ onSubmit });
};

export default DataProvider;
