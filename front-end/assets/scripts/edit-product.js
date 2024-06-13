const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`http://localhost:3001/api/v1/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    const form = document.querySelector("form");
    const product = data.product;
    form.elements["name"].value = product.name;
    form.elements["price"].value = product.price;
    form.elements["stock"].value = product.stock;
    form.elements["image"].value = product.image;
  });

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form).entries();

  fetch(`http://localhost:3001/api/v1/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location = "/admin/index.html";
    })
    .catch((error) => alert(JSON.stringify(error)));
});
