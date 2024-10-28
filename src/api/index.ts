import axios from 'axios';

const getTodoList = async () => {
  try {
    return await axios.get('https://api.nstack.in/v1/todos');
  } catch (error) {
    console.log(error);
  }
}

const countTodoList = async () => {
  const todoList = await getTodoList();

  console.log('totolist', todoList);
}

countTodoList();