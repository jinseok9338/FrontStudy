import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../../api/client";

export const getTodosKey = "getTodos";
export const getTodoKey = "getTodo";
export const createTodoKey = "createTodo";
export const updateTodoKey = "updateTodo";
export const deleteTodoKey = "deleteTodo";
export const useGetTodos = ({ page, size }: { page: number; size: number }) => {
  return useQuery({
    queryKey: [getTodosKey, page, size],
    queryFn: async () => {
      const res = await getTodos(page, size);
      if (!res[0]) {
        return {
          todos: [],
          total: 0,
          hasMore: false,
          page: 0,
          size: 0,
        };
      }
      return res[0];
    },
  });
};
export const useGetTodo = (id: number) => {
  return useQuery({
    queryKey: [getTodoKey],
    queryFn: () => getTodo(id),
  });
};
export const useCreateTodo = () => {
  return useMutation({
    mutationKey: [createTodoKey],
    mutationFn: (content: string) => createTodo(content),
  });
};
export const useUpdateTodo = () => {
  return useMutation({
    mutationKey: [updateTodoKey],
    mutationFn: ({
      id,
      content,
      isCompleted,
    }: {
      id: number;
      content: string;
      isCompleted: boolean;
    }) => updateTodo(id, content, isCompleted),
  });
};
export const useDeleteTodo = () => {
  return useMutation({
    mutationKey: [deleteTodoKey],
    mutationFn: (id: number) => deleteTodo(id),
  });
};
