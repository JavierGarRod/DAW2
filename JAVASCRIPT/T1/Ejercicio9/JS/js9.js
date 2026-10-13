function agregarProducto() {
    var nombreProducto = prompt("¿Qué producto deseas añadir?");
            
    if (nombreProducto && nombreProducto.trim() !== "") {
        var lista = document.getElementById("listaCompra");
                
        // Crear contenedor para el producto y sus botones
        var li = document.createElement("li");
                
        // Span para el texto del producto
        var spanTexto = document.createElement("span");
        spanTexto.textContent = nombreProducto + " ";
                
        // Botón SÍ (Comprado)
        var btnSi = document.createElement("button");
        btnSi.textContent = "SÍ";
        btnSi.onclick = function() {
            spanTexto.className = "comprado";
        };
                
        // Botón NO (No comprado)
        var btnNo = document.createElement("button");
        btnNo.textContent = "NO";
        btnNo.onclick = function() {
            spanTexto.className = "no-comprado";
        };
                
        // Agregar elementos al li y el li a la lista
        li.appendChild(spanTexto);
        li.appendChild(btnSi);
        li.appendChild(btnNo);
        lista.appendChild(li);
    }
}