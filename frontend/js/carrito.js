// Variables globales del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const carritoBtn = document.getElementById('carrito-btn');
const carritoModal = document.getElementById('carrito-modal');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const carritoContador = document.getElementById('carrito-contador');
const carritoContenido = carritoModal?.querySelector('.carrito-modal-content');

// Mostrar/ocultar modal
if (carritoBtn && carritoModal) {
    carritoBtn.onclick = () => carritoModal.style.display = 'flex';
}
if (cerrarCarrito && carritoModal) {
    cerrarCarrito.onclick = () => carritoModal.style.display = 'none';
}
window.onclick = (e) => {
    if (e.target === carritoModal) carritoModal.style.display = 'none';
};

// Actualizar contador
function actualizarContador() {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (carritoContador) {
        carritoContador.textContent = totalCantidad;
    }
}

// Renderizar carrito
function renderizarCarrito() {
    if (!carritoContenido) return;

    let html = `<span class="cerrar-modal" id="cerrar-carrito">&times;</span><h2>Tu Carrito</h2>`;
    if (carrito.length === 0) {
        html += `<p>Aún no tienes productos en tu carrito.</p>`;
    } else {
        let total = 0;
        html += `<ul style="list-style:none;padding:0;">`;
        carrito.forEach((item, idx) => {
            const precioNum = Number(item.precio.replace(/[^0-9.-]+/g, ""));
            total += precioNum * item.cantidad;
            html += `<li style="margin-bottom:1rem;display:flex;align-items:center;">
                <img src="${item.img}" alt="${item.nombre}" style="width:40px;height:40px;object-fit:contain;border-radius:8px;">
                <span style="margin-left:1rem;flex:1;">${item.nombre} - ${item.precio}</span>
                <button class="disminuir-cantidad" data-idx="${idx}">-</button>
                <span>${item.cantidad}</span>
                <button class="aumentar-cantidad" data-idx="${idx}">+</button>
                <button data-idx="${idx}" class="eliminar-producto">Eliminar</button>
            </li>`;
        });
        html += `</ul>`;
        html += `<p>Total: $${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>`;
        html += `<a href="pago.html" class="boton">Ir a pagar</a>`;
    }

    carritoContenido.innerHTML = html;
    localStorage.setItem('carrito', JSON.stringify(carrito));

    document.querySelectorAll('.eliminar-producto').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.dataset.idx;
            carrito.splice(idx, 1);
            actualizarContador();
            renderizarCarrito();
        };
    });

    document.querySelectorAll('.aumentar-cantidad').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.dataset.idx;
            carrito[idx].cantidad += 1;
            actualizarContador();
            renderizarCarrito();
        };
    });

    document.querySelectorAll('.disminuir-cantidad').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.dataset.idx;
            if (carrito[idx].cantidad > 1) {
                carrito[idx].cantidad -= 1;
            } else {
                carrito.splice(idx, 1);
            }
            actualizarContador();
            renderizarCarrito();
        };
    });

    const cerrar = document.getElementById('cerrar-carrito');
    if (cerrar) cerrar.onclick = () => carritoModal.style.display = 'none';
}

// Agregar producto al carrito
function agregarAlCarrito(img, nombre, precio) {
    const existente = carrito.find(item => item.nombre === nombre && item.precio === precio);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ img, nombre, precio, cantidad: 1 });
    }
    actualizarContador();
    renderizarCarrito();
}