import TodoCard from "./component/todo-card";
import TodoHeader from "./component/todo-header";
import TodoForm from "./component/todo-form";
import TodoPagination from "./component/todo-pagination";
import { getTodos, postTodos, putTodos, deleteTodos } from "@/todo/api";
import useGetTodos from "./hook/useGetTodos";

const TodoList = () => {
  const { data: todos, isLoading, error } = useGetTodos(10, 0);

  const todosData = todos?.todos;
  console.log("todosData", todosData);

  return (
    <>
      <div className="w-[500px] mx-auto">
        <TodoHeader />
        {todosData?.map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
        <TodoForm />
        <TodoPagination />
      </div>
    </>
  );
};

export default TodoList;
