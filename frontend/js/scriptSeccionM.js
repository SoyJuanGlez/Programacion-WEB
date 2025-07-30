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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

/* ORDENAR PRECIOS */


/* FILTRO PRECIOS */
//$1000 - $2000
async function obtenerTenisPrecio1() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.precio >= 1000 && teni.precio <= 2000)
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

//$2000 - $3000
async function obtenerTenisPrecio2() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.precio >= 2000 && teni.precio <= 3000)
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

//$3000 - $4000
async function obtenerTenisPrecio3() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.precio >= 3000 && teni.precio <= 4000)
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

//Más de $4000
async function obtenerTenisPrecio4() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.precio >= 4000)
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

/* FILTRO COLOR */

async function obtenerTenisRojos() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.color === "red")
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

async function obtenerTenisAzules() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.color === "blue")
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

async function obtenerTenisAmarillos() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.color === "yellow")
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

async function obtenerTenisVerdes() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.color === "green")
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

async function obtenerTenisNegros() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.color === "black")
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

async function obtenerTenisBlancos() {
    try {
        const res = await fetch(`${apiURL}/getShoes`);
        const data = await res.json();

        const tenisDiv = document.getElementById('obtenerTenis-Mujer');
        tenisDiv.innerHTML = '';
        
        data.shoes
        .filter(teni => teni.tipo === "Mujer")
        .filter(teni => teni.color === "white")
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
                        <button class="botonSecc">Agregar al carrito</button>
                    </div>
                </div>
            `;
            const btn = div.querySelector('.botonSecc');
            btn.onclick = () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.nombre === teni.nombre && item.precio === `$${teni.precio}`);
                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({ img: teni.imagen, nombre: teni.nombre, precio: `$${teni.precio}`, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            };
            tenisDiv.appendChild(div);
        });
    } catch(error) {
        alert("Error al obtener los Productos.");
        console.log(error)
    }
}

obtenerTenisMujer();
actualizarContador(); 
renderizarCarrito(); 