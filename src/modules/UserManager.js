export default {
  getAll: () => {
    return fetch("http://localhost:5002/users").then(users =>
      users.json()
    );
  },
  getById: id =>
    fetch(`http://localhost:5002/users/${id}`).then(e => e.json()),
  getByEmail: email =>
    fetch(`http://localhost:5002/users?email=${email}`).then(e => e.json()),
  deleteUser: id => {
    return fetch(`http://localhost:5002/users/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/users`))
      .then(e => e.json());
  },
  postUser(newUser) {
    return fetch(`http://localhost:5002/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json());
  }
};