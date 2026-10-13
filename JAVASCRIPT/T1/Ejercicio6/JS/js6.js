function mostrar(elementoSpan) {
    var p2 = document.getElementById("p2");
    var p3 = document.getElementById("p3");

    if (elementoSpan.textContent === "Mostrar más...") {
       // Cambiamos el CSS de los párrafos a 'block' para que SE VEAN
        p2.style.display = "block";
        p3.style.display = "block";
        elementoSpan.textContent = "Mostrar menos...";
    } else {
        // Si ya estaban visibles, los Ocultamos poniendo 'none'
        p2.style.display = "none";
        p3.style.display = "none";
        
        // Volvemos a cambiar el texto del span
        elementoSpan.textContent = "Mostrar más...";
    }
}