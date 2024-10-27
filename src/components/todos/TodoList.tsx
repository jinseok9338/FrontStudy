import { Todo } from "@/api/client";
import TodoItem from "./TodoItem";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="grid grid-cols-1 mt-5 gap-3">
      {todos.map((todo) => (
        <div key={todo.id} className="col-span-1 flex justify-center w-full">
          <TodoItem
            id={todo.id}
            content={todo.content}
            isCompleted={todo.isCompleted}
          />
        </div>
      ))}
    </div>
  );
};
export default TodoList;
