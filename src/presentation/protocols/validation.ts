export interface Validation {
  validate: (fieldName: string, input: { [key: string]: string }) => string;
}
