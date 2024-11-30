import React from "react";

function TaskList({ tasks, deleteTask, toggleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          <span>{task.title}</span>
          <button onClick={() => toggleComplete(task._id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;