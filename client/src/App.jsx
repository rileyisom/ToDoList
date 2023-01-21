import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import {TaskItem} from './components/TaskItem';
import { CreateTaskForm } from './components/CreateTaskForm';
import readTasksRequest from './api/readTasksRequest';
import './App.css';

function App() {
  const {isLoading, data: tasks} = useQuery('tasks', readTasksRequest);

  return (
    <div className="App"> 
      <h1>Task List</h1>
      {isLoading ? (
        <ClipLoader size={100}/>
      ) : (
        tasks.map(task => (
          <TaskItem task={task} key={task._id}/>
        ))
      )}
      <CreateTaskForm/>
    </div>
  )
}

export default App
