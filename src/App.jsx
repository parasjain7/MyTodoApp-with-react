import "./App.css";
import React, { useState, useEffect } from "react";
import { Header } from "./My Components/Header";
import { AddTodo } from "./My Components/AddTodo";
import { Footer } from "./My Components/Footer";
import { About } from "./My Components/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  let initTodo;

  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 1;
    } else sno = todos[todos.length - 1].sno + 1;
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };

    setTodos([...todos, myTodo]);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <AddTodo addTodo={addTodo} todo={todos} onDelete={onDelete} />
            }
          />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
export default App;
