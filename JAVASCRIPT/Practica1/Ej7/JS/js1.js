var intentos = 3;
var respuestaCorrecta = "Velazquez";
var respuestaUsuario;

while (intentos > 0) {
    respuestaUsuario = prompt("¿Quién es el pintor de las Meninas? (Intento " + (4 - intentos) + " de " + 3 + ")");
    if (respuestaUsuario === respuestaCorrecta.toLowerCase()) {
        alert("¡Correcto! Ha acertado.");
        break;
    } else {
        intentos--;
        if (intentos > 0) {
            alert("Incorrecto. Inténtalo de nuevo.");
        } else {
            alert("Lo siento! La respuesta correcta es Velázquez.");
        }
    }
}