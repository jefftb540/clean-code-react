import * as faker from "@ngneat/falso";
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from "@/validation/validators";
import { ValidationBuilder as sut } from "@/main/builders";

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const field = faker.randDatabaseColumn();

    const validations = sut.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test("Should return EmailValidation", () => {
    const field = faker.randDatabaseColumn();

    const validations = sut.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test("Should return MinLengthValidation", () => {
    const field = faker.randDatabaseColumn();
    const length = faker.randNumber({ max: 4 });

    const validations = sut.field(field).min(length).build();

    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test("Should return a list of validations", () => {
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
