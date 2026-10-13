// 1.1. Mostrar el título por consola
var titulo = document.title;

console.log(titulo);
console.log(titulo.toUpperCase());


// 1.2. Cambiar el nombre y apellido de los inputs
document.getElementById("nombre").value = "Francisco";
document.getElementById("apellido").value = "Alarcón";


// 1.3. Añadir un saludo al párrafo
var nombre = document.getElementById("nombre").value;
var apellido = document.getElementById("apellido").value;

document.getElementById("saludo").textContent =
    "Hola " + nombre + " " + apellido;


// 1.4. Añadir otro <p> debajo de saludo
var nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "¿Qué tal estás?";

document.getElementById("saludo").after(nuevoParrafo);


// 1.5. Cambiar el texto del label apellido usando querySelector()
document.querySelector('label[for="apellido"]').textContent = "Apellidos:";