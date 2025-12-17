import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const kbaseURL = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    goalId: apiTask.goal_id ? apiTask.goal_id : null,
    isComplete: apiTask.is_complete ? apiTask.is_complete : false,
  };
  delete newTask.goal_id;
  delete newTask.is_complete;
  return newTask;
};
const completeTaskAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .catch(error => console.log(error));
};

const removeTaskAPI = id => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch(error => console.log(error));
};


const App = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getAllTasksAPI().then(tasks => {
      const newTasks = tasks.map(convertFromAPI);
      setTaskData(newTasks);
    });
  }, []);

  const handleIsTaskComplete = (id) => {
    return completeTaskAPI(id)
      .then(() => {
        return setTaskData(taskData => {
          return taskData.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task);
        });
      });
  };

  const handleRemoveTask = (id) => {
    return removeTaskAPI(id)
      .then(() => {
        return setTaskData(taskData => {
          return taskData.filter(task => task.id != id);
        });
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={taskData} onIsComplete={handleIsTaskComplete} onRemoveTask={handleRemoveTask} />}</div>
      </main>
    </div>
  );
};

export default App;
