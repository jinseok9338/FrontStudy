import { BrowserRouter, Routes, Route } from "react-router-dom";
import Count from "./count";
import TodoList from "./todo";
import Menu from "./todo/component/menu";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/count" element={<Count />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
