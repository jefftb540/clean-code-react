import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { ToDo } from "@/domain/models/to-do-model";

type PaginatedToDos = {
  todos: ToDo[];
  total: number;
  limit: number;
  skip: number;
};

export class ToDoManager {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<PaginatedToDos | ToDo>,
  ) {}

  async list(): Promise<PaginatedToDos> {
    console.log(this.url);
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });
    console.log(httpResponse);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as PaginatedToDos;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError(httpResponse.message);
      default:
        throw new UnexpectedError(httpResponse.message);
    }
  }

  async get(id: string): Promise<ToDo> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: { id },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as ToDo;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError(httpResponse.message);
      default:
        throw new UnexpectedError(httpResponse.message);
    }
  }

  async create(todo: ToDo): Promise<ToDo> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: todo,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body as ToDo;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError(httpResponse.message);
      default:
        throw new UnexpectedError(httpResponse.message);
    }
  }

  async update(id: string, todo: ToDo): Promise<ToDo> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: "put",
      body: todo,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as ToDo;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError(httpResponse.message);
      default:
        throw new UnexpectedError(httpResponse.message);
    }
  }
  async delete(id: string): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: "delete",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
        return;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError(httpResponse.message);
      default:
        throw new UnexpectedError(httpResponse.message);
    }
  }
  async toggleCompleted(id: string, completed: boolean): Promise<ToDo> {
    const todo = await this.get(id);
    todo.completed = completed;
    return this.update(id, todo);
  }
}
