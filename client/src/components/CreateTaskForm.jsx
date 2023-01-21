import React, {useState} from 'react';
import { useContext } from 'react';
import {useMutation, useQueryClient} from 'react-query';
import createTaskRequest from '../api/createTaskRequest';
import { TokenContext } from '../App';

export const CreateTaskForm = () => {
  const queryClient = new useQueryClient();
  const [text, setText] = useState('');
  const [token] = useContext(TokenContext);

  const {mutate: createTask} = useMutation(
    (newTask) => createTaskRequest(newTask, token), {
    onSettled: () => {
      queryClient.invalidateQueries('tasks');
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if(!text) {
        return;
      }
      createTask({
        text,
      });
      setText('');
    }}>
      <input onChange={e => setText(e.target.value)} value={text} type='text'/>
      <button>Create</button>
    </form>
  );
};