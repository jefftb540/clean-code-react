import { string } from "yup";
import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  async validate(input: { [key: string]: string }): Promise<Error | null> {
    if (!input[this.field]) return null;
    try {
      await string()
        .email("Email inválido. Confira e insira novamente.")
        .validate(input[this.field]);
      return null;
    } catch (error: unknown) {
      return new InvalidFieldError((error as { errors: string[] }).errors?.[0]);
    }
  }
}
