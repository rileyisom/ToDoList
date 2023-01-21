import { API_URL, token } from "./config"

export default () => {
  return fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    }
  }).then(response => response.json())
}