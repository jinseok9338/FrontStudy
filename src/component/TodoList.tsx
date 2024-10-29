import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addTodo, getTodos } from "@/api/index";
import { useRef } from "react";
const TodoList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  console.log("data", todos);

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // 새로운 할 일이 추가되면 todos 쿼리를 다시 불러옴
      if (inputRef.current) {
        inputRef.current.value = ""; // 입력 필드 초기화
      }
    },
  });

  const handleAddTodo = () => {
    const newTaskContent = inputRef.current?.value.trim();
    if (newTaskContent) {
      mutate({ content: newTaskContent });
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
          <div key={todo.id} className="border p-5 rounded mb-5">
            <span className="mb-4 block">{todo.content}</span>
            <div className="flex gap-2 items-stretch">
              <Button className="grow" variant="outline">
                Complete
              </Button>
              <Button className="grow" variant="black">
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
