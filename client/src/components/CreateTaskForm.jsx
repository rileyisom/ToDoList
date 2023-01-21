import React, {useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import createTaskRequest from '../api/createTaskRequest';

export const CreateTaskForm = () => {
  const queryClient = new useQueryClient();
  const [text, setText] = useState('');

  const {mutate: createTask} = useMutation(
    (newTask) => createTaskRequest(newTask), {
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