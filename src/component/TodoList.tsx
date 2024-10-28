import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const TodoList = () => {
  return (
    <div className="flex justify-center flex-col p-4">
      <span className="font-bold text-[30px] text-center">TodoList</span>
      <span className="text-[15px] text-center mb-5">
        Please fill in the form to add a new task
      </span>

      <div className="border p-5 rounded mb-5">
        <span className="mb-4 block">todo 1</span>
        <div className="flex gap-2 items-stretch">
          <Button className="grow" variant="outline">
            Complete
          </Button>
          <Button className="grow" variant="black">
            Delete
          </Button>
        </div>
      </div>

      <div className="mb-5">
        <Label className="mb-2 block">Task</Label>
        <Input type="email" className="border-gray-200"></Input>
      </div>

      <Button variant="black">Add Task</Button>
    </div>
  );
};

export default TodoList;
