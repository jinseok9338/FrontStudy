import TodoCard from "./component/todo-card";
import TodoHeader from "./component/todo-header";
import TodoForm from "./component/todo-form";
import TodoPagination from "./component/todo-pagination";
import { getTodos, postTodos, putTodos, deleteTodos } from "@/todo/api";

const TodoList = () => {
  const todos = getTodos(10, 0);

  return (
    <>
      <div className="w-[500px] mx-auto">
        <TodoHeader />
        <TodoCard />
        <TodoForm />
        <TodoPagination />
      </div>
    </>
  );
};

export default TodoList;
