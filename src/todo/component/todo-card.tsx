import { Button } from "@/components/ui/button";
import { Todo } from "../api";
const TodoCard = ({ todo }: { todo: Todo }) => {
  return (
    <>
      <div className="w-[450px] mx-auto mt-4 p-4 rounded-lg border border-solid border-black-50">
        <span>{todo.content}</span>
        <div className="flex mt-4 items-center gap-2 [&>button]:w-1/2">
          <Button>
            {todo.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          </Button>
          <Button className="bg-red-500 text-white hover:bg-red-500">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
