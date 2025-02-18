import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Count = ({ className }: React.ComponentProps<"div">) => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div className={cn("flex items-center gap-2 justify-center", className)}>
        {count}
        <Button className="order-first" onClick={handleDecrease}>
          감소
        </Button>
        <Button onClick={handleIncrease}>증가</Button>
      </div>
    </>
  );
};

export default Count;
