const finish = document.getElementById("finish");
const cartIdElement = document.getElementById('cartId');
const userNameElement = document.getElementById('userName');

const cartId = cartIdElement ? cartIdElement.dataset.cartid : null;
const userName = userNameElement ? userNameElement.dataset.username : '';

const ticketResponse = async () => {
    if (!cartId) return;

    const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: "POST",
        body: JSON.stringify(),
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    const data = result.payload;

    if (data) {
        const ticketEl = document.getElementById('ticket');
        if (ticketEl) {
            ticketEl.innerHTML = `
                <div class="ticket-header">
                    <h3><i class="fas fa-receipt"></i> Ticket #${data.code}</h3>
                    <p>${new Date(data.purchase_datetime).toLocaleString('es-CO')}</p>
                </div>
                <div class="table-responsive-tech">
                    <table class="table-tech">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.products.map(p => `
                                <tr>
                                    <td>${p._id.title}</td>
                                    <td>$${p._id.price}</td>
                                    <td>${p.quantity}</td>
                                    <td style="color: var(--accent-cyan); font-weight: 600;">$${p.quantity * p._id.price}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="ticket-total">Total: $${data.amount}</div>
                <div class="ticket-footer" style="margin-top: 20px;">
                    <p>${userName}</p>
                    <p>${data.purchaser}</p>
                    <p style="margin-top: 16px;">Vendido y entregado por <strong>@HeroSystems</strong></p>
                </div>
            `;
        }
    }

    if (finish) {
        finish.addEventListener("click", async () => {
            Swal.fire({
                icon: "success",
                title: "¡Gracias por tu compra!",
                text: "Se envió un correo con los detalles de su compra.",
                confirmButtonText: "Ok",
                background: '#111827',
                color: '#e2e8f0',
                iconColor: '#00d4ff',
                confirmButtonColor: '#00d4ff'
            }).then(async () => {
                await fetch(`/api/carts/products`, { method: "DELETE", headers: { "Content-Type": "application/json" } });
                window.location.href = "/products";
            });
        });
    }
};

ticketResponse();
