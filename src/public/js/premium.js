const premiumForm = document.getElementById("premiumForm");

const fetchUser = async () => {
    const response = await fetch("/api/sessions/current", { method: "GET" });
    if (!response || !response.ok) throw new Error("No se pudo obtener la información del usuario");
    const result = await response.json();
    return result.payload;
};

premiumForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    premiumForm.querySelector("#premiumSubmit").disabled = true;

    try {
        const user = await fetchUser();
        const formData = new FormData(premiumForm);
        const response = await fetch(`/api/users/${user.id}/documents`, {
            method: "POST",
            body: formData
        });
        const result = await response.json();

        if (result.status === "success" || response.ok) {
            Swal.fire({
                title: "¡Felicitaciones!",
                text: "Tu documentación ha sido guardada con éxito. ¡Gracias!",
                icon: "success",
                background: '#111827',
                color: '#e2e8f0',
                iconColor: '#00d4ff',
                confirmButtonColor: '#00d4ff'
            });
        }
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        premiumForm.querySelector("#premiumSubmit").disabled = false;
    }
});
