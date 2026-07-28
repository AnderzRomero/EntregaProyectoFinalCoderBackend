const form = document.getElementById("formProductCreator");
const deleteBtn = document.getElementById("delete-btn");
const addBtn = document.getElementById("add-btn");

document.getElementById('delete-btn').addEventListener('click', function () {
    const productId = document.getElementById('pid').value;
    DeleteProduct(productId);
});

fetch("/api/sessions/current")
    .then((response) => response.json())
    .then((userData) => {
        if (userData.payload.role === "admin") {
            deleteBtn.disabled = false;
            addBtn.disabled = false;
        } else if (userData.payload.role === "premium") {
            deleteBtn.disabled = true;
            addBtn.disabled = false;
        }
    })
    .catch((error) => console.error(error));

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();

    if (result.status === "success") {
        Swal.fire({
            title: "¡Producto registrado!",
            icon: "success",
            background: '#111827',
            color: '#e2e8f0',
            iconColor: '#00d4ff',
            confirmButtonColor: '#00d4ff'
        }).then((res) => {
            if (res.isConfirmed) window.location.href = '/products';
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "Hubo un error al crear el producto",
            icon: "error",
            background: '#111827',
            color: '#e2e8f0',
            iconColor: '#ef4444',
            confirmButtonColor: '#00d4ff'
        });
    }
});

function DeleteProduct(productId) {
    Swal.fire({
        title: "¿Qué deseas hacer?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Cambiar Estado",
        denyButtonText: "Eliminar Producto",
        background: '#111827',
        color: '#e2e8f0',
        confirmButtonColor: '#00d4ff',
        denyButtonColor: '#dc2626',
        cancelButtonColor: '#64748b'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/products/status/${productId}`, { method: 'PUT' })
                .then(response => {
                    if (response.ok) {
                        Swal.fire({
                            title: "Estado actualizado",
                            icon: "success",
                            background: '#111827',
                            color: '#e2e8f0',
                            iconColor: '#00d4ff',
                            confirmButtonColor: '#00d4ff'
                        });
                    } else {
                        throw new Error('Error al actualizar');
                    }
                })
                .catch(error => console.error('Error:', error.message));
        } else if (result.isDenied) {
            fetch(`/api/products/${productId}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        Swal.fire({
                            title: "Producto eliminado",
                            icon: "info",
                            background: '#111827',
                            color: '#e2e8f0',
                            confirmButtonColor: '#00d4ff'
                        });
                    } else {
                        throw new Error('Error al eliminar');
                    }
                })
                .catch(error => console.error('Error:', error.message));
        }
    });
}
