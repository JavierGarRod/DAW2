function mostrarEnlace(enlace) {

    document.getElementById("direccion").value = enlace.href;

    // Evita que el navegador abra el enlace
    return false;
}