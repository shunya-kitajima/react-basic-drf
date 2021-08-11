import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [id, setId] = useState(1);

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

  const deleteTask = () => {
    axios
      .delete(`http://localhost:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 04cd3ff8431e62b9b6c71dd184959548cf622ce9",
        },
      })
      .then((res) => console.log(res));
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id} {task.title}
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
      <button type="button" onClick={() => deleteTask()}>
        Delete task
      </button>
      <h3>
        {selectedTask.id} {selectedTask.title}
      </h3>
    </div>
  );
};

export default DrfApiFetch;
