window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    const contenedor = document.getElementById('productos-container');

    if (!query) {
        contenedor.innerHTML = '<p>No se proporcionó término de búsqueda.</p>';
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/searchShoes?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (data.shoes.length === 0) {
            contenedor.innerHTML = `<p>No se encontraron productos para "${query}".</p>`;
        } else {
            data.shoes.forEach(producto => {
                const div = document.createElement('div');
                div.className = 'producto';
                div.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="object-fit: contain;">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <span>$${producto.precio.toLocaleString('es-MX')}</span>
                `;
                contenedor.appendChild(div);
            });
        }
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        contenedor.innerHTML = '<p>Ocurrió un error al buscar productos.</p>';
    }
});

div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" style="object-fit: contain;">
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <span>$${producto.precio.toLocaleString('es-MX')}</span>
    <button class="boton agregar-btn">Agregar al carrito</button>
`;
contenedor.appendChild(div);

// Agregar evento al botón
div.querySelector('.agregar-btn').onclick = () => {
    agregarAlCarrito(producto.imagen, producto.nombre, `$${producto.precio.toLocaleString('es-MX')}`);
};