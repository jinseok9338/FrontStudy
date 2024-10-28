import axios from 'axios';

async function getTodos() {
  try {
    const response = await axios.get('https://api.nstack.in/v1/todos');
    const todos = response.data;
    console.log(todos); 
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

export { getTodos };
