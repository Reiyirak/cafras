function fetchUser(userId) {
  fetch(`http://localhost:5000/api/v1/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      document.getElementById('name').value = user.user.name;
      document.getElementById('email').value = user.user.email;
    })
    .catch(error => {
      console.error(error);
    });
}
