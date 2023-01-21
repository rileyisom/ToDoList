import { API_URL } from "./config"

export default (task, token) => {
  return fetch(`${API_URL}/updateTask/${task._id}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      text: task.text,
      completed: task.completed
    })
  })
    .then(response => response.json())
}