import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
export interface TodoWithPagination {
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
  createdAt: string;
  updatedAt: string;
}

export const getTodos = async (
  page: number,
  size: number
): Promise<[TodoWithPagination | null, string | null]> => {
  try {
    const response = await axios.get<TodoWithPagination>(
      `${API_URL}/todos?page=${page}&size=${size}`
    );
    return [response.data, null];
  } catch (err: any) {
    return [null, err.message ?? "Something went wrong"];
  }
};

export const getTodo = async (
  id: number
): Promise<[Todo | null, string | null]> => {
  try {
    const response = await axios.get<Todo>(`${API_URL}/todos/${id}`);
    return [response.data, null];
  } catch (err: any) {
    console.log(err);
    return [null, err.message ?? "Something went wrong"];
  }
};

export const createTodo = async (
  content: string
): Promise<[Todo | null, string | null]> => {
  try {
    const response = await axios.post<Todo>(`${API_URL}/todos`, {
      content,
    });
    return [response.data, null];
  } catch (err: any) {
    console.log(err);
    return [null, err.message ?? "Something went wrong"];
  }
};

export const updateTodo = async (
  id: number,
  content: string,
  isCompleted: boolean
): Promise<[Todo | null, string | null]> => {
  try {
    const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, {
      content,
      isCompleted,
    });
    return [response.data, null];
  } catch (err: any) {
    console.log(err);
    return [null, err.message ?? "Something went wrong"];
  }
};

export const deleteTodo = async (
  id: number
): Promise<[boolean | null, string | null]> => {
  try {
    const response = await axios.delete<{
      success: boolean;
    }>(`${API_URL}/todos/${id}`);
    return [response.data.success, null];
  } catch (err: any) {
    console.log(err);
    return [null, err.message ?? "Something went wrong"];
  }
};
