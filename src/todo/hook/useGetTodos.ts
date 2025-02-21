import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api";

export const todoQueryKey = "todos";

const useGetTodos = (pageSize: number, pageNumber: number) => {
  return useQuery({
    queryKey: [todoQueryKey, pageSize, pageNumber],
    queryFn: () => getTodos(pageSize, pageNumber),
  });
};

export default useGetTodos;
