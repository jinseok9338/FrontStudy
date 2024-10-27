import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef } from "react";
import { getTodosKey, useCreateTodo } from "@/hooks/todos";
import { queryClient } from "@/api/react-query";
import { useSearchParams } from "react-router-dom";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { mutateAsync: createTodo } = useCreateTodo();
  const [_searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = async () => {
    if (!ref.current || !ref.current.value) return;
    try {
      const res = await createTodo(ref.current.value);
      if (!res[0]) {
        return alert("Something went wrong");
      }
      alert("Todo added successfully");
      ref.current.value = "";
      queryClient.invalidateQueries({
        queryKey: [getTodosKey],
      });
      setSearchParams({ page: "1" });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="task">Task</Label>
          <Input ref={ref} id="task" placeholder="Enter your task" required />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default TodoForm;
