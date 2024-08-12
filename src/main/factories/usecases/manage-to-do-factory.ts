import { ToDoManager } from "@/data/usecases/manage-to-to";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeToDoManager = () =>
  new ToDoManager(makeApiUrl("todos"), makeAxiosHttpClient());
