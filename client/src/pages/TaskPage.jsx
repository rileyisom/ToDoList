import React, { useContext } from 'react';
import {useQuery} from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';

import {TaskItem} from '../components/TaskItem';
import { CreateTaskForm } from '../components/CreateTaskForm';
import readTasksRequest from '../api/readTasksRequest';
import { TokenContext } from '../App';

export const TaskPage = () => {
  const [token] = useContext(TokenContext);

  const {isLoading, data: tasks, } = useQuery(
    'tasks', 
    () => readTasksRequest(token)
  );

  return (
    <div>
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
  );
}