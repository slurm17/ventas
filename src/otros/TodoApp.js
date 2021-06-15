import React, { useReducer, useState } from "react";

const types = {
  add: "add",
  update: "update",
  delete: "delete",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.delete:
      return state.filter((todo) => todo.id !== action.payload);
    case types.add:
      return [...state, action.payload];
    case types.update:
      return state.map((todo) =>
        todo.id == action.payload.id ? action.payload : todo
      );
    default:
      return state;
  }
};

const TodoApp = () => {
  const initialTodo = [
    { id: 1, title: "uno" },
    { id: 2, title: "dos" },
  ];
  const [todos, dispatch] = useReducer(reducer, initialTodo);
  const [text, setText] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    const newTodo = { id: Date.now(), title: text };
    dispatch({
      type: types.add,
      payload: newTodo,
    });
    setText("");
  };

  return (
    <div>
      <ul>
        {todos.map((data) => (
          <li key={data.id}>
            {data.title}
            <button
              onClick={() =>
                dispatch({
                  type: types.delete, //Se envía la accion
                  payload: data.id, //Se envía la data
                })
              }
            >
              delete
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: types.update, 
                  // payload: { id: data.id, title: text }, Lo mismo que abajo 
                  payload: { ...data, title: text }, //Conviene mas por si hay muchos mas datos
                })
              }
            >
              update
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSumbit}>
        <input
          placeholder="todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TodoApp;
