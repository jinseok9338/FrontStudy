import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addTodo, getTodos, deleteTodo, completeTodo } from "@/api/index";
import { useRef } from "react";
import { cn } from "@/lib/utils";
const TodoList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  console.log("data", todos);

  const { mutateAsync: addTodoAsync } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  });

  const { mutateAsync: deleteTodoAsync } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutateAsync: completeTodoAsync } = useMutation({
    mutationFn: completeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = async () => {
    const newTaskContent = inputRef.current?.value.trim();
    if (newTaskContent) {
      await addTodoAsync({ content: newTaskContent });
      // 추가 작업 수행 가능
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoAsync(id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const handleCompleteTodo = async (id: number, content: string) => {
    try {
      await completeTodoAsync({ id, content });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  return (
    <div className="flex justify-center flex-col p-4">
      <span className="font-bold text-[30px] text-center">TodoList</span>
      <span className="text-[15px] text-center mb-5">
        Please fill in the form to add a new task
      </span>

      {todos?.todos?.length ?? 0 > 0 ? (
        todos?.todos.map((todo) => (
          <div
            key={todo.id}
            className={cn(
              "border p-5 rounded mb-5",
              todo.isCompleted && "bg-gray-200"
            )}
          >
            <span className={cn("mb-4 block", todo.isCompleted && "")}>
              {todo.content}
            </span>
            <div className="flex gap-2 items-stretch">
              <Button
                className="grow"
                variant="outline"
                onClick={() => handleCompleteTodo(todo.id, todo.content)}
              >
                Complete
              </Button>
              <Button
                className="grow bg-gray-300"
                variant="outline"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No tasks available.</p>
      )}

      <div className="mb-5">
        <Label className="mb-2 block">Task</Label>
        <Input
          type="text"
          ref={inputRef} // Input 컴포넌트에 useRef 적용
          className="border-gray-200"
        />
      </div>

      <Button variant="black" onClick={handleAddTodo}>
        Add Task
      </Button>
    </div>
  );
};

export default TodoList;
