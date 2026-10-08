const productos = [
    { id: 1, nombre: 'Patata', precio: 1, imagen: 'patata.jpg' }, 
    { id: 2, nombre: 'Cebolla', precio: 1.2, imagen: 'cebolla.jpg' }, 
    { id: 3, nombre: 'Calabacin', precio: 2.1, imagen: 'calabacin.jpg' }, 
    { id: 4, nombre: 'Fresas', precio: 0.6, imagen: 'fresas.jpg' }
];

const contenedor = document.getElementById('contenedor-productos');

// Recorrer el array y representar cada producto
productos.forEach(prod => {
    var div = document.createElement('div');
    div.className = 'producto';

    // Imagen dinámica
    var img = document.createElement('img');
    img.src = `../IMAGES/imagen${prod.nombre}.jpg`;
    img.alt = `imagen${prod.nombre}`;

    // Nombre y Precio
    var titulo = document.createElement('h3');
    titulo.textContent = prod.nombre;

    var precio = document.createElement('p');
    precio.textContent = `Precio: ${prod.precio} €`;

    // Botón Disponible (Estado inicial: disabled / gris)
    var btnDisponibilidad = document.createElement('button');
    btnDisponibilidad.textContent = 'Disponible';
    btnDisponibilidad.className = 'disabled';

    // Evento para alternar entre disabled y enabled
    btnDisponibilidad.onclick = function() {
        if (btnDisponibilidad.classList.contains('disabled')) {
            btnDisponibilidad.classList.remove('disabled');
            btnDisponibilidad.classList.add('enabled');
        } else {
            btnDisponibilidad.classList.remove('enabled');
            btnDisponibilidad.classList.add('disabled');
        }
    };

    // Añadir elementos al div del producto
    div.appendChild(img);
    div.appendChild(titulo);
    div.appendChild(precio);
    div.appendChild(btnDisponibilidad);

    // Añadir el producto al contenedor principal
    contenedor.appendChild(div);
});