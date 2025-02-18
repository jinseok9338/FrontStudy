import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TodoForm = () => {
  return (
    <>
      <div className="mt-4">
        task
        <div className="mt-2">
          <Input />
        </div>
        <Button className="mt-2 w-full bg-black text-white hover:bg-black">
          Add Task
        </Button>
      </div>
    </>
  );
};

export default TodoForm;
