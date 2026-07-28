async function addProduct(id) {
    const cart = getCookie('cart');
    try {
        let response;
        if (cart) {
            response = await fetch(`/api/carts/${cart}/products/${id}`, { method: 'PUT' });
        } else {
            response = await fetch(`/api/carts/products/${id}`, { method: 'PUT' });
        }
        const result = await response.json();
        if (result.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: '¡Agregado!',
                text: 'Producto agregado al carrito',
                timer: 1500,
                showConfirmButton: false,
                background: '#111827',
                color: '#e2e8f0',
                iconColor: '#00d4ff'
            });
        }
    } catch (error) {
        console.error(error);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
