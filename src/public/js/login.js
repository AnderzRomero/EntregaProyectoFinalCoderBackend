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

async function restorePassword() {
    Swal.fire({
        text: 'Ingresa tu correo electrónico, te enviaremos un mail de restauración',
        input: 'text',
        background: '#111827',
        color: '#e2e8f0',
        inputValidator: value => {
            return !value && "Es necesario un correo para poder enviar el link de restauración";
        }
    }).then(async result => {
        if (result.value) {
            const email = result.value;
            await fetch('/api/sessions/passwordRestoreRequest', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' }
            });
            Swal.fire({
                icon: "success",
                text: "Si el usuario está en nuestra base, se enviará un correo electrónico con el link de restablecimiento",
                background: '#111827',
                color: '#e2e8f0',
                iconColor: '#00d4ff',
                confirmButtonColor: '#00d4ff'
            });
        }
    });
}
