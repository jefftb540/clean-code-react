import { HttpClient } from "@/data/protocols/http";
import { AxiosHttpClient } from "@/infra/http";

export const makeAxiosHttpClient: () => HttpClient = (): AxiosHttpClient =>
  new AxiosHttpClient();
