import { API_URL, token } from "./config"

export default (task) => {
  return fetch(`${API_URL}/deleteTask/${task._id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    }
  })
}