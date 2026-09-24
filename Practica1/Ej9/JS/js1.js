var nombres = prompt("Ingrese una lista de nombres separados por coma:");
var listaNombres = nombres.split(",");

for (let i in listaNombres) {
    document.write("<p>Hola, " + listaNombres[i] + "!</p>");
}