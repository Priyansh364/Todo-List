import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";

import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [Showfinished, setShowfinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("Todos");
    if (todoString) {
      let Todos = JSON.parse(localStorage.getItem("Todos"));
      setTodos(Todos);
    }
  }, []);

  const saveTOLS = (params) => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  };

  const handleEdit = (e, id) => {
    let t = Todos.filter((i) => i.id === id);
    setTodo(t[0].Todo);
    let newtodos = Todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newtodos);

    saveTOLS();
  };
  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo("");
    console.log(Todos);
    saveTOLS();
  };
  const handleDelete = (e, id) => {
    let newtodos = Todos.filter((item) => {
      return item.id !== id;
    });

    if (window.confirm("Delete the item?")) {
      setTodos(newtodos);
    }
    saveTOLS();
  };
  

  const togglefinish = (e) => {
    setShowfinished(!Showfinished)
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((item) => {
      return item.id == id;
    });
    let newtodos = [...Todos];

    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    saveTOLS();

  };

  return (
    <>
      <Navbar />
      <div className=" lg:mx-14 min-h-[80vh] flex flex-col lg:my-5 py-5 rounded-md px-3 bg-slate-200">
        <div>
          <div className="addtodo font-bold text-xl">Add new Todo</div>
          <div>
            <input
              onChange={handleChange}
              value={Todo}
              type="text"
              className="lg:w-1/2 w-[65%]"
            />
            <button
              onClick={handleAdd}
              disabled={Todo.length < 3}
              className="bg-slate-400  cursor-pointer hover:bg-slate-600 rounded-md m-2 mx-6 px-3 font-bold py-1 "
            >
              Add
            </button>
          </div>
        <input
          className="flex m-2  float-start"
          type="checkbox"
          onChange={togglefinish}
          checked={Showfinished}

        /> Show Finished
        </div>
        <div className="yourtodo text-xl font-bold">Your Todo's</div>
        {Todos.length == 0 && <div className="m-3">No Todos to display</div>}

        {Todos.map((item) => {
          return ( Showfinished || !item.isCompleted) &&  <div
              key={item.id}
              className="lg-m-2 lg-px-3 rounded-md  flex lg:w-1/2 justify-between"
            >
              <div className="flex ">
                <input
                  name={item.id}
                  type="checkbox"
                  onChange={handlecheckbox}
                  checked={item.isCompleted}
                />
                <div
                  className={
                    item.isCompleted
                      ? "flex todotext p-2 line-through"
                      : " flex todotext p-2 "
                  }
                >
                  {item.Todo}
                </div>
              </div>
              <div className="flex h-full">
                <button
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                  className="bg-slate-400 rounded-md m-2 px-3 py-1 font-bold"
                >
                  Delete{" "}
                </button>
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-slate-400 rounded-md m-2 px-3 py-1 font-bold"
                >
                  Edit
                </button>
              </div>
            </div>
          
        })}
      </div>
    </>
  );
}

export default App;
