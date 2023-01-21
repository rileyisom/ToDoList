import { API_URL } from "./config"

export default (token) => {
  return fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    }
  }).then(response => response.json())
}