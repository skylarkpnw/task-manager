import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const [tasks, setTasks] = useState([]); // State to store the list of tasks

  // Fetch tasks from the backend when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle adding a new task
  const addTask = async (newTask) => {
    try {
      const response = await axios.post("http://localhost:5000/tasks", newTask);
      setTasks([...tasks, response.data]); // Add the new task to the current list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${taskId}`);
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, completed: response.data.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };
  

  // Handle deleting a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {/* AddTaskForm passes its new task directly to the addTask function */}
      <AddTaskForm addTask={addTask} />
      {/* TaskList handles task rendering and actions */}
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
