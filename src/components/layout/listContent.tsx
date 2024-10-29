import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { TodoRes } from "@/api";


interface IListContentProps {
  content: TodoRes;
}

const ListContent = ({content}:IListContentProps): React.JSX.Element => {
  
  // complete click event
  const handleComplete = () => {
    console.log('Mark as Complete');
  }

  // delete click event
  const handleDelete = () => {
    console.log('Delete');
  }

  console.log('content', content);

  const buttonStyle = "shadow-none hover:bg-gray-400 w-full rounded";
	return (
		<ul>
      {content.todos.map((item: any)=>{
        return (
          <li key={item.id} className="text-left border border-gray-200 rounded-[10px] p-4 mb-2">
            <p className="mb-6">{item.content}</p>
            <div className="flex gap-2">
              <Button type="button" className={cn(buttonStyle, 'border border-gray-200 hover:text-white')} onClick={handleComplete}>Mark as Complete</Button>
              <Button type="button" className={cn(buttonStyle, 'bg-red-500 text-white')} onClick={handleDelete}>Delete</Button>
            </div>
          </li>
        )
      })}
    </ul>
	);
}

export default ListContent;