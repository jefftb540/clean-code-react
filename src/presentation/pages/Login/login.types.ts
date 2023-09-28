import { Authentication } from "@/domain/usecases";
import { Validation } from "@/presentation/protocols";

export interface Props {
  authentication: Authentication;
  validation: Validation;
}
