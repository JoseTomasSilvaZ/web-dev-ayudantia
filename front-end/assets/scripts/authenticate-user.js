fetch("http://localhost:3001/api/v1/auth/me", {
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    if (!data.user) {
      window.location = "/login.html";
    }
  })
  .catch((error) => console.log(error));
