import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id} {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrfApiFetch;
