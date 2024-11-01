import { desc } from "drizzle-orm";
import { db } from "../../../db/conncection";
import { Todo, todos } from "../models/schema";
export const listTodos = async (
  size: number,
  page: number
): Promise<Todo[]> => {
  return await db
    .select()
    .from(todos)
    .orderBy(desc(todos.createdAt))
    .limit(size)
    .offset(size * page);
};
