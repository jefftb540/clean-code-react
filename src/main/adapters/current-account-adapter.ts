import { makeLocalStorageAdapter } from "@/main/factories/cache";
import { AccountModel } from "@/domain/models";

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set("auth", account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get("auth");
};
