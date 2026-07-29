const form = document.getElementById('loginForm');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { "Content-Type": 'application/json' }
    });
    const result = await response.json();

    if (result.status === "success") {
        window.location.href = result.payload.role === "admin" ? '/profile' : '/products';
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Credenciales inválidas",
            background: '#111827',
            color: '#e2e8f0',
            iconColor: '#ef4444',
            confirmButtonColor: '#00d4ff'
        });
    }
});
