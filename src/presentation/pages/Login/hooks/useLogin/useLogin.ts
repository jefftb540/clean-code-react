import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { loginState } from "@/presentation/pages/Login/login.store";
import { currentAccountState } from "@/presentation/store";

const useLogin = () => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState);
  const [state, setState] = useRecoilState(loginState);
  const resetState = useResetRecoilState(loginState);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [evt.target.name]: evt.target.value },
    }));
  };

  return { state, setCurrentAccount, setState, resetState, onChange };
};

export default useLogin;
