function agregarProducto() {
    // Preguntar al usuario por el producto usando prompt
    var nombreProducto = prompt("¿Qué producto deseas añadir?");
            
    // Comprobar que el usuario escribió algo y no canceló
    if (nombreProducto && nombreProducto.trim() !== "") {
        // Crear el elemento de lista (li)
        var li = document.createElement("li");
        li.textContent = nombreProducto;
                
        // Añadir el nodo a la lista (ul)
        document.getElementById("listaCompra").appendChild(li);
    }
}