import axios from "axios";
export interface TodoPageResponse {
  todos: Todo[];
  total: number;
  hasMore: boolean;
  page: number;
  size: number;
}

export interface Todo {
  id: number;
  content: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getTodos(
  pageSize: number,
  pageNumber: number
): Promise<TodoPageResponse> {
  const url = "http://localhost:8000/todos";
  const urlWithParams = `${url}?size=${pageSize}&page=${pageNumber}`;
  const response = await axios.get<TodoPageResponse>(urlWithParams);
  console.log("getTodos response", urlWithParams);
  return response.data;
}

// POST
export async function postTodos(content: string): Promise<Todo> {
  const url = "http://localhost:8000/todos";
  const response = await axios.post<Todo>(url, { content });
  console.log("postTodos response", response.data);
  return response.data;
}

// PUT
export async function putTodos(
  id: number,
  content: string,
  isCompleted: boolean
): Promise<Todo> {
  const url = "http://localhost:8000/todos";
  const urlWithIdPath = `${url}/${id}`;
  const response = await axios.put<Todo>(urlWithIdPath, {
    content,
    isCompleted,
  });
  console.log("putTodos response", response.data);
  return response.data;
}

interface DeleteTodoResponse {
  success: boolean;
}
export async function deleteTodos(todoId: number): Promise<DeleteTodoResponse> {
  const url = "http://localhost:8000/todos";
  const urlWithIdPath = `${url}/${todoId}`;
  const response = await axios.delete<DeleteTodoResponse>(urlWithIdPath);
  return response.data;
}
