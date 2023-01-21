import { API_URL, token } from "./config"

export default (task) => {
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