import * as faker from "@ngneat/falso";
import { EmailValidation } from "@/validation/validators";
import { InvalidFieldError } from "@/validation/errors";

const makeSut = (field: string): EmailValidation => new EmailValidation(field);

describe("EmailValidation", () => {
  it("Should return error if email is invalid", () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: faker.randWord() });

    expect(error).toEqual(new InvalidFieldError("Email inválido. Confira e insira novamente."));
  });

  it("Should return falsy if email is valid", () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: faker.randEmail() });

    expect(error).toBeFalsy();
  });

  it("Should return falsy if email is empty", () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: "" });

    expect(error).toBeFalsy();
  });
});
