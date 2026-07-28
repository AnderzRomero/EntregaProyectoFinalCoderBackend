const form = document.getElementById('registerForm');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    const response = await fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { "Content-Type": 'application/json' }
    });
    const result = await response.json();
    if (result.status === "success") {
        Swal.fire({
            title: "¡Registro exitoso!",
            icon: "success",
            background: '#111827',
            color: '#e2e8f0',
            iconColor: '#00d4ff',
            confirmButtonColor: '#00d4ff'
        }).then((res) => {
            if (res.isConfirmed) window.location.replace('/login');
        });
    } else {
        Swal.fire({
            title: "Error",
            text: result.message || "No se pudo registrar",
            icon: "error",
            background: '#111827',
            color: '#e2e8f0',
            iconColor: '#ef4444',
            confirmButtonColor: '#00d4ff'
        });
    }
});
