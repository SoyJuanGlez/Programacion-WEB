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
            const precioNum = Number(item.precio.replace(/[^0-9.-]+/g,""));
            total += precioNum * item.cantidad;
            // Ajuste especial para la imagen del producto 2
            let imgStyle = "width:40px;height:40px;object-fit:cover;vertical-align:middle;border-radius:8px;";
            if(item.nombre === "Freddy Krueger") {
                imgStyle = "width:48px;height:40px;object-fit:contain;vertical-align:middle;background:#fff;border-radius:8px;padding:2px;";
            }
            html += `<li style="margin-bottom:1rem;display:flex;align-items:center;">
                <img src="${item.img}" alt="${item.nombre}" style="${imgStyle}">
                <span style="margin-left:1rem;flex:1;">${item.nombre} - ${item.precio}</span>
                <button class="disminuir-cantidad" data-idx="${idx}" style="margin:0 5px;background:#eee;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-weight:bold;">-</button>
                <span style="min-width:24px;text-align:center;">${item.cantidad}</span>
                <button class="aumentar-cantidad" data-idx="${idx}" style="margin:0 5px;background:#eee;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-weight:bold;">+</button>
                <button data-idx="${idx}" class="eliminar-producto" style="margin-left:1rem;background:#ff5252;color:#fff;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;">Eliminar</button>
            </li>`;
        });
        html += `</ul>`;
        html += `<p style="font-weight:bold;font-size:1.3rem;margin-top:2rem;">Total: $${total.toLocaleString('es-MX', {minimumFractionDigits:2})}</p>`;
        html += `<a href="pago.html" class="boton" style="margin-top:1rem;display:inline-block;">Ir a pagar</a>`;
    }
    carritoContenido.innerHTML = html;
    document.getElementById('cerrar-carrito').onclick = () => carritoModal.style.display = 'none';

    // Eliminar producto
    document.querySelectorAll('.eliminar-producto').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.getAttribute('data-idx');
            carrito.splice(idx, 1);
            actualizarContador();
            renderizarCarrito();
        };
    });

    // Aumentar cantidad
    document.querySelectorAll('.aumentar-cantidad').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.getAttribute('data-idx');
            carrito[idx].cantidad += 1;
            actualizarContador();
            renderizarCarrito();
        };
    });

    // Disminuir cantidad
    document.querySelectorAll('.disminuir-cantidad').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.getAttribute('data-idx');
            if (carrito[idx].cantidad > 1) {
                carrito[idx].cantidad -= 1;
            } else {
                carrito.splice(idx, 1);
            }
            actualizarContador();
            renderizarCarrito();
        };
    });
}

// Actualiza el contador del carrito
function actualizarContador() {
    // Suma todas las cantidades
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    carritoContador.textContent = totalCantidad;
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
        // Busca si ya existe el producto en el carrito
        const existente = carrito.find(item => item.nombre === nombre && item.precio === precio);
        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({ img, nombre, precio, cantidad: 1 });
        }
        actualizarContador();
        renderizarCarrito();
    };
});

// Inicializa el contador y el modal
actualizarContador();
renderizarCarrito();