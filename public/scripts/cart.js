

const addProductToCart = (productId) => {
    fetch('/cart', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => {
        if(!response.ok){
            console.log(response);
            throw new Error('Failed to add product to cart')
        }
        return response.json()})
    .then(data => {
        console.log(data);
            alert('Product added to cart');
         
    }).catch(error => alert(error.message))
}

const deleteProductFromCart= (productId) => {
    fetch(`/cart/product/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to delete product from cart')
        }
        return response.json()})
    .then(data => {
        console.log(data);
        window.location.reload();
    }).catch(error => alert(error.message))
}