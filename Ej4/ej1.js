var cadena= prompt("Ingrese una cadena de texto: ");

document.write("Tamaño de la cadena: " + cadena.length + "<br>");
document.write("El caracter en la posicion 8 es: " + cadena.charAt(8) + "<br>");
document.write("Contiene el caracter 't'?: " + cadena.includes("t") + "<br>");

if (cadena.includes("t")) {
    document.write("La cadena contiene el caracter 't' en la posicion " + cadena.indexOf("t") + "<br>");
} else {
    document.write("La cadena no contiene el caracter 't' <br>");
}

document.write("La cadena en mayusculas es: " + cadena.toUpperCase() + "<br>");
document.write("La cadena en minusculas es: " + cadena.toLowerCase() + "<br>"); 