// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Import the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users/1/todos'
        );
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const handleAdd = () => {
    if (newTodo.trim() !== '') {
      const newTodoObj = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };

      setTodos([...todos, newTodoObj]);
      setNewTodo('');
    }
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <div className="add-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new to-do"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button
                  onClick={() => {
                    const newTitle = prompt('Enter new title:', todo.title);
                    if (newTitle !== null) {
                      handleEdit(todo.id, newTitle);
                    }
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default TodoList;
