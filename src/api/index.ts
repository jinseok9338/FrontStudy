import axios from 'axios';

// 1. 타입 생성을 해준다.
export interface TodoType {
    todos:   Todo[];
    total:   number;
    hasMore: boolean;
    page:    number;
    size:    number;
}
export interface Todo {
    id:          number;
    content:     string;
    isCompleted: boolean;
    createdAt:   string;
    updatedAt:   string;
}

// GET: Todos 가져오기
async function getTodos() {
  try {
    const response = await axios.get('http://localhost:8000/todos');
    const todos: TodoType = response.data;
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}
export { getTodos };

// POST: Todo 생성
async function addTodo(newTask: { content: string }) {
  try {
    const response = await axios.post('http://localhost:8000/todos', newTask);
    return response.data; // 서버에서 응답으로 받은 새 할 일 데이터
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}
export { addTodo };

// PUT: Todo 업데이트 (완료처리)

// DELETE: Todo 삭제
async function deleteTodo(id: number) {
  try {
    const response = await axios.delete(`http://localhost:8000/todos/${id}`);
    return response.data; // 서버에서 삭제된 할 일 데이터 또는 성공 메시지
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}
export { deleteTodo };
