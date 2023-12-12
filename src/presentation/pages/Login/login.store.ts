import { create } from "zustand";

interface Fields {
  [key: string]: string;
}

interface LoginState {
  isLoading: boolean;
  values: Fields;
  errors: Fields;
  setIsLoading: (status: boolean) => void;
  setValues: (errors: Fields) => void;
  setErrors: (errors: Fields) => void;
  resetState: () => void;
}

const initialState = {
  isLoading: false,
  values: { email: "", password: "" },
  errors: { email: "", password: "" },
};

export const useLoginStore = create<LoginState>((set) => ({
  ...initialState,
  setIsLoading: (status: boolean) => set(() => ({ isLoading: status })),
  setValues: (values: Fields) => {
    set((state) => {
      return { values: { ...state.values, ...values } };
    });
  },
  setErrors: (errors: Fields) =>
    set((state) => {
      return { errors: { ...state.errors, ...errors } };
    }),
  resetState: () => {
    set(initialState);
  },
}));
