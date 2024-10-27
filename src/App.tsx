import Providers from "./providers";

import TodoForm from "./components/todos/TodoForm";
import TodoList from "./components/todos/TodoList";
import { useGetTodos } from "./hooks/todos";
import { useSearchParams } from "react-router-dom";
import NavigationPagination from "./components/todos/NavigationPagination";
import { Padding } from "./components/ui/padding";

function App() {
  const [searchParams] = useSearchParams();

  const pageParams = searchParams.get("page") ?? "1";
  const sizeParams = searchParams.get("size") ?? "5";

  const page = parseInt(pageParams);
  const size = parseInt(sizeParams);

  const { data: todosWithPagination, isLoading } = useGetTodos({
    page: page - 1,
    size,
  });

  const todos = todosWithPagination?.todos;
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please fill in the form to add a new task
        </p>
      </div>
      <TodoList todos={todos ?? []} />
      <Padding height={10} />
      <TodoForm />
      <Padding height={10} />
      <NavigationPagination
        page={page}
        hasNext={todosWithPagination?.hasMore ?? false}
      />
    </>
  );
}

export default App;
