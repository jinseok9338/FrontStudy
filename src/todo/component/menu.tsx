import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="flex gap-2 [&>a]:p-2 [&>a]:rounded [&>a]:border">
      <Link to="/todo">Todo List</Link>
      <Link to="/count">Count</Link>
    </div>
  );
};

export default Menu;
