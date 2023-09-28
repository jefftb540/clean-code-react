export interface FieldValidation {
  field: string;
  validate: (input: { [key: string]: string }) => Error | null;
}
