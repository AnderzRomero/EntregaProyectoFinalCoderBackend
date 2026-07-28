async function updateQuantity(pid, delta) {
    try {
        const response = await fetch(`/api/carts/products/${pid}`, { method: 'PUT' });
        const result = await response.json();
        if (result.status === 'success') {
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}

async function buy_cart(id) {
    const cart = localStorage.getItem('accessToken');
    if (cart) {
        console.log("No se ha logeado para realizar la compra");
    } else {
        const response = await fetch(`/api/carts/${id}/purchase`, {
            method: 'POST',
            body: JSON.stringify(),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        if (result.message === "Compra exitosa") {
            window.location.href = `/api/carts/tickets`;
        }
    }
}
