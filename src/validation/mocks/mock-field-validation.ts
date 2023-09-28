import { FieldValidation } from "@/validation/protocols";

export class FieldValidationSpy implements FieldValidation {
  error: Error = null as unknown as Error;

  constructor(readonly field: string) {}

  validate(_input: object): Error {
    return this.error;
  }
}
