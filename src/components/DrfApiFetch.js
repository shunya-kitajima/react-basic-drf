import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [id, setId] = useState(1);
  const [editedTask, setEditedTask] = useState({ id: "", title: "" });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks/", {
        headers: {
          Authorization: "Token 04cd3ff8431e62b9b6c71dd184959548cf622ce9",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 04cd3ff8431e62b9b6c71dd184959548cf622ce9",
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 04cd3ff8431e62b9b6c71dd184959548cf622ce9",
        },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
      });
  };

  const newTask = (task) => {
    const data = {
      title: task.title,
    };
    axios
      .post(`http://localhost:8000/api/tasks/`, data, {
        headers: {
          Authorization: "Token 04cd3ff8431e62b9b6c71dd184959548cf622ce9",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id} {task.title}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
      Set id <br />
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <br />
      <button type="button" onClick={() => getTask()}>
        Get task
      </button>
      <h3>
        {selectedTask.id} {selectedTask.title}
      </h3>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange}
        placeholder="New task ?"
        required
      />
      <button onClick={() => newTask(editedTask)}>Create</button>
    </div>
  );
};

export default DrfApiFetch;
