const API_URL = 'http://localhost:8080'

export default () => {
  return fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDAxOTg0OH0.uLdAu1Y7_7le8AJEsAjXZEWxW00oZCHUsCrVUsjaiDY`,
      "Content-Type": 'application.json'
    }
  })
  .then(response => response.json())
}