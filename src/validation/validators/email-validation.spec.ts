import * as faker from "@ngneat/falso";
import { EmailValidation } from "@/validation/validators";
import { InvalidFieldError } from "@/validation/errors";

const makeSut = (field: string): EmailValidation => new EmailValidation(field);

describe("EmailValidation", () => {
  it("should return error if email is invalid", async () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = await sut.validate({ [field]: faker.randWord() });

    expect(error).toEqual(
      new InvalidFieldError("Email inválido. Confira e insira novamente."),
    );
  });

  it("should return falsy if email is valid", async () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = await sut.validate({ [field]: faker.randEmail() });

    expect(error).toBeFalsy();
  });

  it("should return falsy if email is empty", async () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = await sut.validate({ [field]: "" });

    expect(error).toBeFalsy();
  });
});
