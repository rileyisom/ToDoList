import { API_URL } from "./config"

export default (task, token) => {
  return fetch(`${API_URL}/deleteTask/${task._id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    }
  })
}