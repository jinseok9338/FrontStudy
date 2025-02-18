import { Button } from "@/components/ui/button";

const TodoCard = () => {
  return (
    <>
      <div className="w-[450px] mx-auto mt-4 p-4 rounded-lg border border-solid border-black-50">
        <span>task input 값</span>
        <div className="flex mt-4 items-center gap-2 [&>button]:w-1/2">
          <Button>Mark as Complete</Button>
          <Button className="bg-red-500 text-white hover:bg-red-500">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
