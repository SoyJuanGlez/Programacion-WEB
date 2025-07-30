window.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosPedido = document.querySelector('.productos-pedido');
    const calculos = document.querySelector('.calculos');

    if (!productosPedido || !calculos) return;

    productosPedido.innerHTML = '';
    let subtotal = 0;

    carrito.forEach(item => {
        const precioNum = Number(item.precio.toString().replace(/[^0-9.-]+/g,"").replace(/,/g, ''));
        subtotal += precioNum * item.cantidad;

        const div = document.createElement('div');
        div.className = 'producto-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.nombre}">
            <div class="producto-info">
                <h4>${item.nombre}</h4>
                <p>Cantidad: ${item.cantidad}</p>
                <span class="precio">${item.precio}</span>
            </div>
        `;
        productosPedido.appendChild(div);
    });

    const envio = 0;
    const iva = subtotal * 0.16;
    const total = subtotal + envio + iva;

    calculos.innerHTML = `
        <div class="linea-calculo">
            <span>Subtotal:</span>
            <span>$${subtotal.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
        </div>
        <div class="linea-calculo">
            <span>Envío:</span>
            <span>Gratis</span>
        </div>
        <div class="linea-calculo">
            <span>IVA (16%):</span>
            <span>$${iva.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
        </div>
        <div class="total">
            <span>Total:</span>
            <span>$${total.toLocaleString('es-MX', {minimumFractionDigits:2})}</span>
        </div>
    `;
});