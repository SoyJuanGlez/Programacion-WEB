// Selección de elementos
const carritoBtn = document.getElementById('carrito-btn');
const carritoModal = document.getElementById('carrito-modal');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const carritoContador = document.getElementById('carrito-contador');
const carritoContenido = carritoModal.querySelector('.carrito-modal-content');
const productos = document.querySelectorAll('.producto');

let carrito = [];

// Mostrar/ocultar modal
carritoBtn.onclick = () => carritoModal.style.display = 'flex';
cerrarCarrito.onclick = () => carritoModal.style.display = 'none';
window.onclick = (e) => {
    if (e.target === carritoModal) carritoModal.style.display = 'none';
};

// Función para renderizar el carrito
function renderizarCarrito() {
    let html = `<span class="cerrar-modal" id="cerrar-carrito">&times;</span>
    <h2>Tu Carrito</h2>`;
    if (carrito.length === 0) {
        html += `<p>Aún no tienes productos en tu carrito.</p>`;
    } else {
        let total = 0;
        html += `<ul style="list-style:none;padding:0;">`;
        carrito.forEach((item, idx) => {
            // Extrae el número del precio (quita $ y comas)
            const precioNum = Number(item.precio.replace(/[^0-9.-]+/g,""));
            total += precioNum;
            html += `<li style="margin-bottom:1rem;">
                <img src="${item.img}" alt="${item.nombre}" style="width:40px;height:40px;object-fit:cover;vertical-align:middle;border-radius:8px;">
                <span style="margin-left:1rem;">${item.nombre} - ${item.precio}</span>
                <button data-idx="${idx}" class="eliminar-producto" style="margin-left:1rem;background:#ff5252;color:#fff;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;">Eliminar</button>
            </li>`;
        });
        html += `</ul>`;
        html += `<p style="font-weight:bold;font-size:1.3rem;margin-top:2rem;">Total: $${total.toLocaleString('es-MX', {minimumFractionDigits:2})}</p>`;
        html += `<a href="pago.html" class="boton" style="margin-top:1rem;display:inline-block;">Ir a pagar</a>`;
    }
    carritoContenido.innerHTML = html;
    document.getElementById('cerrar-carrito').onclick = () => carritoModal.style.display = 'none';
    document.querySelectorAll('.eliminar-producto').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.getAttribute('data-idx');
            carrito.splice(idx, 1);
            actualizarContador();
            renderizarCarrito();
        };
    });
}

// Actualiza el contador del carrito
function actualizarContador() {
    carritoContador.textContent = carrito.length;
}

// Agrega botón a cada producto y funcionalidad
productos.forEach(producto => {
    let btn = document.createElement('button');
    btn.textContent = 'Agregar al carrito';
    btn.className = 'boton';
    btn.style.marginTop = '1rem';
    producto.appendChild(btn);

    btn.onclick = () => {
        const img = producto.querySelector('img').getAttribute('src');
        const nombre = producto.querySelector('h3').textContent;
        const precio = producto.querySelector('span').textContent;
        carrito.push({ img, nombre, precio });
        actualizarContador();
        renderizarCarrito();
    };
});

// Inicializa el contador y el modal
actualizarContador();
renderizarCarrito();