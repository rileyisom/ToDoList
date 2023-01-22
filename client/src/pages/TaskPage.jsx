import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';

import { TaskItem } from '../components/TaskItem';
import { CreateTaskForm } from '../components/CreateTaskForm';
import readTasksRequest from '../api/readTasksRequest';
import { TokenContext } from '../App';

export const TaskPage = () => {
  const [token] = useContext(TokenContext);
  const [filter, setFilter] = useState('all');

  const {isLoading, data: tasks, refetch} = useQuery(
    ['tasks', filter], 
    () => readTasksRequest(filter, token)
  );

  return (
    <div>
      <h1>Task List</h1>
      <select value={filter} onChange={(e) => {
        setFilter(e.target.value);
      }}>
        <option value="all">All tasks</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
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