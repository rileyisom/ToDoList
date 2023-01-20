import React from 'react';

export const TaskItem = ({task}) => {
  return (
    <div>
      {task.text}
      {`${task.completed}`}
    </div>
  )
}