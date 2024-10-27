import { getTodosKey, useDeleteTodo, useUpdateTodo } from "@/hooks/todos";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { queryClient } from "@/api/react-query";
import { useSearchParams } from "react-router-dom";

const TodoItem = ({
  id,
  content,
  isCompleted,
}: {
  id: number;
  content: string;
  isCompleted: boolean;
}) => {
  const { mutateAsync: updateTodo } = useUpdateTodo();
  const { mutateAsync: deleteTodo } = useDeleteTodo();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeComplete = async () => {
    try {
      await updateTodo({
        id,
        content,
        isCompleted: !isCompleted,
      });
      alert("Todo updated successfully");
      queryClient.invalidateQueries({
        queryKey: [getTodosKey],
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      alert("Todo deleted successfully");
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
    <Card className="w-[400px]">
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2 justify-between">
          <Button
            onClick={handleChangeComplete}
            className="w-full"
            variant={isCompleted ? "secondary" : "outline"}
          >
            {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          </Button>
          <Button
            onClick={handleDelete}
            className="w-full"
            variant={"destructive"}
          >
            {"Delete"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
