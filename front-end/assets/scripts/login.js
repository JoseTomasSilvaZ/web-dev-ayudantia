const form = document.getElementById("login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form).entries();

  fetch("http://localhost:3001/api/v1/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        return (window.location.href = "/admin/index.html");
      }
      const errorMessage = document.createElement("span");
      errorMessage.innerText = data.message;
      errorMessage.className = "alert alert-danger mt-3 d-block";
      form.appendChild(errorMessage);
    });
});
