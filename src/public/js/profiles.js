const renderUserView = (payload) => {
    document.getElementById("profileName").textContent = payload.name || payload.nombres || "Usuario";
    document.getElementById("profileEmail").textContent = payload.email || "";
    document.getElementById("profileId").textContent = payload.id || payload._id || "—";

    const roleEl = document.getElementById("profileRole");
    const roleMap = {
        admin: '<span class="profile-role admin"><i class="fas fa-shield-alt"></i> Administrador</span>',
        premium: '<span class="profile-role premium"><i class="fas fa-crown"></i> Premium</span>',
        user: '<span class="profile-role user"><i class="fas fa-user"></i> Usuario</span>'
    };
    roleEl.innerHTML = roleMap[payload.role] || `<span class="profile-role user">${payload.role}</span>`;

    document.getElementById("profileCart").textContent = payload.cart || "—";
    document.getElementById("profileMemberSince").textContent = payload.createdAt ? new Date(payload.createdAt).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" }) : "—";

    const actionsEl = document.querySelector(".profile-actions") || document.createElement("div");

    let extraActions = "";
    if (payload.role === "user" && payload.isPremium === false) {
        extraActions = `<a href="/premium" class="btn btn-secondary-tech"><i class="fas fa-crown"></i> Ser Premium</a>`;
    } else if (payload.role === "user" && payload.isPremium === true) {
        extraActions = `<button onclick="updateUserPremiumStatus('${payload.id}')" class="btn btn-secondary-tech"><i class="fas fa-crown"></i> Actualizar a Premium</button>`;
    } else if (payload.role === "premium" || payload.role === "admin") {
        extraActions = `<a href="/productCreator" class="btn btn-secondary-tech"><i class="fas fa-tools"></i> Gestionar Productos</a>`;
    }
    if (extraActions) {
        const temp = document.createElement("div");
        temp.innerHTML = extraActions;
        while (temp.firstChild) {
            actionsEl.insertBefore(temp.firstChild, actionsEl.querySelector("a[href='/products']"));
        }
    }
};

const fetchCurrentUser = async () => {
    try {
        const response = await fetch("/api/sessions/current", { method: "GET" });
        if (response.ok) {
            const result = await response.json();
            if (result.payload) {
                renderUserView(result.payload);
            }
            return result.payload;
        }
    } catch (error) {
        console.error(error);
    }
};

async function premium() {
    window.location = "/premium";
}

async function productCreator() {
    window.location = "/productCreator";
}

const updateUserPremiumStatus = async (uid) => {
    const res = await fetch(`/api/users/premium/${uid}`, { method: "PUT" });
    const data = await res.json();
    if (data.status === "success") {
        renderUserView(data.payload);
        Swal.fire({ icon: "success", title: "¡Felicidades!", text: "Ahora eres usuario Premium", confirmButtonColor: "#00d4ff" });
    }
};

fetchCurrentUser();
