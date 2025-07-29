const apiURL = 'http://localhost:3000';

async function agregarTenis() {
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = parseInt(document.getElementById('precio').value.trim()); 
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value || '';
    const color = document.getElementById('color').value.trim();
    const imagen = document.getElementById('imagen').value.trim();

    if(!nombre || !descripcion || isNaN(precio) || !tipo || !color || !imagen) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    try {
        const res = await fetch(`${apiURL}/newShoes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({nombre, descripcion, precio, tipo, color, imagen})
        });

        const data = await res.json();
        alert(data.message);

        document.getElementById('nombre').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('color').value = '';
        document.getElementById('imagen').value = '';
        const radios = document.querySelectorAll('input[name="tipo"]');
        radios.forEach(radio => radio.checked = false);

        obtenerTenis();
    } catch(error) {
        alert("Error al crear el Producto.");
        console.log(error)
    }
}

async function obtenerTenis() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTodos-Tenis');
        tenisDiv.innerHTML = '';
        
        data.shoes.forEach(teni => {
            const div = document.createElement('div');
            div.classList.add('tenis');
            
            div.innerHTML = `
                <img src="${teni.imagen}" alt="Sneaker" class="img-tenis">
                <div class="texto-tenis">
                    <h3>${teni.nombre}</h3>
                    <p>${teni.descripcion}</p>
                    <div class="UpdDel-tenis">
                        <span class="precio-tenis">$${teni.precio}</span>
                        <input type="submit" value="Actualizar" class="update" onclick="actualizarTenis('${teni._id}')">
                        <input type="submit" value="Eliminar" class="delete" onclick="eliminarTenis('${teni._id}')">
                    </div>
                </div>
            `;
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

async function eliminarTenis(id) {
    try {
        const res = await fetch(`${apiURL}/deleteShoes/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();
        alert(data.message);

        obtenerTenis();
    } catch(error) {
        alert("Error al eliminar Producto.");
        console.log(error)
    }
}

async function actualizarTenis(id) {
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = parseInt(document.getElementById('precio').value.trim()); 
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value || '';
    const color = document.getElementById('color').value.trim();
    const imagen = document.getElementById('imagen').value.trim();
    
    if(!nombre || !descripcion || isNaN(precio) || !tipo || !color || !imagen) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    try {
        const res = await fetch(`${apiURL}/updateShoes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({nombre, descripcion, precio, tipo, color, imagen})
        });

        const data = await res.json();
        alert(data.message);

        document.getElementById('nombre').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('color').value = '';
        document.getElementById('imagen').value = '';
        const radios = document.querySelectorAll('input[name="tipo"]');
        radios.forEach(radio => radio.checked = false);

        obtenerTenis();
    } catch(error) {
        alert("Error al actualizar Producto.");
        console.log(error)
    }
}

obtenerTenis();
