import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';

const App = () => {

  useEffect(() => {
    document.title = "To Do List";
  });

  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/getToDoList");
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const addTask = async (event) => {
    const task = event.target.value;
    if (event.key === "Enter" && task !== "") {
      await axios.post("http://localhost:5000/addTask", {task});
      event.target.value = "";
      getData(); // to refresh the list
    }
  }

  const deleteTask = async (task_index) => {
    await axios.delete("http://localhost:5000/deleteTask", { data: {task_index} });
    getData(); // to refresh the list
  }


  return (
    <div className = "to-do-list-container">
      <h1>To Do List</h1>
      <input type="text" name="add-task" placeholder="add task" onKeyDown={(event)=>addTask(event)}/>
      <ol>
        {data.map((task, index) => 
        <div className = "task-container">
          <li key={index}>{task}</li>
            <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
        </div>)}
      </ol>
    </div>
  );
};


export default App;
