window.onload = function() {

    document.getElementById("ciudad").textContent = "Sevilla";

    document.getElementById("gastos").textContent = "3€";

    var fecha = new Date();

    document.getElementById("fecha").textContent =
        fecha.getDate() + "/" +
        (fecha.getMonth() + 1) + "/" +
        fecha.getFullYear();
};