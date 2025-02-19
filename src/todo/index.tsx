import TodoCard from "./component/todo-card";
import TodoHeader from "./component/todo-header";
import TodoForm from "./component/todo-form";
import TodoPagination from "./component/todo-pagination";
import { getTodos } from "./api";

const TodoList = () => {
  const todos = getTodos(10, 1);
  console.log(todos);
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
