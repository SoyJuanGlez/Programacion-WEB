const apiURL = 'http://localhost:3000';

async function obtenerTenisMujer() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .forEach(teni => {
            const div = document.createElement('div');
            div.classList.add('tenis');
            
            div.innerHTML = `
                <img src="${teni.imagen}" alt="Sneaker" class="img-tenis">
                <div class="texto-tenis">
                    <h3>${teni.nombre}</h3>
                    <p>${teni.descripcion}</p>
                    <div class="comprar-tenis">
                        <span>$${teni.precio}</span>
                        <input type="submit" value="Comprar">
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

obtenerTenisMujer();
