import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AccountModel } from "@/domain/models";

interface CurrentAccountState {
  auth: AccountModel;
  setCurrentAccount: (account: AccountModel) => void;
}

export const useCurrentAccountStore = create<CurrentAccountState>()(
  persist(
    (set) => ({
      auth: {} as AccountModel,
      setCurrentAccount: (account: AccountModel) =>
        set(() => ({ auth: account })),
    }),
    {
      name: "auth",
    },
  ),
);
