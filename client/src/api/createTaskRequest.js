import { API_URL } from "./config"

export default (task, token) => {
  return fetch(`${API_URL}/createTask`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      text: task.text,
      completed: false
    })
  })
    .then(response => response.json())
}