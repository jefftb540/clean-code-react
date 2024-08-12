import { ToDo } from "../models/to-do-model";

export interface ToDoList {
  todos: ToDo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
}
