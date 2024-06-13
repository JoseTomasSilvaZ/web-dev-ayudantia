fetch("http://localhost:3001/api/v1/products")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector("tbody");
    let products = "";
    data.products.forEach((product) => {
      let newProduct = `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.image}</td>
            <td>
                <a href='/admin/editar-producto.html?id=${product._id}' class='btn btn-secondary btn-sm'>Editar producto</a>
            </td>
        </tr>
        `;
      products += newProduct;
    });

    tableBody.innerHTML = products;
  });
