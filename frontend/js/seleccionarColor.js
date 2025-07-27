const colores = document.querySelectorAll('.contenedor-colores .color-box');

colores.forEach(div => {
    div.addEventListener('click', () => {
        const colorSeleccionado = div.id;
        document.getElementById('color').value = colorSeleccionado;

        colores.forEach(c => c.classList.remove('seleccionado'));
        div.classList.add('seleccionado');
    });
});
