import React, { useContext, useState } from 'react';
import { useQueryClient, useMutation, useQuery} from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';

import {TaskItem} from '../components/TaskItem';
import { CreateTaskForm } from '../components/CreateTaskForm';
import readTasksRequest from '../api/readTasksRequest';
import { TokenContext } from '../App';

export const TaskPage = () => {
  const queryClient = new useQueryClient();
  const [token] = useContext(TokenContext);
  const [filter, setFilter] = useState('all');

  const {isLoading, data: tasks, } = useQuery(
    'tasks', 
    () => readTasksRequest(filter, token)
  );

  const {mutate: updateFilter} = useMutation(
    (newFilter) => setFilter(newFilter), {
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    }
  });

  return (
    <div>
      <h1>Task List</h1>
      <select value={filter} onChange={(e) => {
        updateFilter(e.target.value);
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