import React, {useCallback, useState, useEffect} from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { debounce } from 'lodash';
import updateTaskRequest from '../api/updateTaskRequest';
import deleteTaskRequest from '../api/deleteTaskRequest';
import { useContext } from 'react';
import { TokenContext } from '../App';

export const TaskItem = ({task}) => {
  const queryClient = new useQueryClient();
  const [text, setText] = useState(task.text);
  const [token] = useContext(TokenContext);

  const {mutate: updateTask} = useMutation(
    (updatedTask) => updateTaskRequest(updatedTask, token), {
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    }
  });

  const {mutate: deleteTask} = useMutation(
    (updatedTask) => deleteTaskRequest(updatedTask, token), {
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    }
  });

  const debouncedUpdateTask = useCallback(debounce(updateTask, 1000), [updateTask]);

  useEffect(() => {
    if (text !== task.text) {
      debouncedUpdateTask({
        ...task,
        text,
      });
    }
  }, [text])

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
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => deleteTask(task)}>
        Delete
      </button>
    </div>
  )
}