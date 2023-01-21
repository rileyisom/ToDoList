import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import updateTaskRequest from '../api/updateTaskRequest';
import deleteTaskRequest from '../api/deleteTaskRequest';

export const TaskItem = ({task}) => {
  const queryClient = new useQueryClient();

  const {mutate: updateTask} = useMutation(
    (updatedTask) => updateTaskRequest(updatedTask), {
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    }
  });

  const {mutate: deleteTask} = useMutation(
    (updatedTask) => deleteTaskRequest(updatedTask), {
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    }
  });

  return (
    <div>
      <input 
        checked={task.completed} 
        type="checkbox" 
        onChange={() => updateTask({
          ...task,
          completed: !task.completed
        })}
      />
      <input 
        type="text" 
        value={task.text}
        onChange={(e) => updateTask({
          ...task,
          text:e.target.value
        })}
      />
      <button onClick={() => deleteTask(task)}>
        delete
      </button>
    </div>
  )
}