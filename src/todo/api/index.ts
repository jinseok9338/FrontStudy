// 하는 역할은
// 1, 페이지 사이즈, 페이지 번호 를 받아서
// 2. url 에 todo list 를 가지고 와서

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

// 3 응답을 리턴 할거야
// GET
async function getTodos(
  pageSize: number,
  pageNumber: number
): Promise<TodoPageResponse> {
  const url = "http://localhost:8000/todos";
  const urlWithParams = `${url}?size=${pageSize}&page=${pageNumber}`;
  const response = await axios.get<TodoPageResponse>(urlWithParams);
  console.log("getTodos response", urlWithParams);
  return response.data;
}

export { getTodos };

// POST
async function postTodos(content: string): Promise<TodoPageResponse> {
  const url = "http://localhost:8000/todos";
  const response = await axios.post<TodoPageResponse>(url, { content });
  console.log("postTodos response", response.data);
  return response.data;
}

export { postTodos };

// PUT
const putTodos = async (
  id: number,
  content: string,
  isCompleted: boolean
): Promise<Todo> => {
  const url = "http://localhost:8000/todos";
  const urlWithParams = `${url}/${id}`;
  const response = await axios.put<Todo>(urlWithParams, {
    content,
    isCompleted,
  });
  console.log("putTodos response", response.data);
  return response.data;
};
// async function putTodos(
//   id: number,
//   content: string,
//   isCompleted: boolean
// ): Promise<Todo> {
//   const url = "http://localhost:8000/todos";
//   const urlWithParams = `${url}/${id}`;
//   const response = await axios.put<Todo>(urlWithParams, {
//     content,
//     isCompleted,
//   });
//   console.log("putTodos response", response.data);
//   return response.data;
// }

export { putTodos };

// DELETE
async function deleteTodos(todoId: number): Promise<Todo> {
  const url = "http://localhost:8000/todos";
  const urlWithParams = `${url}/${todoId}`;
  const response = await axios.delete<Todo>(urlWithParams);
  return response.data;
}

export { deleteTodos };
