import * as faker from "@ngneat/falso";
import { LocalStorageAdapter } from "@/infra/cache";

import "jest-localstorage-mock";

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should call localStorage.setItem with correct values", async () => {
    const sut = makeSut();
    const key = faker.randDatabaseColumn();
    const value = faker.randJSON();

    sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });

  it("should call localStorage.removeItem if value is null", async () => {
    const sut = makeSut();
    const key = faker.randDatabaseColumn();

    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it("should call localStorage.getItem with correct value", async () => {
    const sut = makeSut();
    const key = faker.randDatabaseColumn();
    const value = faker.randJSON();
    const getItemSpy = jest
      .spyOn(localStorage, "getItem")
      .mockReturnValueOnce(JSON.stringify(value));

    const obj = sut.get(key);

    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
