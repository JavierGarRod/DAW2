// Variable global 
var tamano = 16;

function aumentarLetra() {
    tamano = tamano + 1; 
    var parrafo = document.getElementById("parrafo");
    parrafo.style.fontSize = tamano + "px"; // Aplicamos el nuevo tamaño con 'px'
}

function disminuirLetra() {
    tamano = tamano - 1;
    var parrafo = document.getElementById("parrafo");
    parrafo.style.fontSize = tamano + "px"; 
}