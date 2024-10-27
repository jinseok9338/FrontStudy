import { todos } from "../domain/todos/models/dbSchema";

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
