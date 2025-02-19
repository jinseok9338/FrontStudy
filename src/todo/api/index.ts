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
async function getTodos(
  pageSize: number,
  pageNumber: number
): Promise<TodoPageResponse> {
  const url = "http://localhost:8000/todos";
  const urlWithParams = `${url}?size=${pageSize}&page=${pageNumber}`;
  const response = await axios.get<TodoPageResponse>(urlWithParams);
  return response.data;
}

export { getTodos };
