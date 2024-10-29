import axios from 'axios';

export type TodoRes = {
  todos: {
    id: number;
    content: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
  total: number;
  hasMore: boolean;
  page: number;
  size: number;
}

export const getTodoList = async () => {
  try {
    const response = await axios.get<TodoRes>('http://localhost:8000/todos');
    return response.data;
  } catch (error) {
    console.log('get error', error);
    throw error;
  }
}

export const addTodoList = async (content: string) => {
  try {
    const response = await axios.post('http://localhost:8000/todos', {content});
    return response.data;
  } catch (error) {
    console.log('post error', error);
    throw error;
  }
}