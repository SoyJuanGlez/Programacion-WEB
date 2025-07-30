// Carrito global
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del carrito
const carritoBtn = document.getElementById('carrito-btn');
const carritoModal = document.getElementById('carrito-modal');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const carritoContador = document.getElementById('carrito-contador');
const carritoContenido = carritoModal.querySelector('.carrito-modal-content');

// Mostrar/ocultar modal
carritoBtn.onclick = () => carritoModal.style.display = 'flex';
cerrarCarrito.onclick = () => carritoModal.style.display = 'none';
window.onclick = (e) => {
    if (e.target === carritoModal) carritoModal.style.display = 'none';
};

// Renderizar carrito
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
            html += `<li style="margin-bottom:1rem;display:flex;align-items:center;">
                <img src="${item.img}" alt="${item.nombre}" style="width:40px;height:40px;object-fit:cover;vertical-align:middle;border-radius:8px;">
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
            localStorage.setItem('carrito', JSON.stringify(carrito));
        };
    });

    // Aumentar cantidad
    document.querySelectorAll('.aumentar-cantidad').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.getAttribute('data-idx');
            carrito[idx].cantidad += 1;
            actualizarContador();
            renderizarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carrito));
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
            localStorage.setItem('carrito', JSON.stringify(carrito));
        };
    });
}

// Actualiza el contador del carrito
function actualizarContador() {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    carritoContador.textContent = totalCantidad;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Renderiza los productos buscados
async function renderizarResultados() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('search') || '';
    const productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = '<p>Buscando...</p>';

    try {
        // Cambia esto en resultados.js
        const res = await fetch(`http://localhost:3000/api/tenis?search=${encodeURIComponent(query)}`);
        const tenis = await res.json();

        productosContainer.innerHTML = '';
        if (tenis.length === 0) {
            productosContainer.innerHTML = '<p>No se encontraron tenis.</p>';
        } else {
            tenis.forEach(t => {
                const div = document.createElement('div');
                div.className = 'producto';
                div.innerHTML = `
                    <img src="${t.imagen}" alt="${t.nombre}" style="object-fit: contain; width:100px;">
                    <h3>${t.nombre}</h3>
                    <p>${t.descripcion}</p>
                    <span>$${Number(t.precio).toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
                    <button class="boton agregar-carrito-busqueda" style="margin-top:1rem;">Agregar al carrito</button>
                `;
                productosContainer.appendChild(div);

                // Botón agregar al carrito
                div.querySelector('.agregar-carrito-busqueda').onclick = function() {
                    const img = t.imagen;
                    const nombre = t.nombre;
                    const precio = `$${Number(t.precio).toLocaleString('es-MX', {minimumFractionDigits:2})}`;
                    const existente = carrito.find(item => item.nombre === nombre && item.precio === precio);
                    if (existente) {
                        existente.cantidad += 1;
                    } else {
                        carrito.push({ img, nombre, precio, cantidad: 1 });
                    }
                    actualizarContador();
                    renderizarCarrito();
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                };
            });
        }
    } catch (err) {
        productosContainer.innerHTML = '<p>Error al buscar tenis.</p>';
    }
}

// Inicializa todo
actualizarContador();
renderizarCarrito();
renderizarResultados();