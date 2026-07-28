const form = document.getElementById('restoreForm');
const urlParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    obj.token = urlParams.token;
    const response = await fetch('/api/sessions/password-restore', {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    if (result.status === "success") {
        Swal.fire({
            title: "¡Contraseña actualizada!",
            icon: "success",
            background: '#111827',
            color: '#e2e8f0',
            iconColor: '#00d4ff',
            confirmButtonColor: '#00d4ff'
        }).then((res) => {
            if (res.isConfirmed) window.location.href = '/login';
        });
    } else {
        Swal.fire({
            title: "Error",
            text: result.message || "No se pudo restablecer la contraseña",
            icon: "error",
            background: '#111827',
            color: '#e2e8f0',
            iconColor: '#ef4444',
            confirmButtonColor: '#00d4ff'
        });
    }
});
