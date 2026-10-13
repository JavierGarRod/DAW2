window.onload = function() {
    // Definimos los arrays con las ciudades
    var ciudades_gratis = ["Sevilla", "Madrid", "Valencia", "Barcelona"];
    var ciudades_gastos = ["Cantabria", "Pontevedra", "Toledo", "Segovia"];

    // Pedimos la ciudad al usuario
    var ciudadUsuario = prompt("Introduce tu ciudad:");
    document.getElementById("ciudad").textContent = ciudadUsuario; //muestra la ciudad que ha seleccionado el usuario

    // Calculamos la fecha actual
    var hoy = new Date();
    var fechaFormateada = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();

    if (ciudades_gastos.includes(ciudadUsuario)) {
        var gastos = prompt("Introduce los gastos de envío (€):");
        document.getElementById("gastos").textContent = gastos + "€";
        document.getElementById("fecha").textContent = fechaFormateada;

    } else if (ciudades_gratis.includes(ciudadUsuario)) {
        document.getElementById("gastos").textContent = "Envío Gratuito";
        document.getElementById("fecha").textContent = fechaFormateada;

    } else {
        // Ciudad no permitida
        document.getElementById("gastos").textContent = "No se pueden realizar envíos a esta ciudad";
        
        // Ocultamos todo el bloque de la fecha de envío
        document.getElementById("contenedorFecha").style.display = "none"; //el syle.display = "none" oculta el elemento seleccionado
    }
};