import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: { [key: string]: string }): Error | null {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}
