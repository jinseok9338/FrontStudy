import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form"
import ListContent from "./listContent";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodoList, getTodoList } from '../../api/index';


const TodoList = (): React.JSX.Element => {
  const form = useForm();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['getTodoList'],
    queryFn: getTodoList
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodoList'] });
    },
    
  });
  
  // add Task click event
  const handleAddTask = () => {
    mutate(form.getValues('task'));
    form.reset();
  }
	return (
		<>
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <p className="text-gray-400 mb-10">Please fill in the form to add a new task</p>
      {/* task list */}
      <ListContent content={data ?? { todos: [], total: 0, hasMore: false, page: 0, size: 0 }} />
      {/* task input */}
      <div className="text-left">
        <Form {...form}>
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your task" className="rounded border border-gray-200 placeholder:text-gray-400 mt-2" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full bg-black text-white rounded shadow-none hover:bg-gray-400 mt-4" onClick={handleAddTask}>Add Task</Button>
        </Form>  
      </div>
      
    </>
	);
}

export default TodoList;