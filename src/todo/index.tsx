import TodoCard from "./component/todo-card";
import TodoHeader from "./component/todo-header";
import TodoForm from "./component/todo-form";
import TodoPagination from "./component/todo-pagination";
import { getTodos, postTodos, putTodos, deleteTodos } from "@/todo/api";

const TodoList = () => {
  const todos = getTodos(10, 0);
  console.log("get :" + todos);

  const todosPost = postTodos("post 123 post 456");
  console.log("post :" + todosPost);

  const todosPut = putTodos(366, "put 123 put 456", true);
  console.log("post :" + todosPut);

  const todosDelete = deleteTodos(373);
  console.log("post :" + todosDelete);
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
