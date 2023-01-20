import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import {TaskItem} from './components/TaskItem';
import readTasksRequest from './api/readTasksRequest';
import './App.css';

function App() {
  const {isLoading, data: tasks} = useQuery('tasks', readTasksRequest);

  return (
    <div className="App"> 
      {isLoading ? (
        <ClipLoader size={100}/>
      ) : (
        tasks.map(task => (
          <TaskItem task={task} key={task._id}/>
        ))
      )}
    </div>
  )
}

export default App
