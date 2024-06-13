const submitProduct = (event) => {
  event.preventDefault();
  const form = document.querySelector("form");
  const data = new FormData(form);

  fetch("http://localhost:3001/api/v1/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(data)),
  })
    .then((response) => response.json())
    .then((data) => (window.location = "/admin/index.html"));
};

const form = document.querySelector("form");
form.addEventListener("submit", submitProduct);
