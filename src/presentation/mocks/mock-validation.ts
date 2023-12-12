import { Validation } from "@/presentation/protocols";

export class ValidationStub implements Validation {
  errorMessage?: string;

  validate(_fieldName: string, _input: object): Promise<string | ""> {
    return new Promise((resolve) => resolve(this.errorMessage ?? ""));
  }
}
