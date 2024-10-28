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
// PUT: Todo 업데이트
// DELETE: Todo 삭제
