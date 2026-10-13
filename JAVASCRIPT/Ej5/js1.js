var cantidadParrafos = parseInt(prompt("¿Cuántos párrafos deseas crear?"));

// Verificar si el usuario ingresó un número válido
if (isNaN(cantidadParrafos) || cantidadParrafos <= 0) {
    alert("Por favor, ingresa un número válido.");
} else {
    // Crear los párrafos
    var h1Element = document.getElementsByTagName("h1")[0];
    
    for (var i = 1; i <= cantidadParrafos; i++) {
        var parrafo = document.createElement("p");
        parrafo.textContent = `Este es el párrafo número ${i}`;
        h1Element.appendChild(parrafo);
    }
}