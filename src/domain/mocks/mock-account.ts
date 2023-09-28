import * as faker from "@ngneat/falso";
import { AccountModel } from "@/domain/models";

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.randUuid(),
  countryId: faker.randNumber(),
  partnerId: faker.randNumber(),
  countryCode: faker.rand(["BR", "MX", "AR", "CL", "CO"]),
  countryLanguage: faker.rand(["es_AR", "pt_BR", "es_MX"]),
  currency: faker.randCurrencyCode(),
});
