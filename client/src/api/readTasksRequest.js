import { API_URL } from "./config"

export default (filter, token) => {
  return fetch(`${API_URL}/tasks/${filter}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    }
  }).then(response => response.json())
}