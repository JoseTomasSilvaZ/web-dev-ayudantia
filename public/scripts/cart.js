


const addProductToCart = (productId) => {
    fetch('/api/cart', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productId})
    }).then(response => {
        if(!response.ok){
           throw new Error('No se pudo agregar producto al carrito')
        }
        return response.json()
    }).then(() => {
        alert('Producto agregado al carrito')
    }).catch(err => alert(err.message))
}


const deleteProductFromCart = (productId) => {
    fetch(`/api/cart/product/${productId}`, {
        method: 'DELETE'
    }).then(response => {
        if(!response.ok){
            throw new Error('No se pudo eliminar producto al carrito')
         }
         return response.json()
    }).then(() => {
        window.location.reload()
    }).catch((err) => alert(err.message))
}