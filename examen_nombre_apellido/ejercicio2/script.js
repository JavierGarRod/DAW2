// Ejercicio 2 - JavaScript DOM: web de videojuegos

// Citas que se pueden añadir al azar (mínimo 4)
const citasAleatorias = [
  "Un jugador nunca se rinde, solo reinicia la partida.",
  "Hay que recoger todas las monedas antes de llegar al jefe final.",
  "Insert coin para continuar.",
  "Los clásicos nunca mueren, solo se remasterizan.",
  "La princesa siempre está en otro castillo."
];

// Función auxiliar: añade un li con el texto indicado al final del ul
function anadirElementoALista(texto) {
  const lista = document.getElementById("citas");
  const nuevo = document.createElement("li");
  nuevo.textContent = texto;
  lista.appendChild(nuevo);
}

// 1. Cambiar el texto del párrafo
function cambiarDescripcion() {
  const parrafo = document.getElementById("descripcion");
  parrafo.textContent = "Desde los años 70, los videojuegos han marcado generaciones.";
}

// 2. Alternar la imagen entre game1.jpg y game2.jpg
function alternarImagen() {
  const imagen = document.getElementById("imagen");
  // getAttribute devuelve el valor tal cual está escrito (src devuelve la ruta completa)
  if (imagen.getAttribute("src") === "game1.jpg") {
    imagen.setAttribute("src", "game2.jpg");
  } else {
    imagen.setAttribute("src", "game1.jpg");
  }
}

// 3. Añadir una cita fija al final de la lista
function anadirCita() {
  anadirElementoALista("La nostalgia también se juega y venir a clase es importante");
}

// 4. Eliminar el último li del ul
function eliminarUltimaCita() {
  const lista = document.getElementById("citas");
  const ultima = lista.lastElementChild;
  if (ultima !== null) {
    lista.removeChild(ultima);
  }
}

// 5 y 7. Resaltar la última cita en amarillo; si ya lo está, quitar el resaltado
function resaltarUltimaCita() {
  const lista = document.getElementById("citas");
  const ultima = lista.lastElementChild;
  if (ultima === null) {
    return;
  }
  if (ultima.style.backgroundColor === "yellow") {
    ultima.style.backgroundColor = "";
  } else {
    ultima.style.backgroundColor = "yellow";
  }
}

// 6. Añadir la cita escrita en el input (si está vacío, no hace nada)
function anadirCitaPersonalizada() {
  const campo = document.getElementById("nuevaCita");
  const texto = campo.value.trim();
  if (texto === "") {
    return;
  }
  anadirElementoALista(texto);
  campo.value = "";
}

// 8. Añadir una cita elegida al azar del array
function anadirCitaAleatoria() {
  const posicion = Math.floor(Math.random() * citasAleatorias.length);
  anadirElementoALista(citasAleatorias[posicion]);
}
