import * as faker from "@ngneat/falso";
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from "@/validation/validators";
import { ValidationBuilder as sut } from "@/main/builders";

describe("ValidationBuilder", () => {
  it("should return RequiredFieldValidation", () => {
    const field = faker.randDatabaseColumn();

    const validations = sut.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  it("should return EmailValidation", () => {
    const field = faker.randDatabaseColumn();

    const validations = sut.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });

  it("should return MinLengthValidation", () => {
    const field = faker.randDatabaseColumn();
    const length = faker.randNumber({ max: 4 });

    const validations = sut.field(field).min(length).build();

    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  it("should return a list of validations", () => {
    const field = faker.randDatabaseColumn();
    const length = faker.randNumber({ max: 4 });

    const validations = sut.field(field).required().min(length).email().build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
