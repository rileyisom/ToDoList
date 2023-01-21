import { API_URL, token } from "./config"

export default (task) => {
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