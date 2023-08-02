import React, { useState } from 'react';

import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos,setTodos] = useState<Todo[]>([]);


  type Todo = {
    inputValue:string;
    id: number;
    checked:boolean;
  };

  const handleChange =(e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 新しいTODOを作成
    const newTodo:Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

   const handleDelete = (id:number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
   };
  const handleCheked = (id: number,checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
  };

  return (
    <div className="App">
     <div> 
     <h1>TODOリスト </h1>
     {/* ホームに何かを追加してエンターキーを押す */}
     <form onSubmit={(e) => handleSubmit(e)}>
     <input type="text" 
     onChange={(e) => handleChange(e)} 
     className="inputText" 
     />
     <input type="submit" value="追加" className="submitButton" />
     </form>
     <ul className="todoList">
      {todos.map((todo) => (
        <li key ={todo.id}>

          <input 
          type="text" 
          value={todo.inputValue}
          onChange={(e) => handleEdit(todo.id, e.target.value)} 
          disabled={todo.checked}
          />
          <input 
          type="checkbox" 
          checked={todo.checked}
          onChange={() => handleCheked(todo.id, todo.checked)} 
          />
          <button onClick={() => handleDelete(todo.id)}>消</button>
        </li>
      ))}
     </ul>




    </div>
    </div>
  );
}

export default App;
